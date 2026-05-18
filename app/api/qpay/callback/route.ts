import { NextRequest, NextResponse } from 'next/server';
import { checkPayment } from '@/lib/qpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[QPay callback]', JSON.stringify(body));

    // Verify payment if QPay sends an object_id
    const invoiceId = body.object_id ?? body.invoice_id;
    if (invoiceId) {
      const result = await checkPayment(invoiceId);
      console.log('[QPay callback] check result:', JSON.stringify(result));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[QPay callback] error:', err);
    return NextResponse.json({ ok: true }); // Always 200 to QPay
  }
}
