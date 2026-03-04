import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const articlesList = await db.select().from(articles).$dynamic();
    return NextResponse.json(articlesList);
  } catch (error) {
    console.error('[GET /api/articles]', error);
    return NextResponse.json({ error: 'Failed to fetch articles list' }, { status: 500 });
  }
}