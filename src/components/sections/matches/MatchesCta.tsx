import Button from "@/components/ui/Button";

export default function MatchesCta() {
  return (
    <section
      aria-label="Support the club on match day"
      className="bg-linear-to-br from-navy to-navy-deep py-16 text-white"
    >
      <div className="mx-auto grid w-full max-w-site items-center gap-8 px-4 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-label font-bold uppercase tracking-widest text-gold-soft">
            Pride of Nansana Municipality
          </p>
          <h2 className="mt-3 max-w-2xl text-hero">
            Support the pride of Nansana on match day
          </h2>
          <p className="mt-4 max-w-xl text-hero-sub text-white/85">
            Whether inside Old Kampala Arena or following online, be part of the
            championship journey. Get in touch to support the club or ask about
            partnerships.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Contact management</Button>
          <Button href="/team" variant="secondary">
            Explore team roster
          </Button>
        </div>
      </div>
    </section>
  );
}
