import { NextResponse } from "next/server";
import redis from "./redisClient";

const FORM_MAX_PER_MINUTE = 5;
const FORM_BURST_MAX = 3;
const FORM_BURST_WINDOW_MS = 30_000;
const FORM_WINDOW_MS = 60_000;

export type RateLimitOptions = {
  maxRequests?: number;
  windowMs?: number;
  burstMax?: number;
  burstWindowMs?: number;
  identifier?: string;
  keyPrefix?: string;
};

export type RateLimitResult =
  | { success: true; remaining: number; resetAt: number }
  | { success: false; error: string; retryAfter: number };

function getIdentifier(request: Request, customId?: string): string {
  if (customId) return customId;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip");

  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    if (process.env.NODE_ENV === "development") return "dev-local";
    console.warn("[rate-limit] Could not determine client IP. Skipping rate limit.");
    return "unknown";
  }

  return ip;
}

async function atomicIncrWithTTL(
  key: string,
  windowSec: number
): Promise<{ count: number; ttl: number }> {
  const luaScript = `
    local count = redis.call('INCR', KEYS[1])
    if count == 1 then
      redis.call('EXPIRE', KEYS[1], ARGV[1])
    end
    local ttl = redis.call('TTL', KEYS[1])
    return {count, ttl}
  `;
  const result = await redis.eval(luaScript, {
    keys: [key],
    arguments: [String(windowSec)],
  }) as [number, number];

  return { count: result[0], ttl: result[1] };
}

async function checkRedisRateLimit(
  id: string,
  burstKey: string,
  maxRequests: number,
  windowMs: number,
  burstMax: number,
  burstWindowMs: number
): Promise<RateLimitResult> {
  const now = Date.now();

  const windowSec = Math.ceil(windowMs / 1000);
  const burstWindowSec = Math.ceil(burstWindowMs / 1000);

  const { count: currentCount, ttl: windowTtl } = await atomicIncrWithTTL(id, windowSec);
  const { count: currentBurstCount, ttl: burstTtl } = await atomicIncrWithTTL(burstKey, burstWindowSec);

  if (currentBurstCount > burstMax) {
    return {
      success: false,
      error: "Too many requests. Please wait before submitting again.",
      retryAfter: burstTtl > 0 ? burstTtl : burstWindowSec,
    };
  }

  if (currentCount > maxRequests) {
    return {
      success: false,
      error: "Too many submissions. Please try again later.",
      retryAfter: windowTtl > 0 ? windowTtl : windowSec,
    };
  }

  return {
    success: true,
    remaining: Math.max(0, maxRequests - currentCount),
    resetAt: now + (windowTtl > 0 ? windowTtl : windowSec) * 1000,
  };
}

export function rateLimit429(
  result: { error: string; retryAfter: number },
  maxRequests?: number
) {
  return NextResponse.json(
    { error: result.error },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfter),
        ...(maxRequests != null && { "X-RateLimit-Limit": String(maxRequests) }),
      },
    }
  );
}

export async function rateLimit(
  request: Request,
  options: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const {
    maxRequests = FORM_MAX_PER_MINUTE,
    windowMs = FORM_WINDOW_MS,
    burstMax = FORM_BURST_MAX,
    burstWindowMs = FORM_BURST_WINDOW_MS,
    identifier: customId,
    keyPrefix = "form",
  } = options;

  const id = getIdentifier(request, customId);

  if (id === "unknown") {
    return { success: true, remaining: maxRequests, resetAt: Date.now() + windowMs };
  }

  const baseKey = `ratelimit:${keyPrefix}:${id}`;
  const burstKey = `${baseKey}:burst`;

  return await checkRedisRateLimit(
    baseKey,
    burstKey,
    maxRequests,
    windowMs,
    burstMax,
    burstWindowMs
  );
}