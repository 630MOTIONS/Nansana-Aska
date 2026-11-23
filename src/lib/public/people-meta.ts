import type { Position, SquadId } from "@/lib/team";

// Labels used by the public Team page. Kept separate from the sample data so
// the sample players are not bundled into the browser.
export const positionLabels: Record<Position, { filter: string; card: string }> = {
  goalkeeper: { filter: "Goalkeepers", card: "Goalkeeper" },
  defender: { filter: "Defenders (Fixos)", card: "Defender / Fixo" },
  winger: { filter: "Wingers (Alas)", card: "Winger / Ala" },
  pivot: { filter: "Pivots", card: "Pivot" },
};

export const squadOptions: { id: SquadId; label: string }[] = [
  { id: "men", label: "Men’s team" },
  { id: "women", label: "Women’s team" },
];
