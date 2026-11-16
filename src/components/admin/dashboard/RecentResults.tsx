import Link from "next/link";
import AdminTeamLogo from "@/components/admin/AdminTeamLogo";
import Card from "@/components/ui/Card";
import type { Outcome } from "@/lib/admin/dashboard";
import { formatKampalaDate } from "@/lib/admin/time";
import type { AdminMatch } from "@/lib/admin/types";

export type RecentResult = {
  match: AdminMatch;
  outcome: Outcome | null;
};

const outcomeStyle: Record<Outcome, string> = {
  W: "bg-brand-gold text-ink",
  D: "bg-surface-strong text-navy",
  L: "bg-red-100 text-red-800",
};

const outcomeLabel: Record<Outcome, string> = {
  W: "Win",
  D: "Draw",
  L: "Loss",
};

function Row({
  name,
  logoUrl,
  score,
}: {
  name: string;
  logoUrl: string | null;
  score: number | null;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex min-w-0 items-center gap-2">
        <AdminTeamLogo name={name} logoUrl={logoUrl} size="sm" />
        <span className="truncate text-sm font-semibold text-navy">{name}</span>
      </span>
      <span className="font-display text-xl font-extrabold text-navy">
        {score ?? "–"}
      </span>
    </div>
  );
}

export default function RecentResults({
  results,
  logos,
}: {
  results: RecentResult[];
  logos: Record<string, string | null>;
}) {
  return (
    <section aria-label="Recent results">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-card text-navy">Recent results</h2>
        <Link
          href="/admin/matches?status=final"
          className="text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
        >
          View all →
        </Link>
      </div>

      {results.length === 0 ? (
        <Card className="mt-3 p-6 text-sm text-ink-muted">
          No results yet. They appear here once you enter a final score.
        </Card>
      ) : (
        <ul className="mt-3 flex snap-x gap-3 overflow-x-auto pb-2">
          {results.map(({ match, outcome }) => (
            <li key={match.slug} className="w-64 shrink-0 snap-start">
              <Link
                href={`/admin/matches/${match.slug}`}
                className="block h-full rounded-xl bg-white p-4 shadow-card transition-shadow hover:shadow-lg"
              >
                <p className="truncate text-label font-semibold uppercase tracking-wide text-ink-muted">
                  {formatKampalaDate(match.kickoffAt)} · {match.stage}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <Row
                      name={match.home.name}
                      logoUrl={logos[match.home.slug] ?? null}
                      score={match.homeScore}
                    />
                    <Row
                      name={match.away.name}
                      logoUrl={logos[match.away.slug] ?? null}
                      score={match.awayScore}
                    />
                  </div>
                  {outcome && (
                    <span
                      title={outcomeLabel[outcome]}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${outcomeStyle[outcome]}`}
                    >
                      <span aria-hidden="true">{outcome}</span>
                      <span className="sr-only">{outcomeLabel[outcome]}</span>
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
