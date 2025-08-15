import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tech Podcast Host",
    content:
      "Baithk transformed how we create our weekly tech show. The collaborative features make it so easy to work with remote guests.",
    rating: 5,
    avatar: "fox.jpg",
  },
  {
    name: "Mike Chen",
    role: "Business Podcaster",
    content:
      "The analytics dashboard gives me insights I never had before. I can see exactly what content resonates with my audience.",
    rating: 5,
    avatar: "lion.jpg",
  },
  {
    name: "Carlos Rodriguez",
    role: "Educational Content Creator",
    content:
      "From recording to publishing, everything is seamless. Baithk has cut our production time in half while improving quality.",
    rating: 5,
    avatar: "rhino.jpg",
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-20 lg:py-32 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Loved by Podcast
            <span className="text-primary block">Creators Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of creators who have transformed their podcasting
            journey with Baithk. See what our community has to say.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary mb-4" />

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-accent fill-current"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-card-foreground mb-6 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <Image
                    src={`/testimonials/${
                      testimonial.avatar || "placeholder.png"
                    }`}
                    alt={testimonial.name}
                    className="rounded-full mr-4"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h4 className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                10,000+
              </h3>
              <p className="text-muted-foreground">Active Creators</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                50M+
              </h3>
              <p className="text-muted-foreground">Episodes Published</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                99.9%
              </h3>
              <p className="text-muted-foreground">Uptime Guarantee</p>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold mt-8"
          >
            Join Our Community
          </Button>
        </div>
      </div>
    </section>
  );
}
