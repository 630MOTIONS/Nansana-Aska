import type {
  Article,
  ArticleCategory,
  TagTone,
} from "@/lib/articles";
import { apiMedia } from "./media";

// What the public pages show: the existing Article shape, plus the article text
// as Markdown when it comes from the API.
export type PublicArticle = Article & { markdown?: string };

export type ApiArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: "match_reports" | "club_updates" | "team_academy" | "announcements";
  featured: boolean;
  authorName: string;
  coverUrl: string | null;
  readMinutes: number;
  publishedAt: string | null;
  body?: string;
};

const categoryMeta: Record<
  ApiArticle["category"],
  { id: ArticleCategory; tag: string; tone: TagTone }
> = {
  match_reports: { id: "match-reports", tag: "Match report", tone: "blue" },
  club_updates: { id: "club-updates", tag: "Club updates", tone: "gold" },
  team_academy: { id: "team-academy", tag: "Team & academy", tone: "navy" },
  announcements: { id: "announcements", tag: "Announcements", tone: "orange" },
};

export const publicCategories: { id: ArticleCategory; label: string }[] = [
  { id: "match-reports", label: "Match reports" },
  { id: "club-updates", label: "Club updates" },
  { id: "team-academy", label: "Team & academy" },
  { id: "announcements", label: "Announcements" },
];

// "Nov 20, 2026", always in Uganda time so the server and browser agree.
function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Kampala",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function toPublicArticle(row: ApiArticle): PublicArticle {
  const meta = categoryMeta[row.category];
  return {
    slug: row.slug,
    category: meta.id,
    tag: meta.tag,
    tagTone: meta.tone,
    featured: row.featured,
    title: row.title,
    excerpt: row.excerpt,
    date: formatDate(row.publishedAt),
    author: row.authorName,
    readTime: `${row.readMinutes} min read`,
    visual: { type: "photo" },
    image: apiMedia(row.coverUrl),
    markdown: row.body,
  };
}
