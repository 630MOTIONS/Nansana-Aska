import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { publicGet, USE_SAMPLE_CONTENT } from "./api";
import { apiMedia } from "./media";

export type SiteImage = { src: string; alt: string };
export type SiteImageKey = "about_hero" | "about_milestone" | "contact_hero";
export type SiteImages = Partial<Record<SiteImageKey, SiteImage>>;

type ApiSiteImage = { key: SiteImageKey; imageUrl: string; alt: string };

// The admin clears the "site-images" tag whenever a page image changes. The
// lifetime below is only the backstop. Places without a photo are left out, and
// the website shows its blue placeholder there.
export async function getSiteImages(): Promise<SiteImages> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 600, expire: 3600 });
  cacheTag("site-images");

  if (USE_SAMPLE_CONTENT) return {};

  const rows = (await publicGet<ApiSiteImage[]>("/site-images")) ?? [];
  const images: SiteImages = {};
  for (const row of rows) {
    const src = apiMedia(row.imageUrl);
    if (src) images[row.key] = { src, alt: row.alt };
  }
  return images;
}
