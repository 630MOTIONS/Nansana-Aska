import { apiMedia } from "./media";

export type VideoCategoryId =
  | "match"
  | "goals"
  | "recaps"
  | "training"
  | "behind"
  | "interviews";

export const publicVideoCategories: {
  id: VideoCategoryId;
  label: string;
  badgeClass: string;
}[] = [
  { id: "match", label: "Match highlights", badgeClass: "bg-brand-orange text-ink" },
  { id: "goals", label: "Goals & saves", badgeClass: "bg-brand-gold text-ink" },
  { id: "recaps", label: "Match recaps", badgeClass: "bg-navy text-white" },
  { id: "training", label: "Training & drills", badgeClass: "bg-brand-blue text-white" },
  { id: "behind", label: "Behind the scenes", badgeClass: "bg-navy text-white" },
  { id: "interviews", label: "Interviews", badgeClass: "bg-brand-blue text-white" },
];

// What the public Highlights page shows for each video.
export type PublicVideo = {
  id: string;
  category: VideoCategoryId;
  title: string;
  description: string;
  badge?: string;
  kicker?: string;
  date: string;
  duration?: string;
  spotlight?: boolean;
  featured?: boolean;
  // Where to watch. Missing means "video coming soon".
  url?: string;
  // Set for YouTube videos: they play in a pop-up on the page.
  embedUrl?: string;
  poster?: string;
  match?: {
    slug: string;
    stage: string;
    competition: string;
    homeName: string;
    awayName: string;
    homeScore: number | null;
    awayScore: number | null;
  };
};

export type ApiHighlight = {
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
  thumbnailUrl: string | null;
  match: PublicVideo["match"] | null;
};

// "Nov 22, 2026", always in Uganda time so the server and browser agree.
export function formatVideoDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Kampala",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function toPublicVideo(row: ApiHighlight): PublicVideo {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    description: row.description,
    badge: row.badge ?? undefined,
    kicker: row.kicker ?? undefined,
    date: formatVideoDate(row.date),
    duration: row.duration ?? undefined,
    spotlight: row.spotlight,
    featured: row.featured,
    url: row.videoUrl,
    embedUrl: row.youtubeId
      ? `https://www.youtube-nocookie.com/embed/${row.youtubeId}?autoplay=1&rel=0&playsinline=1`
      : undefined,
    poster: apiMedia(row.thumbnailUrl),
    match: row.match ?? undefined,
  };
}
