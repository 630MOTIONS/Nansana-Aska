"use client";

import { useActionState } from "react";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import type { FormState } from "@/lib/admin/form-state";
import { footOptions, positionOptions, roleOptions } from "@/lib/admin/people";

export type PlayerFormValues = {
  name: string;
  squad: string;
  position: string;
  number: string;
  role: string;
  foot: string;
  appearances: string;
  goals: string;
  cleanSheets: string;
  saves: string;
  published: boolean;
};

export const emptyPlayer: PlayerFormValues = {
  name: "",
  squad: "",
  position: "",
  number: "",
  role: "",
  foot: "",
  appearances: "",
  goals: "",
  cleanSheets: "",
  saves: "",
  published: true,
};

type PlayerFormProps = {
  mode: "create" | "edit";
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initial: PlayerFormValues;
};

const numberProps = {
  type: "number",
  inputMode: "numeric" as const,
  min: 0,
};

export default function PlayerForm({ mode, action, initial }: PlayerFormProps) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="player-name" label="Name" className="sm:col-span-2">
          <input
            id="player-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            defaultValue={initial.name}
            className={controlClass}
          />
        </Field>

        <Field id="player-squad" label="Squad">
          <select
            id="player-squad"
            name="squad"
            required
            defaultValue={initial.squad}
            className={controlClass}
          >
            <option value="">Choose…</option>
            <option value="men">Men’s</option>
            <option value="women">Women’s</option>
          </select>
        </Field>

        <Field id="player-position" label="Position">
          <select
            id="player-position"
            name="position"
            required
            defaultValue={initial.position}
            className={controlClass}
          >
            <option value="">Choose…</option>
            {positionOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="player-number" label="Shirt number" hint="Optional, 0 to 99">
          <input
            id="player-number"
            name="number"
            {...numberProps}
            max={99}
            defaultValue={initial.number}
            className={controlClass}
          />
        </Field>

        <Field id="player-role" label="Captaincy" hint="One per squad">
          <select
            id="player-role"
            name="role"
            defaultValue={initial.role}
            className={controlClass}
          >
            <option value="">None</option>
            {roleOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="player-foot" label="Preferred foot" hint="Optional">
          <select
            id="player-foot"
            name="foot"
            defaultValue={initial.foot}
            className={controlClass}
          >
            <option value="">Not set</option>
            {footOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="rounded-lg border-2 border-surface-strong p-4">
        <legend className="px-2 text-label font-bold uppercase tracking-wide text-ink">
          Season figures (optional)
        </legend>
        <p className="mb-4 text-sm text-ink-muted">
          Only enter what the club has confirmed. Anything left blank is not
          shown on the website.
        </p>
        <div className="grid gap-4 sm:grid-cols-4">
          <Field id="player-apps" label="Apps">
            <input id="player-apps" name="appearances" {...numberProps} max={999} defaultValue={initial.appearances} className={controlClass} />
          </Field>
          <Field id="player-goals" label="Goals">
            <input id="player-goals" name="goals" {...numberProps} max={999} defaultValue={initial.goals} className={controlClass} />
          </Field>
          <Field id="player-clean" label="Clean sheets">
            <input id="player-clean" name="cleanSheets" {...numberProps} max={999} defaultValue={initial.cleanSheets} className={controlClass} />
          </Field>
          <Field id="player-saves" label="Saves">
            <input id="player-saves" name="saves" {...numberProps} max={999} defaultValue={initial.saves} className={controlClass} />
          </Field>
        </div>
      </fieldset>

      <label className="flex items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial.published}
          className="mt-1 h-4 w-4 accent-navy"
        />
        Show on the website
      </label>

      <Button type="submit" disabled={pending}>
        {pending
          ? "Saving..."
          : mode === "create"
            ? "Add player"
            : "Save changes"}
      </Button>
      <FormMessage state={state} />
    </form>
  );
}
