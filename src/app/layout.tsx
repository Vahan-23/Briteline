import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { hero, site } from "@/content/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${hero.alt} Briteline Ltd logo.`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Briteline Ltd | Renovations & bespoke joinery",
    template: "%s | Briteline Ltd",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: "Briteline Ltd | Renovations & bespoke joinery",
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Briteline Ltd | Renovations & bespoke joinery",
    description: site.description,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${montserrat.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 pb-24 outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
