import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate min-h-[88svh] bg-navy text-white">
      <Image
        src={hero.image}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy/60" />
      <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-white">
          {hero.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.12] font-medium text-balance sm:text-5xl lg:text-6xl">
          {hero.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-white">{hero.subtitle}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#contact"
            className="inline-flex justify-center bg-white px-5 py-3.5 text-center font-display text-xs font-medium uppercase tracking-[0.16em] text-navy hover:bg-paper focus-white"
          >
            Get a free quote
          </Link>
          <Link
            href="/#projects"
            className="focus-white inline-flex justify-center border border-white px-5 py-3.5 text-center font-display text-xs font-medium uppercase tracking-[0.16em] text-white hover:bg-white/10"
          >
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
