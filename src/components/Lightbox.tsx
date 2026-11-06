"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { GalleryImage } from "@/content/site";
import { lockBodyScroll, trapTabKey } from "@/lib/a11y";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onIndex }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const image = images[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const unlock = lockBodyScroll();
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const background = [...document.body.children].filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element !== dialog,
    );
    background.forEach((element) => element.setAttribute("inert", ""));
    closeRef.current?.focus();
    return () => {
      background.forEach((element) => element.removeAttribute("inert"));
      unlock();
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndex((index + 1) % images.length);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndex((index - 1 + images.length) % images.length);
        return;
      }
      trapTabKey(event, dialog);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [images.length, index, onClose, onIndex]);

  if (!image || typeof document === "undefined") return null;

  const go = (direction: number) => {
    onIndex((index + direction + images.length) % images.length);
  };

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title}. ${image.caption}`}
      className="fixed inset-0 z-[70] flex flex-col bg-navy text-white"
      onPointerDown={(event) => {
        if (event.target instanceof Element && event.target.closest("button")) return;
        startX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (startX.current === null) return;
        const delta = event.clientX - startX.current;
        if (delta > 48) go(-1);
        else if (delta < -48) go(1);
        startX.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="text-sm text-[#E7EDF3]">
          {index + 1} of {images.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="focus-white inline-flex h-11 w-11 items-center justify-center"
        >
          <span className="sr-only">Close gallery</span>
          <X aria-hidden="true" />
        </button>
      </div>
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 items-center px-4 sm:px-16">
        {images.length > 1 ? (
          <button
            type="button"
            onClick={() => go(-1)}
            className="focus-white absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center bg-white/10 sm:left-4"
          >
            <span className="sr-only">Previous project</span>
            <ChevronLeft aria-hidden="true" />
          </button>
        ) : null}
        <div className="relative mx-auto h-[68vh] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-contain"
          />
        </div>
        {images.length > 1 ? (
          <button
            type="button"
            onClick={() => go(1)}
            className="focus-white absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center bg-white/10 sm:right-4"
          >
            <span className="sr-only">Next project</span>
            <ChevronRight aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <div className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6" aria-live="polite">
        <p className="font-display text-lg">{image.title}</p>
        <p className="mt-1 text-sm leading-6 text-[#E7EDF3]">{image.caption}</p>
      </div>
    </div>,
    document.body,
  );
}
