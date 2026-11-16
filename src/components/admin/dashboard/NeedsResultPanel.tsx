import Link from "next/link";
import AdminTeamLogo from "@/components/admin/AdminTeamLogo";
import ResultForm from "@/components/admin/ResultForm";
import { StatusBadge } from "@/components/admin/ui";
import Card from "@/components/ui/Card";
import { formatKampala } from "@/lib/admin/time";
import type { AdminMatch } from "@/lib/admin/types";

export default function NeedsResultPanel({
  matches,
  logos,
}: {
  matches: AdminMatch[];
  logos: Record<string, string | null>;
}) {
  if (matches.length === 0) return null;

  return (
    <Card
      as="section"
      className="border-l-4 border-brand-orange p-6"
    >
      <h2 className="text-card text-navy">
        Needs a result{" "}
        <span className="rounded-full bg-brand-orange/25 px-2 py-0.5 align-middle text-label font-bold text-gold-deep">
          {matches.length}
        </span>
      </h2>
      <p className="mt-1 text-sm text-ink-muted">
        These matches have kicked off. Enter the score to update the table.
      </p>

      <ul className="mt-4 divide-y divide-surface-strong">
        {matches.map((match) => (
          <li
            key={match.slug}
            className="flex flex-col gap-3 py-4 xl:flex-row xl:items-center xl:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <AdminTeamLogo
                  name={match.home.name}
                  logoUrl={logos[match.home.slug] ?? null}
                  size="sm"
                />
                <AdminTeamLogo
                  name={match.away.name}
                  logoUrl={logos[match.away.slug] ?? null}
                  size="sm"
                />
              </div>
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
    </Card>
  );
}
