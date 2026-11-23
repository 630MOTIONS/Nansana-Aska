"use client";

import { useActionState } from "react";
import { deletePhotoAction } from "@/app/admin/(portal)/gallery/actions";
import { FormMessage } from "@/components/admin/ui";
import type { FormState } from "@/lib/admin/form-state";

export default function DeletePhotoForm({ id }: { id: string }) {
  const [state, formAction, pending] = useActionState(
    deletePhotoAction.bind(null, id),
    {} as FormState,
  );

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("Delete this photo? This cannot be undone.")) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        disabled={pending}
        className="rounded-sm bg-red-700 px-4 py-2 text-button font-bold uppercase tracking-wide text-white hover:bg-red-800 disabled:opacity-60"
      >
        {pending ? "Deleting..." : "Delete photo"}
      </button>
      <FormMessage state={state} />
    </form>
  );
}
