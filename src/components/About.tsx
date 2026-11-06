import { getMessages } from "@/i18n/messages";
import type { Locale } from "@/i18n/locales";
import { Reveal } from "./Reveal";

export function About({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  return (
    <section id="about" className="scroll-mt-24 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
            {messages.about.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-navy md:text-4xl">{messages.about.title}</h2>
          <p className="mt-5 text-base leading-7 text-ink">{messages.about.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
