import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export function PromoBanner() {
  return (
    <section className="py-12 bg-foreground text-background">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-display-sm mb-2">Free Shipping NZ Wide</h3>
            <p className="text-background/70">On all orders over $500. Quality batteries delivered to your door.</p>
          </div>
          <Button variant="secondary" size="lg" className="group">
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}