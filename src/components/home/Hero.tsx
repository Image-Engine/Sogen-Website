import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
      <div className="container relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-caption text-foreground/80">
                NZ's #1 Battery Specialists
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-display-lg lg:text-display-xl text-foreground animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Premium LiFePO4
              <span className="block text-muted-foreground">Power Solutions</span>
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Industry-leading lithium batteries for solar, off-grid, RV, and marine applications. 
              Built to perform in New Zealand conditions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero">
                Shop All Batteries
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button variant="hero-outline">
                Get Expert Advice
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-success" />
                <span>10-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-5 w-5 text-success" />
                <span>Free NZ Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-5 w-5 text-success" />
                <span>Expert Support</span>
              </div>
            </div>
          </div>

          {/* Right - Product Showcase (Placeholder) */}
          <div className="relative animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="aspect-square lg:aspect-[4/3] rounded-3xl bg-placeholder flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-placeholder-hover flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-muted-foreground/40" fill="currentColor">
                    <path d="M17 4h-3V2h-4v2H7v18h10V4zm-2 16H9V6h2v2h2V6h2v14zm-3-8h2v6h-2v-6z"/>
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">Featured Product Image</p>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-background rounded-2xl shadow-elevated p-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">6000+ Cycles</p>
                  <p className="text-xs text-muted-foreground">Industry Leading</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/[0.02]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/[0.02]" />
      </div>
    </section>
  );
}
