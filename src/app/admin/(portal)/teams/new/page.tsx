import type { Metadata } from "next";
import Link from "next/link";
import TeamForm from "@/components/admin/TeamForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { createTeamAction } from "../actions";

export const metadata: Metadata = { title: "New team" };

export default async function NewTeamPage() {
  await getAuth();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/teams"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All teams
        </Link>
        <h1 className="mt-2 text-section text-navy">New team</h1>
      </div>

      <Card className="p-6">
        <TeamForm mode="create" action={createTeamAction} />
      </Card>
    </div>
  );
}
