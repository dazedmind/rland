import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { db } from '@/lib/db';
import { promos } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { desc } from 'drizzle-orm';
import { Promo } from '@/app/utils/types';

const getCachedPromos = unstable_cache(
  async () => {
    return db.select().from(promos).orderBy(desc(promos.createdAt));
  },
  ['api-promos-list'],
  { revalidate: 3600, tags: ['promos'] }
);

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const promosList = await getCachedPromos();

    return NextResponse.json(promosList as unknown as Promo[], {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" },
    });
  } catch (error) {
    console.error('[GET /api/promos]', error);
    return NextResponse.json({ error: 'Failed to fetch promos list' }, { status: 500 });
  }
}
