import type { LucideIcon } from "lucide-react";
import {
  Award,
  CalendarDays,
  CirclePlay,
  Flag,
  Images,
  Newspaper,
  Users,
} from "lucide-react";

// SAMPLE DATA copied from the Stitch design. None of it is confirmed with the
// club. Before launch, replace it with the club's real photos and captions,
// and make sure the club has permission to publish each photo (including any
// of supporters or the youth academy).
//
// Only the 8 photos visible in the design are listed. The category counts and
// totals in the UI are calculated from this list, so they will not match the
// design's numbers (24 / 48 photos) until the full archive is added.

export type GalleryCategory =
  | "match-day"
  | "training"
  | "squads"
  | "supporters"
  | "events";

export const galleryCategories: {
  id: GalleryCategory;
  label: string;
  badgeClass: string;
}[] = [
  {
    id: "match-day",
    label: "Match day",
    badgeClass: "bg-brand-orange text-ink",
  },
  {
    id: "training",
    label: "Training & drills",
    badgeClass: "bg-gold-deep text-white",
  },
  {
    id: "squads",
    label: "Squads & teams",
    badgeClass: "bg-brand-blue text-white",
  },
  {
    id: "supporters",
    label: "Supporters & community",
    badgeClass: "bg-brand-orange text-ink",
  },
  {
    id: "events",
    label: "Events & ceremonies",
    badgeClass: "bg-navy text-white",
  },
];

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  title: string;
  caption: string;
  meta?: string;
  wide?: boolean;
  // Path under /public, for example "/images/gallery/high-stakes-clash.jpg".
  // Leave unset to show a neutral placeholder.
  photo?: string;
};

// Listed newest first.
export const galleryItems: GalleryItem[] = [
  {
    id: "high-stakes-clash",
    category: "match-day",
    title: "High-stakes Super League clash at Old Kampala",
    caption: "Tactical transition battle vs Park FC in the premier division.",
    meta: "Matchday 8",
    wide: true,
  },
  {
    id: "senior-men-lineup",
    category: "squads",
    title: "Senior men’s division match squad lineup",
    caption: "Official club roster photo for the senior men’s division.",
    meta: "2026 Season",
  },
  {
    id: "senior-women-squad",
    category: "squads",
    title: "Women’s senior division match squad",
    caption: "Pre-fixture team photo of the women’s senior division.",
    meta: "Women’s FAU",
  },
  {
    id: "parquet-footwork",
    category: "training",
    title: "High-tempo precision footwork on parquet",
    caption: "Midweek technical session focusing on footwork.",
    meta: "Wakiso Grounds",
  },
  {
    id: "aska-huddle",
    category: "squads",
    title: "United in purpose: the ASKA huddle",
    caption: "Pre-game huddle and team focus.",
    meta: "Matchday 6",
  },
  {
    id: "womens-celebration",
    category: "match-day",
    title: "Relentless energy: women’s team celebration",
    caption: "Crucial second-half volley secures three points at home.",
    meta: "FAU League Round 6",
    wide: true,
  },
  // The design hides this card's title and category. Both are inferred from
  // the caption, so confirm them.
  {
    id: "goalkeeper-saves",
    category: "training",
    title: "Goalkeeper reaction saves",
    caption: "High-velocity point-blank reaction saves.",
  },
  // Title inferred from the caption, as above.
  {
    id: "supporters-derby",
    category: "supporters",
    title: "Youth academy and local supporters",
    caption: "Youth academy and local supporters.",
    meta: "Super League Derby",
  },
];

// The design's featured caption quotes a "4–3 victory against Park FC" on
// Matchday 8, but the homepage lists Matchday 8 vs Park FC as the next
// fixture. The score is left out until the club confirms the details.
export const featuredStory = {
  badge: "Featured archive • 2026 season",
  venue: "Old Kampala Arena • FAU Super League",
  kicker: "Matchday 8 spotlight",
  title: "Clash of titans: counter-press transition",
  caption:
    "Senior men’s winger surging through defensive lines during a high-octane Super League fixture. Documented by Official Club Media.",
  photo: undefined as string | undefined,
};

// Unconfirmed figures from the design.
export const galleryStats: {
  icon: LucideIcon;
  value: string;
  label: string;
}[] = [
  { icon: Images, value: "450+", label: "Moments captured" },
  { icon: Flag, value: "12", label: "Fixtures documented" },
  { icon: Users, value: "2", label: "Senior divisions" },
  { icon: Award, value: "FAU", label: "Official Super League" },
];

export const clubChannels: {
  icon: LucideIcon;
  kicker: string;
  title: string;
  cta: string;
  href: string;
}[] = [
  {
    icon: Users,
    kicker: "First team & staff",
    title: "Meet the teams",
    cta: "View roster",
    href: "/team",
  },
  {
    icon: CirclePlay,
    kicker: "Video center",
    title: "Watch highlights",
    cta: "Watch goals",
    href: "/highlights",
  },
  {
    icon: Newspaper,
    kicker: "Press & editorial",
    title: "Club news & blog",
    cta: "Read stories",
    href: "/news",
  },
  {
    icon: CalendarDays,
    kicker: "Super League",
    title: "Upcoming fixtures",
    cta: "Match schedule",
    href: "/matches",
  },
];
