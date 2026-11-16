import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import { getAuth } from "@/lib/admin/auth";
import { listCompetitions, listMatches } from "@/lib/admin/data";
import { formatKampala } from "@/lib/admin/time";
import type { MatchStatus } from "@/lib/admin/types";

export const metadata: Metadata = { title: "Matches" };

const statuses: MatchStatus[] = [
  "scheduled",
  "live",
  "final",
  "postponed",
  "cancelled",
];

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function MatchesPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await getAuth();
  const query = await props.searchParams;

  const competitions = await listCompetitions();
  const competitionParam = first(query.competition);
  const statusParam = first(query.status);

  const competition = competitions.some((item) => item.slug === competitionParam)
    ? competitionParam
    : undefined;
  const status = statuses.find((item) => item === statusParam);

  const matches = await listMatches({ competition, status, limit: 200 });
  const now = Date.now();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-section text-navy">Matches</h1>
        <Button href="/admin/matches/new">New match</Button>
      </div>

      <form method="get" className="flex flex-wrap items-end gap-3">
        <div>
          <label
            htmlFor="filter-competition"
            className="mb-1.5 block text-label font-bold uppercase tracking-wide text-ink"
          >
            Competition
          </label>
          <select
            id="filter-competition"
            name="competition"
            defaultValue={competition ?? ""}
            className={controlClass}
          >
            <option value="">All competitions</option>
            {competitions.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name} ({item.season})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="filter-status"
            className="mb-1.5 block text-label font-bold uppercase tracking-wide text-ink"
          >
            Status
          </label>
          <select
            id="filter-status"
            name="status"
            defaultValue={status ?? ""}
            className={controlClass}
          >
            <option value="">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item[0].toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="dark">
          Filter
        </Button>
        <Link
          href="/admin/matches"
          className="py-2 text-sm font-semibold text-navy hover:text-brand-blue"
        >
          Clear
        </Link>
      </form>

      {matches.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-ink-muted shadow-card">
          No matches found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-card">
          <table className="w-full min-w-[44rem] text-sm">
            <caption className="sr-only">Matches, newest kick-off first</caption>
            <thead className="bg-surface-tint">
              <tr className="text-left text-label font-bold uppercase tracking-wide text-ink-muted">
                <th scope="col" className="px-4 py-3">Kick-off</th>
                <th scope="col" className="px-4 py-3">Competition</th>
                <th scope="col" className="px-4 py-3">Match</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Score</th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => {
                const needsResult =
                  (match.status === "scheduled" || match.status === "live") &&
                  new Date(match.kickoffAt).getTime() < now;
                return (
                  <tr key={match.slug} className="border-t border-surface-strong">
                    <td className="px-4 py-3 text-ink-muted">
                      {formatKampala(match.kickoffAt)}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">
                      {match.competition.name}
                      <span className="block text-label">{match.stage}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-navy">
                      {match.home.name} vs {match.away.name}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={match.status} needsResult={needsResult} />
                    </td>
                    <td className="px-4 py-3 font-display text-lg font-extrabold text-navy">
                      {match.homeScore !== null && match.awayScore !== null
                        ? `${match.homeScore} – ${match.awayScore}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/matches/${match.slug}`}
                        className="text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Admin routes resolve the signed-in user before rendering, so they
// are allowed to block instead of showing an instant static shell.
export const instant = false;
