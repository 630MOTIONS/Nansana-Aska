"use client";

import { useActionState, useState } from "react";
import type { ChangeEvent } from "react";
import {
  refreshPeopleAction,
  removePersonPhotoAction,
} from "@/app/admin/(portal)/people-actions";
import { FormMessage, controlClass } from "@/components/admin/ui";
import type { FormState } from "@/lib/admin/form-state";
import { LOGO_ACCEPT, logoSrc } from "@/lib/admin/logo";
import { uploadImage } from "@/lib/admin/upload-client";

export default function PersonPhotoPanel({
  kind,
  id,
  photoUrl,
}: {
  kind: "player" | "staff";
  id: string;
  photoUrl: string | null;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removeState, removeAction, removing] = useActionState(
    removePersonPhotoAction.bind(null, kind, id),
    {} as FormState,
  );
  const src = logoSrc(photoUrl);

  async function onPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    const result = await uploadImage(file, { purpose: kind, id });
    if (result.error) {
      setError(result.error);
    } else {
      await refreshPeopleAction();
    }
    setUploading(false);
  }

  return (
    <div className="grid gap-5 sm:grid-cols-[10rem_1fr]">
      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-surface-tint ring-1 ring-surface-strong">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Photo" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center p-3 text-center text-sm text-ink-muted">
            No photo yet
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label
            htmlFor="person-photo"
            className="mb-1.5 block text-label font-bold uppercase tracking-wide text-ink"
          >
            {photoUrl ? "Replace photo" : "Upload photo"}
          </label>
          <input
            id="person-photo"
            type="file"
            accept={LOGO_ACCEPT}
            disabled={uploading || removing}
            onChange={onPick}
            className={controlClass}
          />
          <p className="mt-1 text-sm text-ink-muted">
            A portrait works best (shown in a 3:4 frame). PNG, JPEG or WebP, up
            to 30 MB. It is resized, and location data is removed.{" "}
            {uploading && "Uploading…"}
          </p>
        </div>

        {photoUrl && (
          <form action={removeAction}>
            <button
              type="submit"
              disabled={uploading || removing}
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
        <FormMessage state={removeState} />
      </div>
    </div>
  );
}
