import type { ReactNode } from "react";

type CardProps = {
  as?: "div" | "article" | "section" | "li";
  children: ReactNode;
  className?: string;
};

export default function Card({
  as: Tag = "div",
  children,
  className,
}: CardProps) {
  const classes = ["overflow-hidden rounded-xl bg-white shadow-card", className]
    .filter(Boolean)
    .join(" ");
  return <Tag className={classes}>{children}</Tag>;
}
