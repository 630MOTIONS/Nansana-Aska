import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  PenLine,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { articleCategories } from "@/lib/articles";
import type { Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

type ArticleViewProps = {
  article: Article;
  previous?: Article;
  next?: Article;
  related: Article[];
};

export default function ArticleView({
  article,
  previous,
  next,
  related,
}: ArticleViewProps) {
  const categoryLabel = articleCategories.find(
    (c) => c.id === article.category,
  )?.label;
  const hasBody = article.body && article.body.length > 0;

  return (
    <main id="main" className="bg-white pb-16 pt-8">
      <article className="mx-auto w-full max-w-3xl px-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-label font-semibold uppercase tracking-wide text-ink-muted">
            <li>
              <Link href="/" className="hover:text-navy">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/news" className="hover:text-navy">
                News & Blog
              </Link>
            </li>
            {categoryLabel && (
              <>
                <li aria-hidden="true">/</li>
                <li>{categoryLabel}</li>
              </>
            )}
          </ol>
        </nav>

        <Badge variant="tint" className="mt-6">
          {article.tag}
        </Badge>
        <h1 className="mt-4 text-hero text-brand-blue">{article.title}</h1>
        <p className="mt-4 text-hero-sub text-ink-muted">{article.excerpt}</p>

        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg bg-surface-tint px-4 py-3 text-label font-semibold uppercase tracking-wide text-ink-muted">
          {article.author && (
            <span className="inline-flex items-center gap-1.5">
              <PenLine size={14} aria-hidden /> {article.author}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} aria-hidden /> {article.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} aria-hidden /> {article.readTime}
          </span>
        </p>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
          {article.image ? (
            <Image
              src={article.image}
              alt=""
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <MediaPlaceholder className="absolute inset-0 h-full w-full" />
          )}
        </div>

        <div className="mt-10 space-y-5 text-ink">
          {hasBody ? (
            article.body!.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2 key={index} className="pt-4 text-section text-navy">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={index}
                    className="rounded-r-lg border-l-4 border-brand-orange bg-surface-tint p-6"
                  >
                    <p className="font-display text-card font-bold uppercase italic text-navy">
                      “{block.text}”
                    </p>
                    <footer className="mt-3 text-label font-bold uppercase tracking-widest text-gold-deep">
                      — {block.attribution}
                    </footer>
                  </blockquote>
                );
              }
              return <p key={index}>{block.text}</p>;
            })
          ) : (
            <p className="rounded-lg bg-surface-tint p-6 text-ink-muted">
              The full article will appear here once the club has approved it.
            </p>
          )}
        </div>

        {article.tags && article.tags.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li key={tag}>
                <Badge>#{tag}</Badge>
              </li>
            ))}
          </ul>
        )}

        <nav
          aria-label="Article navigation"
          className="mt-10 grid gap-3 border-t border-surface-strong pt-6 sm:grid-cols-[auto_1fr_1fr]"
        >
          <Button
            href="/news"
            variant="light"
            icon={<ArrowLeft size={14} aria-hidden />}
            className="order-first bg-surface-tint"
          >
            Back to all news
          </Button>
          {previous ? (
            <Link
              href={`/news/${previous.slug}`}
              className="rounded-md bg-surface-tint p-3 text-center"
            >
              <span className="block text-label uppercase tracking-widest text-ink-muted">
                Previous article
              </span>
              <span className="line-clamp-1 text-sm font-bold text-navy">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/news/${next.slug}`}
              className="rounded-md bg-surface-tint p-3 text-center"
            >
              <span className="block text-label uppercase tracking-widest text-ink-muted">
                Next article
              </span>
              <span className="line-clamp-1 text-sm font-bold text-navy">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      {related.length > 0 && (
        <section
          aria-label="You may also like"
          className="mx-auto mt-16 w-full max-w-site px-4"
        >
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-section text-brand-blue">You may also like</h2>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-label font-bold uppercase tracking-wide text-gold-deep"
            >
              Explore all news <ArrowRight size={12} aria-hidden />
            </Link>
          </div>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <ArticleCard article={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
