"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { navLinks, siteConfig } from "@/lib/site";

export default function Header({
  nextFixture,
}: {
  // For example "Matchday 14 vs Park FC". Hidden when there is none.
  nextFixture?: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-brand-gold/40 bg-white">
      <div className="mx-auto flex w-full max-w-site items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={siteConfig.fullName}>
          <Image
            src={siteConfig.crest}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-extrabold uppercase text-brand-blue">
              Nansana ASKA
            </span>
            <span className="mt-1 text-[0.625rem] font-bold uppercase tracking-widest text-ink-muted">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`border-b-2 py-1 text-nav font-semibold uppercase tracking-wide transition-colors ${
                    isActive(link.href)
                      ? "border-brand-gold text-brand-blue"
                      : "border-transparent text-ink-muted hover:text-brand-blue"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          {nextFixture && (
            <div className="text-right leading-tight">
              <p className="text-[0.625rem] font-bold uppercase tracking-widest text-ink-muted">
                Next fixture
              </p>
              <p className="text-label font-bold text-navy">{nextFixture}</p>
            </div>
          )}
          <Button href="/contact">Join the club</Button>
        </div>

        <button
          type="button"
          className="rounded-sm p-2 text-navy lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-surface-tint bg-white px-4 pb-4 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-surface-tint py-3 text-base font-semibold uppercase tracking-wide ${
                    isActive(link.href) ? "text-brand-blue" : "text-ink-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {nextFixture && (
            <p className="mt-4 text-sm text-ink-muted">
              Next fixture:{" "}
              <strong className="text-navy">{nextFixture}</strong>
            </p>
          )}
          <Button href="/contact" className="mt-4 w-full">
            Join the club
          </Button>
        </nav>
      )}
    </header>
  );
}
