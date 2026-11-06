import type { Metadata } from "next";
import { contact, placeholders, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Briteline Ltd uses the details you send through this website.",
};

export default function PrivacyPage() {
  return (
    <article className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
          Privacy
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-navy">Privacy policy</h1>
        <p className="mt-4 text-sm text-muted">TODO: confirm this wording with the client before launch.</p>
        <div className="mt-8 space-y-5 text-base leading-7 text-ink">
          <p>
            This page explains what {site.name} does with information you send through this website. The company address is not published yet ({placeholders.address}).
          </p>
          <p>
            If you use the quote form, you may send your name, phone number, email address, postcode, the service you need, a message, and an optional photo. Those details are sent to the form provider configured for this site so we can reply. The notification email for that provider should be {contact.notificationEmail}.
          </p>
          <p>
            You can also contact us directly by phone on {contact.phoneDisplay}, by email at {contact.email}, or on WhatsApp. WhatsApp is provided by WhatsApp LLC and has its own privacy policy.
          </p>
          <p>
            This website does not use advertising cookies or an analytics service. It does not ask you to create an account.
          </p>
          <p>
            To ask for a copy of your enquiry, or to ask us to delete it, email {contact.email} or call {contact.phoneDisplay}.
          </p>
        </div>
      </div>
    </article>
  );
}
