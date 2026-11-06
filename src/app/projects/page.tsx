import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Kitchens, bathrooms, fitted wardrobes and alcove shelving finished by Briteline Ltd.",
  openGraph: {
    title: "Projects | Briteline Ltd",
    description:
      "Kitchens, bathrooms, fitted wardrobes and alcove shelving finished by Briteline Ltd.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Alcove shelving with the Briteline Ltd logo.",
      },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
          Projects
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-navy md:text-5xl">Our work</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Filter by room, then select a photo. The shower niche is shown only as a small detail.
        </p>
        <div className="mt-10">
          <Gallery images={projects} layout="catalog" showFilters />
        </div>
      </div>
    </section>
  );
}
