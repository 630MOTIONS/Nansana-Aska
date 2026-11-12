import { getClubLogo } from "@/lib/clubs";
import type { ClubLogo } from "@/lib/clubs";
import {
  competitions,
  completedFixtures,
  formatTime12,
  formatWeekday,
  ordinal,
  positionOf,
  resultFor,
  upcomingFixtures,
} from "@/lib/fixtures";
import type { Fixture, TeamRef } from "@/lib/fixtures";

// The data now lives in src/lib/fixtures.ts (sample data, not confirmed with
// the club). This file only reshapes it for the homepage Match Centre and the
// header, so the whole site shows the same fixture.

export type Team = {
  name: string;
  initials: string;
  isClub?: boolean;
  logo?: ClubLogo;
};

export const clubTeam: Team = {
  name: "Nansana ASKA",
  initials: "NA",
  isClub: true,
};

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function toTeam(ref: TeamRef): Team {
  return ref.isClub
    ? clubTeam
    : {
        name: ref.name,
        initials: initialsOf(ref.name),
        logo: getClubLogo(ref.key),
      };
}

function sideNote(team: TeamRef, label: string) {
  const position = positionOf(team.key);
  return position ? `${label} • ${ordinal(position)} place` : label;
}

const next = upcomingFixtures.find(
  (f) => f.squad === "men" && f.matchday !== undefined,
) as Fixture;

export const nextMatch = {
  competition: competitions[next.competition].label,
  matchday: next.matchday as number,
  kickoff: `${formatWeekday(next.date)} • ${formatTime12(next.time as string)} EAT`,
  venue: next.venue,
  home: toTeam(next.home),
  homeNote: sideNote(next.home, "Home"),
  away: toTeam(next.away),
  awayNote: sideNote(next.away, "Away"),
};

export type ResultRow = { team: Team; score: number };

export type MatchResult = {
  id: string;
  competition: string;
  matchday: number;
  outcome: "win" | "draw" | "loss";
  rows: [ResultRow, ResultRow];
  footnote: string;
};

export const recentResults: MatchResult[] = completedFixtures
  .filter((f) => f.squad === "men" && f.score)
  .slice(0, 2)
  .map((f): MatchResult => {
    const [homeScore, awayScore] = f.score as [number, number];
    return {
      id: f.id,
      competition: competitions[f.competition].display,
      matchday: f.matchday ?? 0,
      outcome: resultFor(f) ?? "draw",
      rows: [
        { team: toTeam(f.home), score: homeScore },
        { team: toTeam(f.away), score: awayScore },
      ],
      footnote: f.venue,
    };
  });
