import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const projectsList = await db.select().from(projects).$dynamic();
    return NextResponse.json(projectsList);
  } catch (error) {
    console.error('[GET /api/projects]', error);
    return NextResponse.json({ error: 'Failed to fetch projects list' }, { status: 500 });
  }
}