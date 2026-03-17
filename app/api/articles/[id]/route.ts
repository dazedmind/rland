import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { requireApiKey } from '@/lib/api-auth';
import { urlNameToSlug } from '@/lib/utils';
import redis from '@/lib/redisClient';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    
    const cacheKey = `article:${id}`;
    try {
      const cached = await redis.get(cacheKey);
      if (cached) return NextResponse.json(JSON.parse(cached));
    } catch (err) {
      console.error('Redis GET Error:', err);
    }

    const articleId = parseInt(id, 10);
    const isNumericId = !isNaN(articleId);
    let article;

    if (isNumericId) {
      const result = await db
        .select()
        .from(articles)
        .where(eq(articles.id, articleId))
        .limit(1);
      article = result[0] ?? null;
    } else {
      const slug = urlNameToSlug(id);
      const allArticles = await db
        .select()
        .from(articles)
        .orderBy(desc(articles.createdAt));
      article = allArticles.find((a) => urlNameToSlug(a.headline) === slug) ?? null;
    }

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    try {
      await redis.set(cacheKey, JSON.stringify(article), { EX: 3600 });
    } catch (err) {
      console.error('Redis SET Error:', err);
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('[GET /api/articles/[id]]', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}