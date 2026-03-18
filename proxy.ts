import { NextRequest, NextResponse } from "next/server";
import { rateLimit, rateLimit429 } from "@/lib/rate-limit";

/**
 * Allowed origins for CORS. Only these domains can make cross-origin requests to API routes.
 * Uses ALLOWED_CORS_ORIGINS env var (comma-separated) or defaults to same-origin only.
 * Never uses Access-Control-Allow-Origin: * — only specific allowed origins.
 */
function getAllowedOrigins(request: NextRequest): string[] {
  const envOrigins = process.env.ALLOWED_CORS_ORIGINS;
  const origins: string[] = [];

  if (envOrigins) {
    origins.push(...envOrigins.split(",").map((o) => o.trim()).filter(Boolean));
  }

  // Always allow same-origin (derived from request)
  const host = request.headers.get("host") ?? "";
  const protocol = request.headers.get("x-forwarded-proto") === "https" ? "https" : "http";
  if (host) {
    const sameOrigin = `${protocol}://${host}`;
    if (!origins.includes(sameOrigin)) {
      origins.push(sameOrigin);
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (siteUrl) {
    const base = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;
    if (!origins.includes(base)) {
      origins.push(base);
    }
  }

  return origins;
}

function isOriginAllowed(origin: string | null, allowed: string[]): boolean {
  if (!origin) return false;
  return allowed.some(
    (a) => a === origin || origin === a.replace(/\/$/, "")
  );
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isApiRoute = pathname.startsWith("/api");

  // Rate limiting for API routes (100 req/min per IP; form endpoints have stricter limits)
  if (isApiRoute) {
    try {
      const limitResult = await rateLimit(request, {
        keyPrefix: "api_global",
        maxRequests: 100,
        windowMs: 60_000,
        burstMax: 30,
        burstWindowMs: 10_000,
      });
      if (!limitResult.success) {
        return rateLimit429(limitResult, 100);
      }
    } catch (err) {
      console.error("[proxy] Rate limit check failed:", err);
      // Allow request through if Redis is unavailable
    }
  }

  const origin = request.headers.get("origin");
  const allowedOrigins = getAllowedOrigins(request);
  const corsAllowed = isOriginAllowed(origin, allowedOrigins);

  // Handle CORS preflight
  if (request.method === "OPTIONS" && isApiRoute) {
    const res = new NextResponse(null, { status: 204 });
    if (corsAllowed && origin) {
      res.headers.set("Access-Control-Allow-Origin", origin);
      res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
      res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key");
      res.headers.set("Access-Control-Max-Age", "86400");
    }
    return res;
  }

  const response = NextResponse.next();

  // Restrictive CORS: only set Allow-Origin for allowed origins (never *)
  if (isApiRoute && corsAllowed && origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
  }

  return response;
}

export default proxy;

export const config = {
  matcher: ["/api/:path*"], // Only API routes need rate limiting
};