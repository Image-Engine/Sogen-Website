import { useEffect, useState } from "react";
import { ArrowRight, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = () => {
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
    <div className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:shadow-product-hover transition-all duration-300">
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
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
          {node.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {node.description || "Premium quality battery"}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-foreground">
              ${parseFloat(price.amount).toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              {price.currencyCode}
            </span>
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={handleAddToCart}
            className="h-9 w-9"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function EmptyProductState() {
  return (
    <div className="col-span-full py-16 text-center">
      <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">No products yet</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Your store doesn't have any products yet. Tell us what products you'd like to sell and we'll help you add them!
      </p>
    </div>
  );
}

export function ProductGrid() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await fetchProducts(8);
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl bg-card border border-border overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-placeholder" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-placeholder rounded w-3/4" />
                  <div className="h-4 bg-placeholder rounded w-full" />
                  <div className="h-4 bg-placeholder rounded w-1/2" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-placeholder rounded w-20" />
                    <div className="h-9 w-9 bg-placeholder rounded-lg" />
                  </div>
                </div>
              </div>
            ))
          ) : products.length === 0 ? (
            <EmptyProductState />
          ) : (
            products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
