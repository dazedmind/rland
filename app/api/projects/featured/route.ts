import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projectInventory, projects, projectModels } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { requireApiKey } from '@/lib/api-auth';

export type ProjectModelWithDetails = {
  id: string;
  modelName: string;
  projectId: string;
  bathroom: number;
  carport: number;
  livingRoom: number;
  kitchen: number;
  lotArea: number;
  floorArea: number;
  photoUrl: string | null;
};

export type FeaturedInventoryUnit = {
  id: string;
  inventoryCode: string;
  block: number;
  lot: number;
  sellingPrice: number;
  model: ProjectModelWithDetails;
};

export type ProjectWithFeatured = {
  project: typeof projects.$inferSelect;
  featuredUnits: FeaturedInventoryUnit[];
};

export async function GET(request: NextRequest) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    // 1. Fetch all featured inventory with model joined
    const featuredRows = await db
      .select({
        inventoryId:   projectInventory.id,
        inventoryCode: projectInventory.inventoryCode,
        block:         projectInventory.block,
        lot:           projectInventory.lot,
        sellingPrice:  projectInventory.sellingPrice,
        projectId:     projectInventory.projectId,
        modelId:       projectModels.id,
        modelName:     projectModels.modelName,
        description:   projectModels.description,
        bathroom:      projectModels.bathroom,
        carport:       projectModels.carport,
        livingRoom:    projectModels.livingRoom,
        kitchen:       projectModels.kitchen,
        lotArea:       projectModels.lotArea,
        floorArea:     projectModels.floorArea,
        photoUrl:      projectModels.photoUrl,
      })
      .from(projectInventory)
      .innerJoin(projectModels, eq(projectInventory.modelId, projectModels.id))
      .where(eq(projectInventory.isFeatured, true))
      .limit(4);

    if (featuredRows.length === 0) {
      return NextResponse.json([]);
    }

    const projectIds = [...new Set(featuredRows.map((r) => r.projectId))];
    const projectsList = await db
      .select()
      .from(projects)
      .where(inArray(projects.id, projectIds));
    const projectMap = new Map(projectsList.map((p) => [p.id, p]));

    // 2. Group by project
    const byProject = new Map<string, FeaturedInventoryUnit[]>();
    for (const row of featuredRows) {
      const project = projectMap.get(row.projectId);
      if (!project) continue;

      const unit: FeaturedInventoryUnit = {
        id:            row.inventoryId,
        inventoryCode: row.inventoryCode,
        block:         row.block,
        lot:           row.lot,
        sellingPrice:  row.sellingPrice,
        model: {
          id:         row.modelId,
          modelName:  row.modelName,
          projectId:  row.projectId,
          bathroom:   row.bathroom,
          carport:    row.carport,
          livingRoom: row.livingRoom,
          kitchen:    row.kitchen,
          lotArea:    row.lotArea,
          floorArea:  row.floorArea,
          photoUrl:   row.photoUrl,
        },
      };

      const list = byProject.get(row.projectId) ?? [];
      list.push(unit);
      byProject.set(row.projectId, list);
    }

    const result: ProjectWithFeatured[] = Array.from(byProject.entries())
      .filter(([pid]) => projectMap.has(pid))
      .map(([projectId, featuredUnits]) => ({
        project: projectMap.get(projectId)!,
        featuredUnits,
      }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('[GET /api/projects/featured]', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured projects' },
      { status: 500 }
    );
  }
}