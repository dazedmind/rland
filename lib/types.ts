export const developmentStage = {
    pre_selling: 'Pre-selling',
    ongoing_development: 'Ongoing Development',
    completed: 'Completed',
    cancelled: 'Cancelled',
} as const;
export type DevelopmentStage = (typeof developmentStage)[keyof typeof developmentStage];
