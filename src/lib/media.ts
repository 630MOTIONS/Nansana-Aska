// SAMPLE DATA: titles adapted from the Stitch design, not real videos.
// All cards link to /highlights until real media exists.

export type Highlight = {
  slug: string;
  tag: string;
  tagVariant: "gold" | "tint";
  title: string;
  subtitle: string;
  href: string;
};

export const highlights: Highlight[] = [
  {
    slug: "matchday-7",
    tag: "Video recap",
    tagVariant: "gold",
    title: "Watch matchday highlights • Round 7",
    subtitle: "Old Kampala Arena • High-tempo goals",
    href: "/highlights",
  },
  {
    slug: "pre-match-drills",
    tag: "Behind the scenes",
    tagVariant: "tint",
    title: "Behind the scenes • Pre-match drills",
    subtitle: "Tactical set-pieces & GK reflexes",
    href: "/highlights",
  },
  {
    slug: "goals-of-the-month",
    tag: "Top plays",
    tagVariant: "gold",
    title: "Super League goals of the month",
    subtitle: "Spectacular strikes from October",
    href: "/highlights",
  },
];
