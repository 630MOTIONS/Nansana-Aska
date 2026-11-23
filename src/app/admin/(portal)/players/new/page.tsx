import type { Metadata } from "next";
import Link from "next/link";
import PlayerForm, { emptyPlayer } from "@/components/admin/people/PlayerForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { createPlayerAction } from "../../people-actions";

export const metadata: Metadata = { title: "Add player" };

export default async function NewPlayerPage() {
  await getAuth();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/players"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All players
        </Link>
        <h1 className="mt-2 text-section text-navy">Add player</h1>
        <p className="mt-1 text-ink-muted">You add the photo on the next screen.</p>
      </div>

      <Card className="p-6">
        <PlayerForm mode="create" action={createPlayerAction} initial={emptyPlayer} />
      </Card>
    </div>
  );
}
