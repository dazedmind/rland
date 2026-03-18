import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireApiKey } from '@/lib/api-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { id } = await params;

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
      const result = await db
        .select()
        .from(articles)
        .where(eq(articles.slug, id))
        .limit(1);
      article = result[0] ?? null;
    }

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" },
    });
  } catch (error) {
    console.error('[GET /api/articles/[id]]', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
