import { useEffect, useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      const collection = await fetchCollectionByHandle("12v-lithium-batteries-lvl1", 8);
      setProducts(collection?.products || []);
      setLoading(false);
    }
    loadProducts();
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-surface-sunken">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <p className="text-caption uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3">
              Featured Products
            </p>
            <h2 className="text-display-sm sm:text-display-md text-foreground">
              Best Selling Batteries
            </h2>
          </div>
          <Link to="/collections/12v-lithium-batteries-lvl1" className="self-start sm:self-auto">
            <Button variant="outline" className="text-sm sm:text-base">
              View All 12V Batteries
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {loading ? (
            <ProductGridSkeleton count={8} />
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
