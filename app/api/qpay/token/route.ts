import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/qpay';

export async function POST() {
  try {
    const access_token = await getAccessToken();
    return NextResponse.json({ ok: true, access_token });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
