import type { Metadata } from "next";
import { connection } from "next/server";
import NeedsResultPanel from "@/components/admin/dashboard/NeedsResultPanel";
import NextMatchHero from "@/components/admin/dashboard/NextMatchHero";
import RecentResults from "@/components/admin/dashboard/RecentResults";
import RecentResultsList from "@/components/admin/dashboard/RecentResultsList";
import StandingsPanel from "@/components/admin/dashboard/StandingsPanel";
import UpcomingPanel from "@/components/admin/dashboard/UpcomingPanel";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { getStandings, listCompetitions, listMatches, listTeams } from "@/lib/admin/data";
import { outcomeFor, pickCompetition } from "@/lib/admin/dashboard";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await getAuth();
  const query = await props.searchParams;
  const requested = Array.isArray(query.competition)
    ? query.competition[0]
    : query.competition;

  const [matches, teams, competitions] = await Promise.all([
    listMatches({ limit: 200 }),
    listTeams(),
    listCompetitions(),
  ]);

  const selected = pickCompetition(competitions, requested);
  const standings = selected ? await getStandings(selected.slug) : null;

  // The clock changes between renders, so Next.js needs to know this page is
  // rendered per request before it is read. connection() says exactly that.
  await connection();
  const now = Date.now();
  const at = (iso: string) => new Date(iso).getTime();

  const logos: Record<string, string | null> = {};
  const oursSlugs = new Set<string>();
  for (const team of teams) {
    logos[team.slug] = team.logoUrl;
    if (team.isOurs) oursSlugs.add(team.slug);
  }
  const isOurs = (slug: string) => oursSlugs.has(slug);
  const involvesUs = (match: (typeof matches)[number]) =>
    isOurs(match.home.slug) || isOurs(match.away.slug);

  const needsResult = matches
    .filter(
      (match) =>
        (match.status === "scheduled" || match.status === "live") &&
        at(match.kickoffAt) < now,
    )
    .sort((a, b) => at(a.kickoffAt) - at(b.kickoffAt));

  const upcoming = matches
    .filter(
      (match) =>
        match.status === "scheduled" && at(match.kickoffAt) >= now && involvesUs(match),
    )
    .sort((a, b) => at(a.kickoffAt) - at(b.kickoffAt));

  const recent = matches
    .filter((match) => match.status === "final" && involvesUs(match))
    .sort((a, b) => at(b.kickoffAt) - at(a.kickoffAt))
    .slice(0, 6)
    .map((match) => ({ match, outcome: outcomeFor(match, isOurs)?.outcome ?? null }));

  const next = upcoming[0];

  return (
    <div className="space-y-6">
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

      {next ? (
        <NextMatchHero
          match={next}
          home={{
            name: next.home.name,
            logoUrl: logos[next.home.slug] ?? null,
            ours: isOurs(next.home.slug),
          }}
          away={{
            name: next.away.name,
            logoUrl: logos[next.away.slug] ?? null,
            ours: isOurs(next.away.slug),
          }}
        />
      ) : (
        <Card as="section" className="p-8 text-center">
          <h2 className="text-card text-navy">No upcoming match</h2>
          <p className="mx-auto mt-2 max-w-md text-ink-muted">
            When a future match involving one of your teams is scheduled, it
            appears here with a countdown. Teams need “This is a Nansana ASKA
            team” ticked.
          </p>
          <div className="mt-4">
            <Button href="/admin/matches/new">New match</Button>
          </div>
        </Card>
      )}

      <NeedsResultPanel matches={needsResult} logos={logos} />

      <RecentResults results={recent.slice(0, 5)} logos={logos} />

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr]">
        <div className="lg:col-span-2 xl:col-span-1">
          <StandingsPanel
            standings={standings}
            competitions={competitions}
            selected={selected?.slug}
            logos={logos}
          />
        </div>
        <RecentResultsList results={recent} logos={logos} />
        <UpcomingPanel matches={upcoming.slice(0, 6)} logos={logos} />
      </div>
    </div>
  );
}
