"use client";

import { useActionState } from "react";
import {
  clearResultAction,
  saveResultAction,
} from "@/app/admin/(portal)/matches/actions";
import { FormMessage } from "@/components/admin/ui";
import type { FormState } from "@/lib/admin/form-state";
import type { MatchStatus } from "@/lib/admin/types";

type ResultFormProps = {
  slug: string;
  homeName: string;
  awayName: string;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
};

// Not the shared field style: that one is full width, which stretched these.
const scoreClass =
  "w-16 rounded-md border-2 border-surface-strong bg-white px-2 py-2 text-center text-ink";

export default function ResultForm({
  slug,
  homeName,
  awayName,
  homeScore,
  awayScore,
  status,
}: ResultFormProps) {
  const [saveState, saveAction, saving] = useActionState(
    saveResultAction.bind(null, slug),
    {} as FormState,
  );
  const [clearState, clearAction, clearing] = useActionState(
    clearResultAction.bind(null, slug),
    {} as FormState,
  );
  const hasResult = status === "final" || status === "live";
  const unavailable = status === "postponed" || status === "cancelled";

  if (unavailable) {
    return (
      <p className="text-sm text-ink-muted">
        This match is {status}. Set it back to scheduled to enter a result.
      </p>
    );
  }

  return (
    <div>
      <form action={saveAction} className="flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor={`${slug}-home`}>
          {homeName} score
        </label>
        <input
          id={`${slug}-home`}
          name="homeScore"
          type="number"
          inputMode="numeric"
          min={0}
          max={99}
          required
          defaultValue={homeScore ?? ""}
          className={scoreClass}
        />
        <span aria-hidden="true" className="font-bold text-ink-muted">
          –
        </span>
        <label className="sr-only" htmlFor={`${slug}-away`}>
          {awayName} score
        </label>
        <input
          id={`${slug}-away`}
          name="awayScore"
          type="number"
          inputMode="numeric"
          min={0}
          max={99}
          required
          defaultValue={awayScore ?? ""}
          className={scoreClass}
        />
        <button
          type="submit"
          name="status"
          value="final"
          disabled={saving || clearing}
          className="rounded-sm bg-brand-orange px-4 py-2 text-button font-bold uppercase tracking-wide text-ink hover:brightness-95 disabled:opacity-60"
        >
          Save final
        </button>
        <button
          type="submit"
          name="status"
          value="live"
          disabled={saving || clearing}
          className="rounded-sm bg-surface-tint px-4 py-2 text-button font-bold uppercase tracking-wide text-navy hover:bg-surface-strong disabled:opacity-60"
        >
          Set live
        </button>
      </form>

      {hasResult && (
        <form action={clearAction} className="mt-2">
          <button
            type="submit"
            disabled={saving || clearing}
            className="text-label font-bold uppercase tracking-wide text-red-800 underline hover:text-red-900 disabled:opacity-60"
          >
            Clear result
          </button>
        </form>
      )}

      <FormMessage state={saveState} />
      <FormMessage state={clearState} />
    </div>
  );
}
