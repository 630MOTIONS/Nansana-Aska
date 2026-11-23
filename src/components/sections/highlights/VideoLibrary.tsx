"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { publicVideoCategories } from "@/lib/public/highlights-meta";
import type {
  PublicVideo,
  VideoCategoryId,
} from "@/lib/public/highlights-meta";
import VideoCard from "./VideoCard";

type CategoryFilter = VideoCategoryId | "all";

const PAGE_SIZE = 6;

const tabs: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All videos" },
  ...publicVideoCategories.map((c) => ({ id: c.id, label: c.label })),
];

// `videos` arrive newest first.
export default function VideoLibrary({ videos }: { videos: PublicVideo[] }) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [newestFirst, setNewestFirst] = useState(true);
  const [shown, setShown] = useState(PAGE_SIZE);

  const countFor = (id: CategoryFilter) =>
    id === "all"
      ? videos.length
      : videos.filter((video) => video.category === id).length;

  const needle = query.trim().toLowerCase();
  const filtered = videos.filter(
    (video) =>
      (category === "all" || video.category === category) &&
      (needle === "" ||
        video.title.toLowerCase().includes(needle) ||
        video.description.toLowerCase().includes(needle)),
  );
  const sorted = newestFirst ? filtered : [...filtered].reverse();
  const visible = sorted.slice(0, shown);
  const remaining = sorted.length - visible.length;

  return (
    <section id="library" aria-label="Video library" className="scroll-mt-8">
      <div className="bg-surface-tint py-4">
        <div className="mx-auto flex w-full max-w-site flex-col gap-3 px-4 lg:flex-row lg:items-center">
          <div
            role="group"
            aria-label="Filter videos by category"
            className="flex flex-wrap gap-2"
          >
            {tabs.map((tab) => {
              const active = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setCategory(tab.id);
                    setShown(PAGE_SIZE);
                  }}
                  className={`rounded-full px-4 py-2 text-label font-bold uppercase tracking-wide transition-colors ${
                    active
                      ? "bg-brand-blue text-white"
                      : "bg-white text-navy hover:bg-surface-strong"
                  }`}
                >
                  {tab.label} ({countFor(tab.id)})
                </button>
              );
            })}
          </div>

          <div className="flex gap-3 lg:ml-auto">
            <div className="relative">
              <label htmlFor="video-search" className="sr-only">
                Search highlights
              </label>
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                aria-hidden
              />
              <input
                id="video-search"
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShown(PAGE_SIZE);
                }}
                placeholder="Search highlights..."
                className="w-full rounded-md bg-white py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted lg:w-56"
              />
            </div>
            <div>
              <label htmlFor="video-sort" className="sr-only">
                Sort videos
              </label>
              <select
                id="video-sort"
                value={newestFirst ? "newest" : "oldest"}
                onChange={(event) => setNewestFirst(event.target.value === "newest")}
                className="rounded-md bg-white px-3 py-2 text-label font-bold uppercase tracking-wide text-navy"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface py-14">
        <div className="mx-auto w-full max-w-site px-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Catalog"
              eyebrowTone="gold"
              title="Latest videos & highlights"
            />
            <p className="text-sm text-ink-muted" aria-live="polite">
              Showing <strong className="text-navy">{visible.length}</strong>{" "}
              of {sorted.length} videos
            </p>
          </div>

          {visible.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((video) => (
                <li key={video.id}>
                  <VideoCard video={video} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 rounded-xl bg-white p-10 text-center text-ink-muted shadow-card">
              No videos match your search.
            </p>
          )}

          {remaining > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
                className="rounded-md bg-white px-6 py-3 text-button font-bold uppercase tracking-wide text-navy shadow-card transition-colors hover:bg-surface-tint"
              >
                Load {Math.min(PAGE_SIZE, remaining)} more videos (showing{" "}
                {visible.length} of {sorted.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
