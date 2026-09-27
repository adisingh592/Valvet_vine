import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Newsletter } from "@/components/layout/Newsletter";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { ConnectButton } from "@/components/layout/ConnectButton";
import { WELCOME_BOOT_SCRIPT } from "@/lib/welcome";
import { SITE } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Fashion for every you`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE.name,
    title: `${SITE.name} — Fashion for every you`,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f4",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the boot script may add data-welcome before React hydrates.
    <html lang="en-IN" data-scroll-behavior="smooth" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: WELCOME_BOOT_SCRIPT }} />
      </head>
      {/* Bottom padding keeps content clear of the mobile tab bar */}
      <body className="min-h-dvh pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main id="main">{children}</main>
          <Newsletter />
          <Footer />
          <ScrollToTop />
          <ConnectButton />
          <MobileTabBar />
        </Providers>
      </body>
    </html>
  );
}
