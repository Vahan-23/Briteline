import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | Briteline Ltd",
  robots: { index: false, follow: false },
};

const lines = [
  { href: "/en/", label: "Page not found", home: "Back to the homepage" },
  { href: "/ru/", label: "Страница не найдена", home: "На главную" },
  { href: "/hy/", label: "Էջը չի գտնվել", home: "Վերադառնալ գլխավոր էջ" },
];

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-white px-6 py-24 text-[#1A1F2B]">
        <main className="mx-auto max-w-xl text-center">
          <p className="text-xs tracking-[0.2em] text-[#526A82]">404</p>
          <ul className="mt-6 space-y-4">
            {lines.map((line) => (
              <li key={line.href}>
                <a href={line.href} className="text-lg text-[#012A55] underline-offset-4 hover:underline">
                  {line.label} — {line.home}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
