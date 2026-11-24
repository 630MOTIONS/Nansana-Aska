import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import Image from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { publicGalleryCategories } from "@/lib/public/gallery-meta";
import type { PublicPhoto } from "@/lib/public/gallery-meta";

// `photos` are the latest published gallery photos, newest first.
export default function BeyondCourt({ photos }: { photos: PublicPhoto[] }) {
  const moments = photos.slice(0, 3);
  if (moments.length === 0) return null;

  return (
    <section aria-label="Beyond the court" className="bg-surface py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            className="max-w-xl"
            eyebrow="Community & culture"
            eyebrowTone="gold"
            title="Beyond the court"
            description="Explore the moments, activities and experiences that form part of the club’s journey in Wakiso District."
          />
          <Button
            href="/gallery"
            icon={<ArrowRight size={14} aria-hidden />}
          >
            Explore our gallery
          </Button>
        </div>

        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {moments.map((photo) => {
            const category = publicGalleryCategories.find(
              (item) => item.id === photo.category,
            );
            return (
              <li
                key={photo.id}
                className="relative overflow-hidden rounded-xl shadow-card"
              >
                <div className="relative aspect-[4/3]">
                  {photo.photo ? (
                    <Image
                      src={photo.photo}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <MediaPlaceholder className="absolute inset-0 h-full w-full" />
                  )}
                  <div
                    className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/10 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-label font-bold uppercase tracking-widest text-gold-soft">
                      {photo.meta ?? category?.label}
                    </p>
                    <h3 className="text-card text-white">{photo.title}</h3>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
