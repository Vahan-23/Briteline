# Briteline Ltd

Marketing site for Briteline Ltd, a UK home renovation and bespoke joinery company. Built with Next.js (App Router), TypeScript and Tailwind CSS. The production build is a static export in `out/`.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root page sends you to `/en/`, or to `/ru/` or `/hy/` when that language is saved or is the browser language.

```bash
npm run lint
npm run build
```

`npm run build` writes the static site to `out/`. It can be deployed on Vercel or any host that serves static files. Routes use trailing slashes (`/en/projects/`).

## Languages

English, Russian and Armenian. Copy is in `src/messages/en.json`, `ru.json` and `hy.json`. `src/content/site.ts` keeps images, phone, email and links. Project captions and alt text are translation keys in those JSON files (`projects.items`).

The header language control opens a list with the UK, Russian and Armenian flags. Choosing one fades the page, keeps the current page and section, and stores the choice in `localStorage` (`briteline-locale`). Armenian pages use Noto Sans Armenian. English and Russian use Montserrat and Inter, including Cyrillic.

### // REVIEW — ask a native speaker to check these

Armenian is Eastern Armenian in modern spelling. These trade terms are the ones most likely to need a better word:

- // REVIEW ֆարթուկ (splashback)
- // REVIEW թաց սենյակ (wet room)
- // REVIEW լայնակ (architrave)
- // REVIEW շեյքեր (shaker)
- // REVIEW ստվերային կար (shadow gap)
- // REVIEW փոքր սանհանգույց (cloakroom WC)
- // REVIEW նկատված թերություններ (snagging)

Russian:

- // REVIEW теневые зазоры (shadow gap)
- // REVIEW замечания at handover (snagging)

## Quote form

Set `NEXT_PUBLIC_FORM_ENDPOINT` in `.env.local`, then rebuild. The form sends `FormData` (`name`, `phone`, `email`, `postcode`, `service`, `message`, optional `photo`) with an `Accept: application/json` header.

For Formspree, use the form URL (`https://formspree.io/f/xxxxxxxx`). In the Formspree dashboard, set the notification email to **vardyep@gmail.com**.

Until the endpoint is set, the form still validates and then asks the visitor to call, email or use WhatsApp.

## Add a project

Edit `src/content/site.ts` and add an object to `projects` (no title or caption — those are translations):

```ts
{
  id: "utility-room",
  src: "/images/utility-room.jpg",
  width: 1200,
  height: 1600,
  category: "kitchens", // kitchens | bathrooms | wardrobes | shelving
  size: "standard", // or "thumb" for a small detail photo
}
```

Then add the same `utility-room` key under `projects.items` in `src/messages/en.json`, `ru.json` and `hy.json`, with `title`, `caption` and `alt` in each language.

Put the image in `public/images/`. The homepage and `/[locale]/projects` both read this list. `size: "thumb"` keeps a photo small (use this for detail shots that should not be shown large).

Phone and email stay in `src/content/site.ts`. Visible sentences stay in the message files.

## TODO — confirm with the client before launch

Do not invent these. They are marked `TODO` in `src/content/site.ts` and, where relevant, on the page.

- Domain name. `NEXT_PUBLIC_SITE_URL` is `https://example.com` until the real domain is set. It is used for canonical URLs, Open Graph, the sitemap and JSON-LD.
- Street address, town and postcode.
- Service area. The draft assumption is London and surrounding areas.
- Company registration number.
- Testimonials. The section stays hidden (`showTestimonials: false`) until real reviews exist. Do not add fabricated reviews.
- Social profiles: Instagram, Facebook and Google Business.
- The “Why Briteline” points are draft copy.
- Privacy policy wording.

## Contact details in use

- Phone / WhatsApp: +44 7900 939868
- Email: vardyep@gmail.com

## Brand images

`scripts/generate-brand-assets.mjs` crops the favicon from the B monogram and builds `public/og.jpg` (hero photo with the logo). Run it with `node scripts/generate-brand-assets.mjs` after replacing the logo or hero photo.
