import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="bg-primary text-primary-foreground py-3">
      <div className="container mx-auto px-4 flex items-center justify-center gap-4 text-sm">
        <span className="font-medium">Free shipping on orders over $500</span>
        <Button variant="secondary" size="sm" className="h-7">
          Shop Now <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </section>
  );
}