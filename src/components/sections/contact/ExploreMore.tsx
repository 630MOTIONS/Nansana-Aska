import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ExploreMore() {
  return (
    <section aria-label="Explore more" className="bg-surface-strong py-12">
      <div className="mx-auto flex w-full max-w-site flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <SectionHeading
          eyebrow="Nansana ASKA Futsal Club"
          title="Explore more of Nansana ASKA"
          description="Catch up on match fixtures, squad rosters, and championship action."
        />
        <div className="flex flex-wrap gap-3">
          <Button href="/team" variant="light">
            Team
          </Button>
          <Button href="/highlights" variant="light">
            Highlights
          </Button>
          <Button href="/gallery" variant="light">
            Gallery
          </Button>
          <Button href="/matches" variant="dark">
            Matches
          </Button>
        </div>
      </div>
    </section>
  );
}
