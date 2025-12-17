import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductPlaceholderProps {
  index: number;
}

function ProductPlaceholder({ index }: ProductPlaceholderProps) {
  return (
    <div 
      className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:shadow-product-hover transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Product Image Placeholder */}
      <div className="aspect-square bg-placeholder flex items-center justify-center">
        <div className="w-16 h-16 rounded-xl bg-placeholder-hover flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-muted-foreground/30" fill="currentColor">
            <path d="M17 4h-3V2h-4v2H7v18h10V4zm-2 16H9V6h2v2h2V6h2v14zm-3-8h2v6h-2v-6z"/>
          </svg>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category tag placeholder */}
        <div className="h-4 w-20 bg-placeholder rounded mb-3" />
        
        {/* Title placeholder */}
        <div className="h-5 w-full bg-placeholder rounded mb-2" />
        <div className="h-5 w-2/3 bg-placeholder rounded mb-4" />

        {/* Specs placeholder */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-placeholder rounded-full" />
          <div className="h-6 w-20 bg-placeholder rounded-full" />
        </div>

        {/* Price placeholder */}
        <div className="flex items-center justify-between">
          <div className="h-7 w-24 bg-placeholder rounded" />
          <div className="h-9 w-9 bg-placeholder rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid() {
  return (
    <section className="py-16 lg:py-24 bg-surface-sunken">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-caption uppercase tracking-widest text-muted-foreground mb-3">
              Featured Products
            </p>
            <h2 className="text-display-md text-foreground">
              Best Selling Batteries
            </h2>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            View All Products
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Products Grid - Placeholder boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <ProductPlaceholder key={index} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
