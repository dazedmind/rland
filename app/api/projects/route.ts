import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { asc } from 'drizzle-orm';
import { Project } from '@/lib/types';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {

    const projectsList = await db.select().from(projects).orderBy(asc(projects.id));
    return NextResponse.json(projectsList as unknown as Project[]);
  } catch (error) {
    console.error('[GET /api/projects]', error);
    return NextResponse.json({ error: 'Failed to fetch projects list' }, { status: 500 });
  }
}