import { CirclePlay, Images, MonitorPlay, Play } from "lucide-react";
import VideoPlayer from "@/components/sections/highlights/VideoPlayer";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Image from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { publicVideoCategories } from "@/lib/public/highlights-meta";
import type { PublicVideo } from "@/lib/public/highlights-meta";

// `videos` are the latest published highlights, newest first.
export default function GalleryHighlights({ videos }: { videos: PublicVideo[] }) {
  return (
    <section
      aria-label="Gallery and highlights"
      className="bg-navy-deep py-16 text-white"
    >
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="dark"
            className="max-w-xl"
            eyebrow="Media & Broadcast"
            eyebrowIcon={<MonitorPlay size={16} aria-hidden />}
            title="Action on the court — gallery & highlights"
            description="Step onto the hardwood court with our official photo and video recaps."
          />
          <div className="flex flex-col items-stretch gap-3 sm:flex-row lg:flex-col">
            <Button
              href="/gallery"
              variant="secondary"
              icon={<Images size={16} aria-hidden />}
            >
              Browse full photo gallery
            </Button>
            <Button
              href="/highlights"
              icon={<CirclePlay size={16} aria-hidden />}
            >
              Watch match highlights
            </Button>
          </div>
        </div>

        {videos.length > 0 ? (
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {videos.map((video) => {
              const category = publicVideoCategories.find(
                (item) => item.id === video.category,
              );
              const badge = video.badge ?? category?.label;
              return (
                <li
                  key={video.id}
                  className="group relative overflow-hidden rounded-xl focus-within:ring-4 focus-within:ring-brand-orange"
                >
                  <div className="relative aspect-[4/3]">
                    {video.poster ? (
                      <Image
                        src={video.poster}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <MediaPlaceholder className="absolute inset-0 h-full w-full" />
                    )}
                    <div
                      className="absolute inset-0 bg-linear-to-t from-navy-deep/95 via-navy-deep/30 to-transparent"
                      aria-hidden="true"
                    />
                    {video.url && (
                      <span
                        className="absolute left-1/2 top-[40%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-brand-orange text-ink transition-transform group-hover:scale-110"
                        aria-hidden="true"
                      >
                        <Play size={24} fill="currentColor" />
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      {badge && (
                        <span
                          className={`inline-flex rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide ${
                            category?.badgeClass ?? "bg-brand-gold text-ink"
                          }`}
                        >
                          {badge}
                        </span>
                      )}
                      <h3 className="mt-2 text-card text-white">
                        {video.url ? (
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
                      <p className="line-clamp-1 text-sm text-white/80">
                        {video.kicker ?? video.date}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-10 rounded-xl bg-white/5 p-8 text-center text-white/80">
            Videos will appear here soon.
          </p>
        )}
      </div>
    </section>
  );
}
