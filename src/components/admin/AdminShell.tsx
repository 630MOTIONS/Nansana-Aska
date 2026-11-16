"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import AdminNavLinks, {
  AdminNavFallback,
} from "@/components/admin/AdminNavLinks";
import { CREST_SRC } from "@/lib/admin/constants";

// The collapsed choice is remembered in this browser. useSyncExternalStore
// reads it without a hydration mismatch: the server always renders expanded,
// then the browser switches to the saved choice.
const STORAGE_KEY = "aska-admin-sidebar";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function readCollapsed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "collapsed";
  } catch {
    return false;
  }
}

function saveCollapsed(value: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "collapsed" : "expanded");
  } catch {
    // Storage can be blocked (private mode). The sidebar still works.
  }
  listeners.forEach((listener) => listener());
}

export default function AdminShell({
  topbar,
  children,
}: {
  topbar: ReactNode;
  children: ReactNode;
}) {
  const collapsed = useSyncExternalStore(subscribe, readCollapsed, () => false);
  const [open, setOpen] = useState(false);

  // Escape closes the phone menu.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-screen lg:flex">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-navy-deep/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="admin-sidebar"
        aria-label="Admin sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-surface-strong bg-white transition-[transform,width] duration-200 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:shrink-0 lg:translate-x-0 lg:visible ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        } ${collapsed ? "lg:w-[4.5rem]" : "lg:w-64"}`}
      >
        <div
          className={`flex h-16 shrink-0 items-center gap-3 border-b border-surface-strong px-4 ${
            collapsed ? "lg:justify-center lg:px-0" : ""
          }`}
        >
          <Link
            href="/admin"
            title="Nansana ASKA Admin"
            className="flex min-w-0 items-center gap-3"
          >
            <Image
              src={CREST_SRC}
              alt=""
              width={36}
              height={36}
              className="shrink-0"
            />
            <span
              className={`font-display text-lg font-extrabold uppercase leading-none text-navy ${
                collapsed ? "lg:sr-only" : ""
              }`}
            >
              Nansana ASKA
              <span className="block text-label tracking-widest text-gold-deep">
                Admin
              </span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="ml-auto rounded-md p-2 text-navy lg:hidden"
          >
            <X size={22} aria-hidden />
          </button>
        </div>

        <nav aria-label="Admin" className="flex-1 overflow-y-auto p-3">
          <Suspense fallback={<AdminNavFallback />}>
            <AdminNavLinks
              collapsed={collapsed}
              onNavigate={() => setOpen(false)}
            />
          </Suspense>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-surface-strong bg-white/90 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            {/* Phones and tablets: opens the menu */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="admin-sidebar"
              onClick={() => setOpen(true)}
              className="rounded-md p-2 text-navy hover:bg-surface-tint lg:hidden"
            >
              <Menu size={24} aria-hidden />
            </button>

            {/* Desktop: collapses and expands the sidebar */}
            <button
              type="button"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              aria-controls="admin-sidebar"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => saveCollapsed(!collapsed)}
              className="hidden rounded-md p-2 text-navy hover:bg-surface-tint lg:inline-flex"
            >
              {collapsed ? (
                <PanelLeftOpen size={22} aria-hidden />
              ) : (
                <PanelLeftClose size={22} aria-hidden />
              )}
            </button>

            <p className="hidden text-sm font-semibold text-ink-muted lg:block">
              Club administration
            </p>
          </div>

          <div className="ml-auto">{topbar}</div>
        </header>

        {/* Full width: the content fills everything next to the sidebar. */}
        <main id="main" className="flex-1 px-4 py-6 lg:px-8 2xl:px-10">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
