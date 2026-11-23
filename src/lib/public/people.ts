import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { players as samplePlayers, staff as sampleStaff } from "@/lib/team";
import type { Player, PlayerStat, StaffMember } from "@/lib/team";
import { publicGet, USE_SAMPLE_CONTENT } from "./api";
import { apiMedia } from "./media";

type ApiPlayer = {
  id: string;
  name: string;
  squad: "men" | "women";
  number: number | null;
  position: "goalkeeper" | "defender" | "winger" | "pivot";
  role: "captain" | "vice_captain" | null;
  foot: "right" | "left" | "both" | null;
  appearances: number | null;
  goals: number | null;
  cleanSheets: number | null;
  saves: number | null;
  photoUrl: string | null;
};

type ApiStaff = {
  id: string;
  name: string;
  title: string;
  kicker: string | null;
  bio: string;
  group: "technical" | "management";
  photoUrl: string | null;
};

const footLabel = { right: "Right", left: "Left", both: "Both" } as const;

// Only the figures the club entered are shown.
function statsOf(row: ApiPlayer): PlayerStat[] {
  const stats: PlayerStat[] = [];
  if (row.appearances !== null) stats.push({ label: "Apps", value: String(row.appearances) });
  if (row.goals !== null) stats.push({ label: "Goals", value: String(row.goals), highlight: true });
  if (row.cleanSheets !== null) {
    stats.push({ label: "Clean sheets", value: String(row.cleanSheets), highlight: true });
  }
  if (row.saves !== null) stats.push({ label: "Saves", value: String(row.saves), highlight: true });
  if (row.foot) stats.push({ label: "Foot", value: footLabel[row.foot] });
  return stats;
}

function toPlayer(row: ApiPlayer): Player {
  return {
    id: row.id,
    squad: row.squad,
    number: row.number === null ? "" : String(row.number).padStart(2, "0"),
    name: row.name,
    position: row.position,
    role:
      row.role === "captain"
        ? "captain"
        : row.role === "vice_captain"
          ? "vice-captain"
          : undefined,
    stats: statsOf(row),
    photo: apiMedia(row.photoUrl),
  };
}

function toStaff(row: ApiStaff): StaffMember {
  return {
    id: row.id,
    kicker: row.kicker ?? "",
    name: row.name,
    role: row.title,
    description: row.bio,
    photo: apiMedia(row.photoUrl),
  };
}

// The admin clears the "people" tag whenever a player or staff member is
// added, edited, hidden or deleted. The lifetime is only the backstop.
const LIFETIME = { stale: 60, revalidate: 600, expire: 3600 };

export async function getPlayers(): Promise<Player[]> {
  "use cache";
  cacheLife(LIFETIME);
  cacheTag("people");

  if (USE_SAMPLE_CONTENT) return samplePlayers;

  const rows = (await publicGet<ApiPlayer[]>("/players")) ?? [];
  return rows.map(toPlayer);
}

export async function getStaff(): Promise<{
  technical: StaffMember[];
  management: StaffMember[];
}> {
  "use cache";
  cacheLife(LIFETIME);
  cacheTag("people");

  if (USE_SAMPLE_CONTENT) return { technical: sampleStaff, management: [] };

  const rows = (await publicGet<ApiStaff[]>("/staff")) ?? [];
  return {
    technical: rows.filter((row) => row.group === "technical").map(toStaff),
    management: rows.filter((row) => row.group === "management").map(toStaff),
  };
}
