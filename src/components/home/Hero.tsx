import { ArrowRight, Shield, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.png";
export function Hero() {
  return <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="SOK Battery Professional Installation" className="w-full h-full object-cover" />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 lg:py-32">
        <div className="max-w-2xl space-y-8">
          {/* Badge */}
          

          {/* Main Headline */}
          <h1 className="animate-slide-up" style={{
          animationDelay: "0.1s"
        }}>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              Premium LiFePO4
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-white/60 tracking-tight mt-2">
              Power Solutions
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/70 max-w-lg animate-slide-up" style={{
          animationDelay: "0.2s"
        }}>
            Industry-leading lithium batteries for solar, off-grid, RV, and marine applications. 
            Built to perform in New Zealand conditions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{
          animationDelay: "0.3s"
        }}>
            <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold px-8">
              Shop All Batteries
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" className="border-2 border-white/40 bg-transparent text-white hover:bg-white/10 font-semibold px-8">
              Get Expert Advice
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-8 pt-6 animate-slide-up" style={{
          animationDelay: "0.4s"
        }}>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm text-white/80">10-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-green-400" />
              <span className="text-sm text-white/80">Free NZ Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-400" />
              <span className="text-sm text-white/80">Expert Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
}