import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import TextLink from "@/components/ui/TextLink";
import { nextMatch, recentResults } from "@/lib/matches";
import type { MatchResult, Team } from "@/lib/matches";
import { siteConfig } from "@/lib/site";

const outcomeLabel: Record<MatchResult["outcome"], string> = {
  win: "Win",
  draw: "Draw",
  loss: "Loss",
};

function TeamMark({ team, size }: { team: Team; size: "sm" | "lg" }) {
  const large = size === "lg";

  if (team.isClub) {
    return (
      <span
        className={`flex shrink-0 ${large ? "rounded-xl bg-surface-tint p-2" : ""}`}
      >
        <Image
          src={siteConfig.crest}
          alt=""
          width={large ? 64 : 32}
          height={large ? 64 : 32}
          className={large ? "h-16 w-16" : "h-8 w-8"}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center bg-surface-tint font-bold text-ink-muted ${
        large
          ? "h-20 w-20 rounded-xl text-xl"
          : "h-8 w-8 rounded-md text-[0.625rem]"
      }`}
    >
      {team.initials}
    </span>
  );
}

function MatchTeam({ team, note }: { team: Team; note: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <TeamMark team={team} size="lg" />
      <h3 className="text-card text-navy">{team.name}</h3>
      <Badge>{note}</Badge>
    </div>
  );
}

export default function MatchCentre() {
  return (
    <section
      aria-label="Fixtures and recent results"
      className="mx-auto w-full max-w-site px-4 py-16"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Match Centre"
          eyebrowIcon={
            <CalendarDays size={16} className="text-brand-orange" aria-hidden />
          }
          title="Fixtures & Recent Results"
        />
        <TextLink href="/matches">View full standings &amp; schedule</TextLink>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card as="article" className="flex flex-col gap-6 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-surface-tint px-4 py-3">
            <Badge variant="orange">
              Next fixture &bull; Matchday {nextMatch.matchday}
            </Badge>
            <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
              <CalendarDays size={14} aria-hidden />
              {nextMatch.kickoff}
            </p>
          </div>

          <div className="grid grow items-center gap-6 py-4 sm:grid-cols-[1fr_auto_1fr]">
            <MatchTeam team={nextMatch.home} note={nextMatch.homeNote} />
            <div className="text-center">
              <p className="font-display text-3xl font-extrabold text-brand-blue">
                VS
              </p>
              <p className="text-label uppercase text-ink-muted">
                {nextMatch.venue}
              </p>
            </div>
            <MatchTeam team={nextMatch.away} note={nextMatch.awayNote} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-surface-tint px-4 py-3">
            <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
              <MapPin size={16} className="text-brand-orange" aria-hidden />
              {nextMatch.venue} &bull; {nextMatch.competition}
            </p>
            <Button href="/matches" variant="dark">
              Match day protocol
            </Button>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          {recentResults.map((result) => (
            <Card key={result.id} as="article" className="p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-label font-semibold uppercase tracking-wide text-ink-muted">
                  {result.competition} &bull; Matchday {result.matchday}
                </p>
                <Badge variant={result.outcome === "win" ? "orange" : "tint"}>
                  Full time ({outcomeLabel[result.outcome]})
                </Badge>
              </div>

              <ul className="mt-4 space-y-3">
                {result.rows.map((row) => (
                  <li
                    key={row.team.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="flex items-center gap-3">
                      <TeamMark team={row.team} size="sm" />
                      <span className="font-display text-xl font-extrabold uppercase text-navy">
                        {row.team.name}
                      </span>
                    </span>
                    <span
                      className={`font-display text-4xl font-extrabold ${
                        row.team.isClub ? "text-navy" : "text-ink-muted"
                      }`}
                    >
                      {row.score}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-right text-label text-ink-muted">
                {result.footnote}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
