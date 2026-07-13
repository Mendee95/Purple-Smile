import { NextRequest, NextResponse } from 'next/server';
import { createInvoice } from '@/lib/qpay';

// Real package prices — the only amounts an invoice may be created for
const VALID_AMOUNTS = new Set([45000, 85000, 125000]);

export async function POST(req: NextRequest) {
  try {
    const { amount, orderId, customerName, customerPhone } = await req.json();

    if (!amount || !orderId || !customerName || !customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (
      !VALID_AMOUNTS.has(Number(amount)) ||
      typeof orderId !== 'string' || !orderId.startsWith('PS-') || orderId.length > 40 ||
      typeof customerName !== 'string' || customerName.length > 100 ||
      typeof customerPhone !== 'string' || customerPhone.length > 20
    ) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
    }

    const invoice = await createInvoice({ amount, orderId, customerName, customerPhone });

    return NextResponse.json({
      invoice_id: invoice.invoice_id,
      qr_image: invoice.qr_image,
      qr_text: invoice.qr_text,
      urls: invoice.urls ?? [],
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
