import Link from "next/link";
import { projects } from "@/content/site";
import { Gallery } from "./Gallery";
import { Reveal } from "./Reveal";

export function FeaturedProjects() {
  return (
    <section id="projects" className="scroll-mt-24 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
              Projects
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium text-navy md:text-4xl">
              Recent work
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              A few finished rooms. Select a photo to look through the set.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex shrink-0 border border-navy px-4 py-3 font-display text-xs font-medium uppercase tracking-[0.16em] text-navy hover:bg-navy hover:text-white"
          >
            View all projects
          </Link>
        </Reveal>
        <div className="mt-10">
          <Gallery images={projects} layout="editorial" />
        </div>
      </div>
    </section>
  );
}
