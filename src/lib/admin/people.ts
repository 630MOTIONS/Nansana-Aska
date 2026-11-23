import type {
  FootId,
  PlayerRoleId,
  PositionId,
  StaffGroupId,
} from "./people-types";

export const positionOptions: { id: PositionId; label: string }[] = [
  { id: "goalkeeper", label: "Goalkeeper" },
  { id: "defender", label: "Defender (Fixo)" },
  { id: "winger", label: "Winger (Ala)" },
  { id: "pivot", label: "Pivot" },
];

export const roleOptions: { id: PlayerRoleId; label: string }[] = [
  { id: "captain", label: "Captain" },
  { id: "vice_captain", label: "Vice captain" },
];

export const footOptions: { id: FootId; label: string }[] = [
  { id: "right", label: "Right" },
  { id: "left", label: "Left" },
  { id: "both", label: "Both" },
];

export const groupOptions: { id: StaffGroupId; label: string }[] = [
  { id: "technical", label: "Technical team (coaches and staff)" },
  { id: "management", label: "Club leadership (management)" },
];

export const label = <T extends string>(
  options: { id: T; label: string }[],
  id: T | null,
): string => options.find((option) => option.id === id)?.label ?? "";
