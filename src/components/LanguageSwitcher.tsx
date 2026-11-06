"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { localeStorageKey, locales, type Locale } from "@/i18n/locales";
import { switchLocale } from "@/i18n/paths";
import { useI18n } from "@/i18n/provider";
import { beginLeave } from "@/lib/leave";

function Flag({ code }: { code: Locale }) {
  const rawId = useId();
  const id = `flag-${rawId.replace(/:/g, "")}`;
  if (code === "ru") {
    return (
      <svg viewBox="0 0 9 6" className="h-full w-full" aria-hidden="true">
        <path d="M0 0h9v2H0z" fill="#fff" />
        <path d="M0 2h9v2H0z" fill="#0039A6" />
        <path d="M0 4h9v2H0z" fill="#D52B1E" />
      </svg>
    );
  }
  if (code === "hy") {
    return (
      <svg viewBox="0 0 9 6" className="h-full w-full" aria-hidden="true">
        <path d="M0 0h9v2H0z" fill="#D90012" />
        <path d="M0 2h9v2H0z" fill="#0033A0" />
        <path d="M0 4h9v2H0z" fill="#F2A800" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 30" className="h-full w-full" aria-hidden="true">
      <clipPath id={id}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export function LanguageSwitcher({ className = "", prominent = false }: { className?: string; prominent?: boolean }) {
  const pathname = usePathname();
  const { locale, messages } = useI18n();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (event: MouseEvent<HTMLAnchorElement>, code: Locale) => {
    const next = `${switchLocale(pathname, code)}${window.location.hash}`;
    event.currentTarget.href = next;
    try {
      localStorage.setItem(localeStorageKey, code);
    } catch {
      /* Private browsing can block storage. The link still changes language. */
    }
    setOpen(false);
    if (code === locale) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    beginLeave(next);
  };

  const options = locales.map((code) => {
    const current = code === locale;
    return (
      <a
        key={code}
        href={switchLocale(pathname, code)}
        hrefLang={code}
        lang={code}
        data-locale-switch=""
        aria-current={current ? "page" : undefined}
        onClick={(event) => choose(event, code)}
        className={`flex items-center gap-3 text-ink transition-colors duration-200 hover:bg-paper hover:text-navy ${
          prominent ? "border px-3 py-3" : "px-3 py-2.5"
        } ${
          current
            ? prominent
              ? "border-navy bg-paper text-navy"
              : "bg-paper text-navy"
            : prominent
              ? "border-navy/10"
              : ""
        }`}
      >
        <span className={`inline-flex shrink-0 overflow-hidden border border-navy/15 ${prominent ? "h-6 w-9" : "h-4 w-6"}`}>
          <Flag code={code} />
        </span>
        <span className="font-display text-sm">{messages.languages[code]}</span>
      </a>
    );
  });

  if (prominent) {
    return (
      <nav aria-label={messages.nav.language} className={`flex flex-col gap-2 ${className}`}>
        {options}
      </nav>
    );
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 border border-navy/15 px-1.5 py-1 text-navy transition-colors duration-200 hover:border-navy/40"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? menuId : undefined}
        aria-label={messages.nav.language}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="inline-flex h-4 w-6 overflow-hidden">
          <Flag code={locale} />
        </span>
        <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div
          id={menuId}
          role="group"
          aria-label={messages.nav.language}
          className="lang-pop absolute top-[calc(100%+0.5rem)] right-0 z-50 min-w-44 border border-navy/10 bg-white py-1 shadow-[0_16px_40px_rgba(1,42,85,0.12)]"
        >
          {options}
        </div>
      ) : null}
    </div>
  );
}
