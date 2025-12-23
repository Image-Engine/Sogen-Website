import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Package, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const node = product.node;
  const images = node.images.edges;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useState(() => {
    if (!api) return;
    api.on("select", onSelect);
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!variant) return;
    
    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    
    toast.success("Added to cart", {
      description: node.title,
    });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    api?.scrollPrev();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    api?.scrollNext();
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    api?.scrollTo(index);
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:shadow-product-hover transition-all duration-300"
    >
      {/* Product Image Carousel */}
      <div className="aspect-square bg-secondary/10 overflow-hidden relative">
        {images.length > 0 ? (
          <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent className="h-full -ml-0">
              {images.map((img, index) => (
                <CarouselItem key={index} className="h-full pl-0">
                  <img
                    src={img.node.url}
                    alt={img.node.altText || node.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation arrows - only show if multiple images */}
            {images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                {/* Dot indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleDotClick(e, index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        current === index 
                          ? "bg-primary w-4" 
                          : "bg-background/70 hover:bg-background"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </Carousel>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-sm sm:text-base">
          {node.title}
        </h3>
        
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {node.description || "Premium quality battery"}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto gap-2">
          <div className="min-w-0">
            <span className="text-base sm:text-lg font-bold text-foreground">
              ${parseFloat(price.amount).toFixed(2)}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground ml-1">
              {price.currencyCode}
            </span>
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={handleAddToCart}
            className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
