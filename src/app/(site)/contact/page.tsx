import type { Metadata } from "next";
import ConnectWithUs from "@/components/sections/contact/ConnectWithUs";
import ContactChannels from "@/components/sections/contact/ContactChannels";
import ContactHero from "@/components/sections/contact/ContactHero";
import EnquiryForm from "@/components/sections/contact/EnquiryForm";
import ExploreMore from "@/components/sections/contact/ExploreMore";
import Faq from "@/components/sections/contact/Faq";
import FindClub from "@/components/sections/contact/FindClub";
import Opportunities from "@/components/sections/contact/Opportunities";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nansana ASKA Futsal Club about player trials, partnerships, media requests and general enquiries.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <ContactHero />
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
