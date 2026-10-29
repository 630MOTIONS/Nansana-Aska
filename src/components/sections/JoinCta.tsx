import Image from "next/image";
import { ChartColumn, Flag, Send } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export default function JoinCta() {
  return (
    <section
      aria-label="Join the club"
      className="bg-linear-to-b from-brand-blue to-navy py-16 text-white"
    >
      <div className="mx-auto w-full max-w-site px-4 text-center">
        <Badge variant="onDark">
          <Flag size={12} aria-hidden /> Join the movement
        </Badge>

        <h2 className="mx-auto mt-6 max-w-4xl text-hero">
          Be part of the pride of Nansana
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-hero-sub text-white/85">
          Whether you are an aspiring player seeking tryouts, a passionate
          supporter cheering from the stands, or an organization eager to
          partner with a rising sports powerhouse — join our journey today.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/contact" icon={<Send size={16} aria-hidden />}>
            Contact club management
          </Button>
          <Button
            href="/matches"
            variant="light"
            icon={<ChartColumn size={16} aria-hidden />}
          >
            View fixtures & standings
          </Button>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/20 pt-6 text-label sm:flex-row">
          <p className="inline-flex items-center gap-2 font-semibold uppercase tracking-wide text-white/80">
            <Image src={siteConfig.crest} alt="" width={24} height={24} />
            Official web flagship • {siteConfig.name} FC
          </p>
          <p className="font-semibold text-gold-soft">
            A digital flagship experience designed for {siteConfig.fullName} by
            630 Motions.
          </p>
        </div>
      </div>
    </section>
  );
}
