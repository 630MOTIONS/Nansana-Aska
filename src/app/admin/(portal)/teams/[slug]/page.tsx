import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteTeamForm from "@/components/admin/DeleteTeamForm";
import LogoPanel from "@/components/admin/LogoPanel";
import TeamForm from "@/components/admin/TeamForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { getTeam } from "@/lib/admin/data";
import { updateTeamAction } from "../actions";

export const metadata: Metadata = { title: "Edit team" };

export default async function EditTeamPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await getAuth();
  const { slug } = await props.params;
  const query = await props.searchParams;

  const team = await getTeam(slug);
  if (!team) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/teams"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All teams
        </Link>
        <h1 className="mt-2 text-section text-navy">{team.name}</h1>
      </div>

      {query.created === "1" && (
        <p
          role="status"
          className="rounded-md bg-surface-tint p-3 text-sm font-semibold text-navy"
        >
          Team created.
          {query.logo === "failed" &&
            " The logo could not be uploaded, so please try it again below."}
        </p>
      )}

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Logo</h2>
        <div className="mt-4">
          <LogoPanel slug={team.slug} name={team.name} logoUrl={team.logoUrl} />
        </div>
      </Card>

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Details</h2>
        <div className="mt-4">
          <TeamForm
            mode="edit"
            action={updateTeamAction.bind(null, team.slug)}
            initial={{ name: team.name, squad: team.squad, isOurs: team.isOurs }}
          />
        </div>
      </Card>

      {user.role === "admin" && (
        <Card as="section" className="border-2 border-red-100 p-6">
          <h2 className="text-card text-red-800">Delete this team</h2>
          <p className="mt-2 text-sm text-ink-muted">
            A team that has matches cannot be deleted. Only administrators can
            do this.
          </p>
          <div className="mt-4">
            <DeleteTeamForm slug={team.slug} />
          </div>
        </Card>
      )}
    </div>
  );
}
