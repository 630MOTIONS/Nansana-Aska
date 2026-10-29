// SAMPLE DATA: copied from the Stitch design, not confirmed with the club.
// Replace with real fixtures and results before launch.

export type Team = {
  name: string;
  initials: string;
  isClub?: boolean;
};

export const clubTeam: Team = {
  name: "Nansana ASKA",
  initials: "NA",
  isClub: true,
};

export const nextMatch = {
  competition: "Futsal Super League Uganda",
  matchday: 8,
  kickoff: "Saturday \u2022 4:00 PM EAT",
  venue: "Old Kampala Arena",
  home: clubTeam,
  homeNote: "Home \u2022 4th place",
  away: { name: "Park FC", initials: "PF" } satisfies Team,
  awayNote: "Away \u2022 Contenders",
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

export const recentResults: MatchResult[] = [
  {
    id: "md7",
    competition: "Super League",
    matchday: 7,
    outcome: "win",
    rows: [
      { team: clubTeam, score: 5 },
      { team: { name: "Mengo City Futsal", initials: "MC" }, score: 3 },
    ],
    footnote: "Goals: Ssemakula (2), Kigozi (2), Kato (1)",
  },
  {
    id: "md6",
    competition: "Super League",
    matchday: 6,
    outcome: "draw",
    rows: [
      { team: { name: "Kisenyi FC", initials: "KF" }, score: 2 },
      { team: clubTeam, score: 2 },
    ],
    footnote: "Lugogo Arena \u2022 High Intensity Draw",
  },
];
