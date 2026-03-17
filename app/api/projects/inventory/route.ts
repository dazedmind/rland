import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projectInventory } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireApiKey } from '@/lib/api-auth';
import redis from '@/lib/redisClient';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const parsed = limit ? parseInt(limit, 10) : 4;
  const limitVal = Math.min(Math.max(isNaN(parsed) ? 4 : parsed, 1), 100);

  try {
    const cacheKey = `projects:inventory:${limitVal}`;
    
    // 1. Attempt to get from Redis
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json(JSON.parse(cached));
      }
    } catch (redisError) {
      // If Redis fails, we just log it and continue to the DB 
      // This prevents a Redis hiccup from crashing your site
      console.error('Redis GET Error:', redisError);
    }

    // 2. Fetch from Database
    const inventoryList = await db
      .select()
      .from(projectInventory)
      .where(eq(projectInventory.isFeatured, true))
      .limit(limitVal);

    // 3. Attempt to save to Redis (1 hour expiry)
    try {
      await redis.set(cacheKey, JSON.stringify(inventoryList), { EX: 3600 });
    } catch (redisError) {
      console.error('Redis SET Error:', redisError);
    }

    return NextResponse.json(inventoryList);
  } catch (error) {
    console.error('[GET /api/projects/inventory]', error);
    return NextResponse.json({ error: 'Failed to fetch inventory list' }, { status: 500 });
  }
}