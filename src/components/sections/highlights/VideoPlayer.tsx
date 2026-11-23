"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ExternalLink, X } from "lucide-react";
import type { PublicVideo } from "@/lib/public/highlights-meta";

type VideoPlayerProps = {
  video: Pick<PublicVideo, "title" | "url" | "embedUrl">;
  // Styles the clickable element (the button or link around `children`).
  className?: string;
  children: ReactNode;
};

// YouTube videos play in a pop-up (the embed loads only when it is opened).
// Any other link simply opens in a new tab.
export default function VideoPlayer({ video, className, children }: VideoPlayerProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  if (!video.url) return null;

  if (!video.embedUrl) {
    return (
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={className}
      >
        {children}
      </button>

      <dialog
        ref={dialog}
        aria-label={video.title}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialog.current) setOpen(false);
        }}
        className="m-auto w-[min(94vw,64rem)] overflow-hidden rounded-xl bg-navy-deep p-0 text-white backdrop:bg-black/80"
      >
        {open && (
          <div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={video.embedUrl}
                title={video.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <p className="font-semibold">{video.title}</p>
              <div className="flex items-center gap-3">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-label font-bold uppercase tracking-wide text-gold-soft hover:text-white"
                >
                  Watch on YouTube <ExternalLink size={12} aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close video"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <X size={18} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
