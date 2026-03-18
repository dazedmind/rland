import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { careers } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { requireApiKey } from '@/lib/api-auth';
import redis from '@/lib/redisClient';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const careerId = parseInt(id, 10);
    const isNumericId = !isNaN(careerId);

    const cacheKey = `career:${id}`;
    try {
      const cached = await redis.get(cacheKey);
      if (cached) return NextResponse.json(JSON.parse(cached), {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" },
      });
    } catch (err) {
      console.error('Redis GET Error:', err);
    }

    let career;

    if (isNumericId) {
      const result = await db
        .select()
        .from(careers)
        .where(and(eq(careers.id, careerId), eq(careers.status, 'hiring')))
        .limit(1);
      career = result[0] ?? null;
    } else {
      const result = await db
        .select()
        .from(careers)
        .where(and(eq(careers.slug, id), eq(careers.status, 'hiring')))
        .limit(1);
      career = result[0] ?? null;
    }

    if (!career) {
      return NextResponse.json({ error: 'Career not found' }, { status: 404 });
    }

    try {
      await redis.set(cacheKey, JSON.stringify(career), { EX: 60 * 60 });
    } catch (err) {
      console.error('Redis SET Error:', err);
    }

    return NextResponse.json(career, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" },
    });
  } catch (error) {
    console.error('[GET /api/careers/[id]]', error);
    return NextResponse.json(
      { error: 'Failed to fetch career' },
      { status: 500 }
    );
  }
}
