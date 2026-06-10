import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Intro from "@/components/sections/Intro";
import OliveiSection from "@/components/sections/OliveiSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import Services from "@/components/sections/Services";
import VideoSection from "@/components/sections/VideoSection";
import WhatChanges from "@/components/sections/WhatChanges";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-shell px-6 md:px-12">
        <LogoMarquee />
      </div>
      <Intro />
      <OliveiSection />
      <ProjectsSection />
      <Services />
      <VideoSection />
      <WhatChanges />
      <Testimonials />
    </>
  );
}
