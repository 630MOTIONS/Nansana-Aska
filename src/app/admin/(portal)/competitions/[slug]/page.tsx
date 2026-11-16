import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CompetitionForm from "@/components/admin/competitions/CompetitionForm";
import CompetitionTeamsForm from "@/components/admin/competitions/CompetitionTeamsForm";
import DeleteCompetitionForm from "@/components/admin/competitions/DeleteCompetitionForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { getCompetition, listTeams } from "@/lib/admin/data";
import { updateCompetitionAction } from "../actions";

export const metadata: Metadata = { title: "Edit competition" };

export default async function EditCompetitionPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await getAuth();
  const { slug } = await props.params;
  const query = await props.searchParams;

  const competition = await getCompetition(slug);
  if (!competition) notFound();
  const teams = await listTeams(competition.squad);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <Link
          href="/admin/competitions"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All competitions
        </Link>
        <h1 className="mt-2 text-section text-navy">{competition.name}</h1>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 text-ink-muted">
          <span>
            {competition.season} ·{" "}
            {competition.squad === "women" ? "Women’s" : "Men’s"}
          </span>
          <Link
            href={`/admin/matches?competition=${competition.slug}`}
            className="font-semibold text-navy hover:text-brand-blue"
          >
            View its {competition.matchCount}{" "}
            {competition.matchCount === 1 ? "match" : "matches"} →
          </Link>
        </p>
      </div>

      {query.created === "1" && (
        <p
          role="status"
          className="rounded-md bg-surface-tint p-3 text-sm font-semibold text-navy"
        >
          Competition created. Now choose its teams below.
        </p>
      )}

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Teams</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Tick every team that plays in this competition. They all appear in
          the table, even before they have played.
        </p>
        <div className="mt-4">
          <CompetitionTeamsForm
            slug={competition.slug}
            teams={teams}
            selected={competition.teams.map((team) => team.slug)}
          />
        </div>
      </Card>

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Details and points rules</h2>
        <div className="mt-4">
          <CompetitionForm
            mode="edit"
            action={updateCompetitionAction.bind(null, competition.slug)}
            initial={{
              name: competition.name,
              season: competition.season,
              squad: competition.squad,
              pointsForWin: competition.pointsForWin,
              pointsForDraw: competition.pointsForDraw,
            }}
          />
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          Address used by the website: <code>{competition.slug}</code>. It
          cannot be changed.
        </p>
      </Card>

      {user.role === "admin" && (
        <Card as="section" className="border-2 border-red-100 p-6">
          <h2 className="text-card text-red-800">Delete this competition</h2>
          {competition.matchCount > 0 ? (
            <p className="mt-2 text-sm text-ink-muted">
              This competition has {competition.matchCount}{" "}
              {competition.matchCount === 1 ? "match" : "matches"}. Delete
              {competition.matchCount === 1 ? " it" : " them"} first. Only
              administrators can delete a competition.
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm text-ink-muted">
                Removes the competition and its team list. Only administrators
                can do this.
              </p>
              <div className="mt-4">
                <DeleteCompetitionForm slug={competition.slug} />
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
