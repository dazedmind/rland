import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/db/schema';
import { eq, or, sql } from 'drizzle-orm';
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

    // Resolve by id (if numeric) or by slug (headline: "Breaking News" -> "breaking-news")
    const result = await db
      .select()
      .from(articles)
      .where(
        isNaN(articleId)
          ? sql`lower(replace(${articles.headline}, ' ', '-')) = ${id}`
          : or(
              eq(articles.id, articleId),
              sql`lower(replace(${articles.headline}, ' ', '-')) = ${id}`
            )
      )
      .limit(1);

    const article = result[0] ?? null;

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
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
