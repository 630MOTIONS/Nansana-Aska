"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { refreshGalleryAction } from "@/app/admin/(portal)/gallery/actions";
import { Field, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import { adminGalleryCategories } from "@/lib/admin/gallery";
import { LOGO_ACCEPT } from "@/lib/admin/logo";
import { uploadImage } from "@/lib/admin/upload-client";

type Item = {
  name: string;
  state: "waiting" | "uploading" | "done" | "error";
  message?: string;
};

const MAX_FILES = 20;

export default function GalleryUploader() {
  const [category, setCategory] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  function patch(index: number, change: Partial<Item>) {
    setItems((current) =>
      current.map((item, position) =>
        position === index ? { ...item, ...change } : item,
      ),
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const files = Array.from(input.current?.files ?? []);

    if (!category) return setNote("Choose a category first.");
    if (files.length === 0) return setNote("Choose at least one photo.");
    if (files.length > MAX_FILES) {
      return setNote(`Choose ${MAX_FILES} photos or fewer at a time.`);
    }

    setNote(null);
    setBusy(true);
    setItems(files.map((file) => ({ name: file.name, state: "waiting" })));

    // One photo per request: a failure only affects that photo, and each
    // request stays small.
    let uploaded = 0;
    for (let index = 0; index < files.length; index++) {
      patch(index, { state: "uploading" });
      const result = await uploadImage(files[index], {
        purpose: "gallery",
        category,
      });
      if (result.error) {
        patch(index, { state: "error", message: result.error });
      } else {
        uploaded += 1;
        patch(index, { state: "done" });
      }
    }

    await refreshGalleryAction();
    setBusy(false);
    if (input.current) input.current.value = "";
    setNote(
      uploaded > 0
        ? `${uploaded} of ${files.length} uploaded. They are hidden until you give them titles and publish them.`
        : "Nothing was uploaded.",
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[16rem_1fr]">
        <Field id="upload-category" label="Category">
          <select
            id="upload-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            disabled={busy}
            className={controlClass}
          >
            <option value="">Choose…</option>
            {adminGalleryCategories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="upload-files"
          label="Photos"
          hint={`Up to ${MAX_FILES}, 30 MB each`}
        >
          <input
            id="upload-files"
            ref={input}
            type="file"
            accept={LOGO_ACCEPT}
            multiple
            disabled={busy}
            className={controlClass}
          />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={busy}>
          {busy ? "Uploading..." : "Upload photos"}
        </Button>
        <p className="text-sm text-ink-muted">
          Photos are resized, and location data is removed.
        </p>
      </div>

      {note && (
        <p role="status" className="rounded-md bg-surface-tint p-3 text-sm font-semibold text-navy">
          {note}
        </p>
      )}

      {items.length > 0 && (
        <ul className="divide-y divide-surface-strong rounded-md border border-surface-strong text-sm">
          {items.map((item, index) => (
            <li key={`${item.name}-${index}`} className="flex items-center justify-between gap-3 px-3 py-2">
              <span className="truncate text-navy">{item.name}</span>
              <span
                className={`shrink-0 text-label font-bold uppercase tracking-wide ${
                  item.state === "error"
                    ? "text-red-800"
                    : item.state === "done"
                      ? "text-gold-deep"
                      : "text-ink-muted"
                }`}
              >
                {item.state === "waiting" && "Waiting"}
                {item.state === "uploading" && "Uploading…"}
                {item.state === "done" && "Uploaded"}
                {item.state === "error" && (item.message ?? "Failed")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
