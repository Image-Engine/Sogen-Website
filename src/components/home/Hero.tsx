import { ArrowRight, Headset, Package, Award, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
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
      <div className="container relative z-10 py-20 lg:py-32 flex items-center justify-center">
        <div className="max-w-2xl space-y-8 text-center flex flex-col items-center">
          {/* Main Headline */}
          <h1 className="animate-slide-up" style={{
          animationDelay: "0.1s"
        }}>
            <span className="block text-5xl md:text-6xl font-bold text-white tracking-tight lg:text-6xl">
              Power You Can Rely On.
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
          animationDelay: "0.2s"
        }} className="text-lg md:text-xl text-white/70 max-w-lg animate-slide-up text-center">
            Industry-leading lithium batteries for solar, off-grid, RV, and marine applications. 
            Built to perform in New Zealand conditions.
          </p>

          {/* CTA Button */}
          <div className="animate-slide-up" style={{
          animationDelay: "0.3s"
        }}>
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 font-semibold px-8">
              <Link to="/products">
                Shop All Batteries
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 animate-slide-up" style={{
          animationDelay: "0.4s"
        }}>
            <div className="flex flex-col items-center gap-2 text-center">
              <Headset className="h-10 w-10 text-white" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-white">NZ Support</span>
              <span className="text-xs text-white/60">LiveChat · Call · Email</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Package className="h-10 w-10 text-white" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-white">Fast Shipping</span>
              <span className="text-xs text-white/60">NZ Warehousing</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Award className="h-10 w-10 text-white" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-white">10-Year Warranty</span>
              <span className="text-xs text-white/60">Full Battery Coverage</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <ShieldCheck className="h-10 w-10 text-white" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-white">Safest Batteries</span>
              <span className="text-xs text-white/60">Reliable LFP Chemistry</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
}