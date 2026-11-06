import type { Locale } from "./locales";

export function localeHome(locale: Locale) {
  return `/${locale}/`;
}

export function localeHash(locale: Locale, hash: string) {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  return `/${locale}/${id}`;
}

export function localePage(locale: Locale, page: "projects" | "privacy") {
  return `/${locale}/${page}/`;
}

/** Keep the current page when the language changes. Hash is added by the switcher. */
export function switchLocale(pathname: string, next: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.slice(1);
  return `/${next}/${rest.length ? `${rest.join("/")}/` : ""}`;
}
