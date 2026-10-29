import type { LucideIcon } from "lucide-react";
import { RadioTower, ShieldPlus, Shirt } from "lucide-react";

// Placeholder partner categories from the Stitch design. These are open
// sponsorship slots, not confirmed partners.

export type PartnerSlot = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const partnerSlots: PartnerSlot[] = [
  {
    id: "kit",
    title: "Technical kit partner",
    description: "Official jersey, apparel & match gear",
    icon: Shirt,
  },
  {
    id: "health",
    title: "Community health partner",
    description: "Athlete wellness, hydration & medical care",
    icon: ShieldPlus,
  },
  {
    id: "media",
    title: "Wakiso sports media partner",
    description: "Regional coverage & digital fan broadcasts",
    icon: RadioTower,
  },
];
