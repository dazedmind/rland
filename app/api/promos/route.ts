import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { promos } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { desc } from 'drizzle-orm';
import { Promo } from '@/app/utils/types';
import redis from '@/lib/redisClient';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const cacheKey = `promos`;
    try {
      const cached = await redis.get(cacheKey);
      if (cached) return NextResponse.json(JSON.parse(cached));
    } catch (err) {
      console.error('Redis GET Error:', err);
    }

    const promosList = await db.select().from(promos).orderBy(desc(promos.createdAt));
    try {
      await redis.set(cacheKey, JSON.stringify(promosList), { EX: 60 * 60 });
    } catch (err) {
      console.error('Redis SET Error:', err);
    }

    return NextResponse.json(promosList as unknown as Promo[]);
  } catch (error) {
    console.error('[GET /api/promos]', error);
    return NextResponse.json({ error: 'Failed to fetch promos list' }, { status: 500 });
  }
}