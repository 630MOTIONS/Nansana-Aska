import { nextMatch } from "@/lib/matches";

export const siteConfig = {
  name: "Nansana ASKA",
  fullName: "Nansana ASKA Futsal Club",
  tagline: "Pride of Nansana",
  crest: "/images/nansana-aska-crest.png",
  // Fixed on purpose: this project uses Next.js Cache Components, which does
  // not allow reading the current date in a server component.
  copyrightYear: 2026,
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

// SAMPLE DATA from the Stitch design, not confirmed with the club.
// No email or phone is listed here on purpose. Add the real ones once the
// club supplies them.
export const clubInfo = {
  affiliation: "Futsal Association Uganda",
  membership: "Futsal Super League Member Club",
  homeGround: "Old Kampala Arena",
  location: "Nansana Municipality, Wakiso District, Central Region, Uganda",
  blurb:
    "Competing with sporting ambition, grassroots youth development, and community pride in Nansana, Wakiso District, Uganda.",
};

export const footerClubLinks = [
  { label: "Home", href: "/" },
  { label: "About the Club", href: "/about" },
  { label: "Men’s Senior Team", href: "/team" },
  { label: "Women’s Senior Team", href: "/team" },
  { label: "Club News & Academy", href: "/news" },
];

export const footerMatchLinks = [
  { label: "Fixtures & Results", href: "/matches" },
  { label: "Super League Table", href: "/matches" },
  { label: "Match Highlights & Goals", href: "/highlights" },
  { label: "Official Photo Gallery", href: "/gallery" },
];
