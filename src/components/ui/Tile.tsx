import type { ReactNode } from "react";

export type Tone = "gold" | "blue" | "orange" | "navy";

type TileProps = {
  tone: Tone;
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
};

// Text colours are picked for contrast: dark on gold/orange, white on blue/navy.
const tones: Record<Tone, string> = {
  gold: "bg-brand-gold text-ink",
  blue: "bg-brand-blue text-white",
  orange: "bg-brand-orange text-ink",
  navy: "bg-navy text-white",
};

const sizes = {
  sm: "h-7 w-7 rounded-md text-label font-bold",
  md: "h-9 w-9 rounded-lg",
};

export default function Tile({
  tone,
  size = "md",
  children,
  className,
}: TileProps) {
  const classes = [
    "inline-flex shrink-0 items-center justify-center",
    tones[tone],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
