import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { getAuth } from "@/lib/admin/auth";
import { videoCategoryLabel } from "@/lib/admin/highlights";
import { listHighlights } from "@/lib/admin/highlights-data";
import { logoSrc } from "@/lib/admin/logo";
import { formatKampalaDate } from "@/lib/admin/time";

export const metadata: Metadata = { title: "Highlights" };

export default async function HighlightsAdminPage() {
  await getAuth();
  const videos = await listHighlights();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-section text-navy">Highlights</h1>
          <p className="mt-1 text-ink-muted">
            Videos shown on the website’s Highlights page. Add a link, and the
            site does the rest.
          </p>
        </div>
        <Button href="/admin/highlights/new">Add video</Button>
      </div>

      {videos.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-ink-muted shadow-card">
          No videos yet.
        </p>
      ) : (
        <ul className="divide-y divide-surface-strong overflow-hidden rounded-xl bg-white shadow-card">
          {videos.map((video) => {
            const src = logoSrc(video.thumbnailUrl);
            return (
              <li key={video.id}>
                <Link
                  href={`/admin/highlights/${video.id}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-surface-tint"
                >
                  <span className="aspect-video w-28 shrink-0 overflow-hidden rounded-md bg-surface-tint ring-1 ring-surface-strong">
                    {src && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-navy">
                      {video.title}
                    </span>
                    <span className="block text-sm text-ink-muted">
                      {videoCategoryLabel(video.category)} ·{" "}
                      {formatKampalaDate(video.date)}
                    </span>
                  </span>
                  <span className="hidden flex-wrap justify-end gap-2 sm:flex">
                    {video.spotlight && (
                      <span className="rounded-sm bg-brand-orange px-2 py-1 text-label font-bold uppercase text-ink">
                        Spotlight
                      </span>
                    )}
                    {video.featured && (
                      <span className="rounded-sm bg-brand-gold px-2 py-1 text-label font-bold uppercase text-ink">
                        Featured
                      </span>
                    )}
                    {!video.published && (
                      <span className="rounded-sm bg-surface-strong px-2 py-1 text-label font-bold uppercase text-ink-muted">
                        Hidden
                      </span>
                    )}
                  </span>
                  <span className="text-label font-bold uppercase tracking-wide text-navy">
                    Edit
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
