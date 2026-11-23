import Image from "next/image";
import { Play } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import TextLink from "@/components/ui/TextLink";
import { isRemoteImage } from "@/lib/public/media";
import type { PublicVideo } from "@/lib/public/highlights-meta";
import VideoPlayer from "./VideoPlayer";

export default function MatchRecaps({ videos }: { videos: PublicVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <section aria-label="Match recaps" className="bg-surface py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            className="max-w-xl"
            eyebrow="In-depth analysis"
            eyebrowTone="gold"
            title="Match recaps"
            description="Catch up on the key moments and matchday narratives with our long-form recap packages."
          />
          <TextLink href="/matches">View all fixtures in match centre</TextLink>
        </div>

        <ul className="mt-8 grid gap-6 lg:grid-cols-2">
          {videos.map((recap) => {
            const match = recap.match;
            const score =
              match && match.homeScore !== null && match.awayScore !== null
                ? `${match.homeScore} – ${match.awayScore}`
                : "VS";
            return (
              <li key={recap.id}>
                <Card as="article" className="grid h-full sm:grid-cols-[1fr_1.7fr]">
                  <div className="relative min-h-48">
                    {recap.poster ? (
                      <Image
                        src={recap.poster}
                        alt=""
                        fill
                        unoptimized={isRemoteImage(recap.poster)}
                        sizes="(min-width: 640px) 20vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <MediaPlaceholder className="absolute inset-0 h-full w-full" />
                    )}
                    <Badge variant="orange" className="absolute left-3 top-3">
                      Match recap
                    </Badge>
                    {recap.duration && (
                      <span className="absolute bottom-3 left-3 flex items-center gap-1.5 font-mono text-label font-bold text-white">
                        <Play size={12} fill="currentColor" aria-hidden />
                        {recap.duration}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 p-5">
                    {match && (
                      <>
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-md bg-surface-tint px-4 py-3 font-display text-xl font-extrabold uppercase">
                          <span className="text-navy">{match.homeName}</span>
                          <span className="text-gold-deep">{score}</span>
                          <span className="text-right text-navy">{match.awayName}</span>
                        </div>
                        <p className="text-label font-semibold uppercase tracking-wide text-ink-muted">
                          {match.competition} • {match.stage}
                        </p>
                      </>
                    )}
                    <h3 className="text-card text-navy">{recap.title}</h3>
                    {recap.description && (
                      <p className="text-sm text-ink-muted">{recap.description}</p>
                    )}
                    <div className="mt-auto pt-2">
                      {recap.url ? (
                        <VideoPlayer
                          video={recap}
                          className="inline-flex items-center gap-2 rounded-sm bg-brand-blue px-4 py-2.5 text-button font-bold uppercase tracking-wide text-white hover:brightness-95"
                        >
                          <Play size={12} fill="currentColor" aria-hidden />
                          Play recap
                        </VideoPlayer>
                      ) : (
                        <p className="text-label font-bold uppercase tracking-wide text-ink-muted">
                          Video coming soon
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
