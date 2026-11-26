import type { Metadata } from "next";
import { Suspense } from "react";
import ConnectWithUs from "@/components/sections/contact/ConnectWithUs";
import ContactChannels from "@/components/sections/contact/ContactChannels";
import ContactHero from "@/components/sections/contact/ContactHero";
import EnquiryForm from "@/components/sections/contact/EnquiryForm";
import ExploreMore from "@/components/sections/contact/ExploreMore";
import Faq from "@/components/sections/contact/Faq";
import FindClub from "@/components/sections/contact/FindClub";
import Opportunities from "@/components/sections/contact/Opportunities";
import { getSiteImages } from "@/lib/public/site-images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nansana ASKA Futsal Club about player trials, partnerships, media requests and general enquiries.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <Suspense fallback={<ContactHero />}>
        <HeroSlot />
      </Suspense>
      <ContactChannels />
      <Opportunities />
      <EnquiryForm />
      <FindClub />
      <ConnectWithUs />
      <Faq />
      <ExploreMore />
    </main>
  );
}

// Reads from the database, so it streams in behind the same section without a
// photo.
async function HeroSlot() {
  const images = await getSiteImages();
  return <ContactHero image={images.contact_hero} />;
}
