import { apiMedia } from "./media";

export type GalleryCategoryId =
  | "match-day"
  | "training"
  | "squads"
  | "supporters"
  | "events";

// What the public gallery shows for each photo.
export type PublicPhoto = {
  id: string;
  category: GalleryCategoryId;
  title: string;
  caption: string;
  meta?: string;
  wide?: boolean;
  featured?: boolean;
  // A full address (API photos) or a path under /public (sample photos).
  photo?: string;
};

export const publicGalleryCategories: {
  id: GalleryCategoryId;
  label: string;
  badgeClass: string;
}[] = [
  { id: "match-day", label: "Match day", badgeClass: "bg-brand-orange text-ink" },
  { id: "training", label: "Training & drills", badgeClass: "bg-gold-deep text-white" },
  { id: "squads", label: "Squads & teams", badgeClass: "bg-brand-blue text-white" },
  { id: "supporters", label: "Supporters & community", badgeClass: "bg-brand-orange text-ink" },
  { id: "events", label: "Events & ceremonies", badgeClass: "bg-navy text-white" },
];

export type ApiPhoto = {
  id: string;
  title: string;
  caption: string;
  category: "match_day" | "training" | "squads" | "supporters" | "events";
  meta: string | null;
  wide: boolean;
  featured: boolean;
  imageUrl: string;
  createdAt: string;
};

export function toPublicPhoto(row: ApiPhoto): PublicPhoto {
  return {
    id: row.id,
    category: row.category.replace("_", "-") as GalleryCategoryId,
    title: row.title,
    caption: row.caption,
    meta: row.meta ?? undefined,
    wide: row.wide,
    featured: row.featured,
    photo: apiMedia(row.imageUrl),
  };
}

// "Nov 20, 2026", always in Uganda time so the server and browser agree.
export function formatPhotoDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Kampala",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}
