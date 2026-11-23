import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { getAuth } from "@/lib/admin/auth";
import { logoSrc } from "@/lib/admin/logo";
import { label, positionOptions, roleOptions } from "@/lib/admin/people";
import { listPlayers } from "@/lib/admin/people-data";
import type { Squad } from "@/lib/admin/types";

export const metadata: Metadata = { title: "Players" };

const tabs: { label: string; value: Squad | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Men’s", value: "men" },
  { label: "Women’s", value: "women" },
];

export default async function PlayersPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await getAuth();
  const query = await props.searchParams;
  const raw = Array.isArray(query.squad) ? query.squad[0] : query.squad;
  const squad: Squad | undefined = raw === "men" || raw === "women" ? raw : undefined;

  const players = await listPlayers(squad);
  const withoutPhoto = players.filter((player) => !player.photoUrl).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-section text-navy">Players</h1>
          <p className="mt-1 text-ink-muted">
            The squads shown on the website’s Team page.
          </p>
        </div>
        <Button href="/admin/players/new">Add player</Button>
      </div>

      <nav aria-label="Filter by squad" className="flex gap-2">
        {tabs.map((tab) => {
          const active = tab.value === squad;
          return (
            <Link
              key={tab.label}
              href={tab.value ? `/admin/players?squad=${tab.value}` : "/admin/players"}
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

      {withoutPhoto > 0 && players.length > 0 && (
        <p className="rounded-md bg-surface-strong p-3 text-sm text-ink-muted">
          {withoutPhoto} {withoutPhoto === 1 ? "player has" : "players have"} no
          photo yet and show a placeholder.
        </p>
      )}

      {players.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-ink-muted shadow-card">
          No players yet.
        </p>
      ) : (
        <ul className="divide-y divide-surface-strong overflow-hidden rounded-xl bg-white shadow-card">
          {players.map((player) => {
            const src = logoSrc(player.photoUrl);
            return (
              <li key={player.id}>
                <Link
                  href={`/admin/players/${player.id}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-surface-tint"
                >
                  <span className="h-14 w-11 shrink-0 overflow-hidden rounded-md bg-surface-tint ring-1 ring-surface-strong">
                    {src && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                    )}
                  </span>
                  <span className="w-10 shrink-0 font-display text-xl font-extrabold text-navy">
                    {player.number !== null ? `#${player.number}` : "—"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-navy">
                      {player.name}
                    </span>
                    <span className="block text-sm text-ink-muted">
                      {player.squad === "women" ? "Women’s" : "Men’s"} ·{" "}
                      {label(positionOptions, player.position)}
                    </span>
                  </span>
                  {player.role && (
                    <span className="rounded-sm bg-brand-gold px-2 py-1 text-label font-bold uppercase text-ink">
                      {label(roleOptions, player.role)}
                    </span>
                  )}
                  {!player.published && (
                    <span className="rounded-sm bg-surface-strong px-2 py-1 text-label font-bold uppercase text-ink-muted">
                      Hidden
                    </span>
                  )}
                  <span className="text-label font-bold uppercase tracking-wide text-navy">
                    Edit
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
