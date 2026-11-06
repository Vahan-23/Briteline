import type { Metadata } from "next";
import { site } from "@/content/site";
import { getMessages } from "./messages";
import { locales, type Locale } from "./locales";

export const ogLocales = {
  en: "en_GB",
  ru: "ru_RU",
  hy: "hy_AM",
} as const;

export function languageAlternates(path = "") {
  const suffix = path ? `${path}/` : "";
  return {
    en: `${site.url}/en/${suffix}`,
    ru: `${site.url}/ru/${suffix}`,
    hy: `${site.url}/hy/${suffix}`,
    "x-default": `${site.url}/en/${suffix}`,
  };
}

export function pageAlternates(locale: Locale, path = "") {
  const suffix = path ? `${path}/` : "";
  return {
    canonical: `${site.url}/${locale}/${suffix}`,
    languages: languageAlternates(path),
  };
}

const ogImage = (alt: string) => ({
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt,
});

export function homeMetadata(locale: Locale): Metadata {
  const messages = getMessages(locale);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: messages.meta.title,
      template: messages.meta.titleTemplate,
    },
    description: messages.meta.description,
    applicationName: site.name,
    alternates: pageAlternates(locale),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => ogLocales[item]),
      title: messages.meta.title,
      description: messages.meta.description,
      images: [ogImage(messages.meta.ogImageAlt)],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: ["/og.jpg"],
    },
  };
}

export function subpageMetadata(locale: Locale, page: "projects" | "privacy"): Metadata {
  const messages = getMessages(locale);
  const copy = messages.meta[page];
  return {
    title: copy.title,
    description: copy.description,
    alternates: pageAlternates(locale, page),
    openGraph: {
      title: copy.ogTitle,
      description: copy.description,
      images: [ogImage(messages.meta.ogImageAlt)],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.ogTitle,
      description: copy.description,
      images: ["/og.jpg"],
    },
  };
}
