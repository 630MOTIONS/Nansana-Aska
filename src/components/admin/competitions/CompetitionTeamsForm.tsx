"use client";

import Link from "next/link";
import { useActionState } from "react";
import { setCompetitionTeamsAction } from "@/app/admin/(portal)/competitions/actions";
import AdminTeamLogo from "@/components/admin/AdminTeamLogo";
import { FormMessage } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import type { FormState } from "@/lib/admin/form-state";
import type { AdminTeam } from "@/lib/admin/types";

export default function CompetitionTeamsForm({
  slug,
  teams,
  selected,
}: {
  slug: string;
  teams: AdminTeam[];
  selected: string[];
}) {
  const [state, formAction, pending] = useActionState(
    setCompetitionTeamsAction.bind(null, slug),
    {} as FormState,
  );

  if (teams.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        There are no teams for this squad yet.{" "}
        <Link
          href="/admin/teams/new"
          className="font-semibold text-navy underline hover:text-brand-blue"
        >
          Create a team
        </Link>{" "}
        first.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <fieldset>
        <legend className="sr-only">Teams in this competition</legend>
        <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <li key={team.slug}>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-surface-strong bg-white px-3 py-2 hover:bg-surface-tint">
                <input
                  type="checkbox"
                  name="teamSlugs"
                  value={team.slug}
                  defaultChecked={selected.includes(team.slug)}
                  className="h-4 w-4 shrink-0 accent-navy"
                />
                <AdminTeamLogo name={team.name} logoUrl={team.logoUrl} size="sm" />
                <span className="min-w-0 truncate text-sm font-semibold text-navy">
                  {team.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <p className="text-sm text-ink-muted">
        A team that already has matches in this competition cannot be
        unticked. Delete or move its matches first.
      </p>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save teams"}
      </Button>
      <FormMessage state={state} />
    </form>
  );
}
