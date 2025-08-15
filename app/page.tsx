import { Navigation } from "@/components/landing-page/navigation";
import { HeroSection } from "@/components/landing-page/hero-section";
import { FeaturesSection } from "@/components/landing-page/features-section";
import { CommunitySection } from "@/components/landing-page/community-section";
import { PricingSection } from "@/components/landing-page/pricing-section";
import { Footer } from "@/components/landing-page/footer";

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
