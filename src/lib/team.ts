// SAMPLE DATA copied from the Stitch design. None of it is confirmed with the
// club. Before launch, replace it with the club's real roster and staff, and
// confirm the club may publish each person's name, photo and stats.
//
// Players: only the 8 men's players visible in the screenshots are listed.
// Where a stat was hidden in the screenshot it is left out, not guessed.
// The women's roster was not visible in the screenshots, so it is empty.
//
// Technical staff: the design also shows licence/credential badges (for
// example "CAF / FAU licensed"). Those are claims about individuals'
// qualifications, so they are left out until the club confirms them.

export type SquadId = "men" | "women";
export type Position = "goalkeeper" | "defender" | "winger" | "pivot";

export const positionLabels: Record<
  Position,
  { filter: string; card: string }
> = {
  goalkeeper: { filter: "Goalkeepers", card: "Goalkeeper" },
  defender: { filter: "Defenders (Fixos)", card: "Defender / Fixo" },
  winger: { filter: "Wingers (Alas)", card: "Winger / Ala" },
  pivot: { filter: "Pivots", card: "Pivot" },
};

export type PlayerStat = { label: string; value: string; highlight?: boolean };

export type Player = {
  id: string;
  squad: SquadId;
  number: string;
  name: string;
  position: Position;
  role?: "captain" | "vice-captain";
  stats: PlayerStat[];
  // Path under /public, for example "/images/team/kasozi-ibrahim.jpg".
  // Leave unset to show a neutral placeholder.
  photo?: string;
};

export const squadOptions: { id: SquadId; label: string }[] = [
  { id: "men", label: "Men’s team" },
  { id: "women", label: "Women’s team" },
];

export const players: Player[] = [
  {
    id: "kasozi-ibrahim",
    squad: "men",
    number: "10",
    name: "Kasozi Ibrahim",
    position: "winger",
    role: "captain",
    stats: [
      { label: "Apps", value: "42" },
      { label: "Goals", value: "29", highlight: true },
      { label: "Foot", value: "Right" },
    ],
  },
  {
    id: "ssemakula-brian",
    squad: "men",
    number: "04",
    name: "Ssemakula Brian",
    position: "defender",
    role: "vice-captain",
    stats: [
      { label: "Apps", value: "38" },
      { label: "Goals", value: "11", highlight: true },
      { label: "Foot", value: "Right" },
    ],
  },
  {
    id: "kigongo-ronald",
    squad: "men",
    number: "01",
    name: "Kigongo Ronald",
    position: "goalkeeper",
    stats: [
      { label: "Apps", value: "34" },
      { label: "Clean sheets", value: "12", highlight: true },
      { label: "Foot", value: "Left" },
    ],
  },
  {
    id: "lubega-derrick",
    squad: "men",
    number: "09",
    name: "Lubega Derrick",
    position: "pivot",
    stats: [
      { label: "Apps", value: "28" },
      { label: "Goals", value: "24", highlight: true },
      { label: "Foot", value: "Both" },
    ],
  },
  {
    id: "mukwaya-joel",
    squad: "men",
    number: "07",
    name: "Mukwaya Joel",
    position: "winger",
    stats: [{ label: "Apps", value: "31" }],
  },
  {
    id: "bwanika-denis",
    squad: "men",
    number: "05",
    name: "Bwanika Denis",
    position: "defender",
    stats: [],
  },
  {
    id: "ssekitoleko-shafik",
    squad: "men",
    number: "11",
    name: "Ssekitoleko Shafik",
    position: "pivot",
    stats: [],
  },
  {
    id: "nahabwe-allan",
    squad: "men",
    number: "12",
    name: "Nahabwe Allan",
    position: "goalkeeper",
    stats: [
      { label: "Apps", value: "14" },
      { label: "Saves", value: "64", highlight: true },
      { label: "Foot", value: "Right" },
    ],
  },
];

export type StaffMember = {
  id: string;
  kicker: string;
  name: string;
  role: string;
  description: string;
  photo?: string;
};

export const staff: StaffMember[] = [
  {
    id: "ssentamu-paul",
    kicker: "Tactical director",
    name: "Ssentamu Paul",
    role: "Head coach — Men’s senior",
    description:
      "Tactical architect overseeing match plans, high-press transitions, and first-team matchday management in the FSL.",
  },
  {
    id: "nalubega-prossy",
    kicker: "Player development",
    name: "Nalubega Prossy",
    role: "Head coach — Women’s senior",
    description:
      "Specialist in high-tempo indoor systems, player technical conditioning, and grassroots female talent progression.",
  },
  {
    id: "lwanga-david",
    kicker: "Goalkeeping specialist",
    name: "Lwanga David",
    role: "Head goalkeeper coach",
    description:
      "Expert in futsal reaction timing, split-second angle cuts, and counter-initiating throw accuracy.",
  },
  {
    id: "mukiibi-ronald",
    kicker: "Operations & strategy",
    name: "Mukiibi Ronald",
    role: "Team manager & logistics",
    description:
      "Coordinates federation registration, match arena setups, equipment management, and sports science recovery.",
  },
];

// Hero figures. "30+" and "#1 Wakiso community" are claims from the design
// that are not confirmed with the club.
export const heroStats = [
  { value: "30+", label: "Federation athletes", valueClass: "text-navy" },
  { value: "2", label: "Premier squads", valueClass: "text-gold-deep" },
  { value: "#1", label: "Wakiso community", valueClass: "text-gold-deep" },
];

// Also unconfirmed claims from the design ("100% homegrown", "equal gender
// parity").
export const identityStats = [
  { value: "100%", label: "Homegrown pride" },
  { value: "Equal", label: "Gender parity" },
  { value: "FAU", label: "Affiliated tier" },
];
