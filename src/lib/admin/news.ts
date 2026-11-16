import type { ArticleCategory } from "./news-types";

export const articleCategories: { id: ArticleCategory; label: string }[] = [
  { id: "match_reports", label: "Match reports" },
  { id: "club_updates", label: "Club updates" },
  { id: "team_academy", label: "Team & academy" },
  { id: "announcements", label: "Announcements" },
];

export function categoryLabel(id: ArticleCategory): string {
  return articleCategories.find((item) => item.id === id)?.label ?? id;
}
