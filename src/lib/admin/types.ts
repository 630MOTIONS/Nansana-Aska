export type Squad = "men" | "women";
export type MatchStatus =
  | "scheduled"
  | "live"
  | "final"
  | "postponed"
  | "cancelled";
export type AdminRole = "admin" | "editor";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
};

export type AdminTeam = {
  slug: string;
  name: string;
  squad: Squad;
  isOurs: boolean;
  // Relative to the API, for example /teams/park-fc/logo?v=1731000000000.
  logoUrl: string | null;
};

export type AdminCompetition = {
  slug: string;
  name: string;
  season: string;
  squad: Squad;
  pointsForWin: number;
  pointsForDraw: number;
  teams: { slug: string; name: string; isOurs: boolean }[];
  matchCount: number;
};

export type AdminMatch = {
  slug: string;
  stage: string;
  matchday: number | null;
  kickoffAt: string;
  venue: string | null;
  status: MatchStatus;
  homeScore: number | null;
  awayScore: number | null;
  competition: { slug: string; name: string; season: string; squad: Squad };
  home: { slug: string; name: string };
  away: { slug: string; name: string };
};
