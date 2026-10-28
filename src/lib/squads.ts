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
};

export const squads: Squad[] = [
  {
    id: "men",
    badge: "Super League Roster",
    badgeVariant: "orange",
    division: "Division 1 \u2022 Senior Men",
    title: "Men\u2019s First Team",
    description:
      "Forged with tactical discipline and explosive pace, the Men\u2019s First Team competes against the top futsal clubs in Uganda. Known for rapid counter-attacks and disciplined defensive shape, the squad fights for every point in the Futsal Super League.",
    stats: [
      { label: "Squad size", value: "24" },
      { label: "Goals scored", value: "32" },
      { label: "Goal diff", value: "+12", highlight: true },
    ],
    ctaLabel: "Meet the men\u2019s squad",
    href: "/team",
  },
  {
    id: "women",
    badge: "Super League Contenders",
    badgeVariant: "gold",
    division: "Division 1 \u2022 Senior Women",
    title: "Women\u2019s Team",
    description:
      "Highlighting female athletic excellence in Ugandan futsal, our Women\u2019s team combines technical precision with sheer teamwork. They represent Nansana on the national court while breaking barriers and inspiring rising young athletes across the community.",
    stats: [
      { label: "Squad size", value: "21" },
      { label: "Goals scored", value: "28" },
      { label: "League rank", value: "3rd", highlight: true },
    ],
    ctaLabel: "Meet the women\u2019s squad",
    href: "/team",
  },
];
