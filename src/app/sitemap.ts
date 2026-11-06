import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales, type Locale } from "@/i18n/locales";
import { languageAlternates } from "@/i18n/seo";

export const dynamic = "force-static";

const pages = ["", "projects", "privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.flatMap((locale) => pages.map((page) => entry(locale, page, lastModified)));
}

function entry(locale: Locale, page: "" | "projects" | "privacy", lastModified: Date): MetadataRoute.Sitemap[number] {
  const suffix = page ? `${page}/` : "";
  return {
    url: `${site.url}/${locale}/${suffix}`,
    lastModified,
    alternates: {
      languages: languageAlternates(page),
    },
  };
}
