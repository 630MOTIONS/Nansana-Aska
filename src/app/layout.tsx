import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nansana ASKA Futsal Club",
    template: "%s | Nansana ASKA Futsal Club",
  },
  description:
    "Official website of Nansana ASKA Futsal Club, competing in the Uganda Futsal Super League.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
        >
          Skip to content
        </a>
        <TopBar />
        <Header />
        {children}
      </body>
    </html>
  );
}
