import { NextRequest, NextResponse } from 'next/server';
import { checkPayment } from '@/lib/qpay';

export async function POST(req: NextRequest) {
  try {
    const { invoice_id } = await req.json();

    if (!invoice_id) {
      return NextResponse.json({ error: 'Missing invoice_id' }, { status: 400 });
    }

    const result = await checkPayment(invoice_id);
    const paid =
      result.count > 0 &&
      result.rows.some(r => r.payment_status === 'PAID' || r.payment_status === 'SUCCESS');

    return NextResponse.json({ paid, ...result });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
