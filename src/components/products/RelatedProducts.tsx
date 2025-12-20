import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProductRecommendations, ShopifyProduct } from "@/lib/shopify";

interface RelatedProductsProps {
  productId: string;
  currentHandle: string;
}

export function RelatedProducts({ productId, currentHandle }: RelatedProductsProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    async function loadRelatedProducts() {
      setLoading(true);
      const recommendations = await fetchProductRecommendations(productId);
      // Filter out the current product
      const filtered = recommendations.filter(p => p.node.handle !== currentHandle);
      setProducts(filtered.slice(0, 8));
      setLoading(false);
    }
    loadRelatedProducts();
  }, [productId, currentHandle]);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("related-products-carousel");
    if (!container) return;
    const scrollAmount = 320;
    const newPosition = direction === "left" 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  if (loading) {
    return (
      <section className="py-12 md:py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile: Grid layout */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>

        {/* Desktop: Carousel */}
        <div
          id="related-products-carousel"
          className="hidden md:flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        >
          {products.map((product) => (
            <div key={product.node.id} className="flex-shrink-0 w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
