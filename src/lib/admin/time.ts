// Kick-off times are stored in UTC and entered and shown in Uganda time
// (UTC+3 all year, no daylight saving).
const OFFSET_MS = 3 * 60 * 60 * 1000;

// ISO instant -> value for <input type="datetime-local"> in Uganda time.
export function toKampalaInput(iso: string): string {
  return new Date(new Date(iso).getTime() + OFFSET_MS)
    .toISOString()
    .slice(0, 16);
}

// <input type="datetime-local"> value (Uganda time) -> ISO with offset for the API.
export function fromKampalaInput(value: string): string | null {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})(?::\d{2})?$/.exec(
    value.trim(),
  );
  if (!match) return null;
  return `${match[1]}T${match[2]}:00+03:00`;
}

const base = { timeZone: "Africa/Kampala" } as const;

// "Sat, 7 Nov 2026, 19:30 EAT"
export function formatKampala(iso: string): string {
  const text = new Intl.DateTimeFormat("en-GB", {
    ...base,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
  return `${text} EAT`;
}

// "Saturday, 7 November 2026"
export function formatKampalaLongDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    ...base,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

// "7 Nov 2026"
export function formatKampalaDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    ...base,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

// "Sat, 7 Nov"
export function formatKampalaDay(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    ...base,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

// "19:30"
export function formatKampalaTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    ...base,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}
