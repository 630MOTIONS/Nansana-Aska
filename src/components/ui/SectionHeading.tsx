import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  eyebrowTone?: "navy" | "gold"; // label colour on light backgrounds
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark"; // light = on light background, dark = on dark background
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export default function SectionHeading({
  title,
  eyebrow,
  eyebrowIcon,
  eyebrowTone = "navy",
  description,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const eyebrowColour = isDark
    ? "text-gold-soft"
    : eyebrowTone === "gold"
      ? "text-gold-deep"
      : "text-navy";

  const classes = [
    "flex flex-col gap-2",
    align === "center" ? "items-center text-center" : "items-start text-left",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {eyebrow && (
        <p
          className={`inline-flex items-center gap-2 text-label font-bold uppercase tracking-widest ${eyebrowColour}`}
        >
          {eyebrowIcon}
          {eyebrow}
        </p>
      )}
      <Heading className={`text-section ${isDark ? "text-white" : "text-ink"}`}>
        {title}
      </Heading>
      {description && (
        <p className={isDark ? "text-white/80" : "text-ink-muted"}>
          {description}
        </p>
      )}
    </div>
  );
}
