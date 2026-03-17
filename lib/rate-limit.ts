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
  return (
    customId ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous"
  );
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

  // 1. Increment the counts
  const currentCount = await redis.incr(id);
  const currentBurstCount = await redis.incr(burstKey);

  // 2. Ensure TTL is set (Self-healing logic)
  // If this is a new key or somehow lost its TTL, set it now.
  const ttl = await redis.ttl(id);
  if (ttl < 0) {
    await redis.expire(id, Math.ceil(windowMs / 1000));
  }

  const bTtl = await redis.ttl(burstKey);
  if (bTtl < 0) {
    await redis.expire(burstKey, Math.ceil(burstWindowMs / 1000));
  }

  // 3. Check Burst Limit
  if (currentBurstCount > burstMax) {
    const retry = bTtl > 0 ? bTtl : Math.ceil(burstWindowMs / 1000);
    return {
      success: false,
      error: "Too many requests. Please wait before submitting again.",
      retryAfter: retry,
    };
  }

  // 4. Check Sustained Limit
  if (currentCount > maxRequests) {
    const retry = ttl > 0 ? ttl : Math.ceil(windowMs / 1000);
    return {
      success: false,
      error: "Too many submissions. Please try again later.",
      retryAfter: retry,
    };
  }

  return {
    success: true,
    remaining: Math.max(0, maxRequests - currentCount),
    resetAt: now + (ttl > 0 ? ttl : Math.ceil(windowMs / 1000)) * 1000,
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