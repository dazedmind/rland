/**
 * Reusable project-related types
 */

/** Model details (lot, floor, rooms, etc.) */
export type ProjectModelDetails = {
  bathroom: number;
  carport: number;
  livingRoom: number;
  kitchen: number;
  lotArea: number;
  floorArea: number;
  description: string;
  photoUrl: string | null;
};

/** Project model with specs - used for House Models section */
export type ProjectModel = {
  id: string;
  modelName: string;
  projectId: string;
  projectCode?: string;
  details: ProjectModelDetails | null;
};

/** Landmark category group (JSON format from DB) */
export type LandmarkGroup = {
  category: string;
  items?: string[];
  landmarks?: string[];
};

/** Project base info */
export type ProjectBase = {
  id: string;
  projectCode: string;
  projectName: string;
  location: string | null;
  photoUrl: string | null;
  type: string;
  description?: string | null;
  amenities: string[];
  landmarks?: LandmarkGroup[];
  accentColor?: string | null;
};

export type ProjectInventory = {
  id: string;
  inventoryCode: string;
  block: number;
  lot: number;
  soldTo: number | null;
  sellingPrice: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  modelId: string;
};

/** Full project with models - for project details page */
export type ProjectDetails = {
  project: ProjectBase;
  models: ProjectModel[];
  /** Inventory or featured units (used for price range) */
  inventory: (ProjectInventory | FeaturedInventoryUnit)[];
};

/** Inventory unit with model - for featured/search listings */
export type FeaturedInventoryUnit = {
  id: string;
  inventoryCode: string;
  block: number;
  lot: number;
  sellingPrice: number;
  model: ProjectModelDetails & { id: string; modelName: string; projectId: string };
};

/** Project with featured units - API response */
export type ProjectWithFeatured = {
  project: ProjectBase;
  featuredUnits: FeaturedInventoryUnit[];
};

/**
 * Get min/max lot and floor area from an array of models
 */
export function getMinMaxArea(models: { details: { lotArea: number; floorArea: number } | null }[]): {
  minLot: number;
  maxLot: number;
  minFloor: number;
  maxFloor: number;
} {
  const lotAreas = models
    .map((m) => m.details?.lotArea)
    .filter((v): v is number => typeof v === "number");
  const floorAreas = models
    .map((m) => m.details?.floorArea)
    .filter((v): v is number => typeof v === "number");

  return {
    minLot: lotAreas.length > 0 ? Math.min(...lotAreas) : 0,
    maxLot: lotAreas.length > 0 ? Math.max(...lotAreas) : 0,
    minFloor: floorAreas.length > 0 ? Math.min(...floorAreas) : 0,
    maxFloor: floorAreas.length > 0 ? Math.max(...floorAreas) : 0,
  };
}

export function getPriceRange(
  inventory: Array<{ sellingPrice: number }>,
): {
  minPrice: number;
  maxPrice: number;
} {
  const prices = inventory
    .map((i) => i.sellingPrice)
    .filter((v): v is number => typeof v === "number");
  return {
    minPrice: prices.length > 0 ? Math.min(...prices) : 0,
    maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
  };
}
