import Image from "@/components/ui/SmartImage";
import { CirclePlay, Play, PlaySquare } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import type { PublicVideo } from "@/lib/public/highlights-meta";
import VideoPlayer from "./VideoPlayer";

export default function HighlightsHero({
  spotlight,
}: {
  spotlight: PublicVideo | null;
}) {
  return (
    <section className="bg-surface-tint pb-12 pt-10 lg:pb-16">
      <div className="mx-auto w-full max-w-site px-4">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <Badge variant="tint" className="rounded-full px-3">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-orange"
                aria-hidden="true"
              />
              Watch the action • Pride of Nansana
            </Badge>
            <h1 className="mt-6 text-hero">
              <span className="block text-ink">The game. The goals.</span>
              <span className="block text-brand-blue">The moments.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-hero-sub text-ink-muted">
              Relive the excitement of Nansana ASKA Futsal Club through
              high-octane match highlights, memorable goals, tactical match
              recaps, and exclusive footage from Old Kampala Arena.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-col">
            <Button href="#featured" icon={<CirclePlay size={16} aria-hidden />}>
              Watch latest highlights
            </Button>
            <Button
              href="#library"
              variant="light"
              icon={<PlaySquare size={16} aria-hidden />}
            >
              Explore video library
            </Button>
          </div>
        </div>

        {spotlight && (
          <figure className="relative mt-10 overflow-hidden rounded-2xl shadow-card">
            <div className="relative min-h-[24rem] lg:min-h-[28rem]">
              {spotlight.poster ? (
                <Image
                  src={spotlight.poster}
                  alt=""
                  fill
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <MediaPlaceholder className="absolute inset-0 h-full w-full" />
              )}
              <div
                className="absolute inset-0 bg-linear-to-t from-navy-deep/95 via-navy-deep/30 to-transparent"
                aria-hidden="true"
              />

              <Badge variant="orange" className="absolute left-4 top-4">
                Spotlight
              </Badge>

              {spotlight.url && (
                <VideoPlayer
                  video={spotlight}
                  className="absolute left-1/2 top-[38%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-brand-orange text-ink transition-transform hover:scale-110"
                >
                  <Play size={28} fill="currentColor" aria-hidden />
                  <span className="sr-only">Play: {spotlight.title}</span>
                </VideoPlayer>
              )}

              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <p className="flex flex-wrap items-center gap-2 text-label font-bold uppercase tracking-widest text-gold-soft">
                  {spotlight.kicker ?? spotlight.date}
                  {spotlight.duration && (
                    <span className="rounded-sm bg-navy px-2 py-0.5 font-mono text-white">
                      {spotlight.duration}
                    </span>
                  )}
                </p>
                <h2 className="mt-2 max-w-3xl text-section text-white">
                  {spotlight.title}
                </h2>
                {spotlight.description && (
                  <p className="mt-2 max-w-2xl text-white/85">
                    {spotlight.description}
                  </p>
                )}
                {!spotlight.url && (
                  <p className="mt-3 text-label font-bold uppercase tracking-wide text-white/70">
                    Video coming soon
                  </p>
                )}
              </figcaption>
            </div>
          </figure>
        )}
      </div>
    </section>
  );
}
