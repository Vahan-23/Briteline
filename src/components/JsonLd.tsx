import { contact, placeholders, site } from "@/content/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/og.jpg`,
    telephone: contact.phoneSchema,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: placeholders.address,
      addressLocality: placeholders.locality,
      postalCode: placeholders.postcode,
      addressCountry: "GB",
    },
    areaServed: placeholders.serviceArea,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
