import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Users, BarChart3, Cloud, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Professional Recording",
    description:
      "High-quality audio recording with advanced noise cancellation and real-time editing tools.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Collaborative Workspace",
    description:
      "Invite team members, co-hosts, and guests to collaborate seamlessly on your podcast projects.",
    color: "text-accent",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track your podcast performance with detailed analytics, listener insights, and growth metrics.",
    color: "text-primary",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description:
      "Unlimited cloud storage for your episodes, drafts, and media files with automatic backups.",
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "One-Click Publishing",
    description:
      "Publish to all major podcast platforms simultaneously with our automated distribution system.",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level security with end-to-end encryption to protect your content and audience data.",
    color: "text-accent",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="text-primary block">Create Great Podcasts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From recording to publishing, Baithk provides all the tools you need
            to create professional podcasts that engage your audience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-card-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
          >
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
}
