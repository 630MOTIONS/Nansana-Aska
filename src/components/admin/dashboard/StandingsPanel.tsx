import AdminTeamLogo from "@/components/admin/AdminTeamLogo";
import { controlClass } from "@/components/admin/ui";
import Card from "@/components/ui/Card";
import type {
  AdminCompetition,
  AdminStandings,
} from "@/lib/admin/types";

const head =
  "px-3 py-2 text-label font-bold uppercase tracking-wide text-ink-muted";

export default function StandingsPanel({
  standings,
  competitions,
  selected,
  logos,
}: {
  standings: AdminStandings | null;
  competitions: AdminCompetition[];
  selected?: string;
  logos: Record<string, string | null>;
}) {
  const rows = standings?.rows.slice(0, 10) ?? [];

  return (
    <Card as="section" className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-card text-navy">League standings</h2>
        {competitions.length > 1 && (
          <form method="get" className="flex items-center gap-2">
            <label htmlFor="standings-competition" className="sr-only">
              Competition
            </label>
            <select
              id="standings-competition"
              name="competition"
              defaultValue={selected}
              className={`${controlClass} w-auto py-1.5 text-sm`}
            >
              {competitions.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name} ({item.season})
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-sm bg-surface-tint px-3 py-2 text-label font-bold uppercase tracking-wide text-navy hover:bg-surface-strong"
            >
              Show
            </button>
          </form>
        )}
      </div>

      {standings && (
        <p className="mt-1 text-sm text-ink-muted">
          {standings.competition.name} · {standings.competition.season}
        </p>
      )}

      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">
          No table yet. A competition needs teams, and the table fills in as
          results are entered.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">League standings</caption>
            <thead>
              <tr className="border-b border-surface-strong">
                <th scope="col" className={`${head} text-left`}>#</th>
                <th scope="col" className={`${head} text-left`}>Team</th>
                <th scope="col" className={`${head} text-right`}>P</th>
                <th scope="col" className={`${head} text-right`}>GD</th>
                <th scope="col" className={`${head} text-right`}>Pts</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.team.slug}
                  className={`border-b border-surface-tint last:border-0 ${
                    row.team.isOurs ? "bg-surface-tint" : ""
                  }`}
                >
                  <td
                    className={`px-3 py-2 font-bold text-navy ${
                      row.team.isOurs ? "border-l-4 border-brand-orange" : ""
                    }`}
                  >
                    {row.position}
                  </td>
                  <th scope="row" className="px-3 py-2 text-left font-semibold text-navy">
                    <span className="flex items-center gap-2">
                      <AdminTeamLogo
                        name={row.team.name}
                        logoUrl={logos[row.team.slug] ?? null}
                        size="sm"
                      />
                      {row.team.name}
                    </span>
                  </th>
                  <td className="px-3 py-2 text-right text-ink-muted">{row.played}</td>
                  <td className="px-3 py-2 text-right text-ink-muted">
                    {row.goalDifference > 0
                      ? `+${row.goalDifference}`
                      : row.goalDifference}
                  </td>
                  <td className="px-3 py-2 text-right font-display text-lg font-extrabold text-navy">
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
