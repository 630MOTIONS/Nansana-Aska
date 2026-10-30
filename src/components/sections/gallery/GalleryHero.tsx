import { ArrowDown, Camera, MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { featuredStory, galleryStats } from "@/lib/gallery";
import Image from "next/image";

export default function GalleryHero() {
  return (
    <section className="bg-white pb-12 pt-8 lg:pb-16">
      <div className="mx-auto w-full max-w-site px-4">
        <Badge variant="tint" className="rounded-full px-3">
          <Camera size={14} className="text-gold-deep" aria-hidden />
          Inside Nansana ASKA • Our club through the lens
        </Badge>

        <div className="mt-6 grid items-end gap-6 lg:grid-cols-[1.5fr_1fr]">
          <h1 className="text-hero text-brand-blue">
            Moments that <span className="text-brand-orange">tell our</span>{" "}
            story
          </h1>
          <p className="text-hero-sub text-ink-muted">
            From the electric velocity of match night at Old Kampala to the
            relentless graft on the practice hardwood, explore the visual
            archive of the Pride of Nansana.
          </p>
        </div>

        <figure className="mt-8 overflow-hidden rounded-2xl shadow-card">
          <div className="relative min-h-[26rem] lg:min-h-[32rem]">
            {featuredStory.photo ? (
              <Image
                src={featuredStory.photo}
                alt={featuredStory.title}
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <MediaPlaceholder className="absolute inset-0 h-full w-full" />
            )}
            <div
              className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/20 to-transparent"
              aria-hidden="true"
            />

            <div className="absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 p-4">
              <Badge variant="orange">{featuredStory.badge}</Badge>
              <p className="inline-flex items-center gap-1.5 rounded-sm bg-white/90 px-2 py-1 text-label font-semibold text-navy">
                <MapPin size={12} aria-hidden />
                {featuredStory.venue}
              </p>
            </div>

            <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-label font-bold uppercase tracking-widest text-gold-soft">
                  {featuredStory.kicker}
                </p>
                <h2 className="mt-1 text-section text-white">
                  {featuredStory.title}
                </h2>
                <p className="mt-2 text-white/85">{featuredStory.caption}</p>
              </div>
              <Button
                href="#archive"
                icon={<ArrowDown size={14} aria-hidden />}
                className="self-start lg:self-auto"
              >
                Browse gallery
              </Button>
            </figcaption>
          </div>

          <dl className="grid grid-cols-2 gap-4 bg-navy px-5 py-4 text-white lg:grid-cols-4">
            {galleryStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <Icon
                    size={22}
                    className="shrink-0 text-gold-soft"
                    aria-hidden
                  />
                  <div className="flex flex-col-reverse">
                    <dt className="text-label uppercase tracking-wide text-white/70">
                      {stat.label}
                    </dt>
                    <dd className="font-display text-2xl font-extrabold leading-none">
                      {stat.value}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </figure>
      </div>
    </section>
  );
}
