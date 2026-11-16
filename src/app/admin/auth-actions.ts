"use server";

import { redirect } from "next/navigation";
import { apiRequest } from "@/lib/admin/api";
import type { FormState } from "@/lib/admin/form-state";
import {
  clearSessionToken,
  getSessionToken,
  setSessionToken,
} from "@/lib/admin/session";

export async function loginAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const result = await apiRequest<{ token: string; expiresAt: string }>(
    "/auth/login",
    { method: "POST", body: { email, password } },
  );

  if (!result.ok) {
    if (result.status === 401) return { error: "Invalid email or password." };
    if (result.status === 400) {
      return { error: "Enter a valid email address and your password." };
    }
    return { error: result.message };
  }

  await setSessionToken(result.data.token, new Date(result.data.expiresAt));
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const token = await getSessionToken();
  if (token) {
    // Ends the session on the server too. If this fails the cookie is still
    // removed below.
    await apiRequest("/auth/logout", { method: "POST", token });
  }
  await clearSessionToken();
  redirect("/admin/login");
}
