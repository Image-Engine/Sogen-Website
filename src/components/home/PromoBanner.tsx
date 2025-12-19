import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Ready to Power Your Adventure?
        </h2>
        <p className="text-muted-foreground mb-6">
          Discover the perfect SOK battery for your needs
        </p>
        <Button variant="default" size="lg">
          Shop Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}