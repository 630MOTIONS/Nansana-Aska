import Link from "next/link";
import AdminTeamLogo from "@/components/admin/AdminTeamLogo";
import type { RecentResult } from "@/components/admin/dashboard/RecentResults";
import Card from "@/components/ui/Card";
import type { Outcome } from "@/lib/admin/dashboard";
import { formatKampalaDate } from "@/lib/admin/time";

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

export default function RecentResultsList({
  results,
  logos,
}: {
  results: RecentResult[];
  logos: Record<string, string | null>;
}) {
  return (
    <Card as="section" className="p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-card text-navy">Recent matches</h2>
        <Link
          href="/admin/matches?status=final"
          className="text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
        >
          View all →
        </Link>
      </div>

      {results.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">
          No results yet. They appear here once you enter a final score.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-surface-strong">
          {results.map(({ match, outcome }) => (
            <li key={match.slug}>
              <Link
                href={`/admin/matches/${match.slug}`}
                className="block py-3 hover:bg-surface-tint"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-label font-semibold uppercase tracking-wide text-ink-muted">
                    {formatKampalaDate(match.kickoffAt)} ·{" "}
                    {match.competition.name}
                  </p>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="text-label font-bold uppercase text-ink-muted">
                      FT
                    </span>
                    {outcome && (
                      <span
                        title={outcomeLabel[outcome]}
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-label font-bold ${outcomeStyle[outcome]}`}
                      >
                        <span aria-hidden="true">{outcome}</span>
                        <span className="sr-only">{outcomeLabel[outcome]}</span>
                      </span>
                    )}
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <AdminTeamLogo
                      name={match.home.name}
                      logoUrl={logos[match.home.slug] ?? null}
                      size="sm"
                    />
                    <span className="truncate text-sm font-semibold text-navy">
                      {match.home.name}
                    </span>
                  </span>
                  <span className="font-display text-xl font-extrabold text-navy">
                    {match.homeScore ?? "–"} – {match.awayScore ?? "–"}
                  </span>
                  <span className="flex min-w-0 items-center justify-end gap-2">
                    <span className="truncate text-right text-sm font-semibold text-navy">
                      {match.away.name}
                    </span>
                    <AdminTeamLogo
                      name={match.away.name}
                      logoUrl={logos[match.away.slug] ?? null}
                      size="sm"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
