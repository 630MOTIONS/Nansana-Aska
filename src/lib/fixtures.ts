// SAMPLE DATA adapted from the Stitch design. None of it is confirmed with the
// club. Before launch, replace it with real fixtures, results and standings.
//
// Problems found in the design, and how this file handles them:
// - Weekdays are wrong for 2026 (for example "Friday, Nov 07, 2026" is really
//   a Saturday). Dates are stored as ISO dates and the weekday is calculated.
// - The homepage said "Matchday 8 vs Park FC" was the NEXT fixture, while this
//   page (and every header in the design) says Matchday 14 vs Park FC, and the
//   Round 8 result against Park FC was already played. The homepage and header
//   now read from this file, so the whole site agrees with this page.
// - The standings show 8 games played while the next fixture is Matchday 14.
//   Matchdays 9 to 13 are unexplained. Left as in the design, so check it.
// - The design places the Matchday 16 AWAY game at our own arena. The venue is
//   set to "Venue to be confirmed" instead.
// - The season label "2025/26" does not fit 2026 dates, so it is dropped.
//
// Left out on purpose: countdown timer, form guides, head-to-head record,
// ticket prices and gate times, seating instructions, squad availability,
// "verified by FAU" and "confirmed fixture" wording, the next-update date.

export type SquadId = "men" | "women";

export type TeamRef = { key: string; name: string; isClub?: boolean };

export const nansanaMen: TeamRef = {
  key: "nansana-aska",
  name: "Nansana ASKA",
  isClub: true,
};
export const nansanaWomen: TeamRef = {
  key: "nansana-aska-w",
  name: "Nansana ASKA W",
  isClub: true,
};
const parkFc: TeamRef = { key: "park-fc", name: "Park FC" };
const mengoCity: TeamRef = { key: "mengo-city", name: "Mengo City" };
const kisenyiFc: TeamRef = { key: "kisenyi-fc", name: "Kisenyi FC" };
const kabowa: TeamRef = { key: "kabowa-dream-team", name: "Kabowa Dream Team" };
const kampalaJuniorLadies: TeamRef = {
  key: "kampala-junior-ladies",
  name: "Kampala Junior Ladies",
};
const kisenyiQueens: TeamRef = {
  key: "kisenyi-queens",
  name: "Kisenyi Queens",
};

export const competitions = {
  fsl: {
    label: "FAU Futsal Super League",
    short: "FSL",
    display: "Super League",
  },
  "womens-cup": {
    label: "FAU Women’s Cup",
    short: "Women’s Cup",
    display: "Women’s Cup",
  },
} as const;

export type CompetitionId = keyof typeof competitions;

export type Fixture = {
  id: string;
  squad: SquadId;
  competition: CompetitionId;
  stage: string; // for example "Matchday 14" or "Cup quarter-final"
  matchday?: number;
  date: string; // ISO date, for example "2026-11-07"
  time?: string; // 24-hour EAT, for example "19:30" (scheduled matches only)
  venue: string;
  home: TeamRef;
  away: TeamRef;
  side: "home" | "away" | "neutral"; // Nansana's side
  status: "scheduled" | "final";
  score?: [number, number]; // [home, away]
};

export const fixtures: Fixture[] = [
  {
    id: "md14-park-fc",
    squad: "men",
    competition: "fsl",
    stage: "Matchday 14",
    matchday: 14,
    date: "2026-11-07",
    time: "19:30",
    venue: "Old Kampala Arena",
    home: nansanaMen,
    away: parkFc,
    side: "home",
    status: "scheduled",
  },
  {
    id: "md15-mengo-city",
    squad: "men",
    competition: "fsl",
    stage: "Matchday 15",
    matchday: 15,
    date: "2026-11-15",
    time: "18:00",
    venue: "Old Kampala Arena",
    home: nansanaMen,
    away: mengoCity,
    side: "home",
    status: "scheduled",
  },
  {
    id: "womens-cup-quarter-final",
    squad: "women",
    competition: "womens-cup",
    stage: "Cup quarter-final",
    date: "2026-11-16",
    time: "15:30",
    venue: "Lugogo Indoor Arena",
    home: nansanaWomen,
    away: kampalaJuniorLadies,
    side: "neutral",
    status: "scheduled",
  },
  {
    id: "md16-kisenyi-fc",
    squad: "men",
    competition: "fsl",
    stage: "Matchday 16",
    matchday: 16,
    date: "2026-11-22",
    time: "20:00",
    venue: "Venue to be confirmed",
    home: kisenyiFc,
    away: nansanaMen,
    side: "away",
    status: "scheduled",
  },
  {
    id: "round8-park-fc",
    squad: "men",
    competition: "fsl",
    stage: "Round 8",
    matchday: 8,
    date: "2026-10-24",
    venue: "Old Kampala Arena",
    home: nansanaMen,
    away: parkFc,
    side: "home",
    status: "final",
    score: [4, 3],
  },
  {
    id: "round7-mengo-city",
    squad: "men",
    competition: "fsl",
    stage: "Round 7",
    matchday: 7,
    date: "2026-10-18",
    venue: "Old Kampala Arena",
    home: nansanaMen,
    away: mengoCity,
    side: "home",
    status: "final",
    score: [5, 3],
  },
  {
    id: "round5-kisenyi-queens",
    squad: "women",
    competition: "fsl",
    stage: "Round 5",
    matchday: 5,
    date: "2026-10-12",
    venue: "Old Kampala Arena",
    home: nansanaWomen,
    away: kisenyiQueens,
    side: "home",
    status: "final",
    score: [3, 1],
  },
  {
    id: "round6-kabowa",
    squad: "men",
    competition: "fsl",
    stage: "Round 6",
    matchday: 6,
    date: "2026-10-05",
    venue: "Lugogo Arena",
    home: kabowa,
    away: nansanaMen,
    side: "away",
    status: "final",
    score: [2, 4],
  },
];

const byDateAsc = (a: Fixture, b: Fixture) =>
  a.date.localeCompare(b.date) || (a.time ?? "").localeCompare(b.time ?? "");

export const upcomingFixtures = fixtures
  .filter((f) => f.status === "scheduled")
  .sort(byDateAsc);

export const completedFixtures = fixtures
  .filter((f) => f.status === "final")
  .sort((a, b) => byDateAsc(b, a));

export function getFixture(id: string) {
  return fixtures.find((f) => f.id === id);
}

export const squadLabels: Record<SquadId, string> = {
  men: "Men’s senior team",
  women: "Women’s senior team",
};

export const squadShort: Record<SquadId, string> = {
  men: "Men’s",
  women: "Women’s",
};

// --- Result helper ---------------------------------------------------------

export function resultFor(f: Fixture): "win" | "draw" | "loss" | undefined {
  if (!f.score) return undefined;
  const [homeScore, awayScore] = f.score;
  const club = f.home.isClub ? homeScore : awayScore;
  const other = f.home.isClub ? awayScore : homeScore;
  return club > other ? "win" : club < other ? "loss" : "draw";
}

// --- Formatting helpers ----------------------------------------------------
// Dates are fixed ISO strings and are formatted in UTC, so the output is the
// same on the server and in the browser.

const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

export function formatWeekday(iso: string) {
  return toDate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });
}

export function formatLongDate(iso: string) {
  return toDate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatShortDate(iso: string) {
  return toDate(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateOnly(iso: string) {
  return toDate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatTime12(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function ordinal(n: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

// --- Standings -------------------------------------------------------------
// Played, goal difference and points are calculated from W/D/L and goals, so
// they can never disagree with each other.

type StandingInput = {
  team: TeamRef;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
};

export type StandingRow = StandingInput & {
  played: number;
  gd: number;
  pts: number;
};

const standingInputs: StandingInput[] = [
  { team: parkFc, w: 6, d: 1, l: 1, gf: 34, ga: 18 },
  { team: nansanaMen, w: 6, d: 0, l: 2, gf: 32, ga: 21 },
  { team: mengoCity, w: 5, d: 1, l: 2, gf: 29, ga: 22 },
  { team: kisenyiFc, w: 4, d: 1, l: 3, gf: 24, ga: 20 },
  { team: kabowa, w: 3, d: 1, l: 4, gf: 21, ga: 26 },
];

export const standings: StandingRow[] = standingInputs
  .map((row) => ({
    ...row,
    played: row.w + row.d + row.l,
    gd: row.gf - row.ga,
    pts: row.w * 3 + row.d,
  }))
  .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);

export const standingsUpdatedAfter = "Matchday 8";

export function positionOf(key: string) {
  const index = standings.findIndex((row) => row.team.key === key);
  return index >= 0 ? index + 1 : undefined;
}
