import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  projectInventory,
  projects,
  projectModels,
} from "@/db/schema";
import { and, gte, lte, ilike, inArray, isNull, asc } from "drizzle-orm";
import { requireApiKey } from "@/lib/api-auth";
import redis from '@/lib/redisClient';
import { rateLimit, rateLimit429 } from '@/lib/rate-limit';

/** One card per model; only exposes starting price (no unit counts) */
export type SearchModelItem = {
  project: typeof projects.$inferSelect;
  modelName: string;
  startingPrice: number;
  details: { lotArea: number; floorArea: number; photoUrl: string | null } | null;
};

export async function GET(request: NextRequest) {
  const limitResult = await rateLimit(request, {
    keyPrefix: "search",
    maxRequests: 60,
    burstMax: 10,
  });
  if (!limitResult.success) return rateLimit429(limitResult, 60);

  const authError = requireApiKey(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const location = (searchParams.get("location") ?? "").trim().slice(0, 200);
  const priceRange = searchParams.get("priceRange");
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "5", 10), 1), 50);
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const offset = (page - 1) * limit;

  const cacheKey = `search:${location}-${priceRange}-${limit}-${page}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return NextResponse.json(JSON.parse(cached), {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" },
    });
  } catch (err) {
    console.error('Redis GET Error:', err);
  }

  if (!location) {
    return NextResponse.json(
      { error: "Location is required" },
      { status: 400 }
    );
  }

  const [minPriceStr, maxPriceStr] = (priceRange || "").split(",").map((s) => s.trim());
  const minPrice = minPriceStr ? parseInt(minPriceStr, 10) : 0;
  const maxPrice = maxPriceStr ? parseInt(maxPriceStr, 10) : Number.MAX_SAFE_INTEGER;

  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return NextResponse.json(
      { error: "Invalid price range" },
      { status: 400 }
    );
  }

  try {
    // 1. Find projects matching location (case-insensitive)
    const locationPattern = `%${location}%`;
    const matchingProjects = await db
      .select()
      .from(projects)
      .where(ilike(projects.location, locationPattern));

    if (matchingProjects.length === 0) {
      return NextResponse.json({ items: [], total: 0, page, limit }, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" },
      });
    }

    const projectIds = matchingProjects.map((p) => p.id);

    // 2. Fetch all matching inventory (for grouping - no unit counts exposed)
    const inventoryWhere = and(
      inArray(projectInventory.projectId, projectIds),
      gte(projectInventory.sellingPrice, minPrice),
      lte(projectInventory.sellingPrice, maxPrice),
      isNull(projectInventory.soldTo)
    );

    const matchingInventory = await db
      .select()
      .from(projectInventory)
      .where(inventoryWhere)
      .orderBy(asc(projectInventory.sellingPrice));

    const projectMap = new Map(matchingProjects.map((p) => [p.id, p]));

    // 3. Fetch model details for all modelIds in matching inventory
    const modelIds = [...new Set(matchingInventory.map((i) => i.modelId))];
    const modelsList = await db
      .select()
      .from(projectModels)
      .where(inArray(projectModels.id, modelIds));
    const modelMap = new Map(modelsList.map((m) => [m.id, m]));

    // 4. Group by (projectId, modelId); keep cheapest per model for price
    const groupKey = (p: string, m: string) => `${p}::${m}`;
    const modelGroupMap = new Map<
      string,
      { inv: typeof projectInventory.$inferSelect; project: typeof projects.$inferSelect }
    >();

    for (const inv of matchingInventory) {
      const project = projectMap.get(inv.projectId);
      if (!project) continue;

      const key = groupKey(inv.projectId, inv.modelId);
      const existing = modelGroupMap.get(key);
      if (!existing || inv.sellingPrice < existing.inv.sellingPrice) {
        modelGroupMap.set(key, { inv, project });
      }
    }

    const allItems: SearchModelItem[] = Array.from(modelGroupMap.values()).map(
      ({ inv, project }) => {
        const model = modelMap.get(inv.modelId);
        return {
          project,
          modelName: model?.modelName ?? "Model",
          startingPrice: inv.sellingPrice,
          details: model
            ? { lotArea: model.lotArea, floorArea: model.floorArea, photoUrl: model.photoUrl }
            : null,
        };
      }
    );

    allItems.sort((a, b) => a.startingPrice - b.startingPrice);

    const total = allItems.length;

    if (total === 0) {
      return NextResponse.json({ items: [], total: 0, page, limit }, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" },
      });
    }

    const items = allItems.slice(offset, offset + limit);

    try {
      await redis.set(cacheKey, JSON.stringify({ items, total, page, limit }), { EX: 60 * 60 });
    } catch (err) {
      console.error('Redis SET Error:', err);
    }

    return NextResponse.json({ items, total, page, limit }, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" },
    });
  } catch (error) {
    console.error("[GET /api/search]", error);
    return NextResponse.json(
      { error: "Failed to search units" },
      { status: 500 }
    );
  }
}
