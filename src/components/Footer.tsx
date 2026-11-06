import Link from "next/link";
import { contact, nav, whatsappHref } from "@/content/site";
import { fill } from "@/i18n/fill";
import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { localeHash, localePage } from "@/i18n/paths";
import { Logo } from "./Logo";

export function Footer({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <div className="inline-flex bg-white px-3 py-2">
            <Logo href={`/${locale}/`} alt={messages.logoAlt} className="h-12" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#E7EDF3]">{messages.footer.tagline}</p>
        </div>
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-[#E7EDF3]">{messages.footer.visit}</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.id}>
                <Link href={localeHash(locale, item.hash)} className="focus-white text-sm text-white hover:underline">
                  {messages.nav[item.id]}
                </Link>
              </li>
            ))}
            <li>
              <Link href={localePage(locale, "projects")} className="focus-white text-sm text-white hover:underline">
                {messages.projects.allProjects}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-[#E7EDF3]">{messages.footer.contact}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={contact.phoneTel} className="focus-white hover:underline">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(messages.whatsapp.message)}
                className="focus-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {messages.contact.whatsapp}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="focus-white break-all hover:underline">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm text-[#E7EDF3] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{fill(messages.footer.copyright, { year })}</p>
          <p>{fill(messages.footer.company, { number: messages.footer.companyNumber })}</p>
          <Link href={localePage(locale, "privacy")} className="focus-white underline-offset-4 hover:underline">
            {messages.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
