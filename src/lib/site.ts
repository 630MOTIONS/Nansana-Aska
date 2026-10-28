import { nextMatch } from "@/lib/matches";

export const siteConfig = {
  name: "Nansana ASKA",
  fullName: "Nansana ASKA Futsal Club",
  tagline: "Pride of Nansana",
  crest: "/images/nansana-aska-crest.png",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Highlights", href: "/highlights" },
  { label: "News & Blog", href: "/news" },
  { label: "Matches", href: "/matches" },
  { label: "Contact", href: "/contact" },
];

// Derived from the same (sample) data as the Match Centre.
export const nextFixture = {
  label: `Matchday ${nextMatch.matchday} vs ${nextMatch.away.name}`,
};
