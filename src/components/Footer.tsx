import Link from "next/link";
import { contact, nav, placeholders, site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <div className="inline-flex bg-white px-3 py-2">
            <Logo className="h-12" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#E7EDF3]">{site.tagline}</p>
        </div>
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-[#E7EDF3]">Visit</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="focus-white text-sm text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projects" className="focus-white text-sm text-white hover:underline">
                All projects
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-[#E7EDF3]">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={contact.phoneTel} className="focus-white hover:underline">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contact.whatsappHref} className="focus-white hover:underline" target="_blank" rel="noopener noreferrer">
                WhatsApp
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
          <p>© {new Date().getFullYear()} Briteline Ltd</p>
          <p>Company no. {placeholders.companyNumber}</p>
          <Link href="/privacy" className="focus-white underline-offset-4 hover:underline">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
