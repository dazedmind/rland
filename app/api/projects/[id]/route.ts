import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projectInventory, projects, projectModels } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireApiKey } from '@/lib/api-auth';
import type { ProjectModel, FeaturedInventoryUnit } from '@/app/utils/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    // 1. Fetch project
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    const project = result[0] ?? null;
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // 2. Fetch featured inventory units with their model joined
    const featuredRows = await db
      .select({
        // inventory fields
        inventoryId:   projectInventory.id,
        inventoryCode: projectInventory.inventoryCode,
        block:         projectInventory.block,
        lot:           projectInventory.lot,
        sellingPrice:  projectInventory.sellingPrice,
        // model fields
        modelId:       projectModels.id,
        modelName:     projectModels.modelName,
        projectId:     projectModels.projectId,
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
      .where(
        eq(projectInventory.projectId, id),
      );

    const featuredUnits: FeaturedInventoryUnit[] = featuredRows.map((row) => ({
      id:            row.inventoryId,
      inventoryCode: row.inventoryCode,
      block:         row.block,
      lot:           row.lot,
      sellingPrice:  row.sellingPrice,
      model: {
        id:         row.modelId,
        modelName:  row.modelName,
        projectId:  row.projectId,
        description: row.description ?? "",
        bathroom:   row.bathroom,
        carport:    row.carport,
        livingRoom: row.livingRoom,
        kitchen:    row.kitchen,
        lotArea:    row.lotArea,
        floorArea:  row.floorArea,
        photoUrl:   row.photoUrl,
      },
    }));

    // Derive unique models for House Models section and min/max area
    const modelMap = new Map<string, ProjectModel>();
    for (const row of featuredRows) {
      if (!modelMap.has(row.modelId)) {
        modelMap.set(row.modelId, {
          id:         row.modelId,
          modelName:  row.modelName,
          projectId:  row.projectId,
          details:    {
            description: row.description ?? "",
            bathroom:   row.bathroom,
            carport:    row.carport,
            livingRoom: row.livingRoom,
            kitchen:    row.kitchen,
            lotArea:    row.lotArea,
            floorArea:  row.floorArea,
            photoUrl:   row.photoUrl,
          },
        });
      }
    }
    const models = Array.from(modelMap.values());

    return NextResponse.json({ project, featuredUnits, models });
  } catch (error) {
    console.error('[GET /api/projects/[id]]', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}