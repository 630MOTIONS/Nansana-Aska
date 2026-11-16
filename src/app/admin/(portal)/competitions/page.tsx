import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { getAuth } from "@/lib/admin/auth";
import { listCompetitions } from "@/lib/admin/data";

export const metadata: Metadata = { title: "Competitions" };

export default async function CompetitionsPage() {
  await getAuth();
  const competitions = await listCompetitions();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-section text-navy">Competitions</h1>
          <p className="mt-1 text-ink-muted">
            A competition is one league or cup in one season. Its table is
            calculated from the final results of its matches.
          </p>
        </div>
        <Button href="/admin/competitions/new">New competition</Button>
      </div>

      {competitions.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-ink-muted shadow-card">
          No competitions yet.
        </p>
      ) : (
        <ul className="divide-y divide-surface-strong overflow-hidden rounded-xl bg-white shadow-card">
          {competitions.map((competition) => (
            <li key={competition.slug}>
              <Link
                href={`/admin/competitions/${competition.slug}`}
                className="flex flex-wrap items-center gap-4 px-4 py-4 hover:bg-surface-tint"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-navy">
                    {competition.name}
                  </span>
                  <span className="block text-sm text-ink-muted">
                    {competition.season} ·{" "}
                    {competition.squad === "women" ? "Women’s" : "Men’s"} ·{" "}
                    {competition.teams.length}{" "}
                    {competition.teams.length === 1 ? "team" : "teams"} ·{" "}
                    {competition.matchCount}{" "}
                    {competition.matchCount === 1 ? "match" : "matches"}
                  </span>
                </span>
                {competition.teams.length < 2 && (
                  <span className="rounded-sm bg-brand-orange/25 px-2 py-1 text-label font-bold uppercase text-gold-deep">
                    Needs teams
                  </span>
                )}
                <span className="text-label font-bold uppercase tracking-wide text-navy">
                  Edit
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
