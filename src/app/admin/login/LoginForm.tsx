"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/auth-actions";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import type { FormState } from "@/lib/admin/form-state";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    {} as FormState,
  );

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <Field id="login-email" label="Email">
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={controlClass}
        />
      </Field>
      <Field id="login-password" label="Password">
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={controlClass}
        />
      </Field>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in..." : "Sign in"}
      </Button>
      <FormMessage state={state} />
    </form>
  );
}
