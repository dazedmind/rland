/**
 * Add this file to your LANDING PAGE project as: app/api/revalidate/route.ts
 *
 * This endpoint allows the RLink admin portal to trigger cache revalidation
 * on the landing page when "Clear Cache" is clicked in Security Tools.
 *
 * Required env on landing page: REVALIDATION_SECRET (must match admin's REVALIDATION_SECRET)
 *
 * Required env on admin portal: SITE_URL, REVALIDATION_SECRET
 */

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.REVALIDATION_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "Revalidation not configured" },
      { status: 503 }
    );
  }

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error("[POST /api/revalidate]", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
