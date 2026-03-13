import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { promos } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { desc } from 'drizzle-orm';
import { Promo } from '@/app/utils/types';

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {

    const promosList = await db.select().from(promos).orderBy(desc(promos.createdAt));
    return NextResponse.json(promosList as unknown as Promo[]);
  } catch (error) {
    console.error('[GET /api/promos]', error);
    return NextResponse.json({ error: 'Failed to fetch promos list' }, { status: 500 });
  }
}