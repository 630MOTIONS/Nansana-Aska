"use client";

import { useActionState } from "react";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import type { FormState } from "@/lib/admin/form-state";
import { groupOptions } from "@/lib/admin/people";

export type StaffFormValues = {
  name: string;
  title: string;
  kicker: string;
  bio: string;
  group: string;
  sortOrder: string;
  published: boolean;
};

export const emptyStaff: StaffFormValues = {
  name: "",
  title: "",
  kicker: "",
  bio: "",
  group: "technical",
  sortOrder: "0",
  published: true,
};

type StaffFormProps = {
  mode: "create" | "edit";
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initial: StaffFormValues;
};

export default function StaffForm({ mode, action, initial }: StaffFormProps) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="staff-name" label="Name">
          <input
            id="staff-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            defaultValue={initial.name}
            className={controlClass}
          />
        </Field>

        <Field id="staff-title" label="Role" hint="e.g. Head coach — Men’s senior">
          <input
            id="staff-title"
            name="title"
            type="text"
            required
            minLength={2}
            maxLength={100}
            defaultValue={initial.title}
            className={controlClass}
          />
        </Field>

        <Field id="staff-kicker" label="Small label" hint="Optional, e.g. Tactical director">
          <input
            id="staff-kicker"
            name="kicker"
            type="text"
            maxLength={60}
            defaultValue={initial.kicker}
            className={controlClass}
          />
        </Field>

        <Field id="staff-group" label="Group">
          <select
            id="staff-group"
            name="group"
            required
            defaultValue={initial.group}
            className={controlClass}
          >
            {groupOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="staff-bio"
          label="Short description"
          hint="Optional, up to 300 characters"
          className="sm:col-span-2"
        >
          <textarea
            id="staff-bio"
            name="bio"
            rows={3}
            maxLength={300}
            defaultValue={initial.bio}
            className={controlClass}
          />
        </Field>

        <Field id="staff-order" label="Display order" hint="Lower numbers come first">
          <input
            id="staff-order"
            name="sortOrder"
            type="number"
            inputMode="numeric"
            min={0}
            max={99}
            defaultValue={initial.sortOrder}
            className={controlClass}
          />
        </Field>
      </div>

      <p className="text-sm text-ink-muted">
        Only write qualifications or achievements the club has confirmed. This
        text is shown publicly.
      </p>

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
            ? "Add staff member"
            : "Save changes"}
      </Button>
      <FormMessage state={state} />
    </form>
  );
}
