import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { heroStats } from "@/lib/team";

function Tile({
  className,
  kicker,
  title,
  large = false,
}: {
  className?: string;
  kicker: string;
  title?: string;
  large?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-card ${className ?? ""}`}
    >
      <MediaPlaceholder className="h-full w-full" />
      <div
        className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-label font-bold uppercase tracking-widest text-gold-soft">
          {kicker}
        </p>
        {title && (
          <p
            className={`font-display font-extrabold uppercase text-white ${
              large ? "text-section" : "text-card"
            }`}
          >
            {title}
          </p>
        )}
      </div>
    </div>
  );
}

export default function TeamHero() {
  return (
    <section className="bg-linear-to-br from-surface-strong via-surface-tint to-surface py-12 lg:py-16">
      <div className="mx-auto grid w-full max-w-site items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <Badge variant="tint" className="rounded-sm px-3">
            <span
              className="h-1.5 w-1.5 rounded-full bg-brand-orange"
              aria-hidden="true"
            />
            Meet the team • Pride of Nansana
          </Badge>

          <h1 className="mt-6 text-hero">
            <span className="block text-ink">The people</span>
            <span className="block text-brand-blue">behind the</span>
            <span className="block text-brand-orange">passion</span>
          </h1>

          <p className="mt-5 max-w-xl text-hero-sub text-ink-muted">
            Meet the players and coaches who represent Nansana ASKA Futsal Club
            with unrelenting commitment, tactical discipline, and civic pride.
            Rooted in Wakiso District, competing for top honors in Uganda’s
            national Futsal Super League.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#squads">Explore our squads</Button>
            <Button href="#coaches" variant="light">
              Meet the coaches
            </Button>
          </div>

          <dl className="mt-8 flex flex-wrap gap-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-32 flex-col-reverse rounded-lg bg-white px-4 py-3 shadow-card"
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

        <div className="grid grid-cols-2 gap-3">
          <Tile
            large
            className="col-span-2 aspect-[16/11]"
            kicker="FAU Super League contenders"
            title="Men’s senior division"
          />
          <Tile className="aspect-[16/10]" kicker="High-intensity speed" />
          <Tile className="aspect-[16/10]" kicker="Women’s Super League" />
        </div>
      </div>
    </section>
  );
}
