"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { nav } from "@/content/site";
import { localeHash } from "@/i18n/paths";
import { useI18n } from "@/i18n/provider";
import { getFocusable, lockBodyScroll, trapTabKey } from "@/lib/a11y";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const { locale, messages } = useI18n();
  const menuId = useId();
  const shellRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [activePath, setActivePath] = useState(pathname);
  const home = `/${locale}/`;

  if (pathname !== activePath) {
    setActivePath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;
      setCompact(y > 8);

      const focusedInside = shellRef.current?.contains(document.activeElement) ?? false;
      if (open || y < 72 || focusedInside) {
        setHidden(false);
        return;
      }
      if (delta > 6) setHidden(false);
      else if (delta < -6) setHidden(true);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

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
    <div ref={shellRef} className={`sticky top-0 z-50 ${hidden && !open ? "pointer-events-none" : ""}`}>
      <header
        inert={hidden && !open}
        className={`relative z-50 border-b bg-white/95 backdrop-blur-sm transition-[transform,opacity,box-shadow,border-color] duration-500 ease-out motion-reduce:transition-none ${
          hidden && !open ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        } ${compact || open ? "border-navy/10 shadow-[0_8px_24px_rgba(1,42,85,0.06)]" : "border-transparent"}`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center gap-3 px-4 transition-[height] sm:px-6 lg:gap-5 lg:px-8 ${
            compact ? "h-16" : "h-20"
          }`}
        >
          <Logo href={home} alt={messages.logoAlt} priority className={compact ? "h-11" : "h-12 lg:h-14"} />
          <nav className="ml-auto hidden items-center gap-5 xl:gap-7 lg:flex" aria-label={messages.nav.primary}>
            {nav.map((item) => (
              <Link
                key={item.id}
                href={localeHash(locale, item.hash)}
                className="font-display text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:text-navy"
              >
                {messages.nav[item.id]}
              </Link>
            ))}
            <LanguageSwitcher className="ml-1" />
          </nav>
          <Link
            href={localeHash(locale, "#contact")}
            className="ml-auto hidden shrink-0 bg-navy px-4 py-3 font-display text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#02386f] lg:ml-0 lg:inline-flex"
          >
            {messages.nav.getQuote}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="ml-auto inline-flex h-11 w-11 items-center justify-center text-navy lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? messages.nav.closeMenu : messages.nav.openMenu}</span>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>
      {open ? (
        <div id={menuId} className="menu-in fixed inset-0 z-40 overflow-y-auto bg-white lg:hidden">
          <nav className="flex min-h-full flex-col gap-2 px-6 pt-28 pb-16" aria-label={messages.nav.mobile}>
            {nav.map((item) => (
              <Link
                key={item.id}
                href={localeHash(locale, item.hash)}
                onClick={() => setOpen(false)}
                className="border-b border-navy/10 py-4 font-display text-2xl text-navy"
              >
                {messages.nav[item.id]}
              </Link>
            ))}
            <LanguageSwitcher prominent className="mt-6" />
            <Link
              href={localeHash(locale, "#contact")}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-full justify-center bg-navy px-5 py-4 text-center font-display text-sm font-medium uppercase tracking-[0.16em] text-white"
            >
              {messages.nav.getQuote}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
