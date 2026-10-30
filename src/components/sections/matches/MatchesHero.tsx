import { ArrowDown } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { nextMatch } from "@/lib/matches";

export default function MatchesHero() {
  return (
    <section className="bg-linear-to-br from-navy via-navy to-navy-deep py-14 text-white lg:py-20">
      <div className="mx-auto w-full max-w-site px-4">
        <Badge variant="onDark" className="rounded-full px-3">
          FAU Futsal Super League • Fixture centre
        </Badge>
        <h1 className="mt-6 max-w-3xl text-hero">
          Fixtures, results & match days
        </h1>
        <p className="mt-5 max-w-2xl text-hero-sub text-white/85">
          Stay up to date with Nansana ASKA Futsal Club’s upcoming fixtures,
          results, and venue match-day information for our men’s and women’s
          squads.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#upcoming" icon={<ArrowDown size={14} aria-hidden />}>
            View upcoming fixtures
          </Button>
          <Button
            href="#results"
            variant="secondary"
            icon={<ArrowDown size={14} aria-hidden />}
          >
            Previous results & scoreboards
          </Button>
        </div>

        <p className="mt-8 inline-flex flex-wrap items-center gap-2 rounded-full bg-white px-4 py-2 text-label font-bold text-navy">
          <span
            className="h-2 w-2 rounded-full bg-brand-orange"
            aria-hidden="true"
          />
          <span className="uppercase tracking-wide text-gold-deep">
            Next fixture:
          </span>
          Matchday {nextMatch.matchday} vs {nextMatch.away.name} •{" "}
          {nextMatch.venue}
        </p>
      </div>
    </section>
  );
}
