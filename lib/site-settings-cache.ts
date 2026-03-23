const CACHE_KEY = "rland-site-settings";
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

export type SiteSettingsSocialLinks = {
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  tiktokUrl: string;
};

export function getCachedSiteSettings(): SiteSettingsSocialLinks | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw) as {
      data: SiteSettingsSocialLinks;
      timestamp: number;
    };
    if (Date.now() - timestamp > CACHE_MAX_AGE_MS) return null;
    return data;
  } catch {
    return null;
  }
}

export function setCachedSiteSettings(data: SiteSettingsSocialLinks): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // ignore
  }
}
