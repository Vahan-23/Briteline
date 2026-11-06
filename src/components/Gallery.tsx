"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { projectFilters, type GalleryImage, type ProjectFilter, type ProjectId } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { Lightbox, type Slide } from "./Lightbox";

type GalleryProps = {
  images: readonly GalleryImage[];
  layout?: "editorial" | "catalog";
  showFilters?: boolean;
};

function cellClass(image: Pick<GalleryImage, "size">, index: number, layout: "editorial" | "catalog") {
  if (image.size === "thumb") return "col-span-1 max-w-40 justify-self-start md:col-span-3";
  if (layout === "catalog") return "col-span-2 md:col-span-4";
  if (index === 0) return "col-span-2 md:col-span-7";
  if (index === 1) return "col-span-2 md:col-span-5";
  return "col-span-2 md:col-span-4";
}

export function Gallery({ images, layout = "catalog", showFilters = false }: GalleryProps) {
  const { messages } = useI18n();
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  const slides = useMemo<Slide[]>(
    () =>
      images.map((image) => {
        const copy = messages.projects.items[image.id as ProjectId];
        return { ...image, title: copy.title, caption: copy.caption, alt: copy.alt };
      }),
    [images, messages],
  );

  const visible = useMemo(
    () => slides.filter((image) => filter === "all" || image.category === filter),
    [filter, slides],
  );

  return (
    <div>
      {showFilters ? (
        <div role="group" aria-label={messages.projects.filtersLabel} className="mb-8 flex flex-wrap gap-2">
          {projectFilters.map((id) => {
            const selected = filter === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setFilter(id);
                  setActive(null);
                }}
                className={`px-4 py-2 font-display text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-200 ${
                  selected ? "bg-navy text-white" : "border border-navy/15 bg-white text-ink hover:border-navy"
                }`}
              >
                {messages.projects.filters[id]}
              </button>
            );
          })}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <p className="text-muted">{messages.projects.empty}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5">
          {visible.map((image, index) => (
            <li key={image.id} className={cellClass(image, index, layout)}>
              <button type="button" onClick={() => setActive(index)} className="group block w-full text-left">
                <span
                  className={`relative block overflow-hidden bg-paper ${
                    image.size === "thumb"
                      ? "aspect-square"
                      : image.width >= image.height
                        ? "aspect-[16/10]"
                        : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      image.size === "thumb"
                        ? "160px"
                        : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    }
                    className="object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-[1.02]"
                  />
                </span>
                <span className="mt-3 block font-display text-sm font-medium text-navy">{image.title}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{image.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {active !== null ? (
        <Lightbox images={visible} index={active} onClose={close} onIndex={setActive} />
      ) : null}
    </div>
  );
}
