import { Handshake } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { partnerSlots } from "@/lib/partners";

export default function Partners() {
  return (
    <section aria-label="Partners and supporters" className="bg-white py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          align="center"
          className="mx-auto max-w-3xl"
          eyebrow="Corporate Alliance"
          title="Partners & supporters"
          description="Backing the growth of futsal excellence and youth athletic pathways in Nansana and Uganda."
        />

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {partnerSlots.map((slot) => {
            const Icon = slot.icon;
            return (
              <li
                key={slot.id}
                className="flex flex-col items-center gap-2 rounded-xl bg-surface-tint p-6 text-center"
              >
                <Icon size={28} className="text-ink-muted" aria-hidden />
                <h3 className="text-card text-navy">{slot.title}</h3>
                <p className="text-label font-semibold uppercase tracking-widest text-ink-muted">
                  [Slot reserved]
                </p>
                <p className="text-sm text-ink-muted">{slot.description}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex justify-center">
          <Button
            href="/contact"
            variant="dark"
            icon={<Handshake size={16} aria-hidden />}
            className="text-center"
          >
            Partner with us — explore commercial & community sponsorship
          </Button>
        </div>
      </div>
    </section>
  );
}
