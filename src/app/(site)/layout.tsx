import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>
      <TopBar />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
