"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { CalendarDays, LayoutDashboard, Menu, Shield, X } from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/matches", label: "Matches", icon: CalendarDays, exact: false },
  { href: "/admin/teams", label: "Teams", icon: Shield, exact: false },
];

export default function AdminSidebar({ footer }: { footer: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const brand = (
    <Link
      href="/admin"
      className="font-display text-xl font-extrabold uppercase text-navy"
    >
      Nansana ASKA <span className="text-gold-deep">Admin</span>
    </Link>
  );

  return (
    <>
      {/* Phones and tablets: a top bar with a menu button */}
      <div className="flex items-center justify-between border-b border-surface-strong bg-white px-4 py-3 lg:hidden">
        {brand}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="admin-sidebar"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="rounded-md p-2 text-navy"
        >
          {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
        </button>
      </div>

      <aside
        id="admin-sidebar"
        className={`${open ? "block" : "hidden"} border-b border-surface-strong bg-white lg:sticky lg:top-0 lg:block lg:h-screen lg:border-b-0 lg:border-r`}
      >
        <div className="flex h-full flex-col gap-6 p-4">
          <div className="hidden lg:block">{brand}</div>

          <nav aria-label="Admin">
            <ul className="space-y-1">
              {items.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold ${
                        active
                          ? "bg-navy text-white"
                          : "text-ink-muted hover:bg-surface-tint hover:text-navy"
                      }`}
                    >
                      <Icon size={18} aria-hidden />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto border-t border-surface-strong pt-4">
            {footer}
          </div>
        </div>
      </aside>
    </>
  );
}
