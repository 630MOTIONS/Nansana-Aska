import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteHighlightForm from "@/components/admin/highlights/DeleteHighlightForm";
import HighlightForm from "@/components/admin/highlights/HighlightForm";
import ThumbnailPanel from "@/components/admin/highlights/ThumbnailPanel";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { listMatches } from "@/lib/admin/data";
import { getHighlight } from "@/lib/admin/highlights-data";
import { formatKampalaDate, toKampalaInput } from "@/lib/admin/time";
import { updateHighlightAction } from "../actions";

export const metadata: Metadata = { title: "Edit video" };

export default async function EditHighlightPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await getAuth();
  const { id } = await props.params;
  const query = await props.searchParams;

  const video = await getHighlight(id);
  if (!video) notFound();
  const matches = await listMatches({ limit: 100 });

  const options = matches.map((match) => ({
    slug: match.slug,
    label: `${match.home.name} vs ${match.away.name} · ${formatKampalaDate(match.kickoffAt)}`,
  }));
  // Keep a match selectable even when it is older than the 100 listed.
  if (video.matchSlug && !options.some((option) => option.slug === video.matchSlug)) {
    options.unshift({ slug: video.matchSlug, label: video.matchSlug });
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/highlights"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All videos
        </Link>
        <h1 className="mt-2 text-section text-navy">{video.title}</h1>
        <p className="mt-1 text-sm">
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-navy underline hover:text-brand-blue"
          >
            Open the video link
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>

      {query.created === "1" && (
        <p
          role="status"
          className="rounded-md bg-surface-tint p-3 text-sm font-semibold text-navy"
        >
          Video added. Check its thumbnail below.
        </p>
      )}

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Thumbnail</h2>
        <div className="mt-4">
          <ThumbnailPanel
            id={video.id}
            thumbnailUrl={video.thumbnailUrl}
            isYoutube={video.youtubeId !== null}
          />
        </div>
      </Card>

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Details</h2>
        <div className="mt-4">
          <HighlightForm
            mode="edit"
            action={updateHighlightAction.bind(null, video.id)}
            matches={options}
            initial={{
              title: video.title,
              category: video.category,
              videoUrl: video.videoUrl,
              description: video.description,
              kicker: video.kicker ?? "",
              badge: video.badge ?? "",
              duration: video.duration ?? "",
              date: toKampalaInput(video.date).slice(0, 10),
              matchSlug: video.matchSlug ?? "",
              published: video.published,
              spotlight: video.spotlight,
              featured: video.featured,
            }}
          />
        </div>
      </Card>

      {user.role === "admin" && (
        <Card as="section" className="border-2 border-red-100 p-6">
          <h2 className="text-card text-red-800">Delete this video</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Removes the entry and its thumbnail from the website. The video
            itself stays where it is hosted. Only administrators can do this.
            To take it off the website without deleting, untick “Visible on the
            website”.
          </p>
          <div className="mt-4">
            <DeleteHighlightForm id={video.id} />
          </div>
        </Card>
      )}
    </div>
  );
}
