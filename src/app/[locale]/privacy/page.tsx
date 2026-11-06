import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contact, site } from "@/content/site";
import { fill } from "@/i18n/fill";
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
  return subpageMetadata(locale, "privacy");
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = getMessages(locale);
  const values = {
    company: site.name,
    address: messages.placeholders.address,
    email: contact.email,
    phone: contact.phoneDisplay,
  };

  return (
    <article className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
          {messages.privacy.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-balance text-navy">{messages.privacy.title}</h1>
        <p className="mt-4 text-sm text-muted">{messages.privacy.todo}</p>
        <div className="mt-8 space-y-5 text-base leading-7 text-ink">
          {messages.privacy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{fill(paragraph, values)}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
