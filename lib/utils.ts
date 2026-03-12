import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Convert project name to URL slug: "Arcoe Residences" -> "arcoe-residences" */
export function urlNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}
