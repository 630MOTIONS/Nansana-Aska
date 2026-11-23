import type { Metadata } from "next";
import Link from "next/link";
import HighlightForm, {
  emptyHighlight,
} from "@/components/admin/highlights/HighlightForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { listMatches } from "@/lib/admin/data";
import { formatKampalaDate } from "@/lib/admin/time";
import { createHighlightAction } from "../actions";

export const metadata: Metadata = { title: "Add video" };

export default async function NewHighlightPage() {
  await getAuth();
  const matches = await listMatches({ limit: 100 });

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/highlights"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All videos
        </Link>
        <h1 className="mt-2 text-section text-navy">Add video</h1>
        <p className="mt-1 text-ink-muted">
          For a YouTube link, the thumbnail is fetched automatically.
        </p>
      </div>

      <Card className="p-6">
        <HighlightForm
          mode="create"
          action={createHighlightAction}
          initial={emptyHighlight}
          matches={matches.map((match) => ({
            slug: match.slug,
            label: `${match.home.name} vs ${match.away.name} · ${formatKampalaDate(match.kickoffAt)}`,
          }))}
        />
      </Card>
    </div>
  );
}
