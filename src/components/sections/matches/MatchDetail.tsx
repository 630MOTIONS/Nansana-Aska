import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, CalendarDays, Shield } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { competitions, formatLongDate } from "@/lib/fixtures";
import type { Fixture, TeamRef } from "@/lib/fixtures";
import { siteConfig } from "@/lib/site";

function Side({ team }: { team: TeamRef }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white p-2 text-navy shadow-card">
        {team.isClub ? (
          <Image src={siteConfig.crest} alt="" width={56} height={56} />
        ) : (
          <Shield size={28} aria-hidden />
        )}
      </span>
      <h2 className="text-section text-navy">{team.name}</h2>
    </div>
  );
}

export default function MatchDetail({ fixture }: { fixture: Fixture }) {
  const competition = competitions[fixture.competition];
  const final = fixture.status === "final" && fixture.score;

  return (
    <main id="main" className="bg-surface pb-16 pt-8">
      <div className="mx-auto w-full max-w-4xl px-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-label font-semibold uppercase tracking-wide text-ink-muted">
            <li>
              <Link href="/" className="hover:text-navy">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/matches" className="hover:text-navy">
                Matches
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-navy">
              {fixture.stage}: {fixture.home.name} vs {fixture.away.name}
            </li>
          </ol>
        </nav>

        <Card className="mt-6 p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={final ? "tint" : "orange"}>
                {final ? "Full time" : "Scheduled"}
              </Badge>
              <h1 className="text-card text-navy">
                {competition.label} • {fixture.stage}
              </h1>
            </div>
            <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
              <CalendarDays size={16} aria-hidden />
              {formatLongDate(fixture.date)}
              {fixture.time ? ` • ${fixture.time} EAT` : ""}
            </p>
          </div>

          <div className="mt-6 grid items-center gap-6 rounded-xl bg-surface-tint p-6 md:grid-cols-[1fr_auto_1fr]">
            <Side team={fixture.home} />
            <p className="text-center font-display text-hero font-extrabold text-brand-blue">
              {final ? (
                <>
                  {fixture.score![0]}
                  <span className="px-2 text-ink-muted">:</span>
                  {fixture.score![1]}
                </>
              ) : (
                "VS"
              )}
            </p>
            <Side team={fixture.away} />
          </div>

          <section
            aria-label="Venue"
            className="mt-6 rounded-xl bg-surface-tint p-5"
          >
            <h2 className="inline-flex items-center gap-2 text-card text-navy">
              <Building2 size={20} aria-hidden /> Venue
            </h2>
            <p className="mt-2 text-ink-muted">{fixture.venue}</p>
          </section>

          <p className="mt-6 rounded-lg bg-surface-tint p-4 text-sm text-ink-muted">
            Ticketing, head-to-head records and squad news will be published
            here once the club has confirmed them.
          </p>

          <div className="mt-8 flex flex-wrap justify-between gap-3">
            <Button
              href="/matches"
              variant="light"
              icon={<ArrowLeft size={14} aria-hidden />}
              className="bg-surface-tint"
            >
              Back to all fixtures
            </Button>
            <Button href="/highlights" variant="dark">
              Watch previous highlights
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
