import type { ArticleStatus } from "@/lib/admin/news-types";

export default function ArticleStatusBadge({ status }: { status: ArticleStatus }) {
  return (
    <span
      className={`inline-flex rounded-sm px-2 py-1 text-label font-bold uppercase tracking-wide ${
        status === "published"
          ? "bg-navy text-white"
          : "bg-brand-gold/30 text-gold-deep"
      }`}
    >
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}
