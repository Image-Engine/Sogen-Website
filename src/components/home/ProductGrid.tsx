import { useEffect, useState } from "react";
import { Package, ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import { fetchCollectionByHandle, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";

function EmptyProductState() {
  return (
    <div className="col-span-full py-16 text-center">
      <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No products yet</h3>
      <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
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
      const collection = await fetchCollectionByHandle("12v-lithium-batteries", 12);
      const productsWithImages = (collection?.products || [])
        .filter((product) => product.node.images?.edges?.length > 0)
        .slice(0, 4);
      setProducts(productsWithImages);
      setLoading(false);
    }
    loadProducts();
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="mb-8 sm:mb-12 flex items-end justify-between">
          <div>
            <p className="text-caption uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3 border-l-2 border-primary pl-3">
              Featured Products
            </p>
            <h2 className="text-display-sm sm:text-display-md text-foreground">
              Best Selling Batteries
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All Batteries
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading ? (
            <ProductGridSkeleton count={4} />
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
