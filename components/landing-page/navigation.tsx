"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Mic } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Baithk</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#community"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Community
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary"
            >
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Pricing
              </a>
              <a
                href="#community"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Community
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary justify-start"
                >
                  Sign In
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground justify-start">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
