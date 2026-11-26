"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Film,
  ImagePlus,
  Images,
  LayoutDashboard,
  Newspaper,
  Shield,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";

const groups = [
  {
    label: null,
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Matchday",
    items: [
      { href: "/admin/matches", label: "Matches", icon: CalendarDays, exact: false },
      { href: "/admin/competitions", label: "Competitions", icon: Trophy, exact: false },
      { href: "/admin/teams", label: "Teams", icon: Shield, exact: false },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/news", label: "News", icon: Newspaper, exact: false },
      { href: "/admin/gallery", label: "Gallery", icon: Images, exact: false },
      { href: "/admin/highlights", label: "Highlights", icon: Film, exact: false },
      { href: "/admin/page-images", label: "Page images", icon: ImagePlus, exact: false },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/admin/players", label: "Players", icon: Users, exact: false },
      { href: "/admin/staff", label: "Staff", icon: UserRound, exact: false },
    ],
  },
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
    <div className="space-y-4">
      {groups.map((group, index) => (
        <div key={group.label ?? "top"}>
          {group.label && (
            <>
              <p
                className={`px-3 pb-1 text-label font-bold uppercase tracking-widest text-gold-soft/90 ${
                  collapsed ? "lg:hidden" : ""
                }`}
              >
                {group.label}
              </p>
              {index > 0 && collapsed && (
                <hr className="mx-3 mb-2 hidden border-white/15 lg:block" />
              )}
            </>
          )}
          <ul className="space-y-1">
            {group.items.map((item) => {
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
                        ? "bg-white text-navy"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={20} aria-hidden className="shrink-0" />
                    <span className={collapsed ? "lg:sr-only" : ""}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function AdminNavFallback() {
  return <div className="h-32" aria-hidden="true" />;
}
