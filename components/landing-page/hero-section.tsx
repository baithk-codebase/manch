import { Button } from "@/components/ui/button";
import { Play, Users, Headphones } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Users className="w-4 h-4 mr-2" />
            Join 10,000+ podcast creators
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Create Amazing
            <span className="text-primary block">Podcasts Together</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Baithk brings people together to create, manage, and grow their
            podcasts. Experience the power of collaborative podcasting with our
            intuitive dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Your Podcast
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold bg-transparent"
            >
              <Headphones className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              <Image
                src="/podcast.jpg"
                alt="Baithk Dashboard Preview"
                className="w-full"
                height={500}
                width={500}
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary rounded-full opacity-20 animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}
