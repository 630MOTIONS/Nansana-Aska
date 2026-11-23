import type { Squad } from "./types";

export type PositionId = "goalkeeper" | "defender" | "winger" | "pivot";
export type PlayerRoleId = "captain" | "vice_captain";
export type FootId = "right" | "left" | "both";
export type StaffGroupId = "technical" | "management";

export type AdminPlayer = {
  id: string;
  name: string;
  squad: Squad;
  number: number | null;
  position: PositionId;
  role: PlayerRoleId | null;
  foot: FootId | null;
  appearances: number | null;
  goals: number | null;
  cleanSheets: number | null;
  saves: number | null;
  published: boolean;
  // Relative to the API, for example /media/<id>.
  photoUrl: string | null;
  updatedAt: string;
};

export type AdminStaff = {
  id: string;
  name: string;
  title: string;
  kicker: string | null;
  bio: string;
  group: StaffGroupId;
  sortOrder: number;
  published: boolean;
  photoUrl: string | null;
  updatedAt: string;
};
