export type GalleryCategoryId =
  | "match_day"
  | "training"
  | "squads"
  | "supporters"
  | "events";

export type AdminPhoto = {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategoryId;
  meta: string | null;
  wide: boolean;
  featured: boolean;
  published: boolean;
  // Relative to the API, for example /media/<id>.
  imageUrl: string;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
};
