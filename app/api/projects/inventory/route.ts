import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projectInventory } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireApiKey } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const parsed = limit ? parseInt(limit, 10) : 4;
  const limitVal = Math.min(Math.max(isNaN(parsed) ? 4 : parsed, 1), 100);

  try {
    const inventoryList = await db
      .select()
      .from(projectInventory)
      .where(eq(projectInventory.isFeatured, true))
      .limit(limitVal);

    return NextResponse.json(inventoryList, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" },
    });
  } catch (error) {
    console.error('[GET /api/projects/inventory]', error);
    return NextResponse.json({ error: 'Failed to fetch inventory list' }, { status: 500 });
  }
}
