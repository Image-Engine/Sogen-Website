import { useState, forwardRef } from "react";
import { Link } from "@/lib/router";
import { ShoppingCart, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = forwardRef<HTMLAnchorElement, ProductCardProps>(function ProductCard({ product }, ref) {
  const addItem = useCartStore((state) => state.addItem);
  const node = product.node;
  const images = node.images.edges;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const compareAtPrice = node.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!variant || isAdding) return;
    
    setIsAdding(true);
    try {
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
    } finally {
      setIsAdding(false);
    }
  };

  const primaryImage = images[0]?.node.url;
  const hoverImage = images[1]?.node.url || primaryImage;

  return (
    <Link 
      ref={ref}
      to={`/product/${node.handle}`}
      className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 active:scale-[0.98] transition-all duration-300"
    >
      {/* Product Image with Hover Switch */}
      <div 
        className="aspect-square bg-secondary/10 overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {hasDiscount && (
          <span className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-lg">
            Sale
          </span>
        )}
        {images.length > 0 ? (
          <>
            <img
              src={primaryImage}
              alt={images[0]?.node.altText || node.title}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isHovered && images.length > 1 ? "opacity-0" : "opacity-100"
              }`}
            />
            {images.length > 1 && (
              <img
                src={hoverImage}
                alt={images[1]?.node.altText || node.title}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </>
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
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through ml-1.5">
                ${parseFloat(compareAtPrice.amount).toFixed(2)}
              </span>
            )}
            <span className="text-xs sm:text-sm text-muted-foreground ml-1">
              {price.currencyCode}
            </span>
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
          >
            {isAdding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
});