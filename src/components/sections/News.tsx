import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { tagClasses } from "@/components/sections/news/ArticleCard";
import Card from "@/components/ui/Card";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import TextLink from "@/components/ui/TextLink";
import type { Article } from "@/lib/articles";

// `articles` are the latest published ones, newest first.
export default function News({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section aria-label="Latest news" className="mx-auto w-full max-w-site px-4 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Press & Stories"
          eyebrowIcon={
            <Newspaper size={16} className="text-brand-orange" aria-hidden />
          }
          title="Latest News & Club Updates"
          description="Official announcements, match reports, and player spotlights."
        />
        <TextLink href="/news">View all news &amp; articles</TextLink>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((post) => (
          <Card key={post.slug} as="article" className="flex flex-col">
            <div className="relative">
              {post.image ? (
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <MediaPlaceholder className="aspect-video" />
              )}
              <span
                className={`absolute left-3 top-3 rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide ${tagClasses[post.tagTone]}`}
              >
                {post.tag}
              </span>
            </div>
            <div className="flex grow flex-col p-5">
              <p className="text-label font-semibold uppercase tracking-wide text-ink-muted">
                {post.date}
              </p>
              <h3 className="mt-3 line-clamp-3 text-card text-navy">
                <Link href={`/news/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-3 line-clamp-3 text-sm text-ink-muted">
                {post.excerpt}
              </p>
              <TextLink href={`/news/${post.slug}`} className="mt-auto pt-5">
                Read story
              </TextLink>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
