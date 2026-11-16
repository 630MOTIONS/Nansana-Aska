import type { ReactNode } from "react";
import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import UserMenu from "@/components/admin/UserMenu";

// Nothing here reads the session. The shell is static, and the parts that need
// the signed-in user stream in behind <Suspense>. Each page checks the session
// itself, because layouts do not re-run on navigation.
export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <AdminShell
      topbar={
        <Suspense
          fallback={<span className="text-sm text-ink-muted">Loading…</span>}
        >
          <UserMenu />
        </Suspense>
      }
    >
      <Suspense fallback={<p className="text-ink-muted">Loading…</p>}>
        {children}
      </Suspense>
    </AdminShell>
  );
}
