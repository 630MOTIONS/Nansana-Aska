"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/matches", label: "Matches", exact: false },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-semibold ${
                  active
                    ? "bg-surface-tint text-navy"
                    : "text-ink-muted hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
