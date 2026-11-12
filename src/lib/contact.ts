import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  Camera,
  CirclePlay,
  Clock,
  Globe,
  Mail,
  MessageCircle,
  Shield,
} from "lucide-react";

// SAMPLE DATA adapted from the Stitch design. None of it is confirmed with the
// club. Before launch, replace it with the club's real details.
//
// Left out on purpose because they are specific claims or details nobody has
// confirmed: the email address, training days and times, the FAU member club
// ID, stadium capacity and facilities (VIP mezzanine, media box, secure
// parking), gate and ticket-validation instructions, "court 1", the
// "256-bit SSL" and "average response time" promises, and the "monitored
// daily" claim. The map image is not used either.

export const trustStrip = [
  "FAU affiliated club",
  "Wakiso District community",
  "Official enquiries desk",
];

export const directChannels: {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
  link?: { label: string; href: string };
}[] = [
  {
    icon: Mail,
    label: "General enquiries",
    value: "Use the enquiry form",
    note: "For general club matters, media requests and fan enquiries.",
    link: { label: "Send an enquiry", href: "#enquiry" },
  },
  {
    icon: Building2,
    label: "Home arena & ground",
    value: "Old Kampala Arena",
    note: "Wakiso District, Uganda.",
  },
  {
    icon: Clock,
    label: "Training sessions",
    value: "Schedule to be confirmed",
    note: "Senior men’s and women’s divisions.",
  },
  {
    icon: Shield,
    label: "Governance & league",
    value: "Futsal Association Uganda (FAU)",
    note: "Competing in the FAU Futsal Super League.",
  },
];

export const locations: {
  icon: LucideIcon;
  label: string;
  title: string;
  text: string;
}[] = [
  {
    icon: Building2,
    label: "Official match arena",
    title: "Old Kampala Arena",
    text: "Wakiso / Kampala corridor, Central Region, Uganda.",
  },
  {
    icon: BadgeCheck,
    label: "Club secretariat",
    title: "Nansana Municipality",
    text: "Wakiso District, Uganda.",
  },
  {
    icon: Clock,
    label: "Matchday information",
    title: "Gate and ticket details",
    text: "These will be published here once the club has confirmed them.",
  },
];

// No links exist yet, so each card shows "Link coming soon" until `url` is set.
// The channel names and handle come from the design. Keep this list in step
// with the channels in src/lib/highlights.ts.
export const socialChannels: {
  id: string;
  icon: LucideIcon;
  iconClass: string;
  title: string;
  text: string;
  cta: string;
  url?: string;
}[] = [
  {
    id: "youtube",
    icon: CirclePlay,
    iconClass: "bg-brand-orange/20 text-gold-deep",
    title: "ASKA TV YouTube",
    text: "Video broadcasts, match replays, and tactical breakdown series.",
    cta: "Subscribe now",
  },
  {
    id: "facebook",
    icon: Globe,
    iconClass: "bg-brand-blue/15 text-brand-blue",
    title: "Nansana ASKA FC Facebook",
    text: "Matchday commentary, club communiqués, and photo galleries.",
    cta: "Follow page",
  },
  {
    id: "instagram",
    icon: Camera,
    iconClass: "bg-brand-gold/30 text-gold-deep",
    title: "@nansanaaskafc Instagram",
    text: "Reels, squad stories, and court-side photography.",
    cta: "Follow handle",
  },
  {
    id: "tiktok",
    icon: MessageCircle,
    iconClass: "bg-navy text-gold-soft",
    title: "ASKA Futsal TikTok",
    text: "Futsal skills, locker room celebrations, and youth academy highlights.",
    cta: "Watch clips",
  },
];

// The design only shows the questions. These answers point visitors to the
// right part of the site and state no club facts.
export const faqs: {
  question: string;
  answer: string;
  link?: { label: string; href: string };
}[] = [
  {
    question: "How do I enquire about upcoming player trials?",
    answer:
      "Choose “Player trials” in the enquiry form on this page and tell us about your playing experience.",
    link: { label: "Send an enquiry", href: "#enquiry" },
  },
  {
    question: "How can my brand or organisation sponsor Nansana ASKA?",
    answer:
      "Choose “Partnership & sponsorship” in the enquiry form and describe your organisation and what you have in mind.",
    link: { label: "Send an enquiry", href: "#enquiry" },
  },
  {
    question: "Where can I watch upcoming matches in person?",
    answer:
      "Fixtures, venues and kick-off times are listed on the Matches page.",
    link: { label: "View fixtures", href: "/matches" },
  },
  {
    question: "How can media personnel request press accreditation?",
    answer:
      "Choose “Media & press” in the enquiry form with your name, your organisation and what you need.",
    link: { label: "Send an enquiry", href: "#enquiry" },
  },
];
