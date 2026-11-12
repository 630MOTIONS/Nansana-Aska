import { MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import TeamLogo from "@/components/ui/TeamLogo";
import { getClubLogo } from "@/lib/clubs";
import {
  competitions,
  formatLongDate,
  ordinal,
  positionOf,
} from "@/lib/fixtures";
import type { Fixture, TeamRef } from "@/lib/fixtures";

function TeamPanel({ team, label }: { team: TeamRef; label: string }) {
  const position = positionOf(team.key);
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-label font-bold uppercase tracking-widest text-gold-soft">
        {label}
      </p>
      <TeamLogo
        name={team.name}
        isClub={team.isClub}
        logo={getClubLogo(team.key)}
        size="lg"
      />
      <h3 className="text-section text-white">{team.name}</h3>
      {position && (
        <p className="text-label font-semibold uppercase tracking-wide text-white/70">
          {ordinal(position)} position
        </p>
      )}
    </div>
  );
}

export default function FeaturedFixture({ fixture }: { fixture: Fixture }) {
  const competition = competitions[fixture.competition];

  return (
    <article className="overflow-hidden rounded-2xl bg-linear-to-br from-navy to-navy-deep text-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:px-8">
        <Badge variant="onDark">
          {competition.label} • {fixture.stage}
        </Badge>
        <Badge variant="orange">Scheduled</Badge>
      </div>

      <div className="grid items-center gap-8 px-5 py-8 sm:px-8 md:grid-cols-[1fr_auto_1fr]">
        <TeamPanel team={fixture.home} label="Home side" />
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="rounded-lg bg-brand-gold px-4 py-3 font-display text-3xl font-extrabold text-ink">
            VS
          </span>
          {fixture.time && (
            <p className="font-display text-2xl font-bold text-gold-soft">
              {fixture.time} EAT
            </p>
          )}
          <p className="text-label font-semibold uppercase tracking-wide text-white/80">
            {formatLongDate(fixture.date)}
          </p>
        </div>
        <TeamPanel team={fixture.away} label="Away side" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/10 px-5 py-4 sm:px-8">
        <p className="inline-flex items-center gap-2 text-sm text-white/85">
          <MapPin size={16} className="text-brand-orange" aria-hidden />
          {fixture.venue}
        </p>
        <Button href={`/matches/${fixture.id}`}>Match preview & details</Button>
      </div>
    </article>
  );
}
