import type { Metadata } from "next";
import { localeStorageKey } from "@/i18n/locales";

export const metadata: Metadata = {
  title: "Briteline Ltd",
  robots: { index: false, follow: true },
};

const redirectScript = `
try {
  var stored = null;
  try { stored = localStorage.getItem(${JSON.stringify(localeStorageKey)}); } catch (e) {}
  var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ""];
  var locale = "en";
  if (stored === "en" || stored === "ru" || stored === "hy") {
    locale = stored;
  } else {
    for (var i = 0; i < list.length; i++) {
      var tag = String(list[i] || "").toLowerCase();
      if (tag.indexOf("hy") === 0) { locale = "hy"; break; }
      if (tag.indexOf("ru") === 0) { locale = "ru"; break; }
      if (tag.indexOf("en") === 0) { locale = "en"; break; }
    }
  }
  if (location.pathname === "/" || location.pathname === "") {
    location.replace("/" + locale + "/");
  }
} catch (e) {
  location.replace("/en/");
}
`;

export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
        <noscript>
          <meta httpEquiv="refresh" content="0;url=/en/" />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
