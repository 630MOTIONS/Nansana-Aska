"use client";

import { useSyncExternalStore } from "react";

// A clock that ticks every 30 seconds. The server has no clock reading, so the
// first render shows a placeholder and the browser fills it in.
const TICK_MS = 30_000;

function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, TICK_MS);
  return () => window.clearInterval(timer);
}

const getNow = () => Math.floor(Date.now() / TICK_MS) * TICK_MS;
const getServerNow = () => null;

function format(ms: number): string {
  if (ms <= 0) return "Kicking off";
  const minutes = Math.floor(ms / 60_000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  if (days > 0) return `${days}d ${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export default function Countdown({ kickoffAt }: { kickoffAt: string }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const text = now === null ? "—" : format(new Date(kickoffAt).getTime() - now);

  return (
    <p className="font-display text-3xl font-extrabold leading-none text-gold-soft">
      {text}
    </p>
  );
}
