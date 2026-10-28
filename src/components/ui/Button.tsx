import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "light";

type ButtonProps = {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
} & (
  | { href: string; type?: never; onClick?: never; disabled?: never }
  | {
      href?: undefined;
      type?: "button" | "submit";
      onClick?: () => void;
      disabled?: boolean;
    }
);

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-button font-semibold uppercase tracking-wide transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  // Dark text on orange keeps WCAG AA contrast. Swap text-ink for text-white
  // to match the Stitch screenshot exactly (white on orange is about 2.4:1).
  primary: "bg-brand-orange text-ink hover:brightness-95",
  secondary: "bg-white/15 text-white hover:bg-white/25",
  dark: "bg-navy text-white hover:bg-navy-deep",
  light: "bg-white text-navy hover:bg-surface-tint",
};

export default function Button(props: ButtonProps) {
  const { variant = "primary", icon, children, className } = props;
  const classes = [base, variants[variant], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
