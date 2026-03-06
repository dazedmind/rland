import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { promos } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { desc, eq } from 'drizzle-orm';
import { Promo } from '@/lib/types';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const promoId = parseInt(id, 10);

    if (isNaN(promoId)) {
      return NextResponse.json({ error: 'Invalid promo ID' }, { status: 400 });
    }

    const promoDetail = await db.select().from(promos).where(eq(promos.id, promoId)).limit(1);
    const promo = promoDetail[0] ?? null;
    if (!promo) {
      return NextResponse.json({ error: 'Promo not found' }, { status: 404 });
    }
    return NextResponse.json(promo);
  } catch (error) {
    console.error('[GET /api/promos]', error);
    return NextResponse.json({ error: 'Failed to fetch promos list' }, { status: 500 });
  }
}