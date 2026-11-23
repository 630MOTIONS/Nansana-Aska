import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getClubLogo } from "@/lib/clubs";
import type { ClubLogo } from "@/lib/clubs";
import { standings as sampleRows, standingsUpdatedAfter } from "@/lib/fixtures";
import { publicGet, USE_SAMPLE_CONTENT } from "./api";
import { apiMedia } from "./media";

export type PublicStandingRow = {
  position: number;
  slug: string;
  name: string;
  isOurs: boolean;
  logo: ClubLogo | null;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

export type PublicStandings = {
  competitionName: string;
  season: string;
  lastMatchday: number | null;
  rows: PublicStandingRow[];
};

type ApiStandings = {
  competition: { slug: string; name: string; season: string };
  lastMatchday: number | null;
  rows: {
    position: number;
    team: { slug: string; name: string; isOurs: boolean; logoUrl: string | null };
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
  }[];
};

// Preview deployments without an API use the sample table.
function fromSample(): PublicStandings {
  return {
    competitionName: "FAU Futsal Super League",
    season: "Sample season",
    lastMatchday: Number(standingsUpdatedAfter.replace(/\D/g, "")) || null,
    rows: sampleRows.map((row, index) => ({
      position: index + 1,
      slug: row.team.key,
      name: row.team.name,
      isOurs: Boolean(row.team.isClub),
      logo: getClubLogo(row.team.key) ?? null,
      played: row.played,
      won: row.w,
      drawn: row.d,
      lost: row.l,
      goalsFor: row.gf,
      goalsAgainst: row.ga,
      goalDifference: row.gd,
      points: row.pts,
    })),
  };
}

// The men's league table. The admin clears the "matches" tag whenever a result,
// team or logo changes, so the table updates straight away. The lifetime below
// is only the backstop.
export async function getStandings(): Promise<PublicStandings | null> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 300, expire: 3600 });
  cacheTag("matches");

  if (USE_SAMPLE_CONTENT) return fromSample();

  const data = await publicGet<ApiStandings>(
    "/competitions/current/standings?squad=men",
  );
  if (!data) return null;

  return {
    competitionName: data.competition.name,
    season: data.competition.season,
    lastMatchday: data.lastMatchday,
    rows: data.rows.map((row) => {
      const src = apiMedia(row.team.logoUrl);
      return {
        position: row.position,
        slug: row.team.slug,
        name: row.team.name,
        isOurs: row.team.isOurs,
        logo: src ? { src, alt: "" } : null,
        played: row.played,
        won: row.won,
        drawn: row.drawn,
        lost: row.lost,
        goalsFor: row.goalsFor,
        goalsAgainst: row.goalsAgainst,
        goalDifference: row.goalDifference,
        points: row.points,
      };
    }),
  };
}
