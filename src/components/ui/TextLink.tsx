import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function TextLink({ href, children, className }: TextLinkProps) {
  const classes = [
    "inline-flex items-center gap-2 text-button font-bold uppercase tracking-wide text-navy transition-colors hover:text-brand-blue",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight size={14} aria-hidden />
    </Link>
  );
}
