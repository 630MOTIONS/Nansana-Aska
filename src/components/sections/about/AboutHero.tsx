import { ArrowRight, Images } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { aboutStats } from "@/lib/about";

export default function AboutHero() {
  return (
    <section className="bg-surface py-12 lg:py-16">
      <div className="mx-auto grid w-full max-w-site items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <Badge variant="tint" className="rounded-full px-3">
            <span
              className="h-1.5 w-1.5 rounded-full bg-brand-gold"
              aria-hidden="true"
            />
            About the club
          </Badge>

          <h1 className="mt-6 text-hero text-brand-blue">
            More than a game.
            <span className="block text-brand-orange">
              A club with purpose.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-hero-sub text-ink-muted">
            Discover Nansana ASKA Futsal Club, its identity, its ambitions and
            the people who contribute to its journey. Rooted in Wakiso District,
            advancing competitive futsal across Uganda.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/team" icon={<ArrowRight size={14} aria-hidden />}>
              Explore our team
            </Button>
            <Button
              href="/gallery"
              variant="light"
              icon={<Images size={16} aria-hidden />}
            >
              View our gallery
            </Button>
          </div>

          <dl className="mt-10 flex gap-6">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse border-l border-ink/15 pl-6 first:border-l-0 first:pl-0"
              >
                <dt className="text-label font-semibold uppercase tracking-wide text-ink-muted">
                  {stat.label}
                </dt>
                <dd
                  className={`font-display text-4xl font-extrabold leading-none ${stat.valueClass}`}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-card">
          <MediaPlaceholder className="aspect-[4/3]" />
          <div
            className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-label font-bold uppercase tracking-widest text-gold-soft">
              National stage
            </p>
            <p className="font-display text-card font-extrabold uppercase text-white">
              Uganda Super League matchday
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
