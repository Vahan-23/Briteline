/**
 * All public site copy, services and projects live here.
 * Adding a gallery project means adding one object to `projects`.
 * Values marked TODO are unknown — do not replace them with invented facts.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";

export const placeholders = {
  domain:
    "TODO: confirm domain name. Set NEXT_PUBLIC_SITE_URL before launch (currently https://example.com).",
  address: "TODO: confirm street address with client",
  locality: "TODO: confirm town or city with client",
  postcode: "TODO: confirm postcode with client",
  serviceArea:
    "TODO: confirm with client. Assumed London and surrounding areas.",
  companyNumber: "TODO: confirm company registration number",
  yearsInBusiness: "TODO: confirm years in business",
  about:
    "TODO: confirm with client. Briteline Ltd carries out home renovations and bespoke joinery — kitchens, bathrooms, fitted wardrobes, alcove units and full refurbishments. Replace this paragraph with the company’s own description before launch.",
  whyIntro: "TODO: confirm with client. These points are draft copy.",
  testimonials:
    "TODO: add real client reviews before showing testimonials. Do not invent reviews.",
  social:
    "TODO: add Instagram, Facebook and Google Business profile URLs when the client provides them.",
} as const;

export const contact = {
  phoneDisplay: "+44 7900 939868",
  phoneTel: "tel:+447900939868",
  phoneSchema: "+447900939868",
  email: "vardyep@gmail.com",
  emailHref: "mailto:vardyep@gmail.com",
  /** Notification inbox for the form provider dashboard. */
  notificationEmail: "vardyep@gmail.com",
  whatsappHref:
    "https://wa.me/447900939868?text=Hi%2C%20I%27d%20like%20a%20quote%20for%E2%80%A6",
} as const;

export const site = {
  name: "Briteline Ltd",
  tagline: "Renovations and bespoke joinery, finished to the last detail.",
  description:
    "Briteline Ltd designs and fits kitchens, bathrooms, wardrobes and bespoke joinery, and takes on full home renovations. Ask for a free quote.",
  url: siteUrl,
  locale: "en_GB",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  /** Hidden until real reviews exist. Never add fabricated testimonials. */
  showTestimonials: false,
  yearsInBusiness: null as number | null,
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    googleBusiness: null as string | null,
  },
} as const;

export type ServiceIcon =
  | "CookingPot"
  | "Bath"
  | "Columns3"
  | "Lamp"
  | "DoorOpen"
  | "House";

export type Service = {
  id: string;
  title: string;
  summary: string;
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    id: "kitchens",
    title: "Kitchens",
    summary: "Design, supply and fitting, including worktops and splashbacks.",
    icon: "CookingPot",
  },
  {
    id: "bathrooms",
    title: "Bathrooms & wet rooms",
    summary:
      "Tiling, walk-in showers, LED niches and rooms prepared for underfloor heating.",
    icon: "Bath",
  },
  {
    id: "wardrobes",
    title: "Fitted wardrobes & bespoke joinery",
    summary: "Made-to-measure bedroom furniture, painted and fitted in place.",
    icon: "Columns3",
  },
  {
    id: "shelving",
    title: "Alcove units, shelving & media walls",
    summary: "Cupboards and open shelves, with integrated LED lighting where it suits the room.",
    icon: "Lamp",
  },
  {
    id: "doors",
    title: "Internal doors & carpentry",
    summary: "Doors, architrave and the smaller carpentry that finishes a room.",
    icon: "DoorOpen",
  },
  {
    id: "renovation",
    title: "Full home renovation",
    summary: "Refurbishment coordinated from strip-out through to the finished joinery.",
    icon: "House",
  },
];

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "kitchens", label: "Kitchens" },
  { id: "bathrooms", label: "Bathrooms" },
  { id: "wardrobes", label: "Wardrobes & Joinery" },
  { id: "shelving", label: "Shelving" },
] as const;

export type ProjectFilter = (typeof projectFilters)[number]["id"];
export type ProjectCategory = Exclude<ProjectFilter, "all">;

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: ProjectCategory;
  title: string;
  caption: string;
  /** Thumb images stay small. The shower niche must never be used as a hero. */
  size: "standard" | "thumb";
};

export const projects: GalleryImage[] = [
  {
    id: "alcove-shelving-wide",
    src: "/images/alcove-shelving-led-1.jpg",
    alt: "Alcove shelving with warm LED strips and white cupboards either side of a fireplace, in a room with herringbone parquet flooring.",
    width: 1600,
    height: 1200,
    category: "shelving",
    title: "Alcove shelving",
    caption: "Open shelves, LED strips and cupboards either side of the fireplace.",
    size: "standard",
  },
  {
    id: "alcove-shelving-window",
    src: "/images/alcove-shelving-led-2.jpg",
    alt: "Second view of alcove shelving with LED lighting and white cupboards beside a fireplace, with a sash window to the right.",
    width: 1600,
    height: 900,
    category: "shelving",
    title: "Alcove shelving",
    caption: "The same alcoves from the window side, with shelf lighting washing the back panels.",
    size: "standard",
  },
  {
    id: "handleless-kitchen",
    src: "/images/kitchen-handleless-quartz.jpg",
    alt: "U-shaped handleless kitchen with a pale quartz worktop and splashback, built-in oven and herringbone parquet floor.",
    width: 1200,
    height: 1600,
    category: "kitchens",
    title: "Handleless kitchen",
    caption: "U-shaped run, quartz worktop and splashback, parquet floor.",
    size: "standard",
  },
  {
    id: "shaker-wardrobes",
    src: "/images/fitted-wardrobes-shaker.jpg",
    alt: "Floor-to-ceiling cream shaker fitted wardrobes during fitting, with panelled doors and a matching internal door.",
    width: 1200,
    height: 1600,
    category: "wardrobes",
    title: "Shaker wardrobes",
    caption: "Floor-to-ceiling shaker doors in a cream paint finish.",
    size: "standard",
  },
  {
    id: "walk-in-shower",
    src: "/images/walk-in-shower.jpg",
    alt: "Walk-in shower with a glass screen, large-format stone-effect tiles and a chrome heated towel rail.",
    width: 1200,
    height: 1600,
    category: "bathrooms",
    title: "Walk-in shower",
    caption: "Glass screen, large-format tiles and a heated towel rail.",
    size: "standard",
  },
  {
    id: "cloakroom-wc",
    src: "/images/cloakroom-wc.jpg",
    alt: "Cloakroom WC with a wall-hung toilet, concealed cistern, basin and a chrome heated towel rail.",
    width: 1200,
    height: 1600,
    category: "bathrooms",
    title: "Cloakroom WC",
    caption: "Wall-hung pan, concealed cistern and a chrome towel rail.",
    size: "standard",
  },
  {
    id: "shower-niche",
    src: "/images/shower-niche-led.jpg",
    alt: "Small view of a recessed shower niche with warm LED lighting, set into stone-effect tiles. A reflection is visible in the glass.",
    width: 1200,
    height: 1600,
    category: "bathrooms",
    title: "LED shower niche",
    caption: "Recessed niche with LED lighting. Detail photo only.",
    size: "thumb",
  },
];

export const hero = {
  image: "/images/alcove-shelving-led-2.jpg",
  alt: "Alcove shelving with LED lighting and white cupboards either side of a fireplace.",
  width: 1600,
  height: 900,
  eyebrow: "Briteline Ltd",
  title: "Renovations & bespoke joinery, finished to the last detail",
  subtitle:
    "Kitchens, bathrooms, fitted wardrobes and alcove joinery, made and fitted with care.",
} as const;

export const videoTour = {
  src: "/video/bathroom-tour.mp4",
  poster: "/video/bathroom-tour-poster.jpg",
  posterAlt:
    "Rainfall shower and a lit recessed niche in a stone-effect tiled bathroom.",
  width: 464,
  height: 832,
  title: "A finished bathroom, start to finish",
  body: "A short walk-through of a completed bathroom: tiled walls, a walk-in shower and an LED niche. The film is silent.",
} as const;

export const reasons = [
  {
    title: "In-house joiners and tradesmen",
    text: "Joinery and the main trades are carried out by Briteline’s own people.",
  },
  {
    title: "Clean and tidy sites",
    text: "Rooms are protected and left swept at the end of each day.",
  },
  {
    title: "Fixed written quotes",
    text: "The price is set out in writing before work starts.",
  },
  {
    title: "Attention to detail",
    text: "Shadow gaps, lighting and the last coat of paint are part of the job, not an extra.",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Visit & measure",
    text: "We come to the property, measure the room and talk through what you want from it.",
  },
  {
    step: "02",
    title: "Design & quote",
    text: "You receive a design and a fixed written quote before anything is ordered.",
  },
  {
    step: "03",
    title: "Build",
    text: "Joinery is made and the room is fitted, with the site kept clean as the work goes on.",
  },
  {
    step: "04",
    title: "Handover",
    text: "We walk the finished room with you and deal with any snagging before we leave.",
  },
] as const;

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;
