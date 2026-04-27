import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { getWaitlistCount } from '@/lib/resend';

export const runtime = 'nodejs';

const cachedCount = unstable_cache(
  async () => {
    try { return await getWaitlistCount(); }
    catch { return 0; }
  },
  ['waitlist-count'],
  { revalidate: 60, tags: ['waitlist'] },
);

export async function GET() {
  const count = await cachedCount();
  return NextResponse.json(
    { count },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
  );
}
