import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import type { Article } from "@/lib/articles";

const ticker = [
  "Official club news",
  "Match reports",
  "Community stories",
  "Wakiso District futsal media",
];

export default function NewsHero({
  latest,
  featured,
}: {
  latest?: Article;
  featured?: Article;
}) {
  return (
    <section className="bg-white pt-10">
      <div className="mx-auto grid w-full max-w-site items-center gap-10 px-4 pb-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Badge variant="tint" className="rounded-full px-3">
            The latest from the club • Pride of Nansana
          </Badge>
          <h1 className="mt-6 text-hero text-brand-blue">
            News, stories & updates
          </h1>
          <p className="mt-5 max-w-xl text-hero-sub text-ink-muted">
            Stay connected with Nansana ASKA Futsal Club through official
            announcements, match stories, tactical reports, academy
            breakthroughs, and community initiatives across Wakiso District.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#feed" icon={<ArrowDown size={14} aria-hidden />}>
              Read latest stories
            </Button>
            {featured && (
              <Button
                href={`/news/${featured.slug}`}
                variant="light"
                icon={<ArrowRight size={14} aria-hidden />}
                className="border border-surface-strong"
              >
                Featured story
              </Button>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-card">
          <MediaPlaceholder className="aspect-[4/3]" />
          <Badge variant="onDark" className="absolute right-3 top-3">
            Matchday action
          </Badge>
          {latest && (
            <Card className="absolute inset-x-4 bottom-4 p-4">
              <p className="text-label font-bold uppercase tracking-widest text-gold-deep">
                Latest story • {latest.tag}
              </p>
              <h2 className="mt-1 line-clamp-2 text-card text-navy">
                {latest.title}
              </h2>
              <p className="mt-1 text-label text-ink-muted">{latest.date}</p>
              <Link
                href={`/news/${latest.slug}`}
                className="mt-2 inline-flex items-center gap-1.5 text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
              >
                Read story <ArrowRight size={12} aria-hidden />
              </Link>
            </Card>
          )}
        </div>
      </div>

      <ul className="border-y border-surface-strong bg-surface">
        <li className="mx-auto flex w-full max-w-site flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 text-label font-semibold uppercase tracking-widest text-ink-muted">
          {ticker.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </li>
      </ul>
    </section>
  );
}
