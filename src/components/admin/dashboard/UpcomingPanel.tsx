import Link from "next/link";
import AdminTeamLogo from "@/components/admin/AdminTeamLogo";
import Card from "@/components/ui/Card";
import { formatKampalaDay, formatKampalaTime } from "@/lib/admin/time";
import type { AdminMatch } from "@/lib/admin/types";

export default function UpcomingPanel({
  matches,
  logos,
}: {
  matches: AdminMatch[];
  logos: Record<string, string | null>;
}) {
  return (
    <Card as="section" className="p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-card text-navy">Upcoming fixtures</h2>
        <Link
          href="/admin/matches?status=scheduled"
          className="text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
        >
          View all →
        </Link>
      </div>

      {matches.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">
          No upcoming fixtures. Add one with “New match”.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-surface-strong">
          {matches.map((match) => (
            <li key={match.slug}>
              <Link
                href={`/admin/matches/${match.slug}`}
                className="flex items-center gap-3 py-3 hover:bg-surface-tint"
              >
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
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy">
                    {match.home.name} vs {match.away.name}
                  </p>
                  <p className="truncate text-sm text-ink-muted">
                    {match.competition.name}
                  </p>
                </div>
                <p className="shrink-0 text-right text-sm text-ink-muted">
                  {formatKampalaDay(match.kickoffAt)}
                  <span className="block font-semibold text-navy">
                    {formatKampalaTime(match.kickoffAt)}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
