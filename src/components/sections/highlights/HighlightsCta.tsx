import { Flag } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function HighlightsCta() {
  return (
    <section
      aria-label="Join our sporting movement"
      className="bg-linear-to-br from-navy to-brand-blue py-16 text-white"
    >
      <div className="mx-auto grid w-full max-w-site items-center gap-8 px-4 lg:grid-cols-[1fr_auto]">
        <div>
          <Badge variant="onDark" className="rounded-full px-3">
            <Flag size={12} aria-hidden /> Join our sporting movement
          </Badge>
          <h2 className="mt-5 max-w-2xl text-hero">
            Be part of the pride of Nansana
          </h2>
          <p className="mt-4 max-w-xl text-hero-sub text-white/85">
            Whether you are an aspiring futsal athlete, grassroots supporter, or
            prospective corporate partner in Uganda, join our journey to
            championship excellence.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Contact management</Button>
          <Button href="/matches" variant="secondary">
            View fixtures & standings
          </Button>
        </div>
      </div>
    </section>
  );
}
