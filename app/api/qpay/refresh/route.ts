import { NextRequest, NextResponse } from 'next/server';
import { refreshWithToken, getCachedRefreshToken } from '@/lib/qpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rt = body.refresh_token ?? getCachedRefreshToken();

    if (!rt) {
      return NextResponse.json({ error: 'No refresh token available' }, { status: 400 });
    }

    const token = await refreshWithToken(rt);
    return NextResponse.json({ ok: true, access_token: token.access_token });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
