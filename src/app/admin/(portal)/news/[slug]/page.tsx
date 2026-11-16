import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleForm from "@/components/admin/news/ArticleForm";
import ArticleStatusBadge from "@/components/admin/news/ArticleStatusBadge";
import CoverPanel from "@/components/admin/news/CoverPanel";
import DeleteArticleForm from "@/components/admin/news/DeleteArticleForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { categoryLabel } from "@/lib/admin/news";
import { getArticle } from "@/lib/admin/news-data";
import { formatKampalaDate } from "@/lib/admin/time";
import { updateArticleAction } from "../actions";

export const metadata: Metadata = { title: "Edit article" };

export default async function EditArticlePage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await getAuth();
  const { slug } = await props.params;
  const query = await props.searchParams;

  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <Link
          href="/admin/news"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All articles
        </Link>
        <h1 className="mt-2 text-section text-navy">{article.title}</h1>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-muted">
          <ArticleStatusBadge status={article.status} />
          <span>{categoryLabel(article.category)}</span>
          <span>{article.readMinutes} min read</span>
          {article.publishedAt && (
            <span>Published {formatKampalaDate(article.publishedAt)}</span>
          )}
        </p>
      </div>

      {query.created === "1" && (
        <p
          role="status"
          className="rounded-md bg-surface-tint p-3 text-sm font-semibold text-navy"
        >
          Article created. Add a cover photo below if you like.
        </p>
      )}

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Cover photo</h2>
        <div className="mt-4">
          <CoverPanel slug={article.slug} coverUrl={article.coverUrl} />
        </div>
      </Card>

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Article</h2>
        <div className="mt-4">
          <ArticleForm
            mode="edit"
            action={updateArticleAction.bind(null, article.slug)}
            initial={{
              title: article.title,
              excerpt: article.excerpt,
              category: article.category,
              body: article.body,
              authorName: article.authorName,
              featured: article.featured,
              status: article.status,
            }}
          />
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          Web address: <code>{article.slug}</code>. It never changes, so links
          to the article keep working.
        </p>
      </Card>

      {user.role === "admin" && (
        <Card as="section" className="border-2 border-red-100 p-6">
          <h2 className="text-card text-red-800">Delete this article</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Removes the article and its photos. Only administrators can do this.
            To take it off the website without deleting it, use Unpublish.
          </p>
          <div className="mt-4">
            <DeleteArticleForm slug={article.slug} />
          </div>
        </Card>
      )}
    </div>
  );
}
