import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { careers } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { desc, eq } from 'drizzle-orm';
import { Career, CareerStatus } from '@/lib/types';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10', 10);
  const status = request.nextUrl.searchParams.get('status') || 'hiring';

  try {
    const careersList = await db.select().from(careers).$dynamic().where(eq(careers.status, status as CareerStatus)).orderBy(desc(careers.createdAt)).limit(limit);
    return NextResponse.json(careersList as Career[]);
  } catch (error) {
    console.error('[GET /api/careers]', error);
    return NextResponse.json({ error: 'Failed to fetch careers list' }, { status: 500 });
  }
}