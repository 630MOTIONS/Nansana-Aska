"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { ChangeEvent } from "react";
import {
  refreshSiteImagesAction,
  removeSiteImageAction,
  saveAltAction,
} from "@/app/admin/(portal)/page-images/actions";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { FormState } from "@/lib/admin/form-state";
import { LOGO_ACCEPT, logoSrc } from "@/lib/admin/logo";
import type { siteImageSlots } from "@/lib/admin/site-image-slots";
import type { AdminSiteImage } from "@/lib/admin/site-images-types";
import { uploadImage } from "@/lib/admin/upload-client";

type Slot = (typeof siteImageSlots)[number];

export default function SiteImageCard({
  slot,
  image,
}: {
  slot: Slot;
  image: AdminSiteImage | null;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [altState, altAction, savingAlt] = useActionState(
    saveAltAction.bind(null, slot.key),
    {} as FormState,
  );
  const [removeState, removeAction, removing] = useActionState(
    removeSiteImageAction.bind(null, slot.key),
    {} as FormState,
  );
  const src = image ? logoSrc(image.imageUrl, 960) : null;
  const busy = uploading || removing || savingAlt;

  async function onPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    const result = await uploadImage(file, { purpose: "site", key: slot.key });
    if (result.error) {
      setError(result.error);
    } else {
      await refreshSiteImagesAction();
    }
    setUploading(false);
  }

  return (
    <Card as="section" className="grid gap-6 p-6 lg:grid-cols-[22rem_1fr]">
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-surface-tint ring-1 ring-surface-strong">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Current photo" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-ink-muted">
            No photo yet. The website shows its blue placeholder.
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-card text-navy">{slot.title}</h2>
          <p className="mt-1 text-sm text-ink-muted">{slot.where}</p>
          <p className="mt-1 text-sm text-ink-muted">{slot.tip}</p>
          <Link
            href={slot.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-label font-bold uppercase tracking-wide text-navy underline hover:text-brand-blue"
          >
            View the page
            <span className="sr-only"> (opens in a new tab)</span>
          </Link>
        </div>

        <div>
          <label
            htmlFor={`file-${slot.key}`}
            className="mb-1.5 block text-label font-bold uppercase tracking-wide text-ink"
          >
            {image ? "Replace photo" : "Upload photo"}
          </label>
          <input
            id={`file-${slot.key}`}
            type="file"
            accept={LOGO_ACCEPT}
            disabled={busy}
            onChange={onPick}
            className={controlClass}
          />
          <p className="mt-1 text-sm text-ink-muted">
            PNG, JPEG or WebP, up to 30 MB. Large photos are shrunk before they
            upload, and location data is removed. {uploading && "Uploading…"}
          </p>
        </div>

        {image && (
          <form action={altAction} className="space-y-3">
            <Field
              id={`alt-${slot.key}`}
              label="Description for screen readers"
              hint="Optional. Leave empty for a purely decorative photo"
            >
              <input
                id={`alt-${slot.key}`}
                name="alt"
                type="text"
                maxLength={200}
                defaultValue={image.alt}
                className={controlClass}
              />
            </Field>
            <Button type="submit" variant="light" disabled={busy} className="bg-surface-tint">
              {savingAlt ? "Saving..." : "Save description"}
            </Button>
          </form>
        )}

        {image && (
          <form action={removeAction}>
            <button
              type="submit"
              disabled={busy}
              className="text-label font-bold uppercase tracking-wide text-red-800 underline hover:text-red-900 disabled:opacity-60"
            >
              Remove photo
            </button>
          </form>
        )}

        {error && (
          <p role="alert" className="text-sm font-semibold text-red-800">
            {error}
          </p>
        )}
        <FormMessage state={altState} />
        <FormMessage state={removeState} />
      </div>
    </Card>
  );
}
