import { photos } from "@/lib/photos";
import type { PhotoAsset } from "@/lib/photos";

// SAMPLE DATA: stats copied from the Stitch design, not confirmed with the club.

export type SquadStat = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type Squad = {
  id: "men" | "women";
  badge: string;
  badgeVariant: "orange" | "gold";
  division: string;
  title: string;
  description: string;
  stats: SquadStat[];
  ctaLabel: string;
  href: string;
  photo: PhotoAsset;
};

export const squads: Squad[] = [
  {
    id: "men",
    badge: "Super League Roster",
    badgeVariant: "orange",
    division: "Division 1 • Senior Men",
    title: "Men’s First Team",
    description:
      "Forged with tactical discipline and explosive pace, the Men’s First Team competes against the top futsal clubs in Uganda. Known for rapid counter-attacks and disciplined defensive shape, the squad fights for every point in the Futsal Super League.",
    stats: [
      { label: "Squad size", value: "24" },
      { label: "Goals scored", value: "32" },
      { label: "Goal diff", value: "+12", highlight: true },
    ],
    ctaLabel: "Meet the men’s squad",
    href: "/team",
    photo: photos.menTeam,
  },
  {
    id: "women",
    badge: "Super League Contenders",
    badgeVariant: "gold",
    division: "Division 1 • Senior Women",
    title: "Women’s Team",
    description:
      "Highlighting female athletic excellence in Ugandan futsal, our Women’s team combines technical precision with sheer teamwork. They represent Nansana on the national court while breaking barriers and inspiring rising young athletes across the community.",
    stats: [
      { label: "Squad size", value: "21" },
      { label: "Goals scored", value: "28" },
      { label: "League rank", value: "3rd", highlight: true },
    ],
    ctaLabel: "Meet the women’s squad",
    href: "/team",
    photo: photos.womenTeam,
  },
];
