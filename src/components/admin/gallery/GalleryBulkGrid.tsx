"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { FormEvent } from "react";
import { bulkGalleryAction } from "@/app/admin/(portal)/gallery/actions";
import { FormMessage } from "@/components/admin/ui";
import type { FormState } from "@/lib/admin/form-state";
import { galleryCategoryLabel } from "@/lib/admin/gallery";
import type { AdminPhoto } from "@/lib/admin/gallery-types";
import { logoSrc } from "@/lib/admin/logo";

export default function GalleryBulkGrid({
  photos,
  canDelete,
}: {
  photos: AdminPhoto[];
  canDelete: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    bulkGalleryAction,
    {} as FormState,
  );
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = photos.length > 0 && selected.size === photos.length;

  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    if (
      submitter?.value === "delete" &&
      !window.confirm(
        `Delete ${selected.size} photo${selected.size === 1 ? "" : "s"}? This cannot be undone.`,
      )
    ) {
      event.preventDefault();
    }
  }

  const buttonBase =
    "rounded-sm px-4 py-2 text-button font-bold uppercase tracking-wide disabled:opacity-60";

  return (
    <form action={formAction} onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white p-3 shadow-card">
        <label className="flex items-center gap-2 text-sm font-semibold text-navy">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() =>
              setSelected(
                allSelected ? new Set() : new Set(photos.map((photo) => photo.id)),
              )
            }
            className="h-4 w-4 accent-navy"
          />
          Select all
        </label>
        <span className="text-sm text-ink-muted" aria-live="polite">
          {selected.size} selected
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          <button
            type="submit"
            name="action"
            value="publish"
            disabled={pending}
            className={`${buttonBase} bg-brand-orange text-ink hover:brightness-95`}
          >
            Publish
          </button>
          <button
            type="submit"
            name="action"
            value="hide"
            disabled={pending}
            className={`${buttonBase} bg-surface-tint text-navy hover:bg-surface-strong`}
          >
            Hide
          </button>
          {canDelete && (
            <button
              type="submit"
              name="action"
              value="delete"
              disabled={pending}
              className={`${buttonBase} bg-red-700 text-white hover:bg-red-800`}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <FormMessage state={state} />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photos.map((photo) => {
          const src = logoSrc(photo.imageUrl);
          return (
            <li
              key={photo.id}
              className={`overflow-hidden rounded-xl bg-white shadow-card ring-2 ${
                selected.has(photo.id) ? "ring-brand-orange" : "ring-transparent"
              }`}
            >
              <div className="relative aspect-[4/3] bg-surface-tint">
                {src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
                <label className="absolute left-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-white/90 shadow">
                  <input
                    type="checkbox"
                    name="ids"
                    value={photo.id}
                    checked={selected.has(photo.id)}
                    onChange={() => toggle(photo.id)}
                    className="h-4 w-4 accent-navy"
                  />
                  <span className="sr-only">Select {photo.title}</span>
                </label>
                <span
                  className={`absolute right-2 top-2 rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide ${
                    photo.published
                      ? "bg-navy text-white"
                      : "bg-brand-gold text-ink"
                  }`}
                >
                  {photo.published ? "Published" : "Hidden"}
                </span>
                {photo.featured && (
                  <span className="absolute bottom-2 left-2 rounded-sm bg-brand-orange px-2 py-1 text-label font-bold uppercase tracking-wide text-ink">
                    Featured
                  </span>
                )}
              </div>
              <div className="space-y-1 p-3">
                <p className="truncate font-semibold text-navy">{photo.title}</p>
                <p className="text-sm text-ink-muted">
                  {galleryCategoryLabel(photo.category)}
                </p>
                <Link
                  href={`/admin/gallery/${photo.id}`}
                  className="inline-block pt-1 text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
                >
                  Edit details
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </form>
  );
}
