import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-primary-foreground/10 text-caption uppercase tracking-wider mb-6">
              Limited Time Offer
            </span>
            <h2 className="text-display-md lg:text-display-lg text-primary-foreground mb-4">
              Summer Sale
              <span className="block text-primary-foreground/80">Up to 20% Off</span>
            </h2>
            <p className="text-body-lg text-primary-foreground/70 max-w-lg mx-auto lg:mx-0 mb-8">
              Get ready for summer with our biggest sale of the year. Premium LiFePO4 batteries at unbeatable prices.
            </p>
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-base font-semibold rounded-full">
              Shop the Sale
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-primary-foreground/10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-primary-foreground/40" fill="currentColor">
                    <path d="M17 4h-3V2h-4v2H7v18h10V4zm-2 16H9V6h2v2h2V6h2v14zm-3-8h2v6h-2v-6z"/>
                  </svg>
                </div>
                <p className="text-sm text-primary-foreground/50">Promotional Banner Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
