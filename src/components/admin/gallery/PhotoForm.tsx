"use client";

import { useActionState } from "react";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import type { FormState } from "@/lib/admin/form-state";
import { adminGalleryCategories } from "@/lib/admin/gallery";
import type { GalleryCategoryId } from "@/lib/admin/gallery-types";

type PhotoFormProps = {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initial: {
    title: string;
    caption: string;
    category: GalleryCategoryId;
    meta: string;
    wide: boolean;
    featured: boolean;
    published: boolean;
  };
};

export default function PhotoForm({ action, initial }: PhotoFormProps) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);

  return (
    <form action={formAction} className="space-y-5">
      <Field id="photo-title" label="Title" hint="Shown on the gallery card">
        <input
          id="photo-title"
          name="title"
          type="text"
          required
          minLength={3}
          maxLength={120}
          defaultValue={initial.title}
          className={controlClass}
        />
      </Field>

      <Field id="photo-caption" label="Caption" hint="Optional">
        <textarea
          id="photo-caption"
          name="caption"
          rows={3}
          maxLength={300}
          defaultValue={initial.caption}
          className={controlClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="photo-category" label="Category">
          <select
            id="photo-category"
            name="category"
            required
            defaultValue={initial.category}
            className={controlClass}
          >
            {adminGalleryCategories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="photo-meta" label="Tag" hint="Optional, e.g. Matchday 8">
          <input
            id="photo-meta"
            name="meta"
            type="text"
            maxLength={60}
            defaultValue={initial.meta}
            className={controlClass}
          />
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
          Visible on the website (needs a real title)
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initial.featured}
            className="mt-1 h-4 w-4 accent-navy"
          />
          Feature at the top of the gallery page (replaces the current one;
          the photo must be visible)
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="wide"
            defaultChecked={initial.wide}
            className="mt-1 h-4 w-4 accent-navy"
          />
          Show large in the grid (works best for landscape photos)
        </label>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save changes"}
      </Button>
      <FormMessage state={state} />
    </form>
  );
}
