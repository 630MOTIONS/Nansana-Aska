export type ArticleCategory =
  | "match_reports"
  | "club_updates"
  | "team_academy"
  | "announcements";

export type ArticleStatus = "draft" | "published";

export type AdminArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  status: ArticleStatus;
  featured: boolean;
  authorName: string;
  // Relative to the API, for example /media/<id>.
  coverUrl: string | null;
  readMinutes: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminArticle = AdminArticleSummary & { body: string };
