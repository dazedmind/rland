import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Convert name to URL slug: "Senior Engineer (IT)" -> "senior-engineer-it" */
export function urlNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars except spaces and hyphens
    .replace(/\s+/g, "-")         // spaces to hyphens
    .replace(/-+/g, "-")          // collapse multiple hyphens
    .replace(/^-|-$/g, "");       // trim leading/trailing hyphens
}
