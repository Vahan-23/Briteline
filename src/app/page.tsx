import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { VideoSection } from "@/components/VideoSection";
import { WhyBriteline } from "@/components/WhyBriteline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <VideoSection />
      <WhyBriteline />
      <Process />
      <About />
      <Contact />
    </>
  );
}
