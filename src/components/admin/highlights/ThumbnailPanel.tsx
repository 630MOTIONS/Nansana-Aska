"use client";

import { useActionState, useState } from "react";
import type { ChangeEvent } from "react";
import {
  refreshHighlightsAction,
  refreshThumbnailAction,
  removeThumbnailAction,
} from "@/app/admin/(portal)/highlights/actions";
import { FormMessage, controlClass } from "@/components/admin/ui";
import type { FormState } from "@/lib/admin/form-state";
import { LOGO_ACCEPT, logoSrc } from "@/lib/admin/logo";
import { uploadImage } from "@/lib/admin/upload-client";

export default function ThumbnailPanel({
  id,
  thumbnailUrl,
  isYoutube,
}: {
  id: string;
  thumbnailUrl: string | null;
  isYoutube: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removeState, removeAction, removing] = useActionState(
    removeThumbnailAction.bind(null, id),
    {} as FormState,
  );
  const [refreshState, refreshAction, refreshing] = useActionState(
    refreshThumbnailAction.bind(null, id),
    {} as FormState,
  );
  const src = logoSrc(thumbnailUrl);
  const busy = uploading || removing || refreshing;

  async function onPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    const result = await uploadImage(file, { purpose: "thumbnail", id });
    if (result.error) {
      setError(result.error);
    } else {
      await refreshHighlightsAction();
    }
    setUploading(false);
  }

  return (
    <div className="grid gap-5 sm:grid-cols-[14rem_1fr]">
      <div className="aspect-video overflow-hidden rounded-lg bg-surface-tint ring-1 ring-surface-strong">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Thumbnail" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center p-3 text-center text-sm text-ink-muted">
            No thumbnail
          </div>
        )}
      </div>

      <div className="space-y-3">
        {!thumbnailUrl && isYoutube && (
          <p className="rounded-md bg-surface-strong p-3 text-sm text-ink-muted">
            No thumbnail could be fetched from YouTube. Try again, or upload
            one.
          </p>
        )}
        {!isYoutube && !thumbnailUrl && (
          <p className="rounded-md bg-surface-strong p-3 text-sm text-ink-muted">
            This link is not from YouTube, so the thumbnail is not automatic.
            Upload a picture to show on the website.
          </p>
        )}

        <div>
          <label
            htmlFor="thumb-file"
            className="mb-1.5 block text-label font-bold uppercase tracking-wide text-ink"
          >
            {thumbnailUrl ? "Replace thumbnail" : "Upload thumbnail"}
          </label>
          <input
            id="thumb-file"
            type="file"
            accept={LOGO_ACCEPT}
            disabled={busy}
            onChange={onPick}
            className={controlClass}
          />
          <p className="mt-1 text-sm text-ink-muted">
            A wide (16:9) picture works best. PNG, JPEG or WebP, up to 30 MB.{" "}
            {uploading && "Uploading…"}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {isYoutube && (
            <form action={refreshAction}>
              <button
                type="submit"
                disabled={busy}
                className="text-label font-bold uppercase tracking-wide text-navy underline hover:text-brand-blue disabled:opacity-60"
              >
                {refreshing ? "Fetching…" : "Fetch from YouTube again"}
              </button>
            </form>
          )}
          {thumbnailUrl && (
            <form action={removeAction}>
              <button
                type="submit"
                disabled={busy}
                className="text-label font-bold uppercase tracking-wide text-red-800 underline hover:text-red-900 disabled:opacity-60"
              >
                Remove thumbnail
              </button>
            </form>
          )}
        </div>

        {error && (
          <p role="alert" className="text-sm font-semibold text-red-800">
            {error}
          </p>
        )}
        <FormMessage state={removeState} />
        <FormMessage state={refreshState} />
      </div>
    </div>
  );
}
