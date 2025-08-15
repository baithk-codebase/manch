import { Navigation } from "@/components/LandingPage/navigation";
import { HeroSection } from "@/components/LandingPage/hero-section";
import { FeaturesSection } from "@/components/LandingPage/features-section";
import { CommunitySection } from "@/components/LandingPage/community-section";
import { PricingSection } from "@/components/LandingPage/pricing-section";
import { Footer } from "@/components/LandingPage/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CommunitySection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
