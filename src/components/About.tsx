import { placeholders } from "@/content/site";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
            About
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-navy md:text-4xl">
            Briteline Ltd
          </h2>
          <p className="mt-5 text-base leading-7 text-ink">{placeholders.about}</p>
          <p className="mt-4 text-sm text-muted">{placeholders.yearsInBusiness}</p>
        </Reveal>
      </div>
    </section>
  );
}
