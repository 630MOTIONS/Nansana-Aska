"use client";

import { useState } from "react";
import { CalendarDays, ClipboardList, Search } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  competitions,
  completedFixtures,
  fixtures,
  formatDateOnly,
  formatShortDate,
  upcomingFixtures,
} from "@/lib/fixtures";
import type { CompetitionId, Fixture, SquadId } from "@/lib/fixtures";
import FeaturedFixture from "./FeaturedFixture";
import ResultCard from "./ResultCard";
import UpcomingCard from "./UpcomingCard";

type SquadFilter = SquadId | "all";
type CompetitionFilter = CompetitionId | "all";

const squadTabs: { id: SquadFilter; label: string }[] = [
  { id: "all", label: "All matches" },
  { id: "men", label: "Men’s senior team" },
  { id: "women", label: "Women’s senior team" },
];

const competitionIds = Object.keys(competitions) as CompetitionId[];
const venues = Array.from(new Set(fixtures.map((f) => f.venue))).sort();

function countFor(id: SquadFilter) {
  return id === "all"
    ? fixtures.length
    : fixtures.filter((f) => f.squad === id).length;
}

const selectClass = "rounded-md bg-surface-tint px-3 py-2 text-sm text-ink";

function EmptyNote({ children }: { children: string }) {
  return (
    <p className="rounded-xl bg-white p-10 text-center text-ink-muted shadow-card">
      {children}
    </p>
  );
}

export default function MatchesExplorer() {
  const [squad, setSquad] = useState<SquadFilter>("all");
  const [competition, setCompetition] = useState<CompetitionFilter>("all");
  const [venue, setVenue] = useState("all");
  const [query, setQuery] = useState("");

  const needle = query.trim().toLowerCase();
  const passes = (f: Fixture) =>
    (squad === "all" || f.squad === squad) &&
    (competition === "all" || f.competition === competition) &&
    (venue === "all" || f.venue === venue) &&
    (needle === "" ||
      [
        f.home.name,
        f.away.name,
        f.date,
        formatShortDate(f.date),
        formatDateOnly(f.date),
      ].some((text) => text.toLowerCase().includes(needle)));

  const upcoming = upcomingFixtures.filter(passes);
  const results = completedFixtures.filter(passes);
  const featured = upcoming[0];
  const rest = upcoming.slice(1);

  return (
    <section aria-label="Fixtures and results">
      <div className="bg-white py-6">
        <div className="mx-auto flex w-full max-w-site flex-col gap-4 px-4 lg:flex-row lg:items-center">
          <div
            role="group"
            aria-label="Filter by squad"
            className="inline-flex flex-wrap gap-1 self-start rounded-lg bg-surface-tint p-1"
          >
            {squadTabs.map((tab) => {
              const active = squad === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSquad(tab.id)}
                  className={`rounded-md px-4 py-2 text-label font-bold uppercase tracking-wide transition-colors ${
                    active
                      ? "bg-brand-blue text-white"
                      : "text-navy hover:bg-surface-strong"
                  }`}
                >
                  {tab.label} ({countFor(tab.id)})
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 lg:ml-auto">
            <div>
              <label htmlFor="match-competition" className="sr-only">
                Competition
              </label>
              <select
                id="match-competition"
                value={competition}
                onChange={(event) =>
                  setCompetition(event.target.value as CompetitionFilter)
                }
                className={selectClass}
              >
                <option value="all">All competitions</option>
                {competitionIds.map((id) => (
                  <option key={id} value={id}>
                    {competitions[id].label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="match-venue" className="sr-only">
                Venue
              </label>
              <select
                id="match-venue"
                value={venue}
                onChange={(event) => setVenue(event.target.value)}
                className={selectClass}
              >
                <option value="all">All venues</option>
                {venues.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label htmlFor="match-search" className="sr-only">
                Filter by opponent or date
              </label>
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                aria-hidden
              />
              <input
                id="match-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter by opponent or date..."
                className="w-full rounded-md bg-surface-tint py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted sm:w-60"
              />
            </div>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {upcoming.length + results.length} matches shown
        </p>
      </div>

      <div id="upcoming" className="scroll-mt-8">
        <div className="bg-surface py-10">
          <div className="mx-auto w-full max-w-site px-4">
            {featured ? (
              <FeaturedFixture fixture={featured} />
            ) : (
              <EmptyNote>No upcoming fixtures match your filters.</EmptyNote>
            )}
          </div>
        </div>

        {rest.length > 0 && (
          <div className="bg-surface-tint py-14">
            <div className="mx-auto w-full max-w-site px-4">
              <SectionHeading
                eyebrow="Scheduled competitions"
                eyebrowTone="gold"
                eyebrowIcon={<CalendarDays size={14} aria-hidden />}
                title="Upcoming fixtures"
                description="Plan ahead and find kick-off details for scheduled league and cup clashes."
              />
              <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((fixture) => (
                  <li key={fixture.id}>
                    <UpcomingCard fixture={fixture} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div id="results" className="scroll-mt-8 bg-surface py-14">
        <div className="mx-auto w-full max-w-site px-4">
          <SectionHeading
            eyebrow="Score registry"
            eyebrowTone="gold"
            eyebrowIcon={<ClipboardList size={14} aria-hidden />}
            title="Previous results"
            description="Review completed matches and final scorelines for our senior squads."
          />
          {results.length > 0 ? (
            <ul className="mt-8 grid gap-6 lg:grid-cols-2">
              {results.map((fixture) => (
                <li key={fixture.id}>
                  <ResultCard fixture={fixture} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8">
              <EmptyNote>No results match your filters.</EmptyNote>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
