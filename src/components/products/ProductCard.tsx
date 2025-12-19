import { ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

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

  return (
    <div 
      className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:shadow-product-hover transition-all duration-300"
    >
      {/* Product Image */}
      <div className="aspect-square bg-secondary/10 overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
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
    </div>
  );
}
