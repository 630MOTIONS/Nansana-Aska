"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  Newspaper,
  Shield,
  Trophy,
} from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/matches", label: "Matches", icon: CalendarDays, exact: false },
  { href: "/admin/news", label: "News", icon: Newspaper, exact: false },
  { href: "/admin/teams", label: "Teams", icon: Shield, exact: false },
  { href: "/admin/competitions", label: "Competitions", icon: Trophy, exact: false },
];

export default function AdminNavLinks({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();

  return (
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
              title={item.label}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold ${
                collapsed ? "lg:justify-center lg:px-0" : ""
              } ${
                active
                  ? "bg-navy text-white"
                  : "text-ink-muted hover:bg-surface-tint hover:text-navy"
              }`}
            >
              <Icon size={20} aria-hidden className="shrink-0" />
              <span className={collapsed ? "lg:sr-only" : ""}>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function AdminNavFallback() {
  return <div className="h-32" aria-hidden="true" />;
}
