"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { articleCategories, articles } from "@/lib/articles";
import type { ArticleCategory } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

type CategoryFilter = ArticleCategory | "all";

const PAGE_SIZE = 6;

// The featured story has its own section above, so it is not repeated here.
const feed = articles.filter((a) => !a.featured);

const tabs: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All news" },
  ...articleCategories.map((c) => ({ id: c.id, label: c.label })),
];

function countFor(id: CategoryFilter) {
  return id === "all"
    ? feed.length
    : feed.filter((a) => a.category === id).length;
}

export default function NewsFeed() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [newestFirst, setNewestFirst] = useState(true);
  const [shown, setShown] = useState(PAGE_SIZE);

  const needle = query.trim().toLowerCase();
  const filtered = feed.filter(
    (a) =>
      (category === "all" || a.category === category) &&
      (needle === "" ||
        a.title.toLowerCase().includes(needle) ||
        a.excerpt.toLowerCase().includes(needle)),
  );
  const sorted = newestFirst ? filtered : [...filtered].reverse();
  const visible = sorted.slice(0, shown);
  const remaining = sorted.length - visible.length;

  return (
    <section id="feed" aria-label="All news" className="scroll-mt-8">
      <div className="bg-surface-tint py-4">
        <div className="mx-auto flex w-full max-w-site flex-col gap-3 px-4 lg:flex-row lg:items-center">
          <div
            role="group"
            aria-label="Filter articles by category"
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
                  className={`rounded-sm px-4 py-2 text-label font-bold uppercase tracking-wide transition-colors ${
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
              <label htmlFor="news-search" className="sr-only">
                Search articles
              </label>
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                aria-hidden
              />
              <input
                id="news-search"
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShown(PAGE_SIZE);
                }}
                placeholder="Search articles..."
                className="w-full rounded-md bg-white py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted lg:w-56"
              />
            </div>
            <div>
              <label htmlFor="news-sort" className="sr-only">
                Sort articles
              </label>
              <select
                id="news-sort"
                value={newestFirst ? "newest" : "oldest"}
                onChange={(event) =>
                  setNewestFirst(event.target.value === "newest")
                }
                className="rounded-md bg-white px-3 py-2 text-label font-bold uppercase tracking-wide text-navy"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface py-12">
        <div className="mx-auto w-full max-w-site px-4">
          <p className="sr-only" aria-live="polite">
            {visible.length} of {sorted.length} articles shown
          </p>

          {visible.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((article) => (
                <li key={article.slug}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl bg-white p-10 text-center text-ink-muted shadow-card">
              No articles match your search.
            </p>
          )}

          {remaining > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
                className="rounded-md bg-white px-6 py-3 text-button font-bold uppercase tracking-wide text-navy shadow-card transition-colors hover:bg-surface-tint"
              >
                Load {Math.min(PAGE_SIZE, remaining)} more stories
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
