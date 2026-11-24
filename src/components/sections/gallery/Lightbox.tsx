"use client";

import Image from "@/components/ui/SmartImage";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import type { PublicPhoto } from "@/lib/public/gallery-meta";

type LightboxProps = {
  item: PublicPhoto | null;
  position: string; // for example "3 / 8"
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

const navButton =
  "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10";

export default function Lightbox({
  item,
  position,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // The native <dialog> element handles focus trapping and Escape for us.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  return (
    <dialog
      ref={ref}
      aria-label="Photo viewer"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") onPrev?.();
        if (event.key === "ArrowRight") onNext?.();
      }}
      className="m-auto max-h-[92vh] w-[min(92vw,64rem)] overflow-auto rounded-xl bg-navy-deep p-0 text-white backdrop:bg-black/80"
    >
      {item && (
        <div>
          <div className="relative aspect-video">
            {item.photo ? (
              <Image
                src={item.photo}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 1024px, 92vw"
                className="object-contain"
              />
            ) : (
              <MediaPlaceholder className="h-full w-full" />
            )}
          </div>

          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-card">{item.title}</h2>
              {item.caption && (
                <p className="mt-1 text-sm text-white/80">{item.caption}</p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="mr-2 text-label font-semibold text-white/70">
                {position}
              </span>
              <button
                type="button"
                className={navButton}
                aria-label="Previous photo"
                onClick={onPrev}
                disabled={!onPrev}
              >
                <ChevronLeft size={20} aria-hidden />
              </button>
              <button
                type="button"
                className={navButton}
                aria-label="Next photo"
                onClick={onNext}
                disabled={!onNext}
              >
                <ChevronRight size={20} aria-hidden />
              </button>
              <button
                type="button"
                className={navButton}
                aria-label="Close photo viewer"
                onClick={onClose}
              >
                <X size={20} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
