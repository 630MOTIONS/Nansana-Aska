// SAMPLE DATA adapted from the Stitch design. None of it is confirmed with the
// club. Before launch, replace it with real, approved articles.
//
// What was changed or left out on purpose:
// - The design's featured article says "4–3 victory against Park FC, Round 8,
//   October 26", but the homepage lists Matchday 8 vs Park FC as the NEXT
//   fixture. The score, opponent, captain's name and goal scorers are left out.
// - The design's article body is a full match report with named players, a
//   head-coach quote, a goal-by-goal ledger and a yellow card. Those are
//   invented specifics about real people, so no sample article has a body.
//   The article page shows "full article coming soon" instead.
// - Headline claims like "over 120 local talents", "five individual
//   goalscorers" and ticketing/gate details were dropped or generalised.
// - "Verified matchday dispatch" and "Official FAU archive" labels are removed.
//
// To publish a real article, fill in its `body` (and `image`). Blocks supported:
// paragraph, heading and quote.

export type ArticleCategory =
  | "match-reports"
  | "club-updates"
  | "team-academy"
  | "announcements";

export const articleCategories: { id: ArticleCategory; label: string }[] = [
  { id: "match-reports", label: "Match reports" },
  { id: "club-updates", label: "Club updates" },
  { id: "team-academy", label: "Team & academy" },
  { id: "announcements", label: "Announcements" },
];

export type TagTone = "navy" | "orange" | "gold" | "blue";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution: string };

// "photo" cards show an image (or a neutral placeholder). "text" cards are the
// typographic tiles from the design (announcements, score cards).
export type ArticleVisual =
  | { type: "photo" }
  | {
      type: "text";
      tone: "navy" | "gold" | "deep";
      headline: string;
      sub?: string;
    };

export type Article = {
  slug: string;
  category: ArticleCategory;
  tag: string;
  tagTone: TagTone;
  featured?: boolean;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  readTime: string;
  visual: ArticleVisual;
  image?: string; // path under /public, for example "/images/news/x.jpg"
  imageLabel?: string;
  body?: ArticleBlock[];
  tags?: string[];
};

// Listed newest first.
export const articles: Article[] = [
  {
    slug: "clash-of-titans-derby",
    category: "match-reports",
    tag: "Match report • Super League derby",
    tagTone: "blue",
    featured: true,
    title:
      "Clash of titans: late drama secures derby victory at Old Kampala Arena",
    excerpt:
      "In a high-octane 40-minute duel of precision futsal, a memorable comeback sent the Wakiso faithful into delirium.",
    date: "Oct 26, 2026",
    author: "ASKA Media Desk",
    readTime: "4 min read",
    visual: { type: "photo" },
    imageLabel: "Old Kampala Arena",
  },
  {
    slug: "tactical-evolution",
    category: "team-academy",
    tag: "Team & squad",
    tagTone: "navy",
    title:
      "Tactical evolution: head coach details high-press 1-2-1 formation for 2026 campaign",
    excerpt:
      "An inside breakdown of our mid-week technical drills, transition pressing, and rapid counter-attack patterns.",
    date: "Oct 24, 2026",
    author: "ASKA Media Desk",
    readTime: "3 min read",
    visual: { type: "photo" },
  },
  {
    slug: "womens-fau-cup",
    category: "team-academy",
    tag: "Women’s division",
    tagTone: "orange",
    title:
      "Women’s senior squad advances to FAU Cup quarter-finals with resilient display",
    excerpt:
      "Clinical finishing from set-pieces and stout defending earned the ladies a decisive result against Kisenyi.",
    date: "Oct 20, 2026",
    author: "ASKA Media Desk",
    readTime: "3 min read",
    visual: { type: "photo" },
  },
  {
    slug: "wakiso-grassroots-clinic",
    category: "team-academy",
    tag: "Community & youth",
    tagTone: "gold",
    title: "Wakiso grassroots futsal clinic welcomes local aspiring talents",
    excerpt:
      "Nansana ASKA first-team stars led coaching stations on ball control, court awareness, and quick decision-making.",
    date: "Oct 18, 2026",
    author: "ASKA Media Desk",
    readTime: "4 min read",
    visual: { type: "photo" },
  },
  {
    slug: "matchday-protocols",
    category: "announcements",
    tag: "Announcements",
    tagTone: "navy",
    title: "Club secretariat announces matchday protocols and arena access",
    excerpt: "Guidance for supporters attending fixtures at Old Kampala Arena.",
    date: "Oct 14, 2026",
    author: "Club secretariat",
    readTime: "2 min read",
    visual: {
      type: "text",
      tone: "navy",
      headline: "Matchday protocols • Arena access",
    },
  },
  {
    slug: "mengo-city-5-3",
    category: "match-reports",
    tag: "Match report",
    tagTone: "blue",
    title:
      "Five-goal second-half blitz: ASKA defeats Mengo City in thrilling 5–3 spectacle",
    excerpt:
      "An exhilarating offensive display during Matchday 7 of the Super League season.",
    date: "Oct 10, 2026",
    author: "ASKA Media Desk",
    readTime: "5 min read",
    visual: {
      type: "text",
      tone: "gold",
      headline: "5 – 3",
      sub: "Full time win",
    },
  },
  {
    slug: "performance-science-lab",
    category: "club-updates",
    tag: "Club updates",
    tagTone: "gold",
    title:
      "Inside the parquet: strength, conditioning, and injury prevention at the Nansana gym",
    excerpt:
      "How the club approaches strength, conditioning, and injury prevention for its indoor court players.",
    date: "Oct 6, 2026",
    author: "ASKA Media Desk",
    readTime: "4 min read",
    visual: {
      type: "text",
      tone: "deep",
      headline: "Performance science lab",
    },
  },
];

export const featuredArticle = articles.find((a) => a.featured) as Article;

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export const exploreChannels = [
  {
    title: "Roster & staff",
    note: "Meet our athletes",
    href: "/team",
    icon: "users",
  },
  {
    title: "Match centre",
    note: "Fixtures & table",
    href: "/matches",
    icon: "calendar",
  },
  {
    title: "Highlights",
    note: "Goals & match video",
    href: "/highlights",
    icon: "play",
  },
  {
    title: "Photo gallery",
    note: "Court & matchday imagery",
    href: "/gallery",
    icon: "images",
  },
] as const;
