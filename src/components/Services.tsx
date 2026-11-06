import {
  Bath,
  Columns3,
  CookingPot,
  DoorOpen,
  House,
  Lamp,
  type LucideIcon,
} from "lucide-react";
import { services, type ServiceIcon } from "@/content/site";
import { getMessages } from "@/i18n/messages";
import type { Locale } from "@/i18n/locales";
import { Reveal } from "./Reveal";

const icons: Record<ServiceIcon, LucideIcon> = {
  CookingPot,
  Bath,
  Columns3,
  Lamp,
  DoorOpen,
  House,
};

export function Services({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
            {messages.services.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium text-balance text-navy md:text-4xl">
            {messages.services.title}
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            const copy = messages.services.items[service.id];
            return (
              <li key={service.id}>
                <Reveal delay={index * 70} className="h-full">
                  <div className="h-full border border-navy/10 bg-paper p-6 transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:border-navy/30 motion-safe:hover:shadow-[0_16px_40px_rgba(1,42,85,0.08)]">
                    <Icon className="text-navy" aria-hidden="true" strokeWidth={1.5} />
                    <h3 className="mt-5 font-display text-lg font-medium text-balance text-navy">{copy.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{copy.summary}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
