import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { projects } from "@/content/site";
import { isLocale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { subpageMetadata } from "@/i18n/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return subpageMetadata(locale, "projects");
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = getMessages(locale);

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
          {messages.projects.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-balance text-navy md:text-5xl">
          {messages.projects.pageTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">{messages.projects.pageIntro}</p>
        <div className="mt-10">
          <Gallery images={projects} layout="catalog" showFilters />
        </div>
      </div>
    </section>
  );
}
