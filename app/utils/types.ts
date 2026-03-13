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

/** Landmarks can be array of groups OR object { [category]: string[] } */
export type ProjectLandmarks =
  | LandmarkGroup[]
  | Record<string, string[]>;

/** Project base info */
export type ProjectBase = {
  id: string;
  projectCode: string;
  projectName: string;
  location: string | null;
  photoUrl: string | null;
  logoUrl: string | null;
  mapLink: string | null;
  type: string;
  description?: string | null;
  amenities: { photoUrl: string; name: string }[];
  landmarks?: ProjectLandmarks;
  accentColor?: string | null;
  address?: string | null;
  salesOffice?: string | null;
  dhsudNumber?: string | null;
  completionDate?: string | null;
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
  /** Gallery images from project_gallery (modelId null = project-level, else model-specific) */
  gallery?: { imageUrl: string; modelId: string | null }[];
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

export const developmentStage = {
  pre_selling: 'Pre-selling',
  ongoing_development: 'Ongoing Development',
  completed: 'Completed',
  cancelled: 'Cancelled',
  coming_soon: 'Coming Soon',
} as const;
export type DevelopmentStage = (typeof developmentStage)[keyof typeof developmentStage];

export const careerStatus = {
  hiring: 'hiring',
  closed: 'closed',
  archived: 'archived',
} as const;
export type CareerStatus = (typeof careerStatus)[keyof typeof careerStatus];

export const projectStatus = {
  active: 'active',
  inactive: 'inactive',
  archived: 'archived',
} as const;
export type ProjectStatus = (typeof projectStatus)[keyof typeof projectStatus];

export const projectType = {
  residential: 'residential',
  commercial: 'commercial',
  industrial: 'industrial',
} as const;
export type ProjectType = (typeof projectType)[keyof typeof projectType];

export type Career = {
  id: number;
  position: string;
  location: Location;
  department: string;
  jobDescription: string;
  responsibilities: string;
  qualifications: string;
  requiredSkills: string;
  status: CareerStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const location = {
  'Quezon City (Head Office)': 'Quezon City (Head Office)',
  'Lipa, Batangas': 'Lipa, Batangas',
  'Angeles, Pampanga': 'Angeles, Pampanga',
} as const;
export type Location = (typeof location)[keyof typeof location];

export const department = {
  marketing: 'Sales & Marketing',
  executive: 'Executive',
  engineering: 'Engineering ',
  design: 'Design & Architecture',
  hr: 'Human Resources',
  finance: 'Finance',
  it: 'Information Technology',
  legal: 'Legal',
  operations: 'Operations',
  customer_service: 'Customer Service',
  product: 'Product Management',
}

export type Department = (typeof department)[keyof typeof department];


export type Project = {
  id: string;
  projectCode: string;
  projectName: string;
  status: ProjectStatus;
  location: string;
  stage: DevelopmentStage;
  type: ProjectType;
  photoUrl?: string;
  logoUrl?: string;
  mapLink?: string;
  accentColor?: string;
  landmarks: LandmarkGroup[];
  amenities: { photoUrl: string; name: string }[];
  description?: string;
  address?: string;
  salesOffice?: string;
  dhsudNumber?: string;
  completionDate?: Date;
}

export type Promo = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  status: string;
  startDate: Date;
  endDate: Date;
}

export type LandmarkGroup = {
  category: string;
  items?: string[];
  landmarks?: string[];
}

export type ArticleType = 'news' | 'blog' | 'announcement' | 'event';