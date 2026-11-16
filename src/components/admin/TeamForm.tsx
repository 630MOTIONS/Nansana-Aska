"use client";

import { useActionState } from "react";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import type { FormState } from "@/lib/admin/form-state";
import { LOGO_ACCEPT } from "@/lib/admin/logo";
import type { Squad } from "@/lib/admin/types";

type TeamFormProps = {
  mode: "create" | "edit";
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initial?: { name: string; squad: Squad; isOurs: boolean };
};

export default function TeamForm({ mode, action, initial }: TeamFormProps) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);

  return (
    <form action={formAction} className="space-y-5">
      <Field id="team-name" label="Team name">
        <input
          id="team-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          defaultValue={initial?.name ?? ""}
          className={controlClass}
        />
      </Field>

      {mode === "create" ? (
        <Field id="team-squad" label="Squad">
          <select id="team-squad" name="squad" required className={controlClass}>
            <option value="">Choose…</option>
            <option value="men">Men’s</option>
            <option value="women">Women’s</option>
          </select>
        </Field>
      ) : (
        <p className="text-sm text-ink-muted">
          Squad:{" "}
          <strong className="text-navy">
            {initial?.squad === "women" ? "Women’s" : "Men’s"}
          </strong>
        </p>
      )}

      <label className="flex items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          name="isOurs"
          defaultChecked={initial?.isOurs ?? false}
          className="mt-1 h-4 w-4 accent-navy"
        />
        This is a Nansana ASKA team (highlighted on the website)
      </label>

      {mode === "create" && (
        <Field
          id="team-logo"
          label="Logo"
          hint="Optional. PNG, JPEG or WebP, under 500 KB"
        >
          <input
            id="team-logo"
            name="logo"
            type="file"
            accept={LOGO_ACCEPT}
            className={controlClass}
          />
        </Field>
      )}

      <Button type="submit" disabled={pending}>
        {pending
          ? "Saving..."
          : mode === "create"
            ? "Create team"
            : "Save changes"}
      </Button>
      <FormMessage state={state} />
    </form>
  );
}
