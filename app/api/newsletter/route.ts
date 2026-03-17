import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { newsletter } from '@/db/schema';
import { requireApiKey } from '@/lib/api-auth';
import { eq, max } from 'drizzle-orm';
import { z } from 'zod';
import { rateLimit, rateLimit429 } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const limitResult = await rateLimit(request, { keyPrefix: "newsletter" });
  if (!limitResult.success) return rateLimit429(limitResult, 5);

  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { email } = await request.json();
    // GENERATE UNIQUE ID
    const [{ maxId }] = await db.select({ maxId: max(newsletter.id) }).from(newsletter);
    const newId  = (maxId ?? 0) + 1;

    const validation = z.object({
      email: z.string().email(),
    });

    const validated = validation.safeParse({ email });
    if (!validated.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const existingEmail = await db.select().from(newsletter).where(eq(newsletter.email, validated.data.email));
    if (existingEmail.length === 0) {
      await db.insert(newsletter).values({ id: newId, email: validated.data.email });
      return NextResponse.json({ message: 'Newsletter subscribed successfully' });
    } else {
      return NextResponse.json({ error: 'Email already subscribed to newsletter' }, { status: 400 });
    }
    
  } catch (error) {
    console.error('[POST /api/newsletter]', error);
    return NextResponse.json({ error: 'Failed to subscribe to newsletter' }, { status: 500 });
  }
}