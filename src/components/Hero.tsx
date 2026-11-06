import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/site";
import { getMessages } from "@/i18n/messages";
import { localeHash } from "@/i18n/paths";
import type { Locale } from "@/i18n/locales";
import { TypeText } from "./TypeText";

export function Hero({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden bg-navy text-white">
      <Image
        src={hero.image}
        alt={messages.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="hero-settle object-cover"
      />
      <div className="absolute inset-0 bg-navy/60" />
      <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <p
          className="rise font-display text-xs font-medium uppercase tracking-[0.2em] text-white"
          style={{ animationDelay: "80ms" }}
        >
          {messages.hero.eyebrow}
        </p>
        <h1
          aria-label={messages.hero.title}
          className="mt-4 max-w-3xl font-display text-4xl leading-[1.15] font-medium text-balance sm:text-5xl lg:text-6xl"
        >
          <span aria-hidden="true">
            <TypeText text={messages.hero.title} />
          </span>
        </h1>
        <p className="rise mt-5 max-w-xl text-lg leading-8 text-white" style={{ animationDelay: "480ms" }}>
          {messages.hero.subtitle}
        </p>
        <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "680ms" }}>
          <Link
            href={localeHash(locale, "#contact")}
            className="inline-flex justify-center bg-white px-5 py-3.5 text-center font-display text-xs font-medium uppercase tracking-[0.16em] text-navy transition-colors duration-300 hover:bg-paper focus-white"
          >
            {messages.hero.quote}
          </Link>
          <Link
            href={localeHash(locale, "#projects")}
            className="focus-white inline-flex justify-center border border-white px-5 py-3.5 text-center font-display text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-white/10"
          >
            {messages.hero.work}
          </Link>
        </div>
      </div>
    </section>
  );
}
