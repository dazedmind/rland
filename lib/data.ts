import { db } from '@/lib/db';
import { articles, careers } from '@/db/schema';
import { projectInventory, projects, projectModels, projectGallery } from '@/db/schema';
import { and, asc, eq, or } from 'drizzle-orm';
import redis from '@/lib/redisClient';
import type { ProjectModel, FeaturedInventoryUnit } from '@/app/utils/types';

export type Career = {
  id: number;
  position: string;
  location: string;
  jobDescription: string;
  responsibilities: string;
  qualifications: string;
  requiredSkills: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type Article = {
  id: number;
  headline: string;
  body: string;
  publishDate: string;
  tags: string[];
  type: string;
  photoUrl: string | null;
};

export type ProjectDetailData = {
  project: typeof projects.$inferSelect;
  featuredUnits: FeaturedInventoryUnit[];
  models: ProjectModel[];
  gallery: { imageUrl: string; modelId: string | null }[];
};

export async function getCareer(id: string): Promise<Career | null> {
  const cacheKey = `career:${id}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached) as Career;
  } catch (err) {
    console.error('Redis GET Error:', err);
  }

  const careerId = parseInt(id, 10);
  const isNumericId = !isNaN(careerId);
  let career;

  if (isNumericId) {
    const result = await db
      .select()
      .from(careers)
      .where(and(eq(careers.id, careerId), eq(careers.status, 'hiring')))
      .limit(1);
    career = result[0] ?? null;
  } else {
    const result = await db
      .select()
      .from(careers)
      .where(and(eq(careers.slug, id), eq(careers.status, 'hiring')))
      .limit(1);
    career = result[0] ?? null;
  }

  if (!career) return null;

  try {
    await redis.set(cacheKey, JSON.stringify(career), { EX: 60 * 60 });
  } catch (err) {
    console.error('Redis SET Error:', err);
  }

  return career as unknown as Career;
}

export async function getArticle(id: string): Promise<Article | null> {
  const cacheKey = `article:${id}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached) as Article;
  } catch (err) {
    console.error('Redis GET Error:', err);
  }

  const articleId = parseInt(id, 10);
  const isNumericId = !isNaN(articleId);
  let article;

  if (isNumericId) {
    const result = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId))
      .limit(1);
    article = result[0] ?? null;
  } else {
    const result = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, id))
      .limit(1);
    article = result[0] ?? null;
  }

  if (!article) return null;

  try {
    await redis.set(cacheKey, JSON.stringify(article), { EX: 3600 });
  } catch (err) {
    console.error('Redis SET Error:', err);
  }

  return article as unknown as Article;
}

export async function getProjectDetails(id: string): Promise<ProjectDetailData | null> {
  const cacheKey = `project:detail:${id}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached) as ProjectDetailData;
  } catch (err) {
    console.error('Redis GET Error:', err);
  }

  const result = await db
    .select()
    .from(projects)
    .where(or(eq(projects.id, id), eq(projects.slug, id)))
    .limit(1);

  const project = result[0] ?? null;
  if (!project) return null;

  const projectId = project.id;

  const [galleryRows, featuredRows] = await Promise.all([
    db
      .select({
        imageUrl: projectGallery.imageUrl,
        modelId: projectGallery.modelId,
        sortOrder: projectGallery.sortOrder,
      })
      .from(projectGallery)
      .where(eq(projectGallery.projectId, projectId))
      .orderBy(asc(projectGallery.sortOrder)),
    db
      .select({
        inventoryId: projectInventory.id,
        inventoryCode: projectInventory.inventoryCode,
        block: projectInventory.block,
        lot: projectInventory.lot,
        sellingPrice: projectInventory.sellingPrice,
        modelId: projectModels.id,
        modelName: projectModels.modelName,
        projectId: projectModels.projectId,
        description: projectModels.description,
        bathroom: projectModels.bathroom,
        carport: projectModels.carport,
        livingRoom: projectModels.livingRoom,
        kitchen: projectModels.kitchen,
        lotArea: projectModels.lotArea,
        floorArea: projectModels.floorArea,
        photoUrl: projectModels.photoUrl,
      })
      .from(projectInventory)
      .innerJoin(projectModels, eq(projectInventory.modelId, projectModels.id))
      .where(eq(projectInventory.projectId, projectId)),
  ]);

  const gallery = galleryRows.map((r) => ({
    imageUrl: r.imageUrl,
    modelId: r.modelId ?? null,
  }));

  const featuredUnits: FeaturedInventoryUnit[] = featuredRows.map((row) => ({
    id: row.inventoryId,
    inventoryCode: row.inventoryCode,
    block: row.block,
    lot: row.lot,
    sellingPrice: row.sellingPrice,
    model: {
      id: row.modelId,
      modelName: row.modelName,
      projectId: row.projectId,
      description: row.description ?? '',
      bathroom: row.bathroom,
      carport: row.carport,
      livingRoom: row.livingRoom,
      kitchen: row.kitchen,
      lotArea: row.lotArea,
      floorArea: row.floorArea,
      photoUrl: row.photoUrl,
    },
  }));

  const modelMap = new Map<string, ProjectModel>();
  for (const row of featuredRows) {
    if (!modelMap.has(row.modelId)) {
      modelMap.set(row.modelId, {
        id: row.modelId,
        modelName: row.modelName,
        projectId: row.projectId,
        details: {
          description: row.description ?? '',
          bathroom: row.bathroom,
          carport: row.carport,
          livingRoom: row.livingRoom,
          kitchen: row.kitchen,
          lotArea: row.lotArea,
          floorArea: row.floorArea,
          photoUrl: row.photoUrl,
        },
      });
    }
  }
  const models = Array.from(modelMap.values());

  const finalData: ProjectDetailData = { project, featuredUnits, models, gallery };

  try {
    await redis.set(cacheKey, JSON.stringify(finalData), { EX: 3600 });
  } catch (err) {
    console.error('Redis SET Error:', err);
  }

  return finalData;
}
