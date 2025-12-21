import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { MetricsBento } from "@/components/metrics-bento";
import { InterestsSection } from "@/components/interests-section";
import { FeaturedWork } from "@/components/featured-work";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-7 space-y-24">
          <HeroSection />
          <ProjectsSection />
          <MetricsBento />
          <FeaturedWork />
          {/* <InterestsSection /> */}
        </main>
        <Footer />
      </div>
    </div>
  );
}
