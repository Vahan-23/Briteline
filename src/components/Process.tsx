import { processSteps } from "@/content/site";
import { getMessages } from "@/i18n/messages";
import type { Locale } from "@/i18n/locales";
import { Reveal } from "./Reveal";

export function Process({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
            {messages.process.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium text-balance text-navy md:text-4xl">
            {messages.process.title}
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const copy = messages.process.items[step.id];
            return (
              <li key={step.id}>
                <Reveal delay={index * 90}>
                  <p className="font-display text-xs uppercase tracking-[0.2em] text-slate">{step.step}</p>
                  <h3 className="mt-3 font-display text-xl font-medium text-balance text-navy">{copy.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{copy.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
