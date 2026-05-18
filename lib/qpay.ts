export interface QPayTokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface QPayPaymentUrl {
  name: string;
  description: string;
  logo: string;
  link: string;
}

export interface QPayInvoiceResponse {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
  qPay_shortUrl: string;
  urls: QPayPaymentUrl[];
}

export interface QPayPaymentRow {
  payment_id: string;
  payment_status: string;
  payment_currency: string;
  payment_amount: number;
  payment_date: string;
  payment_wallet?: string;
}

export interface QPayCheckResponse {
  count: number;
  paid_amount: number;
  rows: QPayPaymentRow[];
}

// Module-level cache — survives within a warm serverless instance
let tokenCache: { data: QPayTokenResponse; expiresAt: number } | null = null;

function base() {
  return process.env.QPAY_BASE_URL!;
}

async function fetchNewToken(): Promise<QPayTokenResponse> {
  const credentials = Buffer.from(
    `${process.env.QPAY_USERNAME}:${process.env.QPAY_PASSWORD}`
  ).toString('base64');

  const res = await fetch(`${base()}/auth/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${credentials}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`QPay auth failed ${res.status}: ${body}`);
  }
  return res.json();
}

async function doRefresh(refreshToken: string): Promise<QPayTokenResponse> {
  const res = await fetch(`${base()}/auth/refresh`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  if (!res.ok) throw new Error(`QPay refresh failed: ${res.status}`);
  return res.json();
}

export async function getAccessToken(): Promise<string> {
  const now = Date.now();

  if (tokenCache && now < tokenCache.expiresAt - 60_000) {
    return tokenCache.data.access_token;
  }

  if (tokenCache) {
    try {
      const refreshed = await doRefresh(tokenCache.data.refresh_token);
      tokenCache = { data: refreshed, expiresAt: now + refreshed.expires_in * 1000 };
      return refreshed.access_token;
    } catch {
      // Fall through to full re-auth
    }
  }

  const token = await fetchNewToken();
  tokenCache = { data: token, expiresAt: now + token.expires_in * 1000 };
  return token.access_token;
}

export async function refreshWithToken(rt: string): Promise<QPayTokenResponse> {
  const token = await doRefresh(rt);
  tokenCache = { data: token, expiresAt: Date.now() + token.expires_in * 1000 };
  return token;
}

export function getCachedRefreshToken(): string | null {
  return tokenCache?.data.refresh_token ?? null;
}

export async function createInvoice(params: {
  amount: number;
  orderId: string;
  customerName: string;
  customerPhone: string;
}): Promise<QPayInvoiceResponse> {
  const accessToken = await getAccessToken();

  const res = await fetch(`${base()}/invoice`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      invoice_code: process.env.QPAY_INVOICE_CODE,
      sender_invoice_no: params.orderId,
      invoice_receiver_code: 'terminal',
      invoice_description: 'Purple Smile Order',
      amount: params.amount,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/qpay/callback`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`QPay invoice failed ${res.status}: ${body}`);
  }
  return res.json();
}

export async function checkPayment(invoiceId: string): Promise<QPayCheckResponse> {
  const accessToken = await getAccessToken();

  const res = await fetch(`${base()}/payment/check`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      object_type: 'INVOICE',
      object_id: invoiceId,
      offset: { page_number: 1, page_limit: 100 },
    }),
  });

  if (!res.ok) throw new Error(`QPay check failed: ${res.status}`);
  return res.json();
}
