import { Camera } from "lucide-react";

type MediaPlaceholderProps = {
  className?: string;
};

// Neutral stand-in until the club supplies real photos.
export default function MediaPlaceholder({ className }: MediaPlaceholderProps) {
  const classes = [
    "flex items-center justify-center bg-linear-to-br from-navy to-brand-blue text-white/30",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-hidden="true">
      <Camera size={40} />
    </div>
  );
}
