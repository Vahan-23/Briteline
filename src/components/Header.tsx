"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { nav } from "@/content/site";
import { getFocusable, lockBodyScroll, trapTabKey } from "@/lib/a11y";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const shellRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [activePath, setActivePath] = useState(pathname);

  if (pathname !== activePath) {
    setActivePath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const shell = shellRef.current;
    if (!shell) return;
    const unlock = lockBodyScroll();
    const background = [
      document.querySelector("main"),
      document.querySelector("footer"),
      document.querySelector("[data-whatsapp]"),
    ].filter((element): element is HTMLElement => element instanceof HTMLElement);
    background.forEach((element) => element.setAttribute("inert", ""));
    const menu = document.getElementById(menuId);
    const firstLink = menu ? getFocusable(menu)[0] : undefined;
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      trapTabKey(event, shell);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      background.forEach((element) => element.removeAttribute("inert"));
      unlock();
    };
  }, [menuId, open]);

  return (
    <div ref={shellRef}>
      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm transition-[box-shadow,border-color] ${
          compact || open ? "border-navy/10 shadow-[0_8px_24px_rgba(1,42,85,0.06)]" : "border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center gap-4 px-4 transition-[height] sm:px-6 lg:px-8 ${
            compact ? "h-16" : "h-20"
          }`}
        >
          <Logo priority className={compact ? "h-11" : "h-12 md:h-14"} />
          <nav className="ml-auto hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-xs font-medium uppercase tracking-[0.2em] text-ink hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#contact"
            className="ml-auto hidden bg-navy px-4 py-3 font-display text-xs font-medium uppercase tracking-[0.16em] text-white hover:bg-[#02386f] md:ml-0 md:inline-flex"
          >
            Get a quote
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="ml-auto inline-flex h-11 w-11 items-center justify-center text-navy md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>
      {open ? (
        <div id={menuId} className="fixed inset-0 z-40 bg-white md:hidden">
          <nav className="flex h-full flex-col gap-2 px-6 pt-28" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-navy/10 py-4 font-display text-2xl text-navy"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-full justify-center bg-navy px-5 py-4 text-center font-display text-sm font-medium uppercase tracking-[0.16em] text-white"
            >
              Get a quote
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
