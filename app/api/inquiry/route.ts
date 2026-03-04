import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { inquiry } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { max } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { firstName, lastName, email, phone, subject, message, source } = await request.json();

    // GENERATE UNIQUE ID
    const [{ maxId }] = await db.select({ maxId: max(inquiry.id) }).from(inquiry);
    const newId  = (maxId ?? 0) + 1;
    const inquiryId = `IN-${newId.toString().padStart(4, '0')}`;

    await db.insert(inquiry).values({ id: newId, inquiryId, firstName, lastName, email, phone, subject, message, source });

    return NextResponse.json({ message: 'Inquiry submitted successfully' });
    
  } catch (error) {
    console.error('[POST /api/inquiry]', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}