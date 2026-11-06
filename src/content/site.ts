/**
 * Non-text site data: images, contact details and stable ids.
 * Every user-facing string lives in src/messages/{en,ru,hy}.json.
 * Values marked TODO in those files are unknown — do not invent them.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";

export const contact = {
  phoneDisplay: "+44 7900 939868",
  phoneTel: "tel:+447900939868",
  phoneSchema: "+447900939868",
  email: "vardyep@gmail.com",
  emailHref: "mailto:vardyep@gmail.com",
  /** Notification inbox for the form provider dashboard. */
  notificationEmail: "vardyep@gmail.com",
} as const;

export function whatsappHref(message: string) {
  return `https://wa.me/447900939868?text=${encodeURIComponent(message)}`;
}

export const site = {
  name: "Briteline Ltd",
  url: siteUrl,
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  /** Hidden until real reviews exist. Never add fabricated testimonials. */
  showTestimonials: false,
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

export const services = [
  { id: "kitchens", icon: "CookingPot" },
  { id: "bathrooms", icon: "Bath" },
  { id: "wardrobes", icon: "Columns3" },
  { id: "shelving", icon: "Lamp" },
  { id: "doors", icon: "DoorOpen" },
  { id: "renovation", icon: "House" },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const projectFilters = ["all", "kitchens", "bathrooms", "wardrobes", "shelving"] as const;

export type ProjectFilter = (typeof projectFilters)[number];
export type ProjectCategory = Exclude<ProjectFilter, "all">;

export type GalleryImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  category: ProjectCategory;
  /** Thumb images stay small. The shower niche must never be used as a hero. */
  size: "standard" | "thumb";
};

export const projects = [
  {
    id: "alcove-shelving-wide",
    src: "/images/alcove-shelving-led-1.jpg",
    width: 1600,
    height: 1200,
    category: "shelving",
    size: "standard",
  },
  {
    id: "alcove-shelving-window",
    src: "/images/alcove-shelving-led-2.jpg",
    width: 1600,
    height: 900,
    category: "shelving",
    size: "standard",
  },
  {
    id: "handleless-kitchen",
    src: "/images/kitchen-handleless-quartz.jpg",
    width: 1200,
    height: 1600,
    category: "kitchens",
    size: "standard",
  },
  {
    id: "shaker-wardrobes",
    src: "/images/fitted-wardrobes-shaker.jpg",
    width: 1200,
    height: 1600,
    category: "wardrobes",
    size: "standard",
  },
  {
    id: "walk-in-shower",
    src: "/images/walk-in-shower.jpg",
    width: 1200,
    height: 1600,
    category: "bathrooms",
    size: "standard",
  },
  {
    id: "cloakroom-wc",
    src: "/images/cloakroom-wc.jpg",
    width: 1200,
    height: 1600,
    category: "bathrooms",
    size: "standard",
  },
  {
    id: "shower-niche",
    src: "/images/shower-niche-led.jpg",
    width: 1200,
    height: 1600,
    category: "bathrooms",
    size: "thumb",
  },
] as const satisfies readonly GalleryImage[];

export type ProjectId = (typeof projects)[number]["id"];

export const hero = {
  image: "/images/alcove-shelving-led-2.jpg",
  width: 1600,
  height: 900,
} as const;

export const videoTour = {
  src: "/video/bathroom-tour.mp4",
  poster: "/video/bathroom-tour-poster.jpg",
  width: 464,
  height: 832,
} as const;

export const reasonIds = ["joiners", "sites", "quotes", "detail"] as const;
export type ReasonId = (typeof reasonIds)[number];

export const processSteps = [
  { id: "visit", step: "01" },
  { id: "design", step: "02" },
  { id: "build", step: "03" },
  { id: "handover", step: "04" },
] as const;

export type ProcessId = (typeof processSteps)[number]["id"];

export const nav = [
  { id: "services", hash: "#services" },
  { id: "projects", hash: "#projects" },
  { id: "about", hash: "#about" },
  { id: "contact", hash: "#contact" },
] as const;

export type NavId = (typeof nav)[number]["id"];
