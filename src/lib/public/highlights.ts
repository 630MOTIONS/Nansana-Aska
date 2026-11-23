import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { videos as sampleVideos } from "@/lib/highlights";
import { publicGet, USE_SAMPLE_CONTENT } from "./api";
import { toPublicVideo } from "./highlights-meta";
import type { ApiHighlight, PublicVideo } from "./highlights-meta";

export type PublicHighlights = {
  videos: PublicVideo[]; // newest first
  spotlight: PublicVideo | null;
  featured: PublicVideo | null;
  goals: PublicVideo[];
  recaps: PublicVideo[];
};

function sample(): PublicVideo[] {
  return sampleVideos.map((video) => ({
    id: video.id,
    category: video.category,
    title: video.title,
    description: video.description,
    badge: video.badge,
    kicker: video.kicker,
    date: video.date ?? "",
    duration: video.duration,
    url: video.videoUrl,
    poster: video.poster,
    match: video.match
      ? {
          slug: video.id,
          stage: video.match.competition,
          competition: video.match.competition,
          homeName: "Nansana ASKA",
          awayName: video.match.opponent,
          homeScore: null,
          awayScore: null,
        }
      : undefined,
  }));
}

// The admin clears the "highlights" tag whenever a video changes, and the
// "matches" tag whenever a result changes (recap cards show the score). The
// lifetime below is only the backstop.
export async function getHighlights(): Promise<PublicHighlights> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 600, expire: 3600 });
  cacheTag("highlights", "matches");

  const videos = USE_SAMPLE_CONTENT
    ? sample()
    : ((await publicGet<ApiHighlight[]>("/highlights?limit=100")) ?? []).map(
        toPublicVideo,
      );

  // The banner is the video flagged as spotlight, otherwise the newest one.
  // The featured section is the flagged one, otherwise the next newest.
  const spotlight = videos.find((video) => video.spotlight) ?? videos[0] ?? null;
  const featured =
    videos.find((video) => video.featured && video.id !== spotlight?.id) ??
    videos.find((video) => video.id !== spotlight?.id) ??
    null;

  return {
    videos,
    spotlight,
    featured,
    goals: videos.filter((video) => video.category === "goals").slice(0, 4),
    recaps: videos.filter((video) => video.category === "recaps").slice(0, 4),
  };
}
