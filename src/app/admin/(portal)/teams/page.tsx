import type { Metadata } from "next";
import Link from "next/link";
import AdminTeamLogo from "@/components/admin/AdminTeamLogo";
import Button from "@/components/ui/Button";
import { getAuth } from "@/lib/admin/auth";
import { listTeams } from "@/lib/admin/data";
import type { Squad } from "@/lib/admin/types";

export const metadata: Metadata = { title: "Teams" };

const tabs: { label: string; value: Squad | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Men’s", value: "men" },
  { label: "Women’s", value: "women" },
];

export default async function TeamsPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await getAuth();
  const query = await props.searchParams;
  const raw = Array.isArray(query.squad) ? query.squad[0] : query.squad;
  const squad: Squad | undefined =
    raw === "men" || raw === "women" ? raw : undefined;

  const teams = await listTeams(squad);
  const missingLogos = teams.filter((team) => !team.logoUrl).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-section text-navy">Teams</h1>
          <p className="mt-1 text-ink-muted">
            A team’s logo is stored once and used everywhere the team appears.
          </p>
        </div>
        <Button href="/admin/teams/new">New team</Button>
      </div>

      <nav aria-label="Filter by squad" className="flex gap-2">
        {tabs.map((tab) => {
          const active = tab.value === squad;
          return (
            <Link
              key={tab.label}
              href={tab.value ? `/admin/teams?squad=${tab.value}` : "/admin/teams"}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 text-label font-bold uppercase tracking-wide ${
                active
                  ? "bg-navy text-white"
                  : "bg-white text-navy hover:bg-surface-strong"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {missingLogos > 0 && teams.length > 0 && (
        <p className="rounded-md bg-surface-strong p-3 text-sm text-ink-muted">
          {missingLogos} {missingLogos === 1 ? "team has" : "teams have"} no
          logo yet and show their initials instead.
        </p>
      )}

      {teams.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-ink-muted shadow-card">
          No teams yet.
        </p>
      ) : (
        <ul className="divide-y divide-surface-strong overflow-hidden rounded-xl bg-white shadow-card">
          {teams.map((team) => (
            <li key={team.slug}>
              <Link
                href={`/admin/teams/${team.slug}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-surface-tint"
              >
                <AdminTeamLogo name={team.name} logoUrl={team.logoUrl} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-navy">
                    {team.name}
                  </span>
                  <span className="block text-sm text-ink-muted">
                    {team.squad === "women" ? "Women’s" : "Men’s"} · {team.slug}
                  </span>
                </span>
                {team.isOurs && (
                  <span className="rounded-sm bg-brand-gold px-2 py-1 text-label font-bold uppercase text-ink">
                    Our team
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
