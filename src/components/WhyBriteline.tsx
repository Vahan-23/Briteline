import { placeholders, reasons } from "@/content/site";
import { Reveal } from "./Reveal";

export function WhyBriteline() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
            Why Briteline
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-navy md:text-4xl">
            How the work is run
          </h2>
          <p className="mt-3 text-sm text-muted">{placeholders.whyIntro}</p>
        </Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <li key={reason.title} className="border border-navy/10 bg-white p-6">
              <h3 className="font-display text-lg font-medium text-navy">{reason.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{reason.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
