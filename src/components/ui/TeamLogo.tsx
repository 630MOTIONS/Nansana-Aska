import Image from "next/image";
import type { ClubLogo } from "@/lib/clubs";
import { siteConfig } from "@/lib/site";

type TeamLogoProps = {
  name: string;
  initials?: string;
  isClub?: boolean; // Nansana ASKA: shows the crest
  logo?: ClubLogo; // an opponent's logo, if we have one
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { box: "h-8 w-8 p-0.5 rounded-md", px: 32, text: "text-[0.625rem]" },
  md: { box: "h-12 w-12 p-1 rounded-lg", px: 48, text: "text-sm" },
  lg: { box: "h-20 w-20 p-2 rounded-xl", px: 80, text: "text-xl" },
} as const;

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// Shown next to the team's name, so the image itself is decorative. Logos sit
// on a white chip because the files have white backgrounds.
export default function TeamLogo({
  name,
  initials,
  isClub,
  logo,
  size = "md",
  className,
}: TeamLogoProps) {
  const { box, px, text } = sizes[size];
  const src = isClub ? siteConfig.crest : logo?.src;

  const classes = [
    "flex shrink-0 items-center justify-center overflow-hidden ring-1 ring-surface-strong",
    box,
    src ? "bg-white" : "bg-surface-tint",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {src ? (
        <Image
          src={src}
          alt=""
          width={px}
          height={px}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className={`font-bold text-ink-muted ${text}`} aria-hidden="true">
          {initials ?? initialsOf(name)}
        </span>
      )}
    </span>
  );
}
