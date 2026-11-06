import type { Metadata } from "next";
import { Inter, Montserrat, Noto_Sans_Armenian } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { SiteMotion } from "@/components/SiteMotion";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { homeMetadata } from "@/i18n/seo";
import { getMessages } from "@/i18n/messages";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { I18nProvider } from "@/i18n/provider";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const notoArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  weight: ["400", "500", "600"],
  variable: "--font-armenian",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return homeMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const messages = getMessages(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable} ${notoArmenian.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-white font-sans text-ink">
        <Script id="briteline-enter" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("briteline-enter")){sessionStorage.removeItem("briteline-enter");if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("page-enter")}}catch(e){}`}
        </Script>
        <SiteMotion />
        <I18nProvider locale={locale} messages={messages}>
          <a href="#main" className="skip-link">
            {messages.nav.skip}
          </a>
          <JsonLd locale={locale} />
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 pb-24 outline-none">
            {children}
          </main>
          <Footer locale={locale} />
          <WhatsAppButton locale={locale} />
        </I18nProvider>
      </body>
    </html>
  );
}
