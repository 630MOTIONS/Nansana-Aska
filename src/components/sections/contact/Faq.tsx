import Link from "next/link";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/contact";

export default function Faq() {
  return (
    <section
      aria-label="Frequently asked questions"
      className="bg-surface py-16"
    >
      <div className="mx-auto w-full max-w-3xl px-4">
        <SectionHeading
          align="center"
          eyebrow="Common enquiries"
          eyebrowTone="gold"
          title="Frequently asked questions"
          description="Quick pointers on trials, sponsorship, matches and press requests."
        />

        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg bg-white shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-card font-extrabold uppercase text-navy [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  size={20}
                  className="shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="space-y-3 px-5 pb-5 text-ink-muted">
                <p>{item.answer}</p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="inline-block text-label font-bold uppercase tracking-wide text-navy hover:text-brand-blue"
                  >
                    {item.link.label} →
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
