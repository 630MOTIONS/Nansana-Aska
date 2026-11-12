import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { competitions, formatShortDate, squadLabels } from "@/lib/fixtures";
import type { Fixture } from "@/lib/fixtures";

const sideLabel = { home: "Home", away: "Away", neutral: "Neutral" } as const;
const sideStyle = {
  home: "bg-surface-tint text-navy",
  away: "bg-brand-orange/20 text-gold-deep",
  neutral: "bg-surface-tint text-navy",
} as const;

export default function UpcomingCard({ fixture }: { fixture: Fixture }) {
  const competition = competitions[fixture.competition];

  return (
    <Card
      as="article"
      className="relative flex h-full flex-col focus-within:ring-4 focus-within:ring-brand-orange"
    >
      <div className="flex items-center justify-between gap-2 bg-surface-tint px-4 py-2 text-label font-bold uppercase tracking-wide">
        <span
          className={
            fixture.squad === "men" ? "text-brand-blue" : "text-gold-deep"
          }
        >
          {squadLabels[fixture.squad]}
        </span>
        <span className="text-ink-muted">{fixture.stage}</span>
      </div>

      <div className="flex grow flex-col gap-4 p-5">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={fixture.competition === "womens-cup" ? "gold" : "tint"}
          >
            {competition.label}
          </Badge>
          <span
            className={`rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide ${sideStyle[fixture.side]}`}
          >
            {sideLabel[fixture.side]}
          </span>
        </div>

        <div>
          <p className="font-display text-card font-extrabold uppercase text-navy">
            {fixture.home.name}
          </p>
          <p className="text-label font-semibold uppercase text-ink-muted">
            vs
          </p>
          <p className="font-display text-card font-extrabold uppercase text-navy">
            {fixture.away.name}
          </p>
        </div>

        <div className="space-y-1 rounded-md bg-surface-tint p-3 text-sm text-ink-muted">
          <p className="flex items-center gap-2">
            <Clock size={14} aria-hidden />
            {formatShortDate(fixture.date)}
            {fixture.time ? ` • ${fixture.time} EAT` : ""}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={14} aria-hidden />
            {fixture.venue}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <Badge variant="tint" className="rounded-full px-3">
            Scheduled
          </Badge>
          <Link
            href={`/matches/${fixture.id}`}
            className="text-label font-bold uppercase tracking-wide text-navy after:absolute after:inset-0 after:content-['']"
          >
            Match details →
          </Link>
        </div>
      </div>
    </Card>
  );
}
