import { NextRequest, NextResponse } from "next/server";

/**
 * Allowed origins for CORS. Only these domains can make cross-origin requests to API routes.
 * Uses ALLOWED_CORS_ORIGINS env var (comma-separated) or defaults to same-origin only.
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

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigins = getAllowedOrigins(request);
  const corsAllowed = isOriginAllowed(origin, allowedOrigins);

  // Handle CORS preflight
  if (request.method === "OPTIONS" && request.nextUrl.pathname.startsWith("/api")) {
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

  // Restrictive CORS: only set Allow-Origin when request is from allowed origin
  if (request.nextUrl.pathname.startsWith("/api") && corsAllowed && origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
