import { NextRequest, NextResponse } from "next/server";

const API_KEY_HEADER = "x-api-key";

/**
 * Validates the RLINK_API_KEY for incoming API requests.
 * Allows access if:
 * 1. RLINK_API_KEY is not set (development - allows all)
 * 2. Request includes valid x-api-key header matching RLINK_API_KEY
 * 3. Request is same-origin (frontend from own site - Origin/Referer matches)
 */
export function requireApiKey(request: NextRequest): NextResponse | null {
  const apiKey = process.env.RLINK_API_KEY;

  // Development: if no key configured, allow all requests
  if (!apiKey) {
    return null;
  }

  const requestKey = request.headers.get(API_KEY_HEADER);

  // Valid API key provided
  if (requestKey && requestKey === apiKey) {
    return null;
  }

  // Same-origin: frontend fetching from own domain
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host") || "";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    (host ? `https://${host}` : "");

  if (siteUrl) {
    const baseUrl = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;
    const isSameOrigin =
      origin === baseUrl ||
      (referer && referer.startsWith(baseUrl)) ||
      (referer && referer.includes(host));
    if (isSameOrigin) {
      return null;
    }
  }

  return NextResponse.json(
    { error: "Unauthorized", message: "Invalid or missing API key" },
    { status: 401, headers: { "WWW-Authenticate": "ApiKey" } }
  );
}
