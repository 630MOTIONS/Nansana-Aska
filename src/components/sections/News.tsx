import { Newspaper } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import TextLink from "@/components/ui/TextLink";
import { newsPosts } from "@/lib/news";

export default function News() {
  return (
    <section
      aria-label="Latest news"
      className="mx-auto w-full max-w-site px-4 py-16"
    >
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
        {newsPosts.map((post) => (
          <Card key={post.slug} as="article" className="flex flex-col">
            <div className="relative">
              <MediaPlaceholder className="aspect-video" />
              <Badge
                variant={post.tagVariant}
                className="absolute left-3 top-3"
              >
                {post.tag}
              </Badge>
            </div>
            <div className="flex grow flex-col p-5">
              <p className="text-label font-semibold uppercase tracking-wide text-ink-muted">
                {post.date} &bull; {post.category}
              </p>
              <h3 className="mt-3 line-clamp-3 text-card text-navy">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-ink-muted">{post.excerpt}</p>
              <TextLink href={post.href} className="mt-auto pt-5">
                Read story
              </TextLink>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
