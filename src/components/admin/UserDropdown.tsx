"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink, LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/auth-actions";

type UserDropdownProps = {
  name: string;
  email: string;
  role: "admin" | "editor";
};

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function UserDropdown({ name, email, role }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  // Click outside or Escape closes the menu.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={container} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="user-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-full py-1 pl-1 pr-3 hover:bg-surface-tint"
      >
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
        >
          {initialsOf(name)}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-semibold leading-tight text-navy">
            {name}
          </span>
          <span className="block text-label font-bold uppercase leading-tight text-gold-deep">
            {role}
          </span>
        </span>
        <ChevronDown
          size={16}
          aria-hidden
          className={`text-ink-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
        <span className="sr-only">Account menu for {name}</span>
      </button>

      {open && (
        <div
          id="user-menu"
          className="absolute right-0 z-30 mt-2 w-64 rounded-xl bg-white p-2 shadow-lg ring-1 ring-surface-strong"
        >
          <div className="px-3 py-2">
            <p className="font-semibold text-navy">{name}</p>
            <p className="break-all text-sm text-ink-muted">{email}</p>
          </div>
          <div className="my-1 border-t border-surface-strong" />
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-navy hover:bg-surface-tint"
          >
            <ExternalLink size={16} aria-hidden /> View public site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-navy hover:bg-surface-tint"
            >
              <LogOut size={16} aria-hidden /> Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
