import type { ReactNode } from "react";
import { Suspense } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import UserMenu from "@/components/admin/UserMenu";

// Nothing here reads the session. The shell is static, and the parts that need
// the signed-in user stream in behind <Suspense>. Each page checks the session
// itself, because layouts do not re-run on navigation.
export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <Suspense fallback={<div className="hidden lg:block" />}>
        <AdminSidebar
          footer={
            <Suspense
              fallback={<span className="text-sm text-ink-muted">Loading…</span>}
            >
              <UserMenu />
            </Suspense>
          }
        />
      </Suspense>
      <main id="main" className="min-w-0 px-4 py-8 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <Suspense fallback={<p className="text-ink-muted">Loading…</p>}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
