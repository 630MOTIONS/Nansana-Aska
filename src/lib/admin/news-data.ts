import "server-only";
import { apiRequest, unwrap } from "./api";
import { getAuth } from "./auth";
import type {
  AdminArticle,
  AdminArticleSummary,
  ArticleStatus,
} from "./news-types";

export async function listArticles(
  filters: { status?: ArticleStatus; limit?: number } = {},
) {
  const { token } = await getAuth();
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  params.set("limit", String(filters.limit ?? 100));
  return unwrap(
    await apiRequest<AdminArticleSummary[]>(
      `/admin/articles?${params.toString()}`,
      { token },
    ),
  );
}

export async function getArticle(slug: string): Promise<AdminArticle | null> {
  const { token } = await getAuth();
  const result = await apiRequest<AdminArticle>(
    `/admin/articles/${encodeURIComponent(slug)}`,
    { token },
  );
  if (!result.ok && result.status === 404) return null;
  return unwrap(result);
}
