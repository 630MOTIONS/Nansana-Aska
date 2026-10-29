"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { players, positionLabels, squadOptions } from "@/lib/team";
import type { Position, SquadId } from "@/lib/team";
import PlayerCard from "./PlayerCard";

type PositionFilter = Position | "all";

const positionFilters: { id: PositionFilter; label: string }[] = [
  { id: "all", label: "All positions" },
  ...(Object.keys(positionLabels) as Position[]).map((id) => ({
    id,
    label: positionLabels[id].filter,
  })),
];

export default function TeamRoster() {
  const [squad, setSquad] = useState<SquadId>("men");
  const [position, setPosition] = useState<PositionFilter>("all");

  const visible = players.filter(
    (p) => p.squad === squad && (position === "all" || p.position === position),
  );
  const countFor = (id: SquadId) =>
    players.filter((p) => p.squad === id).length;

  return (
    <section
      id="squads"
      aria-label="Meet our squads"
      className="scroll-mt-8 bg-surface py-16"
    >
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            className="max-w-xl"
            eyebrow="Active squad lineups"
            eyebrowTone="gold"
            eyebrowIcon={<Users size={14} aria-hidden />}
            title="Meet our squads"
            description="Discover the athletes who drive our club forward with technical dexterity, pace, and championship passion on the indoor pitch."
          />

          <div
            role="group"
            aria-label="Choose squad"
            className="inline-flex self-start rounded-xl bg-surface-strong p-1 lg:self-auto"
          >
            {squadOptions.map((option) => {
              const active = squad === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSquad(option.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-button font-semibold uppercase tracking-wide transition-colors ${
                    active
                      ? "bg-navy text-white"
                      : "text-ink-muted hover:text-navy"
                  }`}
                >
                  {option.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-label font-bold ${
                      active ? "bg-brand-orange text-ink" : "bg-white text-navy"
                    }`}
                  >
                    {countFor(option.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="group"
          aria-label="Filter by position"
          className="mt-6 flex flex-wrap gap-2"
        >
          {positionFilters.map((filter) => {
            const active = position === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPosition(filter.id)}
                className={`rounded-full border px-4 py-1.5 text-label font-bold uppercase tracking-wide transition-colors ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-surface-strong bg-white text-ink-muted hover:border-navy hover:text-navy"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} players shown
        </p>

        {visible.length > 0 ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((player) => (
              <li key={player.id}>
                <PlayerCard player={player} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 rounded-xl bg-white p-8 text-center text-ink-muted shadow-card">
            No players to show here yet.
          </p>
        )}
      </div>
    </section>
  );
}
