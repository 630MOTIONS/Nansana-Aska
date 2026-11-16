import type { Metadata } from "next";
import Link from "next/link";
import MatchForm from "@/components/admin/MatchForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { listCompetitions } from "@/lib/admin/data";
import { createMatchAction } from "../actions";

export const metadata: Metadata = { title: "New match" };

export default async function NewMatchPage() {
  await getAuth();
  const competitions = await listCompetitions();
  const usable = competitions.filter((item) => item.teams.length >= 2);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/matches"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All matches
        </Link>
        <h1 className="mt-2 text-section text-navy">New match</h1>
      </div>

      <Card className="p-6">
        {usable.length === 0 ? (
          <p className="text-ink-muted">
            A match needs a competition with at least two teams. There are none
            yet. The Teams and Competitions screens are coming next. Until then,
            create them through the API.
          </p>
        ) : (
          <MatchForm
            mode="create"
            action={createMatchAction}
            competitions={usable}
          />
        )}
      </Card>
    </div>
  );
}

// Admin routes resolve the signed-in user before rendering, so they
// are allowed to block instead of showing an instant static shell.
export const instant = false;
