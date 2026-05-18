import { NextRequest, NextResponse } from 'next/server';
import { createInvoice } from '@/lib/qpay';

export async function POST(req: NextRequest) {
  try {
    const { amount, orderId, customerName, customerPhone } = await req.json();

    if (!amount || !orderId || !customerName || !customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
