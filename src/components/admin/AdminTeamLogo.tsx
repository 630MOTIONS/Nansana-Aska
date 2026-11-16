import { logoSrc } from "@/lib/admin/logo";

const sizes = {
  sm: "h-8 w-8 rounded-md text-[0.625rem]",
  md: "h-12 w-12 rounded-lg text-sm",
  lg: "h-24 w-24 rounded-xl text-xl",
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

// The name is always shown next to the logo, so the image is decorative.
export default function AdminTeamLogo({
  name,
  logoUrl,
  size = "md",
}: {
  name: string;
  logoUrl: string | null;
  size?: keyof typeof sizes;
}) {
  const src = logoSrc(logoUrl);

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden ring-1 ring-surface-strong ${sizes[size]} ${
        src ? "bg-white" : "bg-surface-tint"
      }`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-contain" />
      ) : (
        <span aria-hidden="true" className="font-bold text-ink-muted">
          {initialsOf(name)}
        </span>
      )}
    </span>
  );
}
