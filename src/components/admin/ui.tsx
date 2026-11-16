import type { ReactNode } from "react";
import type { FormState } from "@/lib/admin/form-state";
import type { MatchStatus } from "@/lib/admin/types";

export const controlClass =
  "w-full rounded-md border-2 border-surface-strong bg-white px-3 py-2 text-ink placeholder:text-ink-muted/70 aria-invalid:border-red-700 disabled:bg-surface-tint disabled:text-ink-muted";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
};

export function Field({ id, label, hint, className, children }: FieldProps) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label
          htmlFor={id}
          className="text-label font-bold uppercase tracking-wide text-ink"
        >
          {label}
        </label>
        {hint && <span className="text-label text-ink-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export function FormMessage({ state }: { state: FormState }) {
  return (
    <div aria-live="polite">
      {state.error && (
        <p
          role="alert"
          className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-800"
        >
          {state.error}
        </p>
      )}
      {state.saved && (
        <p className="mt-4 rounded-md bg-surface-tint p-3 text-sm font-semibold text-navy">
          Saved.
        </p>
      )}
    </div>
  );
}

const statusStyles: Record<MatchStatus | "needs-result", string> = {
  scheduled: "bg-surface-tint text-navy",
  live: "bg-brand-orange text-ink",
  final: "bg-navy text-white",
  postponed: "bg-brand-gold text-ink",
  cancelled: "bg-red-100 text-red-800",
  "needs-result": "bg-brand-orange/25 text-gold-deep",
};

const statusLabels: Record<MatchStatus | "needs-result", string> = {
  scheduled: "Scheduled",
  live: "Live",
  final: "Final",
  postponed: "Postponed",
  cancelled: "Cancelled",
  "needs-result": "Needs result",
};

export function StatusBadge({
  status,
  needsResult = false,
}: {
  status: MatchStatus;
  needsResult?: boolean;
}) {
  const key = needsResult ? "needs-result" : status;
  return (
    <span
      className={`inline-flex rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide ${statusStyles[key]}`}
    >
      {statusLabels[key]}
    </span>
  );
}
