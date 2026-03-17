import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { promos } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { eq } from 'drizzle-orm';
import redis from '@/lib/redisClient';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const promoId = parseInt(id, 10);

    const cacheKey = `promo:${id}`;
    try {
      const cached = await redis.get(cacheKey);
      if (cached) return NextResponse.json(JSON.parse(cached));
    } catch (err) {
      console.error('Redis GET Error:', err);
    }
    if (isNaN(promoId)) {
      return NextResponse.json({ error: 'Invalid promo ID' }, { status: 400 });
    }

    const promoDetail = await db.select().from(promos).where(eq(promos.id, promoId)).limit(1);
    const promo = promoDetail[0] ?? null;
    if (!promo) {
      return NextResponse.json({ error: 'Promo not found' }, { status: 404 });
    }
    
    try {
      await redis.set(cacheKey, JSON.stringify(promo), { EX: 60 * 60 });
    } catch (err) {
      console.error('Redis SET Error:', err);
    }

    return NextResponse.json(promo);
  } catch (error) {
    console.error('[GET /api/promos/[id]]', error);
    return NextResponse.json({ error: 'Failed to fetch promo' }, { status: 500 });
  }
}