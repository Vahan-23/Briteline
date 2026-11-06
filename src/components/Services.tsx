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
import { Reveal } from "./Reveal";

const icons: Record<ServiceIcon, LucideIcon> = {
  CookingPot,
  Bath,
  Columns3,
  Lamp,
  DoorOpen,
  House,
};

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
            Services
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-medium text-balance text-navy md:text-4xl">
            What we design and fit
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <li key={service.id} className="border border-navy/10 bg-paper p-6">
                <Icon className="text-navy" aria-hidden="true" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-lg font-medium text-navy">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
