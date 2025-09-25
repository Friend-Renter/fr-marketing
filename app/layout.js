// app/layout.js
import "./globals.css";
import { Inter, Raleway } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import { AnalyticsProvider } from "@/lib/analytics";
import SeoJsonLd from "@/components/SeoJsonLd";
import { orgJsonLd } from "@/lib/seo";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

// Use variable fonts (self-hosted at build) and expose CSS variables
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

// app/layout.js (only the exports/metadata part)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "FriendRenter™ — Local car rentals made simple",
  description: "Verified people, fair prices, no counter lines.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "FriendRenter™ — Local car rentals made simple",
    description: "Verified people, fair prices, no counter lines.",
    images: [
      `/og?title=${encodeURIComponent("FR")}&subtitle=${encodeURIComponent(
        "Local rentals made simple"
      )}`,
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FriendRenter™ — Local car rentals made simple",
    description: "Verified people, fair prices, no counter lines.",
    images: [
      `/og?title=${encodeURIComponent("FR")}&subtitle=${encodeURIComponent(
        "Local rentals made simple"
      )}`,
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${raleway.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:border focus:border-gray-300 focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-gray-900"
        >
          Skip to content
        </a>

        <AnalyticsProvider>
          <Header />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <ConsentBanner />
          <SeoJsonLd json={orgJsonLd()} />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
