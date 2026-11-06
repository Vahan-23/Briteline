import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["/", "/projects/", "/privacy/"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
  }));
}
