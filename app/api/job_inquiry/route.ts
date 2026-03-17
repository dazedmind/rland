import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobInquiry } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { max } from 'drizzle-orm';
import { rateLimit, rateLimit429 } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const limitResult = await rateLimit(request, { keyPrefix: "job_inquiry" });
  if (!limitResult.success) return rateLimit429(limitResult, 5);

  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { firstName, lastName, email, phone, position, resume, coverLetter } = await request.json();

    const requiredFields = [
      { value: firstName, label: "First Name" },
      { value: lastName, label: "Last Name" },
      { value: email, label: "Email" },
      { value: phone, label: "Phone" },
      { value: position, label: "Position" },
    ];

    const missingField = requiredFields.find(field => !field.value || field.value.trim() === "");
    if (missingField) {
      return NextResponse.json({ error: `${missingField.label} is required` }, { status: 400 });
    }

    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
      return /^(09|\+639)\d{9}$/.test(phone);
    };

    const validateName = (name: string) => {
      return /^[a-zA-Z\s]+$/.test(name);
    };

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (!validatePhone(phone)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    if (!validateName(firstName)) {
      return NextResponse.json({ error: 'Invalid first name' }, { status: 400 });
    }

    if (!validateName(lastName)) {
      return NextResponse.json({ error: 'Invalid last name' }, { status: 400 });
    }

    if (!validateName(position)) {
      return NextResponse.json({ error: 'Invalid position' }, { status: 400 });
    }

    // GENERATE UNIQUE ID
    const [{ maxId }] = await db.select({ maxId: max(jobInquiry.id) }).from(jobInquiry);
    const newId  = (maxId ?? 0) + 1;

    await db.insert(jobInquiry).values({ id: newId, firstName, lastName, email, phone, position, resume, coverLetter, appliedAt: new Date() });

    return NextResponse.json({ message: 'Job inquiry submitted successfully' });
    
  } catch (error) {
    console.error('[POST /api/job_inquiry]', error);
    return NextResponse.json({ error: 'Failed to submit job inquiry' }, { status: 500 });
  }
}