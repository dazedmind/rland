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

  try {
    const inventoryList = await db.select().from(projectInventory).where(eq(projectInventory.isFeatured, true)).limit(limit ? parseInt(limit) : 4);
    return NextResponse.json(inventoryList);
  } catch (error) {
    console.error('[GET /api/projects/inventory]', error);
    return NextResponse.json({ error: 'Failed to fetch inventory list' }, { status: 500 });
  }
}
