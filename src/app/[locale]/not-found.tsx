"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";

export default function NotFound() {
  const { locale, messages } = useI18n();
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-slate">{messages.notFound.eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-medium text-balance text-navy">{messages.notFound.title}</h1>
        <p className="mt-4 text-muted">{messages.notFound.body}</p>
        <Link
          href={`/${locale}/`}
          className="mt-8 inline-flex bg-navy px-5 py-3 font-display text-xs font-medium uppercase tracking-[0.16em] text-white"
        >
          {messages.notFound.home}
        </Link>
      </div>
    </section>
  );
}
