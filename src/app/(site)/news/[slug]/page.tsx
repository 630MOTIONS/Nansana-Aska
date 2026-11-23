import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import ArticleView from "@/components/sections/news/ArticleView";
import { getPublishedArticle, getPublishedArticles } from "@/lib/public/news";

type Props = { params: Promise<{ slug: string }> };

// Pages for the articles that exist at build time. Articles published later are
// built the first time someone opens them. Cache Components needs at least one
// entry here, so a placeholder is used when nothing is published yet. It
// renders a "not found" page.
export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.length > 0
    ? articles.map((article) => ({ slug: article.slug }))
    : [{ slug: "__none__" }];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  "use cache";
  cacheTag("news");

  const { slug } = await props.params;
  const article = await getPublishedArticle(slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage(props: Props) {
  const { slug } = await props.params;

  const [article, all] = await Promise.all([
    getPublishedArticle(slug),
    getPublishedArticles(),
  ]);
  if (!article) notFound();

  // Articles are listed newest first.
  const index = all.findIndex((item) => item.slug === slug);
  const previous = index >= 0 ? all[index + 1] : undefined;
  const next = index > 0 ? all[index - 1] : undefined;
  const related = all.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <ArticleView
      article={article}
      previous={previous}
      next={next}
      related={related}
    />
  );
}
