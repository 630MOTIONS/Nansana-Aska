import type { VideoCategoryId } from "./highlights-types";

export const videoCategoryOptions: { id: VideoCategoryId; label: string }[] = [
  { id: "match", label: "Match highlights" },
  { id: "goals", label: "Goals & saves" },
  { id: "recaps", label: "Match recaps" },
  { id: "training", label: "Training & drills" },
  { id: "behind", label: "Behind the scenes" },
  { id: "interviews", label: "Interviews" },
];

export function videoCategoryLabel(id: VideoCategoryId): string {
  return videoCategoryOptions.find((item) => item.id === id)?.label ?? id;
}
