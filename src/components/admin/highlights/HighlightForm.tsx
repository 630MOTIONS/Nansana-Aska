"use client";

import { useActionState } from "react";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import type { FormState } from "@/lib/admin/form-state";
import { videoCategoryOptions } from "@/lib/admin/highlights";

export type HighlightFormValues = {
  title: string;
  category: string;
  videoUrl: string;
  description: string;
  kicker: string;
  badge: string;
  duration: string;
  date: string;
  matchSlug: string;
  published: boolean;
  spotlight: boolean;
  featured: boolean;
};

export const emptyHighlight: HighlightFormValues = {
  title: "",
  category: "",
  videoUrl: "",
  description: "",
  kicker: "",
  badge: "",
  duration: "",
  date: "",
  matchSlug: "",
  published: true,
  spotlight: false,
  featured: false,
};

type HighlightFormProps = {
  mode: "create" | "edit";
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initial: HighlightFormValues;
  matches: { slug: string; label: string }[];
};

export default function HighlightForm({
  mode,
  action,
  initial,
  matches,
}: HighlightFormProps) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);

  return (
    <form action={formAction} className="space-y-6">
      <Field
        id="video-url"
        label="Video link"
        hint="YouTube, Facebook, TikTok… (https://)"
      >
        <input
          id="video-url"
          name="videoUrl"
          type="url"
          required
          maxLength={500}
          placeholder="https://www.youtube.com/watch?v=…"
          defaultValue={initial.videoUrl}
          className={controlClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="video-title" label="Title" className="sm:col-span-2">
          <input
            id="video-title"
            name="title"
            type="text"
            required
            minLength={3}
            maxLength={150}
            defaultValue={initial.title}
            className={controlClass}
          />
        </Field>

        <Field id="video-category" label="Category">
          <select
            id="video-category"
            name="category"
            required
            defaultValue={initial.category}
            className={controlClass}
          >
            <option value="">Choose…</option>
            {videoCategoryOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="video-date" label="Date" hint="Empty = today">
          <input
            id="video-date"
            name="date"
            type="date"
            defaultValue={initial.date}
            className={controlClass}
          />
        </Field>

        <Field
          id="video-description"
          label="Short description"
          hint="Optional, up to 400 characters"
          className="sm:col-span-2"
        >
          <textarea
            id="video-description"
            name="description"
            rows={3}
            maxLength={400}
            defaultValue={initial.description}
            className={controlClass}
          />
        </Field>

        <Field id="video-kicker" label="Small line" hint="Optional, e.g. Old Kampala Arena">
          <input
            id="video-kicker"
            name="kicker"
            type="text"
            maxLength={100}
            defaultValue={initial.kicker}
            className={controlClass}
          />
        </Field>

        <Field id="video-duration" label="Length" hint="Optional, e.g. 4:18">
          <input
            id="video-duration"
            name="duration"
            type="text"
            inputMode="numeric"
            maxLength={8}
            placeholder="4:18"
            defaultValue={initial.duration}
            className={controlClass}
          />
        </Field>

        <Field id="video-badge" label="Custom badge" hint="Optional, e.g. Goal of the month">
          <input
            id="video-badge"
            name="badge"
            type="text"
            maxLength={40}
            defaultValue={initial.badge}
            className={controlClass}
          />
        </Field>

        <Field
          id="video-match"
          label="About a match"
          hint="Optional. Shows the real score on recaps"
        >
          <select
            id="video-match"
            name="matchSlug"
            defaultValue={initial.matchSlug}
            className={controlClass}
          >
            <option value="">No match</option>
            {matches.map((match) => (
              <option key={match.slug} value={match.slug}>
                {match.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="space-y-3 text-sm text-ink">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="published"
            defaultChecked={initial.published}
            className="mt-1 h-4 w-4 accent-navy"
          />
          Visible on the website
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="spotlight"
            defaultChecked={initial.spotlight}
            className="mt-1 h-4 w-4 accent-navy"
          />
          Spotlight: the large banner at the top of the Highlights page
          (replaces the current one)
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initial.featured}
            className="mt-1 h-4 w-4 accent-navy"
          />
          Featured highlight: the section below it (replaces the current one)
        </label>
      </div>

      <Button type="submit" disabled={pending}>
        {pending
          ? "Saving..."
          : mode === "create"
            ? "Add video"
            : "Save changes"}
      </Button>
      <FormMessage state={state} />
    </form>
  );
}
