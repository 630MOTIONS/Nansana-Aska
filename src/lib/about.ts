import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  ClipboardList,
  Eye,
  Flag,
  Footprints,
  Handshake,
  Maximize2,
  Medal,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import type { Tone } from "@/components/ui/Tile";

// SAMPLE DATA: all copy on the About page is adapted from the Stitch design.
// None of it is confirmed with the club. Check the founding date, timeline,
// mission, vision, values and staff roles before launch. No people are named.

export const aboutStats = [
  { value: "2021", label: "Founded", valueClass: "text-navy" },
  { value: "FAU", label: "Affiliated", valueClass: "text-gold-deep" },
  { value: "2", label: "Divisions", valueClass: "text-brand-orange" },
];

export const identityPoints: {
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    icon: BadgeCheck,
    title: "FAU affiliated",
    text: "Registered member of national indoor body",
  },
  {
    icon: Users,
    title: "Dual squads",
    text: "Men & women competitive rosters",
  },
  {
    icon: Building2,
    title: "Grassroots path",
    text: "Wakiso District youth development",
  },
];

export const timeline: {
  step: string;
  tone: Tone;
  title: string;
  text: string;
  label: string;
  labelClass: string;
}[] = [
  {
    step: "01",
    tone: "gold",
    title: "2021 — Club foundation",
    text: "Grassroots formation in Nansana, Wakiso District dedicated to competitive futsal development.",
    label: "Foundation phase",
    labelClass: "text-gold-deep",
  },
  {
    step: "02",
    tone: "blue",
    title: "2022/23 — League entry",
    text: "Official affiliation with Futsal Association Uganda (FAU) and entry into competitive championship structures.",
    label: "Affiliation",
    labelClass: "text-brand-blue",
  },
  {
    step: "03",
    tone: "orange",
    title: "2023/24 — Dual growth",
    text: "Establishment of balanced senior squads and dedicated training operations at Old Kampala Arena.",
    label: "Expansion",
    labelClass: "text-gold-deep",
  },
  {
    step: "04",
    tone: "navy",
    title: "Current — Super League",
    text: "Competing in national top-flight indoor championship, setting the standard for professional futsal in Uganda.",
    label: "Top flight ambition",
    labelClass: "text-navy",
  },
];

// The design adds a line saying this archive is "validated by Futsal
// Association Uganda". That is an unconfirmed claim about a third party, so it
// is left out on purpose.
export const milestone = {
  eyebrow: "Historical milestone record",
  title: "Built by the community, for the community",
  text: "From municipal neighborhood kickabouts to national tournament stages at Old Kampala, the identity of ASKA reflects perseverance, tactical intelligence, and unyielding local support.",
};

// The design's mission names a league sponsor ("betPawa"). That is not
// confirmed, so the league is called "Futsal Super League" here.
export const missionVision: {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  text: string;
  tileClass: string;
  tagClass: string;
}[] = [
  {
    id: "mission",
    icon: Target,
    tag: "Our mission",
    title: "To empower & excel",
    text: "To nurture futsal talent, promote healthy competition, and contribute to the development of futsal in Uganda while maintaining the highest standards of professionalism and community engagement. We proudly compete in the Futsal Super League.",
    tileClass: "bg-brand-gold/20 text-gold-deep",
    tagClass: "bg-brand-gold/20 text-gold-deep",
  },
  {
    id: "vision",
    icon: Eye,
    tag: "Our vision",
    title: "Flagship futsal institution",
    text: "To be Uganda’s flagship futsal institution and a premier African indoor football powerhouse known for athletic excellence, grassroots empowerment, and sustainable sports professionalism.",
    tileClass: "bg-brand-blue/15 text-brand-blue",
    tagClass: "bg-brand-blue/15 text-brand-blue",
  },
];

export const values: {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  text: string;
}[] = [
  {
    icon: Users,
    tone: "blue",
    title: "Teamwork",
    text: "Working together towards shared goals through tactical unity and mutual trust on the 40×20m court.",
  },
  {
    icon: Maximize2,
    tone: "gold",
    title: "Discipline",
    text: "Building consistency, technical precision, and relentless work ethic through focused training.",
  },
  {
    icon: Handshake,
    tone: "orange",
    title: "Respect",
    text: "Valuing teammates, opponents, match officials, supporters, and the laws of the game.",
  },
  {
    icon: Medal,
    tone: "navy",
    title: "Commitment",
    text: "Giving our absolute best in training sessions, Super League fixtures, and community representation.",
  },
];

// Roles only. No names are listed because none have been supplied.
export const leadership: {
  icon: LucideIcon;
  tone: Tone;
  role: string;
  scope: string;
  tag: string;
}[] = [
  {
    icon: UserRound,
    tone: "gold",
    role: "Club management",
    scope: "President & executive board",
    tag: "Governance",
  },
  {
    icon: Flag,
    tone: "orange",
    role: "Head coach",
    scope: "Men’s senior squad",
    tag: "Tactical direction",
  },
  {
    icon: Footprints,
    tone: "gold",
    role: "Head coach",
    scope: "Women’s senior squad",
    tag: "Player development",
  },
  {
    icon: ClipboardList,
    tone: "blue",
    role: "Operations team",
    scope: "Team manager & logistics",
    tag: "Matchday ops",
  },
];

export const communityMoments = [
  { kicker: "Training culture", title: "Tactical precision at arena" },
  { kicker: "Team spirit", title: "Unbreakable squad camaraderie" },
  { kicker: "High speed action", title: "Super League matchday drama" },
];
