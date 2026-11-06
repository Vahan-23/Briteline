import { reasonIds } from "@/content/site";
import { getMessages } from "@/i18n/messages";
import type { Locale } from "@/i18n/locales";
import { Reveal } from "./Reveal";

export function WhyBriteline({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
            {messages.why.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-balance text-navy md:text-4xl">
            {messages.why.title}
          </h2>
          <p className="mt-3 text-sm text-muted">{messages.why.intro}</p>
        </Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reasonIds.map((id, index) => {
            const reason = messages.why.items[id];
            return (
              <li key={id}>
                <Reveal delay={index * 80} className="h-full">
                  <div className="h-full border border-navy/10 bg-white p-6 transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_16px_40px_rgba(1,42,85,0.08)]">
                    <h3 className="font-display text-lg font-medium text-balance text-navy">{reason.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{reason.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
