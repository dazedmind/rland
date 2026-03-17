import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { asc } from 'drizzle-orm';
import { Project } from '@/app/utils/types';
import redis from '@/lib/redisClient';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const cacheKey = `projects`;
    try {
      const cached = await redis.get(cacheKey);
      if (cached) return NextResponse.json(JSON.parse(cached));
    } catch (err) {
      console.error('Redis GET Error:', err);
    }

    const projectsList = await db.select().from(projects).orderBy(asc(projects.id));
    
    try {
      await redis.set(cacheKey, JSON.stringify(projectsList), { EX: 60 * 60 });
    } catch (err) {
      console.error('Redis SET Error:', err);
    }

    return NextResponse.json(projectsList as unknown as Project[]);
  } catch (error) {
    console.error('[GET /api/projects]', error);
    return NextResponse.json({ error: 'Failed to fetch projects list' }, { status: 500 });
  }
}