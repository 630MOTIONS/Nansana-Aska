import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteMatchForm from "@/components/admin/DeleteMatchForm";
import MatchForm from "@/components/admin/MatchForm";
import ResultForm from "@/components/admin/ResultForm";
import { StatusBadge } from "@/components/admin/ui";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { getMatch, listCompetitions } from "@/lib/admin/data";
import { formatKampala, toKampalaInput } from "@/lib/admin/time";
import { updateMatchAction } from "../actions";

export const metadata: Metadata = { title: "Edit match" };

export default async function EditMatchPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await getAuth();
  const { slug } = await props.params;
  const query = await props.searchParams;

  const match = await getMatch(slug);
  if (!match) notFound();
  const competitions = await listCompetitions();

  const created = query.created === "1";

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/matches"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All matches
        </Link>
        <h1 className="mt-2 text-section text-navy">
          {match.home.name} vs {match.away.name}
        </h1>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-ink-muted">
          <StatusBadge status={match.status} />
          {match.competition.name} · {match.stage} ·{" "}
          {formatKampala(match.kickoffAt)}
        </p>
      </div>

      {created && (
        <p
          role="status"
          className="rounded-md bg-surface-tint p-3 text-sm font-semibold text-navy"
        >
          Match created.
        </p>
      )}

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Result</h2>
        <div className="mt-4">
          <ResultForm
            slug={match.slug}
            homeName={match.home.name}
            awayName={match.away.name}
            homeScore={match.homeScore}
            awayScore={match.awayScore}
            status={match.status}
          />
        </div>
      </Card>

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Details</h2>
        <div className="mt-4">
          <MatchForm
            mode="edit"
            action={updateMatchAction.bind(null, match.slug)}
            competitions={competitions}
            initial={{
              competition: match.competition.slug,
              homeTeam: match.home.slug,
              awayTeam: match.away.slug,
              stage: match.stage,
              matchday: match.matchday,
              kickoff: toKampalaInput(match.kickoffAt),
              venue: match.venue ?? "",
              status: match.status,
            }}
          />
        </div>
      </Card>

      {user.role === "admin" && (
        <Card as="section" className="border-2 border-red-100 p-6">
          <h2 className="text-card text-red-800">Delete this match</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Removes the match and its result. Only administrators can do this.
          </p>
          <div className="mt-4">
            <DeleteMatchForm slug={match.slug} />
          </div>
        </Card>
      )}
    </div>
  );
}

// Admin routes resolve the signed-in user before rendering, so they
// are allowed to block instead of showing an instant static shell.
export const instant = false;
