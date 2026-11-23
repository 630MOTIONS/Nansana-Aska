export type VideoCategoryId =
  | "match"
  | "goals"
  | "recaps"
  | "training"
  | "behind"
  | "interviews";

export type AdminHighlight = {
  id: string;
  title: string;
  description: string;
  category: VideoCategoryId;
  videoUrl: string;
  youtubeId: string | null;
  kicker: string | null;
  badge: string | null;
  duration: string | null;
  date: string;
  spotlight: boolean;
  featured: boolean;
  matchSlug: string | null;
  published: boolean;
  // Relative to the API, for example /media/<id>.
  thumbnailUrl: string | null;
  thumbnailAuto: boolean;
  updatedAt: string;
};
