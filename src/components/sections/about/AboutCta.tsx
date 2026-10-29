import Image from "next/image";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export default function AboutCta() {
  return (
    <section
      aria-label="Join our community"
      className="bg-brand-blue py-16 text-white"
    >
      <div className="mx-auto flex w-full max-w-site flex-col items-center px-4 text-center">
        <span className="rounded-xl bg-white/10 p-2">
          <Image src={siteConfig.crest} alt="" width={48} height={48} />
        </span>
        <p className="mt-5 text-label font-bold uppercase tracking-widest text-gold-soft">
          Join our community
        </p>
        <h2 className="mt-3 max-w-3xl text-hero">Be part of the journey</h2>
        <p className="mt-4 max-w-2xl text-hero-sub text-white/85">
          Discover our squad, follow our upcoming Super League matches, and
          partner with Nansana ASKA Futsal Club as we represent Wakiso District
          on the national stage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/team">Meet the team</Button>
          <Button href="/contact" variant="light">
            Contact the club
          </Button>
          <Button href="/matches" variant="dark">
            View matches
          </Button>
        </div>
      </div>
    </section>
  );
}
