import Image from "next/image";
import { BarChart3, Flame, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredVideo } from "@/lib/highlights";

export default function FeaturedHighlight() {
  const playable = Boolean(featuredVideo.videoUrl);

  return (
    <section
      id="featured"
      aria-label="Featured highlight"
      className="scroll-mt-8 bg-surface py-16"
    >
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          className="max-w-2xl"
          eyebrow="Official match premiere"
          eyebrowTone="gold"
          title="Featured highlight"
          description="Catch a standout moment from the club’s journey, from our most recent fixtures."
        />

        <Card className="mt-8 grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            {featuredVideo.poster ? (
              <Image
                src={featuredVideo.poster}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            ) : (
              <MediaPlaceholder className="absolute inset-0 h-full w-full" />
            )}
            <div
              className="absolute inset-0 bg-linear-to-t from-navy-deep/50 to-transparent"
              aria-hidden="true"
            />
            {playable ? (
              <a
                href={featuredVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Play: ${featuredVideo.title}`}
                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-brand-orange text-ink transition-transform hover:scale-110"
              >
                <Play size={24} fill="currentColor" aria-hidden />
              </a>
            ) : (
              <p className="absolute inset-x-0 bottom-0 p-4 text-label font-bold uppercase tracking-wide text-white/80">
                Video coming soon
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className="inline-flex items-center gap-2 text-label font-bold uppercase tracking-widest text-gold-deep">
              <Flame size={14} aria-hidden />
              {featuredVideo.tag}
            </p>
            <h3 className="text-section text-navy">{featuredVideo.title}</h3>
            <p className="text-ink-muted">{featuredVideo.description}</p>

            <dl className="rounded-md bg-surface-tint p-4 text-sm">
              {featuredVideo.details.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between gap-4 py-1"
                >
                  <dt className="text-ink-muted">{row.label}</dt>
                  <dd className="text-right font-semibold text-navy">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex flex-wrap gap-3">
              {playable && (
                <Button
                  href={featuredVideo.videoUrl as string}
                  icon={<Play size={14} aria-hidden />}
                >
                  Watch video
                </Button>
              )}
              <Button
                href="/matches"
                variant="light"
                icon={<BarChart3 size={14} aria-hidden />}
                className="bg-surface-tint"
              >
                Match stats & recap
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
