import type { AdminCompetition, AdminMatch } from "./types";

export type Outcome = "W" | "D" | "L";

// A finished match seen from Nansana's side. Returns null when the match has
// no score, or when neither or both teams are ours (so there is no "our side").
export function outcomeFor(
  match: AdminMatch,
  isOurs: (teamSlug: string) => boolean,
): { outcome: Outcome; ours: number; theirs: number } | null {
  if (match.homeScore === null || match.awayScore === null) return null;

  const homeOurs = isOurs(match.home.slug);
  const awayOurs = isOurs(match.away.slug);
  if (homeOurs === awayOurs) return null;

  const ours = homeOurs ? match.homeScore : match.awayScore;
  const theirs = homeOurs ? match.awayScore : match.homeScore;
  return {
    outcome: ours > theirs ? "W" : ours < theirs ? "L" : "D",
    ours,
    theirs,
  };
}

// Which competition's table to show: the one asked for, otherwise the men's
// competition that has one of our teams, otherwise any with one of our teams.
export function pickCompetition(
  competitions: AdminCompetition[],
  requested?: string,
): AdminCompetition | undefined {
  return (
    competitions.find((item) => item.slug === requested) ??
    competitions.find(
      (item) => item.squad === "men" && item.teams.some((team) => team.isOurs),
    ) ??
    competitions.find((item) => item.teams.some((team) => team.isOurs)) ??
    competitions[0]
  );
}
