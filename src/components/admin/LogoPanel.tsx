"use client";

import { useActionState } from "react";
import {
  removeLogoAction,
  uploadLogoAction,
} from "@/app/admin/(portal)/teams/actions";
import AdminTeamLogo from "@/components/admin/AdminTeamLogo";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import type { FormState } from "@/lib/admin/form-state";
import { LOGO_ACCEPT } from "@/lib/admin/logo";

export default function LogoPanel({
  slug,
  name,
  logoUrl,
}: {
  slug: string;
  name: string;
  logoUrl: string | null;
}) {
  const [uploadState, uploadAction, uploading] = useActionState(
    uploadLogoAction.bind(null, slug),
    {} as FormState,
  );
  const [removeState, removeAction, removing] = useActionState(
    removeLogoAction.bind(null, slug),
    {} as FormState,
  );

  return (
    <div className="flex flex-wrap items-start gap-6">
      <AdminTeamLogo name={name} logoUrl={logoUrl} size="lg" />

      <div className="min-w-0 flex-1 space-y-3">
        <form action={uploadAction} className="space-y-3">
          <Field
            id="logo-file"
            label={logoUrl ? "Replace logo" : "Upload logo"}
            hint="PNG, JPEG or WebP, under 500 KB"
          >
            <input
              id="logo-file"
              name="logo"
              type="file"
              accept={LOGO_ACCEPT}
              required
              className={controlClass}
            />
          </Field>
          <Button type="submit" disabled={uploading || removing}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </form>

        {logoUrl && (
          <form action={removeAction}>
            <button
              type="submit"
              disabled={uploading || removing}
              className="text-label font-bold uppercase tracking-wide text-red-800 underline hover:text-red-900 disabled:opacity-60"
            >
              Remove logo
            </button>
          </form>
        )}

        <FormMessage state={uploadState} />
        <FormMessage state={removeState} />
      </div>
    </div>
  );
}
