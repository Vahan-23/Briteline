# Task: Build a website for Briteline Ltd (renovation & bespoke joinery company)

You are building a production-ready marketing website for **Briteline Ltd**, a UK home renovation and bespoke joinery company. The site must show what the company does, present its finished projects (photos + one video), and make it easy for visitors to get in touch for a quote.

## Tech stack
- **Next.js (App Router) + TypeScript + Tailwind CSS**
- Static export friendly (`output: 'export'`), deployable to Vercel or any static host
- Use `next/image` for all photos; lazy-load everything below the fold
- No CMS for now: keep all content in one typed file `src/content/site.ts` so texts, services and projects are easy to edit later
- No heavy UI libraries. Small lightbox component written by hand (or `yet-another-react-lightbox` if really needed)

## Assets (already in the project)
Put the files from `briteline-assets/` into `public/`:

```
public/images/logo.png                      – company logo (navy "B" monogram with house + "BRITELINE LTD")
public/images/fitted-wardrobes-shaker.jpg   – floor-to-ceiling fitted wardrobes, shaker doors, cream paint
public/images/kitchen-handleless-quartz.jpg – U-shaped handleless kitchen, quartz worktop & splashback, parquet floor
public/images/alcove-shelving-led-1.jpg     – alcove shelving with LED strips + cupboards either side of a fireplace
public/images/alcove-shelving-led-2.jpg     – same alcove project, second angle
public/images/cloakroom-wc.jpg              – cloakroom WC, wall-hung toilet, concealed cistern, chrome towel rail
public/images/shower-niche-led.jpg          – recessed shower niche with LED lighting, stone-effect tiles (NOTE: photographer reflection visible in the glass – use only as a small thumbnail, never as hero)
public/images/walk-in-shower.jpg            – walk-in shower / wet room, glass screen, large-format tiles, heated towel rail
public/video/bathroom-tour.mp4              – 40s vertical (464×832) walkthrough of a finished bathroom, no audio
public/video/bathroom-tour-poster.jpg       – poster frame for the video
```

The logo PNG has a white sticker-style outline on a transparent background. In the header use it at ~44–56px height on a white background. Also generate a favicon from the "B" monogram (crop of the logo).

## Brand
- Colours sampled from the logo:
  - Navy (primary): `#012A55`
  - Slate blue (secondary): `#526A82`
  - Background: white `#FFFFFF` and warm off-white `#F7F5F1` (matches the cream/stone tones in the photos)
  - Text: `#1A1F2B`; muted text `#5B6472`
- Typography: logo uses a wide geometric sans with letter spacing. Use **Montserrat** (headings, uppercase with `tracking-[0.2em]` for small labels) + **Inter** (body), via `next/font`.
- Style: clean, premium, calm, lots of whitespace, large photos. Think high-end London residential contractor. No stock-photo look, no gradients, no emojis.

## Pages / sections
Single-page site with anchors **plus** a separate `/projects` page.

1. **Header** – logo left; nav: Services, Projects, About, Contact; navy "Get a quote" button on the right. Sticky, becomes compact with a subtle shadow on scroll. Mobile: hamburger with full-screen menu.
2. **Hero** – large photo (`alcove-shelving-led-2.jpg` or `kitchen-handleless-quartz.jpg`), dark overlay, heading like *"Renovations & bespoke joinery, finished to the last detail"*, short subline, two buttons: "Get a free quote" (→ contact) and "See our work" (→ projects).
3. **Services** – grid of cards (icon + title + 1–2 lines). Services the company does:
   - Kitchens (design, fitting, worktops)
   - Bathrooms & wet rooms (tiling, walk-in showers, LED niches, underfloor heating ready)
   - Fitted wardrobes & bespoke joinery
   - Alcove units, shelving & media walls (with integrated LED lighting)
   - Internal doors & carpentry
   - Full home renovation / refurbishment
   Use simple line icons (lucide-react).
4. **Featured projects** – masonry/grid of the photos, each with a short caption (room type + 2–3 key details). Click opens a lightbox with keyboard + swipe navigation. "View all projects" → `/projects`.
5. **Video section** – the bathroom tour video, shown in a phone-style vertical frame next to a short text block ("A finished bathroom, start to finish"). `muted`, `playsInline`, `loop`, autoplay only when in viewport (IntersectionObserver), poster image, plus a play/pause button. Never autoplay with sound.
6. **Why Briteline** – 3–4 points: in-house joiners & tradesmen, clean & tidy sites, fixed written quotes, attention to detail. (Mark as placeholder text to confirm with client.)
7. **Process** – 4 steps: Visit & measure → Design & quote → Build → Handover.
8. **About** – short paragraph about the company (placeholder, clearly marked `TODO: confirm with client`).
9. **Contact / Quote form** – fields: name, phone, email, postcode, service (select from services list), message, optional photo upload. Client-side validation. Submit via a provider that works on static hosting (Formspree or Web3Forms – put the endpoint in an env variable `NEXT_PUBLIC_FORM_ENDPOINT`). Next to the form: phone, email, WhatsApp button (`https://wa.me/<number>`), service area.
10. **Footer** – logo, short tagline, contacts (phone, WhatsApp, email from the section below), nav links, "© Briteline Ltd", company number placeholder, privacy policy link.

`/projects` page: filter chips (All / Kitchens / Bathrooms / Wardrobes & Joinery / Shelving) + full gallery with lightbox. Data-driven from `site.ts` so adding a new project = adding an object with images.

## Floating WhatsApp button
Fixed bottom-right on mobile and desktop, opens WhatsApp chat with a prefilled message "Hi, I'd like a quote for…".

## SEO & tech requirements
- Proper `metadata` per page (title, description, Open Graph image = hero photo with logo)
- `LocalBusiness` / `HomeAndConstructionBusiness` JSON-LD with placeholders for address, phone, area served
- `sitemap.xml`, `robots.txt`
- Descriptive `alt` text for every image (use the captions above)
- Lighthouse target: 90+ on Performance, Accessibility, SEO, Best Practices (mobile)
- Fully responsive, mobile-first; test at 375px, 768px, 1280px, 1536px
- Accessible: semantic HTML, focus states, keyboard-navigable lightbox and menu, colour contrast AA
- Subtle animations only (fade/slide-in on scroll, respects `prefers-reduced-motion`)

## Contact details (real — use exactly these)
- Phone / WhatsApp: **+44 7900 939868**
  - `tel:` link: `tel:+447900939868`
  - WhatsApp link: `https://wa.me/447900939868?text=Hi%2C%20I%27d%20like%20a%20quote%20for%E2%80%A6`
- Email: **vardyep@gmail.com** (`mailto:vardyep@gmail.com`)
- Also use these as the default values for the form provider's notification email and in the JSON-LD (`telephone`, `email`).

## Placeholders — DO NOT invent real data
Put these in `site.ts` as clearly marked `TODO` values and list them in the README:
- Address / service area (assumed London & surrounding areas — confirm)
- Company registration number
- Domain name
- About-us text, years in business, testimonials (leave the testimonials section hidden until real reviews are provided — never generate fake reviews)
- Social links (Instagram, Facebook, Google Business profile)

## Deliverables
1. Working Next.js project, `npm run dev` / `npm run build` succeed with no TS or lint errors
2. `README.md` with: how to run, how to add a new project to the gallery, how to set the form endpoint, the list of TODO placeholders
3. Commit in small logical steps

Start by scaffolding the project and `site.ts` content model, then build sections top-to-bottom. After each major section, check it on mobile and desktop widths.
