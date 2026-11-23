import type { GalleryCategoryId } from "./gallery-types";

export const adminGalleryCategories: { id: GalleryCategoryId; label: string }[] = [
  { id: "match_day", label: "Match day" },
  { id: "training", label: "Training & drills" },
  { id: "squads", label: "Squads & teams" },
  { id: "supporters", label: "Supporters & community" },
  { id: "events", label: "Events & ceremonies" },
];

export function galleryCategoryLabel(id: GalleryCategoryId): string {
  return adminGalleryCategories.find((item) => item.id === id)?.label ?? id;
}
