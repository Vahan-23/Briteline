"use client";

import { useEffect } from "react";
import { beginLeave, isLeaving } from "@/lib/leave";

function samePath(a: string, b: string) {
  const normalise = (value: string) => (value.endsWith("/") ? value : `${value}/`);
  return normalise(a) === normalise(b);
}

/** Fade between pages. Language links opt out and run the same fade themselves. */
export function SiteMotion() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (isLeaving() || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if ("localeSwitch" in anchor.dataset) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (samePath(url.pathname, window.location.pathname)) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      beginLeave(`${url.pathname}${url.search}${url.hash}`);
    };

    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
