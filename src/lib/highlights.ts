import type { LucideIcon } from "lucide-react";
import { Camera, CirclePlay, Globe, Sparkles } from "lucide-react";

// SAMPLE DATA adapted from the Stitch design. None of it is confirmed with the
// club. Before launch, replace it with real videos, titles and links.
//
// Left out on purpose:
// - View counts, likes, "premiered yesterday" and stream quality labels
//   (1080p 60fps, "FAU Official Broadcast"): unconfirmed claims.
// - Scores and outcomes ("4–3", "5–3", "Full time win"). The design's results
//   contradict the homepage data (for example Matchday 8 vs Park FC is the
//   homepage's NEXT fixture, and Matchday 7 vs Mengo City is 5–3 there).
//   Recap cards show "VS" until real scores exist.
// - Names tied to specific goals ("Captain Ssembatya"): the design's captain
//   does not match the Team page roster.
// - Matchday numbers on goal clips, for the same contradiction reason.
//
// Video links: no video URLs exist yet. A card only becomes clickable when its
// `videoUrl` is set, and shows "Video coming soon" otherwise.

export type VideoCategory =
  | "match"
  | "goals"
  | "recaps"
  | "training"
  | "behind"
  | "interviews";

export const videoCategories: {
  id: VideoCategory;
  label: string;
  badgeClass: string;
}[] = [
  {
    id: "match",
    label: "Match highlights",
    badgeClass: "bg-brand-orange text-ink",
  },
  { id: "goals", label: "Goals & saves", badgeClass: "bg-brand-gold text-ink" },
  { id: "recaps", label: "Match recaps", badgeClass: "bg-navy text-white" },
  {
    id: "training",
    label: "Training & drills",
    badgeClass: "bg-brand-blue text-white",
  },
  {
    id: "behind",
    label: "Behind the scenes",
    badgeClass: "bg-navy text-white",
  },
  {
    id: "interviews",
    label: "Interviews",
    badgeClass: "bg-brand-blue text-white",
  },
];

export type Video = {
  id: string;
  category: VideoCategory;
  // Which page section also shows this video.
  group?: "goals" | "recaps";
  badge?: string; // overrides the category label on the card
  kicker: string;
  date?: string;
  title: string;
  description: string;
  duration: string;
  match?: {
    opponent: string;
    competition: string;
    venue?: string;
    score?: [number, number];
  };
  videoUrl?: string; // for example a YouTube link
  poster?: string; // path under /public, for example "/images/highlights/x.jpg"
};

// Listed newest first.
export const videos: Video[] = [
  {
    id: "pre-match-drills",
    category: "training",
    kicker: "Nansana Arena Ground",
    date: "Oct 22, 2026",
    title: "Senior men’s division: pre-match tactical drills & pressing",
    description:
      "Go inside the intense mid-week tactical session focusing on rapid transition traps, zonal overload, and quick wall-passes.",
    duration: "03:45",
  },
  {
    id: "womens-set-pieces",
    category: "goals",
    kicker: "Women’s Super Cup",
    date: "Oct 20, 2026",
    title: "Women’s team masterclass: tactical set-piece precision & goals",
    description:
      "Relive set-piece finishes from our women’s team, engineered from training-ground corner routines.",
    duration: "04:10",
  },
  {
    id: "arena-battle",
    category: "match",
    kicker: "Old Kampala Arena",
    date: "Oct 18, 2026",
    title: "High-intensity arena battle: second-half breakdown",
    description:
      "Analysis of the adjustments made during halftime that shaped the second half against title contenders.",
    duration: "06:30",
  },
  {
    id: "gk-reflexes",
    category: "goals",
    kicker: "Goalkeeper reel",
    date: "Oct 15, 2026",
    title: "Between the posts: tactical GK reflexes & saves",
    description:
      "A compilation of reaction saves, positioning and distribution passes from our goalkeepers.",
    duration: "02:55",
  },
  {
    id: "locker-room",
    category: "behind",
    kicker: "Dressing room access",
    date: "Oct 12, 2026",
    title: "United in purpose: locker room energy before the derby",
    description:
      "Behind the scenes as the squad galvanizes ahead of the derby clash.",
    duration: "05:40",
  },
  {
    id: "coach-debrief",
    category: "interviews",
    kicker: "Club media room",
    date: "Oct 10, 2026",
    title: "Tactical debrief: head coach on transition & Super League goals",
    description:
      "The head coach breaks down modern futsal pacing, physical conditioning in Wakiso, and the club’s tactical identity.",
    duration: "07:15",
  },
  {
    id: "mengo-volley",
    category: "goals",
    group: "goals",
    badge: "Goal of the month",
    kicker: "Vs Mengo City",
    title: "Long-range thunderous volley vs Mengo City",
    description: "Struck from 14 meters into the top right corner.",
    duration: "00:45",
  },
  {
    id: "kisenyi-save",
    category: "goals",
    group: "goals",
    badge: "Clutch save",
    kicker: "Vs Kisenyi FC",
    title: "Critical 10m penalty save vs Kisenyi FC",
    description: "Preserved the one-goal lead with seconds left on the clock.",
    duration: "00:38",
  },
  {
    id: "kabowa-goal",
    category: "goals",
    group: "goals",
    badge: "Team play",
    kicker: "Vs Kabowa Dream",
    title: "Fast-break team goal: 5-pass sequence",
    description: "One-touch futsal geometry carving open the entire press.",
    duration: "00:52",
  },
  {
    id: "goal-line-clearance",
    category: "goals",
    group: "goals",
    badge: "Goal-line stop",
    kicker: "Vs Park FC",
    title: "Bwanika Denis diving goal-line clearance",
    description:
      "Heroic sliding defensive header off the goal line in stoppage time.",
    duration: "00:35",
  },
  {
    id: "recap-park",
    category: "recaps",
    group: "recaps",
    kicker: "Match recap",
    title: "Match recap: Nansana ASKA vs Park FC",
    description:
      "An extended look at the key moments and matchday narrative from Old Kampala Arena.",
    duration: "08:15",
    match: {
      opponent: "Park FC",
      competition: "Super League round 8",
      venue: "Old Kampala Arena",
    },
  },
  {
    id: "recap-mengo",
    category: "recaps",
    group: "recaps",
    kicker: "Match recap",
    title: "Match recap: Nansana ASKA vs Mengo City",
    description:
      "An extended look at the attacking play and pressing from the round 6 fixture.",
    duration: "06:40",
    match: {
      opponent: "Mengo City",
      competition: "Super League round 6",
    },
  },
];

export const spotlight = {
  badge: "Matchday 8 spotlight",
  kicker: "Futsal Super League 2026 • Round 8",
  title: "Rapid counter-attack masterclass vs Park FC",
  description:
    "Nansana ASKA’s high-tempo rotation and lightning transitions against Park FC at Old Kampala Arena.",
  duration: "04:18",
  videoUrl: undefined as string | undefined,
  poster: undefined as string | undefined,
};

export const featuredVideo = {
  eyebrow: "Featured highlight",
  tag: "Match highlights • FAU Super League round 8",
  title: "Clash of titans: Nansana ASKA vs Park FC",
  description:
    "Every crucial transition, lightning defensive interception and finish from our pulse-pounding fixture at Old Kampala Arena.",
  details: [
    { label: "Video duration", value: "05:12 mins" },
    { label: "Competition", value: "FAU Futsal Super League" },
    { label: "Venue", value: "Old Kampala Arena" },
  ],
  videoUrl: undefined as string | undefined,
  poster: undefined as string | undefined,
};

// Channel names and handles come from the design. None are confirmed, and no
// links exist yet, so each card shows "Link coming soon" until `url` is set.
export const channels: {
  id: string;
  icon: LucideIcon;
  iconClass: string;
  kicker: string;
  title: string;
  text: string;
  cta: string;
  url?: string;
}[] = [
  {
    id: "video",
    icon: CirclePlay,
    iconClass: "bg-brand-orange/20 text-gold-deep",
    kicker: "Official match broadcaster",
    title: "ASKA TV YouTube",
    text: "Full match replays, post-match tactical breakdown shows, and league livestreams.",
    cta: "Subscribe now",
  },
  {
    id: "community",
    icon: Globe,
    iconClass: "bg-brand-blue/15 text-brand-blue",
    kicker: "Matchday hub",
    title: "Nansana ASKA FC Facebook",
    text: "Live stream kickoffs, final whistle reactions, score bulletins, and community photo galleries.",
    cta: "Join community",
  },
  {
    id: "stories",
    icon: Camera,
    iconClass: "bg-brand-gold/30 text-gold-deep",
    kicker: "Visual stories",
    title: "@nansanaaskafc",
    text: "Court-side vertical reels, squad lifestyle, locker room celebrations, and warmup photography.",
    cta: "Follow reels",
  },
  {
    id: "clips",
    icon: Sparkles,
    iconClass: "bg-navy text-gold-soft",
    kicker: "Short-form skill clips",
    title: "ASKA Futsal Skills",
    text: "Nutmegs, trick shots, rapid 1v1 dinking clips, and grassroots street football freestyle from Nansana.",
    cta: "Watch viral clips",
  },
];
