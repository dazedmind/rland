import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { desc } from 'drizzle-orm';
import redis from '@/lib/redisClient';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const cacheKey = `articles:${searchParams.toString()}`;
    
    try {
      const cached = await redis.get(cacheKey);
      if (cached) return NextResponse.json(JSON.parse(cached));
    } catch (err) {
      console.error('Redis GET Error:', err);
    }

    const articlesList = await db.select().from(articles).$dynamic().orderBy(desc(articles.publishDate));
    
    try {
      await redis.set(cacheKey, JSON.stringify(articlesList), { EX: 60 * 60 });
    } catch (err) {
      console.error('Redis SET Error:', err);
    }

    return NextResponse.json(articlesList);

  } catch (error) {
    console.error('[GET /api/articles]', error);
    return NextResponse.json({ error: 'Failed to fetch articles list' }, { status: 500 });
  }
}