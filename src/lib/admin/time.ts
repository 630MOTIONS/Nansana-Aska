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

export function formatKampala(iso: string): string {
  const text = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Kampala",
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
