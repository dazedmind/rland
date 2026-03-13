import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { careers } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { and, desc, eq, ne, sql } from 'drizzle-orm';
import type { Career, CareerStatus } from '@/app/utils/types';

const DEPARTMENT_VALUES = ['marketing', 'executive', 'engineering', 'design', 'hr', 'finance', 'it', 'legal', 'operations', 'customer_service', 'product'] as const;

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '8', 10), 50);
  const page = Math.max(parseInt(request.nextUrl.searchParams.get('page') || '1', 10), 1);
  const status = request.nextUrl.searchParams.get('status') || 'hiring';
  const departmentFilter = request.nextUrl.searchParams.get('department') || '';
  const locationFilter = request.nextUrl.searchParams.get('location') || '';
  const excludeId = request.nextUrl.searchParams.get('excludeId');

  const offset = (page - 1) * limit;

  try {
    const conditions = [eq(careers.status, status as CareerStatus)];
    if (departmentFilter && DEPARTMENT_VALUES.includes(departmentFilter as typeof DEPARTMENT_VALUES[number])) {
      conditions.push(eq(careers.department, departmentFilter as typeof DEPARTMENT_VALUES[number]));
    }
    if (locationFilter) conditions.push(eq(careers.location, locationFilter));
    if (excludeId) {
      const id = parseInt(excludeId, 10);
      if (!isNaN(id)) conditions.push(ne(careers.id, id));
    }
    const whereClause = and(...conditions);

    const [countResult, careersList] = await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(careers).where(whereClause),
      db
        .select()
        .from(careers)
        .where(whereClause)
        .orderBy(desc(careers.createdAt))
        .limit(limit)
        .offset(offset),
    ]);

    const total = countResult[0]?.count ?? 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: careersList as Career[],
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error('[GET /api/careers]', error);
    return NextResponse.json({ error: 'Failed to fetch careers list' }, { status: 500 });
  }
}