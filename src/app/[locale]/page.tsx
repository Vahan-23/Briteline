import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { VideoSection } from "@/components/VideoSection";
import { WhyBriteline } from "@/components/WhyBriteline";
import { isLocale, type Locale } from "@/i18n/locales";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const current: Locale = locale;

  return (
    <>
      <Hero locale={current} />
      <Services locale={current} />
      <FeaturedProjects locale={current} />
      <VideoSection />
      <WhyBriteline locale={current} />
      <Process locale={current} />
      <About locale={current} />
      <Contact />
    </>
  );
}
