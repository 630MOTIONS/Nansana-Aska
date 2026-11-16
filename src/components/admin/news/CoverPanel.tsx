"use client";

import { useActionState, useState } from "react";
import type { ChangeEvent } from "react";
import {
  refreshNewsAction,
  removeCoverAction,
} from "@/app/admin/(portal)/news/actions";
import { FormMessage, controlClass } from "@/components/admin/ui";
import type { FormState } from "@/lib/admin/form-state";
import { LOGO_ACCEPT, logoSrc } from "@/lib/admin/logo";
import { uploadImage } from "@/lib/admin/upload-client";

export default function CoverPanel({
  slug,
  coverUrl,
}: {
  slug: string;
  coverUrl: string | null;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removeState, removeAction, removing] = useActionState(
    removeCoverAction.bind(null, slug),
    {} as FormState,
  );
  const src = logoSrc(coverUrl);

  async function onPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    const result = await uploadImage(file, { purpose: "cover", slug });
    if (result.error) {
      setError(result.error);
    } else {
      await refreshNewsAction();
    }
    setUploading(false);
  }

  return (
    <div className="grid gap-5 sm:grid-cols-[14rem_1fr]">
      <div className="aspect-video overflow-hidden rounded-lg bg-surface-tint ring-1 ring-surface-strong">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Cover" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center p-3 text-center text-sm text-ink-muted">
            No cover photo
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label
            htmlFor="cover-file"
            className="mb-1.5 block text-label font-bold uppercase tracking-wide text-ink"
          >
            {coverUrl ? "Replace cover photo" : "Upload cover photo"}
          </label>
          <input
            id="cover-file"
            type="file"
            accept={LOGO_ACCEPT}
            disabled={uploading || removing}
            onChange={onPick}
            className={controlClass}
          />
          <p className="mt-1 text-sm text-ink-muted">
            PNG, JPEG or WebP, up to 8 MB. It is resized, and location data is
            removed. {uploading && "Uploading…"}
          </p>
        </div>

        {coverUrl && (
          <form action={removeAction}>
            <button
              type="submit"
              disabled={uploading || removing}
              className="text-label font-bold uppercase tracking-wide text-red-800 underline hover:text-red-900 disabled:opacity-60"
            >
              Remove cover photo
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
