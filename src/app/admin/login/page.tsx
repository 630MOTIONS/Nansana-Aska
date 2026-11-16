import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-card">
        <p className="text-label font-bold uppercase tracking-widest text-gold-deep">
          Nansana ASKA
        </p>
        <h1 className="mt-1 text-section text-navy">Admin sign in</h1>
        <LoginForm />
        <p className="mt-6 text-sm text-ink-muted">
          Access is by invitation. If you need an account, ask a club
          administrator.
        </p>
      </div>
    </main>
  );
}
