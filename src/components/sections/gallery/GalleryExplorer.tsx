"use client";

import { useState } from "react";
import { RefreshCw, SlidersHorizontal } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryCategories, galleryItems } from "@/lib/gallery";
import type { GalleryCategory } from "@/lib/gallery";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";

type CategoryFilter = GalleryCategory | "all";

const PAGE_SIZE = 8;

const tabs: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All photos" },
  ...galleryCategories.map((c) => ({ id: c.id, label: c.label })),
];

function countFor(id: CategoryFilter) {
  return id === "all"
    ? galleryItems.length
    : galleryItems.filter((item) => item.category === id).length;
}

export default function GalleryExplorer() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [newestFirst, setNewestFirst] = useState(true);
  const [shown, setShown] = useState(PAGE_SIZE);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = galleryItems.filter(
    (item) => category === "all" || item.category === category,
  );
  const sorted = newestFirst ? filtered : [...filtered].reverse();
  const visible = sorted.slice(0, shown);

  const remaining = sorted.length - visible.length;
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));

  const openIndex = visible.findIndex((item) => item.id === openId);
  const openItem = openIndex >= 0 ? visible[openIndex] : null;

  function chooseCategory(id: CategoryFilter) {
    setCategory(id);
    setShown(PAGE_SIZE);
    setOpenId(null);
  }

  return (
    <section
      id="archive"
      aria-label="Explore our gallery"
      className="scroll-mt-8"
    >
      <div className="bg-surface-tint py-12">
        <div className="mx-auto w-full max-w-site px-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              className="max-w-xl"
              eyebrow="Club photography archive"
              eyebrowTone="gold"
              title="Explore our gallery"
              description="Every match, training session, and shared milestone is part of our journey. Select a category below to filter official match photographs, team lineups, and supporter coverage."
            />
            <div className="flex items-center gap-4 self-start rounded-md bg-white px-4 py-2 text-label shadow-card lg:self-auto">
              <p
                className="font-semibold uppercase tracking-wide text-ink-muted"
                aria-live="polite"
              >
                Showing{" "}
                <span className="text-brand-blue">{visible.length}</span> of{" "}
                {sorted.length} photos
              </p>
              <button
                type="button"
                onClick={() => setNewestFirst((v) => !v)}
                className="inline-flex items-center gap-1.5 border-l border-surface-strong pl-4 text-sm font-bold text-navy"
              >
                <SlidersHorizontal size={14} aria-hidden />
                {newestFirst ? "Newest first" : "Oldest first"}
              </button>
            </div>
          </div>

          <div
            role="group"
            aria-label="Filter photos by category"
            className="mt-8 flex flex-wrap gap-2"
          >
            {tabs.map((tab) => {
              const active = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseCategory(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-button font-bold uppercase tracking-wide shadow-card transition-colors ${
                    active
                      ? "bg-brand-blue text-white"
                      : "bg-white text-navy hover:bg-surface-strong"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-label ${
                      active
                        ? "bg-navy text-gold-soft"
                        : "bg-surface-strong text-navy"
                    }`}
                  >
                    {countFor(tab.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="mx-auto w-full max-w-site px-4">
          {visible.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:auto-rows-[22rem] lg:grid-cols-4">
              {visible.map((item) => (
                <li
                  key={item.id}
                  className={item.wide ? "sm:col-span-2 lg:col-span-2" : ""}
                >
                  <GalleryCard item={item} onOpen={() => setOpenId(item.id)} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl bg-surface-tint p-10 text-center text-ink-muted">
              No photos in this category yet.
            </p>
          )}

          {remaining > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
                className="inline-flex items-center gap-3 rounded-md bg-white px-6 py-3 text-button font-bold uppercase tracking-wide text-navy shadow-card transition-colors hover:bg-surface-tint"
              >
                <RefreshCw
                  size={16}
                  className="text-brand-orange"
                  aria-hidden
                />
                Load {Math.min(PAGE_SIZE, remaining)} more moments
                <span className="rounded-full bg-surface-strong px-2 py-0.5 text-label">
                  Archive {currentPage}/{totalPages}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      <Lightbox
        item={openItem}
        position={openItem ? `${openIndex + 1} / ${visible.length}` : ""}
        onClose={() => setOpenId(null)}
        onPrev={
          openIndex > 0 ? () => setOpenId(visible[openIndex - 1].id) : undefined
        }
        onNext={
          openIndex >= 0 && openIndex < visible.length - 1
            ? () => setOpenId(visible[openIndex + 1].id)
            : undefined
        }
      />
    </section>
  );
}
