import { CalendarDays, CirclePlay, Mail } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function TeamCta() {
  return (
    <section
      aria-label="Stand with Nansana ASKA"
      className="bg-brand-blue py-16 text-white"
    >
      <div className="mx-auto flex w-full max-w-site flex-col items-center px-4 text-center">
        <Badge variant="onDark">Be part of our journey</Badge>
        <h2 className="mt-5 max-w-3xl text-hero">Stand with Nansana ASKA</h2>
        <p className="mt-4 max-w-2xl text-hero-sub text-white/85">
          Follow our season matchdays, watch match highlights, and stay
          connected with the coaches and players shaping the future of Ugandan
          futsal.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            href="/highlights"
            icon={<CirclePlay size={16} aria-hidden />}
          >
            Latest highlights
          </Button>
          <Button
            href="/matches"
            variant="light"
            icon={<CalendarDays size={16} aria-hidden />}
          >
            Upcoming matches
          </Button>
          <Button
            href="/contact"
            variant="dark"
            icon={<Mail size={16} aria-hidden />}
          >
            Contact the club
          </Button>
        </div>
      </div>
    </section>
  );
}
