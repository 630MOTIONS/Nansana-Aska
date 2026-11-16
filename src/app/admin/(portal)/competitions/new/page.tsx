import type { Metadata } from "next";
import Link from "next/link";
import CompetitionForm from "@/components/admin/competitions/CompetitionForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { createCompetitionAction } from "../actions";

export const metadata: Metadata = { title: "New competition" };

export default async function NewCompetitionPage() {
  await getAuth();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/competitions"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All competitions
        </Link>
        <h1 className="mt-2 text-section text-navy">New competition</h1>
        <p className="mt-1 text-ink-muted">
          You choose its teams on the next screen.
        </p>
      </div>

      <Card className="p-6">
        <CompetitionForm mode="create" action={createCompetitionAction} />
      </Card>
    </div>
  );
}
