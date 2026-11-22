export default function AdminLoading() {
  return (
    <div role="status" aria-live="polite" className="animate-pulse space-y-4">
      <span className="sr-only">Loading…</span>
      <div className="h-8 w-48 rounded-md bg-surface-strong" />
      <div className="h-4 w-80 max-w-full rounded-md bg-surface-strong" />
      <div className="h-64 rounded-xl bg-white shadow-card" />
    </div>
  );
}
