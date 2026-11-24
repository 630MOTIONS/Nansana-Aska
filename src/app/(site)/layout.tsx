import type { ReactNode } from "react";
import { Suspense } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import { getNextFixtureLabel } from "@/lib/public/next-fixture";

// Shown on preview deployments (PREVIEW_BANNER=1) so a reviewer does not take
// the sample fixtures, scores and articles for real club information.
function PreviewBanner() {
  if (process.env.PREVIEW_BANNER !== "1") return null;
  return (
    <p
      role="note"
      className="bg-brand-gold px-4 py-2 text-center text-sm font-semibold text-ink"
    >
      Preview for review. Fixtures, scores, squads, news and contact details on
      this site are sample content and not final.
    </p>
  );
}

// The next fixture comes from the database, so the header streams it in. The
// header itself appears straight away, just without the fixture.
async function LiveHeader() {
  const label = await getNextFixtureLabel();
  return <Header nextFixture={label} />;
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>
      <PreviewBanner />
      <TopBar />
      <Suspense fallback={<Header nextFixture={null} />}>
        <LiveHeader />
      </Suspense>
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
