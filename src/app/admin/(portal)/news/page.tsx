import type { Metadata } from "next";
import Link from "next/link";
import ArticleStatusBadge from "@/components/admin/news/ArticleStatusBadge";
import Button from "@/components/ui/Button";
import { getAuth } from "@/lib/admin/auth";
import { categoryLabel } from "@/lib/admin/news";
import { listArticles } from "@/lib/admin/news-data";
import type { ArticleStatus } from "@/lib/admin/news-types";
import { formatKampalaDate } from "@/lib/admin/time";

export const metadata: Metadata = { title: "News" };

const tabs: { label: string; value: ArticleStatus | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Published", value: "published" },
  { label: "Drafts", value: "draft" },
];

export default async function NewsPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await getAuth();
  const query = await props.searchParams;
  const raw = Array.isArray(query.status) ? query.status[0] : query.status;
  const status: ArticleStatus | undefined =
    raw === "published" || raw === "draft" ? raw : undefined;

  const articles = await listArticles({ status });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-section text-navy">News</h1>
          <p className="mt-1 text-ink-muted">
            Write and publish match reports, club updates and announcements.
          </p>
        </div>
        <Button href="/admin/news/new">New article</Button>
      </div>

      <nav aria-label="Filter by status" className="flex gap-2">
        {tabs.map((tab) => {
          const active = tab.value === status;
          return (
            <Link
              key={tab.label}
              href={tab.value ? `/admin/news?status=${tab.value}` : "/admin/news"}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 text-label font-bold uppercase tracking-wide ${
                active
                  ? "bg-navy text-white"
                  : "bg-white text-navy hover:bg-surface-strong"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {articles.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-ink-muted shadow-card">
          No articles yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-card">
          <table className="w-full min-w-[40rem] text-sm">
            <caption className="sr-only">Articles, most recently edited first</caption>
            <thead className="bg-surface-tint">
              <tr className="text-left text-label font-bold uppercase tracking-wide text-ink-muted">
                <th scope="col" className="px-4 py-3">Title</th>
                <th scope="col" className="px-4 py-3">Category</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Published</th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.slug} className="border-t border-surface-strong">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/news/${article.slug}`}
                      className="font-semibold text-navy hover:text-brand-blue"
                    >
                      {article.title}
                    </Link>
                    <span className="block text-sm text-ink-muted">
                      {article.authorName} · {article.readMinutes} min read
                      {article.featured && " · Featured"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {categoryLabel(article.category)}
                  </td>
                  <td className="px-4 py-3">
                    <ArticleStatusBadge status={article.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {article.publishedAt
                      ? formatKampalaDate(article.publishedAt)
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/news/${article.slug}`}
                      className="text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
