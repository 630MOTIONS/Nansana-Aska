import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
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
  description,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";
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
          className={`inline-flex items-center gap-2 text-label font-bold uppercase tracking-widest ${
            isDark ? "text-gold-soft" : "text-navy"
          }`}
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
