import { contact, site } from "@/content/site";
import { getMessages } from "@/i18n/messages";
import type { Locale } from "@/i18n/locales";

export function JsonLd({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: site.name,
    description: messages.meta.description,
    url: `${site.url}/${locale}/`,
    image: `${site.url}/og.jpg`,
    telephone: contact.phoneSchema,
    email: contact.email,
    availableLanguage: ["en", "ru", "hy"],
    address: {
      "@type": "PostalAddress",
      streetAddress: messages.placeholders.address,
      addressLocality: messages.placeholders.locality,
      postalCode: messages.placeholders.postcode,
      addressCountry: "GB",
    },
    areaServed: messages.contact.serviceAreaValue,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
