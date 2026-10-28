import type { ReactNode } from "react";

type Variant = "orange" | "gold" | "navy" | "tint" | "onDark";

type BadgeProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

const base =
  "inline-flex items-center gap-1 rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide";

const variants: Record<Variant, string> = {
  orange: "bg-brand-orange text-ink",
  gold: "bg-brand-gold text-ink",
  navy: "bg-navy text-white",
  tint: "bg-surface-tint text-navy",
  onDark: "bg-white/10 text-gold-soft",
};

export default function Badge({
  variant = "tint",
  children,
  className,
}: BadgeProps) {
  const classes = [base, variants[variant], className]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
