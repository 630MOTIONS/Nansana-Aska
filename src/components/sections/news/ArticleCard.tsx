import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import Card from "@/components/ui/Card";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import type { Article, TagTone } from "@/lib/articles";

export const tagClasses: Record<TagTone, string> = {
  navy: "bg-navy text-white",
  blue: "bg-brand-blue text-white",
  orange: "bg-brand-orange text-ink",
  gold: "bg-brand-gold text-ink",
};

const textTiles = {
  navy: "bg-navy text-white",
  gold: "bg-gold-deep text-white",
  deep: "bg-navy-deep text-white",
} as const;

export default function ArticleCard({ article }: { article: Article }) {
  const { visual } = article;

  return (
    <Card as="article" className="group relative flex h-full flex-col focus-within:ring-4 focus-within:ring-brand-orange">
      <div className="relative">
        {visual.type === "text" ? (
          <div
            className={`flex aspect-video flex-col justify-end gap-1 p-5 ${textTiles[visual.tone]}`}
          >
            <p className="font-display text-section font-extrabold uppercase leading-none">
              {visual.headline}
            </p>
            {visual.sub && (
              <p className="text-label font-semibold uppercase tracking-widest text-white/80">
                {visual.sub}
              </p>
            )}
          </div>
        ) : article.image ? (
          <div className="relative aspect-video">
            <Image
              src={article.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <MediaPlaceholder className="aspect-video" />
        )}
        <span
          className={`absolute left-3 top-3 rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide ${tagClasses[article.tagTone]}`}
        >
          {article.tag}
        </span>
      </div>

      <div className="flex grow flex-col gap-3 p-5">
        <h3 className="line-clamp-3 text-card text-navy">
          <Link
            href={`/news/${article.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-ink-muted">{article.excerpt}</p>
        <p className="mt-auto flex items-center justify-between rounded-md bg-surface-tint px-3 py-2 text-label font-semibold uppercase tracking-wide text-ink-muted">
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </p>
      </div>
    </Card>
  );
}
