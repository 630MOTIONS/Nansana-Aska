import Image from "next/image";
import { ZoomIn } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { isRemoteImage } from "@/lib/public/media";
import { publicGalleryCategories } from "@/lib/public/gallery-meta";
import type { PublicPhoto } from "@/lib/public/gallery-meta";

type GalleryCardProps = {
  item: PublicPhoto;
  onOpen: () => void;
};

export default function GalleryCard({ item, onOpen }: GalleryCardProps) {
  const category = publicGalleryCategories.find((c) => c.id === item.category);

  return (
    <article
      className={`group relative min-h-72 overflow-hidden rounded-xl shadow-card focus-within:ring-4 focus-within:ring-brand-orange lg:h-full ${
        item.wide ? "lg:col-span-2" : ""
      }`}
    >
      {item.photo ? (
        <Image
          src={item.photo}
          alt=""
          fill
          unoptimized={isRemoteImage(item.photo)}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <MediaPlaceholder className="absolute inset-0 h-full w-full" />
      )}
      <div
        className="absolute inset-0 bg-linear-to-t from-navy-deep/95 via-navy-deep/30 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
        {category && (
          <span
            className={`rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide ${category.badgeClass}`}
          >
            {category.label}
          </span>
        )}
        {item.meta && (
          <span className="text-label font-semibold text-gold-soft">
            {item.meta}
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-card text-white">
          <button
            type="button"
            onClick={onOpen}
            className="text-left uppercase after:absolute after:inset-0 after:content-['']"
          >
            {item.title}
          </button>
        </h3>
        {item.caption && (
          <p className="mt-1 line-clamp-2 text-sm text-white/80">
            {item.caption}
          </p>
        )}
        <span
          className="mt-3 inline-flex items-center gap-1.5 text-label font-bold uppercase tracking-wide text-brand-orange"
          aria-hidden="true"
        >
          View larger <ZoomIn size={14} />
        </span>
      </div>
    </article>
  );
}
