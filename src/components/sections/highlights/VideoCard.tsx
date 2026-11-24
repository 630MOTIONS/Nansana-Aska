import Image from "@/components/ui/SmartImage";
import { ArrowRight, Play } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { publicVideoCategories } from "@/lib/public/highlights-meta";
import type { PublicVideo } from "@/lib/public/highlights-meta";
import VideoPlayer from "./VideoPlayer";

type VideoCardProps = {
  video: PublicVideo;
  compact?: boolean; // hides the date and call to action
};

export default function VideoCard({ video, compact = false }: VideoCardProps) {
  const category = publicVideoCategories.find((c) => c.id === video.category);
  const badgeLabel = video.badge ?? category?.label;
  const playable = Boolean(video.url);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card focus-within:ring-4 focus-within:ring-brand-orange">
      <div className="relative aspect-video">
        {video.poster ? (
          <Image
            src={video.poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <MediaPlaceholder className="absolute inset-0 h-full w-full" />
        )}
        <div
          className="absolute inset-0 bg-linear-to-t from-navy-deep/60 via-transparent to-transparent"
          aria-hidden="true"
        />

        {badgeLabel && (
          <span
            className={`absolute left-3 top-3 rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide ${
              category?.badgeClass ?? "bg-navy text-white"
            }`}
          >
            {badgeLabel}
          </span>
        )}

        {playable && (
          <span
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-brand-orange text-ink transition-transform group-hover:scale-110"
            aria-hidden="true"
          >
            <Play size={20} fill="currentColor" />
          </span>
        )}

        {video.duration && (
          <span className="absolute bottom-3 right-3 rounded-sm bg-navy-deep/90 px-2 py-0.5 font-mono text-label font-bold text-white">
            {video.duration}
          </span>
        )}
      </div>

      <div className="flex grow flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-2 text-label font-semibold uppercase tracking-wide">
          <p className="truncate text-gold-deep">{video.kicker ?? ""}</p>
          {!compact && video.date && (
            <p className="shrink-0 text-ink-muted">{video.date}</p>
          )}
        </div>

        <h3 className="line-clamp-2 text-card text-navy">
          {playable ? (
            <VideoPlayer
              video={video}
              className="text-left uppercase after:absolute after:inset-0 after:content-['']"
            >
              {video.title}
            </VideoPlayer>
          ) : (
            video.title
          )}
        </h3>
        {video.description && (
          <p className="line-clamp-2 text-sm text-ink-muted">{video.description}</p>
        )}

        {!compact && (
          <p className="mt-auto inline-flex items-center gap-1.5 pt-3 text-label font-bold uppercase tracking-wide text-gold-deep">
            {playable ? (
              <>
                Watch video <ArrowRight size={12} aria-hidden />
              </>
            ) : (
              <span className="text-ink-muted">Video coming soon</span>
            )}
          </p>
        )}
      </div>
    </article>
  );
}
