import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobInquiry } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { max } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { firstName, lastName, email, phone, position, location, resume, coverLetter } = await request.json();

    // GENERATE UNIQUE ID
    const [{ maxId }] = await db.select({ maxId: max(jobInquiry.id) }).from(jobInquiry);
    const newId  = (maxId ?? 0) + 1;

    await db.insert(jobInquiry).values({ id: newId, firstName, lastName, email, phone, position, location, resume, coverLetter, appliedAt: new Date() });

    return NextResponse.json({ message: 'Job inquiry submitted successfully' });
    
  } catch (error) {
    console.error('[POST /api/job_inquiry]', error);
    return NextResponse.json({ error: 'Failed to submit job inquiry' }, { status: 500 });
  }
}