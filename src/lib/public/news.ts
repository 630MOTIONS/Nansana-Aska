import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { articles as sampleArticles } from "@/lib/articles";
import { publicGet, USE_SAMPLE_CONTENT } from "./api";
import { toPublicArticle } from "./news-meta";
import type { ApiArticle, PublicArticle } from "./news-meta";

// The admin clears the "news" tag whenever an article is published, edited,
// unpublished or deleted, so changes show up straight away. The lifetime below
// is only the backstop.
const LIFETIME = { stale: 60, revalidate: 600, expire: 3600 };

// Newest first.
export async function getPublishedArticles(): Promise<PublicArticle[]> {
  "use cache";
  cacheLife(LIFETIME);
  cacheTag("news");

  if (USE_SAMPLE_CONTENT) return sampleArticles;

  const rows = await publicGet<ApiArticle[]>("/articles?limit=100");
  return (rows ?? []).map(toPublicArticle);
}

export async function getPublishedArticle(
  slug: string,
): Promise<PublicArticle | null> {
  "use cache";
  cacheLife(LIFETIME);
  cacheTag("news");

  if (USE_SAMPLE_CONTENT) {
    return sampleArticles.find((article) => article.slug === slug) ?? null;
  }

  const row = await publicGet<ApiArticle>(`/articles/${encodeURIComponent(slug)}`);
  return row ? toPublicArticle(row) : null;
}
