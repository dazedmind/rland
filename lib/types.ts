export const developmentStage = {
    pre_selling: 'Pre-selling',
    ongoing_development: 'Ongoing Development',
    completed: 'Completed',
    cancelled: 'Cancelled',
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
    location: string;
    jobDescription: string;
    purpose: string;
    responsibilities: string;
    qualifications: string;
    requiredSkills: string;
    status: CareerStatus;
    createdAt: Date;
    updatedAt: Date;
}

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
    amenities: string[];
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