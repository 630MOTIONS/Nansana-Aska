"use client";

import { useActionState } from "react";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import type { FormState } from "@/lib/admin/form-state";
import type { Squad } from "@/lib/admin/types";

type CompetitionFormProps = {
  mode: "create" | "edit";
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initial?: {
    name: string;
    season: string;
    squad: Squad;
    pointsForWin: number;
    pointsForDraw: number;
  };
};

export default function CompetitionForm({
  mode,
  action,
  initial,
}: CompetitionFormProps) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="competition-name"
          label="Name"
          hint="e.g. FAU Futsal Super League"
          className="sm:col-span-2"
        >
          <input
            id="competition-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            defaultValue={initial?.name ?? ""}
            className={controlClass}
          />
        </Field>

        <Field id="competition-season" label="Season" hint="e.g. 2026/27">
          <input
            id="competition-season"
            name="season"
            type="text"
            required
            maxLength={20}
            defaultValue={initial?.season ?? ""}
            className={controlClass}
          />
        </Field>

        {mode === "create" ? (
          <Field id="competition-squad" label="Squad">
            <select
              id="competition-squad"
              name="squad"
              required
              className={controlClass}
            >
              <option value="">Choose…</option>
              <option value="men">Men’s</option>
              <option value="women">Women’s</option>
            </select>
          </Field>
        ) : (
          <p className="self-end text-sm text-ink-muted">
            Squad:{" "}
            <strong className="text-navy">
              {initial?.squad === "women" ? "Women’s" : "Men’s"}
            </strong>
          </p>
        )}

        <Field id="competition-win" label="Points for a win">
          <input
            id="competition-win"
            name="pointsForWin"
            type="number"
            inputMode="numeric"
            required
            min={0}
            max={10}
            defaultValue={initial?.pointsForWin ?? 3}
            className={controlClass}
          />
        </Field>

        <Field id="competition-draw" label="Points for a draw">
          <input
            id="competition-draw"
            name="pointsForDraw"
            type="number"
            inputMode="numeric"
            required
            min={0}
            max={10}
            defaultValue={initial?.pointsForDraw ?? 1}
            className={controlClass}
          />
        </Field>
      </div>

      {mode === "edit" && (
        <p className="text-sm text-ink-muted">
          Changing the points rules recalculates the table straight away.
        </p>
      )}

      <Button type="submit" disabled={pending}>
        {pending
          ? "Saving..."
          : mode === "create"
            ? "Create competition"
            : "Save changes"}
      </Button>
      <FormMessage state={state} />
    </form>
  );
}
