import { processSteps } from "@/content/site";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
            Process
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-navy md:text-4xl">
            From the first visit to handover
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {processSteps.map((step) => (
            <li key={step.step}>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-slate">{step.step}</p>
              <h3 className="mt-3 font-display text-xl font-medium text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
