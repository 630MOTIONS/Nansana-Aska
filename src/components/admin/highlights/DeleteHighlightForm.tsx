"use client";

import { useActionState } from "react";
import { deleteHighlightAction } from "@/app/admin/(portal)/highlights/actions";
import { FormMessage } from "@/components/admin/ui";
import type { FormState } from "@/lib/admin/form-state";

export default function DeleteHighlightForm({ id }: { id: string }) {
  const [state, formAction, pending] = useActionState(
    deleteHighlightAction.bind(null, id),
    {} as FormState,
  );

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("Delete this video? This cannot be undone.")) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        disabled={pending}
        className="rounded-sm bg-red-700 px-4 py-2 text-button font-bold uppercase tracking-wide text-white hover:bg-red-800 disabled:opacity-60"
      >
        {pending ? "Deleting..." : "Delete video"}
      </button>
      <FormMessage state={state} />
    </form>
  );
}
