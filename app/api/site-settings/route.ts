import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { developerToolsSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { rateLimit, rateLimit429 } from "@/lib/rate-limit";
import { requireApiKey } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
    const authError = requireApiKey(request);
    if (authError) return authError;

    const limitResult = await rateLimit(request, { keyPrefix: "site-settings", maxRequests: 100, windowMs: 60_000 });
    if (!limitResult.success) return rateLimit429(limitResult, 100);
  
    try {     
      const rows = await db.select().from(developerToolsSettings).where(eq(developerToolsSettings.id, 'social-links'));
      if (rows.length === 0) {
        return NextResponse.json({ error: "Social links not found" }, { status: 404 });
      }

      const data = rows[0]?.value as {
        facebook: string;
        instagram: string;
        youtube: string;
        linkedin: string;
        tiktok: string;
      };

      return NextResponse.json({ data });
  } catch (error) {
    console.error("[GET /api/site-settings]", error);
    return NextResponse.json({ error: "Failed to fetch site settings" }, { status: 500 });
  }
}