import type { Metadata } from "next";
import Link from "next/link";
import ResultForm from "@/components/admin/ResultForm";
import { StatusBadge } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { listMatches } from "@/lib/admin/data";
import { formatKampala } from "@/lib/admin/time";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { user } = await getAuth();
  const matches = await listMatches({ limit: 200 });

  // Read after the data above, which is what lets this page use the clock.
  const now = Date.now();
  const kickoff = (iso: string) => new Date(iso).getTime();

  const needsResult = matches
    .filter(
      (match) =>
        (match.status === "scheduled" || match.status === "live") &&
        kickoff(match.kickoffAt) < now,
    )
    .sort((a, b) => kickoff(a.kickoffAt) - kickoff(b.kickoffAt));

  const upcoming = matches
    .filter((match) => match.status === "scheduled" && kickoff(match.kickoffAt) >= now)
    .sort((a, b) => kickoff(a.kickoffAt) - kickoff(b.kickoffAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-section text-navy">
            Welcome, {user.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-ink-muted">
            Enter results and manage fixtures for the website.
          </p>
        </div>
        <Button href="/admin/matches/new">New match</Button>
      </div>

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Needs a result</h2>
        {needsResult.length === 0 ? (
          <p className="mt-3 text-ink-muted">
            Nothing waiting. Every match that has kicked off has a result.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-surface-strong">
            {needsResult.map((match) => (
              <li
                key={match.slug}
                className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <p className="font-semibold text-navy">
                    <Link
                      href={`/admin/matches/${match.slug}`}
                      className="hover:text-brand-blue"
                    >
                      {match.home.name} vs {match.away.name}
                    </Link>
                  </p>
                  <p className="text-sm text-ink-muted">
                    {match.competition.name} · {match.stage} ·{" "}
                    {formatKampala(match.kickoffAt)}
                  </p>
                  <div className="mt-1">
                    <StatusBadge status={match.status} needsResult />
                  </div>
                </div>
                <ResultForm
                  slug={match.slug}
                  homeName={match.home.name}
                  awayName={match.away.name}
                  homeScore={match.homeScore}
                  awayScore={match.awayScore}
                  status={match.status}
                />
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card as="section" className="p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-card text-navy">Upcoming matches</h2>
          <Link
            href="/admin/matches"
            className="text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
          >
            All matches →
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="mt-3 text-ink-muted">No upcoming matches yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-surface-strong">
            {upcoming.map((match) => (
              <li
                key={match.slug}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <div>
                  <p className="font-semibold text-navy">
                    {match.home.name} vs {match.away.name}
                  </p>
                  <p className="text-sm text-ink-muted">
                    {match.competition.name} · {formatKampala(match.kickoffAt)}
                  </p>
                </div>
                <Link
                  href={`/admin/matches/${match.slug}`}
                  className="text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

// Admin routes resolve the signed-in user before rendering, so they
// are allowed to block instead of showing an instant static shell.
export const instant = false;
