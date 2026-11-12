"use client";

import { ArrowDown } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { selectEnquiryType } from "@/lib/enquiry";

export default function Opportunities() {
  return (
    <section
      id="opportunities"
      aria-label="Join the team or partner with the club"
      className="scroll-mt-8 bg-surface-tint py-16"
    >
      <div className="mx-auto grid w-full max-w-site gap-6 px-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl bg-navy p-8 text-white shadow-card">
          <Badge variant="onDark">Squad recruitment</Badge>
          <h2 className="text-section">Interested in joining the team?</h2>
          <p className="text-white/85">
            Interested in playing for Nansana ASKA Futsal Club? Enquire about
            trial opportunities and squad recruitment across the men’s and
            women’s setups.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
            <Button
              onClick={() => selectEnquiryType("trials")}
              icon={<ArrowDown size={14} aria-hidden />}
            >
              Enquire about player trials
            </Button>
            <p className="text-label text-white/70">
              Opens the form with “Player trials” selected.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-card">
          <Badge variant="tint">Commercial opportunities</Badge>
          <h2 className="text-section text-navy">Partner with Nansana ASKA</h2>
          <p className="text-ink-muted">
            Explore brand alignment, kit sponsorship and community development
            initiatives with Nansana ASKA Futsal Club.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
            <Button
              variant="dark"
              onClick={() => selectEnquiryType("partnership")}
              icon={<ArrowDown size={14} aria-hidden />}
            >
              Discuss a partnership
            </Button>
            <p className="text-label text-ink-muted">
              Opens the form with “Partnership & sponsorship” selected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
