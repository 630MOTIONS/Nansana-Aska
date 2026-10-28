// SAMPLE DATA: headlines and excerpts adapted from the Stitch design, not real
// articles. Every post links to /news until article pages exist.

export type NewsPost = {
  slug: string;
  tag: string;
  tagVariant: "orange" | "gold" | "navy";
  date: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "match-preview",
    tag: "Match preview",
    tagVariant: "orange",
    date: "October 2026",
    category: "Super League",
    title:
      "Match preview: Nansana ASKA prepared for high-stakes Super League clash",
    excerpt:
      "Coach and players finalize tactical preparation ahead of this weekend\u2019s crucial fixture at Old Kampala Arena against direct rivals Park FC.",
    href: "/news",
  },
  {
    slug: "womens-masterclass",
    tag: "Match report",
    tagVariant: "gold",
    date: "October 2026",
    category: "Women\u2019s Division",
    title: "Women\u2019s squad delivers masterclass in weekend league fixture",
    excerpt:
      "A dominant 4\u20131 display confirms the squad\u2019s championship credentials in the national circuit, showcasing clinical finishing and relentless pressure.",
    href: "/news",
  },
  {
    slug: "academy-youth",
    tag: "Club news",
    tagVariant: "navy",
    date: "October 2026",
    category: "Grassroots",
    title: "Academy & youth development: fostering future stars in Wakiso",
    excerpt:
      "ASKA launches grassroots futsal clinics empowering local youth talent across Wakiso District, providing professional equipment and mentorship.",
    href: "/news",
  },
];
