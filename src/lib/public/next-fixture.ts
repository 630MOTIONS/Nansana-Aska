import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { nextFixture as sample } from "@/lib/site";
import { publicGet, USE_SAMPLE_CONTENT } from "./api";

type ApiMatch = {
  stage: string;
  matchday: number | null;
  home: { name: string; isOurs: boolean };
  away: { name: string; isOurs: boolean };
};

// The header's "Next fixture": the next upcoming match of one of our teams, for
// example "Matchday 14 vs Park FC". Null when there is none. The admin clears
// the "matches" tag whenever a match or result changes.
export async function getNextFixtureLabel(): Promise<string | null> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 120, expire: 3600 });
  cacheTag("matches");

  if (USE_SAMPLE_CONTENT) return sample.label;

  const rows = (await publicGet<ApiMatch[]>("/matches?view=upcoming&limit=30")) ?? [];
  const match = rows.find((row) => row.home.isOurs || row.away.isOurs);
  if (!match) return null;

  const opponent = match.home.isOurs ? match.away : match.home;
  const round = match.matchday ? `Matchday ${match.matchday}` : match.stage;
  return `${round} vs ${opponent.name}`;
}
