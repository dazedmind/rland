import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { careers } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10', 10);
    
  try {
    const careersList = await db.select().from(careers).$dynamic().orderBy(desc(careers.createdAt)).limit(limit);
    return NextResponse.json(careersList);
  } catch (error) {
    console.error('[GET /api/careers]', error);
    return NextResponse.json({ error: 'Failed to fetch careers list' }, { status: 500 });
  }
}