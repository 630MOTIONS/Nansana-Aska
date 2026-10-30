import { MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import TextLink from "@/components/ui/TextLink";
import {
  competitions,
  formatDateOnly,
  resultFor,
  squadShort,
} from "@/lib/fixtures";
import type { Fixture } from "@/lib/fixtures";

export default function ResultCard({ fixture }: { fixture: Fixture }) {
  const [homeScore, awayScore] = fixture.score as [number, number];
  const outcome = resultFor(fixture);
  const clubIsHome = Boolean(fixture.home.isClub);
  const homeWon = homeScore > awayScore;
  const awayWon = awayScore > homeScore;

  return (
    <Card as="article" className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-label font-semibold uppercase tracking-wide text-ink-muted">
          {squadShort[fixture.squad]} {competitions[fixture.competition].short}{" "}
          • {fixture.stage} • {formatDateOnly(fixture.date)}
        </p>
        <Badge>Full time</Badge>
      </div>

      <div
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-lg bg-surface-tint px-4 py-3"
        role="group"
        aria-label={`${fixture.home.name} ${homeScore}, ${fixture.away.name} ${awayScore}`}
      >
        <div>
          <p className="font-display text-card font-extrabold uppercase text-navy">
            {fixture.home.name}
          </p>
          {homeWon && (
            <p className="text-label font-bold uppercase tracking-wide text-gold-deep">
              Winner
            </p>
          )}
        </div>
        <p className="font-display text-4xl font-extrabold">
          <span className={clubIsHome ? "text-navy" : "text-ink-muted"}>
            {homeScore}
          </span>
          <span className="px-1 text-ink-muted">:</span>
          <span className={clubIsHome ? "text-ink-muted" : "text-navy"}>
            {awayScore}
          </span>
        </p>
        <div className="text-right">
          <p className="font-display text-card font-extrabold uppercase text-navy">
            {fixture.away.name}
          </p>
          {awayWon && (
            <p className="text-label font-bold uppercase tracking-wide text-gold-deep">
              Winner
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
          <MapPin size={14} aria-hidden />
          {fixture.venue}
          {outcome === "loss" ? "" : ""}
        </p>
        <TextLink href="/highlights" className="text-label">
          Match recap & highlights
        </TextLink>
      </div>
    </Card>
  );
}
