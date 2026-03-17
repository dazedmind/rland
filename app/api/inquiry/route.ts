import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { inquiry } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { max } from 'drizzle-orm';
import { rateLimit, rateLimit429 } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limitResult = await rateLimit(request, { keyPrefix: "inquiry" });
  if (!limitResult.success) return rateLimit429(limitResult, 5);

  const authError = requireApiKey(request);
  if (authError) return authError;
  
  try {
    const { firstName, lastName, email, phone, subject, message, source } = await request.json();

    const requiredFields = [
      { value: firstName, label: "First Name" },
      { value: lastName, label: "Last Name" },
      { value: email, label: "Email" },
      { value: phone, label: "Phone" },
      { value: subject, label: "Subject" },
      { value: source, label: "Source" },
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