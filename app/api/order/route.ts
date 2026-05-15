import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const body = await req.json();

  const params = new URLSearchParams({
    name: body.name ?? '',
    phone: body.phone ?? '',
    address: body.address ?? '',
    doorCode: body.doorCode ?? '',
    product: body.product ?? '',
    price: body.price ?? '',
    date: new Date().toLocaleString('mn-MN', { timeZone: 'Asia/Ulaanbaatar' }),
  });

  const res = await fetch(`${scriptUrl}?${params.toString()}`, { method: 'GET' });
  if (!res.ok) {
    return NextResponse.json({ error: 'Sheet write failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
