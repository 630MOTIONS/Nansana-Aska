import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { galleryItems as sampleItems } from "@/lib/gallery";
import { publicGet, USE_SAMPLE_CONTENT } from "./api";
import { formatPhotoDate, toPublicPhoto } from "./gallery-meta";
import type { ApiPhoto, PublicPhoto } from "./gallery-meta";

export type PublicGallery = {
  items: PublicPhoto[]; // newest first
  featured: PublicPhoto | null;
  latest: string | null; // date of the newest upload
};

// The admin clears the "gallery" tag whenever a photo is added, edited, hidden
// or deleted, so changes show up straight away. The lifetime below is only the
// backstop.
export async function getGallery(): Promise<PublicGallery> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 600, expire: 3600 });
  cacheTag("gallery");

  if (USE_SAMPLE_CONTENT) {
    const items: PublicPhoto[] = sampleItems.map((item) => ({
      id: item.id,
      category: item.category,
      title: item.title,
      caption: item.caption,
      meta: item.meta,
      wide: item.wide,
      photo: item.photo,
    }));
    return { items, featured: items[0] ?? null, latest: null };
  }

  const rows = (await publicGet<ApiPhoto[]>("/gallery?limit=500")) ?? [];
  const items = rows.map(toPublicPhoto);
  return {
    items,
    featured: items.find((item) => item.featured) ?? items[0] ?? null,
    latest: rows[0] ? formatPhotoDate(rows[0].createdAt) : null,
  };
}
