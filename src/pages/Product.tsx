import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Package, Minus, Plus, FolderOpen, Zap, Truck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, ProductDetails, createStorefrontCheckout } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { ProductBadges } from "@/components/products/ProductBadges";
import { TrustBadges } from "@/components/products/TrustBadges";
import { ProductAccordion } from "@/components/products/ProductAccordion";
import { ShareButtons } from "@/components/products/ShareButtons";
import { WishlistButton } from "@/components/products/WishlistButton";
import { RecentlyViewed } from "@/components/products/RecentlyViewed";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

export default function Product() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { recentlyViewed, addProduct } = useRecentlyViewed();

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      setLoading(true);
      const data = await fetchProductByHandle(handle);
      setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [handle]);

  // Add to recently viewed when product loads
  useEffect(() => {
    if (product) {
      addProduct({
        id: product.id,
        handle: product.handle,
        title: product.title,
        imageUrl: product.images[0]?.url,
        price: product.priceRange.minVariantPrice.amount,
        currencyCode: product.priceRange.minVariantPrice.currencyCode,
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product || !product.variants[selectedVariant]) return;
    
    const variant = product.variants[selectedVariant];
    
    addItem({
      product: {
        node: {
          id: product.id,
          title: product.title,
          description: product.description,
          handle: product.handle,
          vendor: product.vendor || '',
          productType: product.productType || '',
          priceRange: product.priceRange,
          images: { edges: product.images.map(img => ({ node: img })) },
          variants: { edges: product.variants.map(v => ({ node: v })) },
          options: product.options,
        }
      },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions,
    });
    
    toast.success("Added to cart", {
      description: `${product.title} x ${quantity}`,
    });
  };

  const handleBuyNow = async () => {
    if (!product || !product.variants[selectedVariant]) return;
    
    const variant = product.variants[selectedVariant];
    setBuyNowLoading(true);
    
    try {
      const checkoutUrl = await createStorefrontCheckout([
        {
          product: {
            node: {
              id: product.id,
              title: product.title,
              description: product.description,
              handle: product.handle,
              vendor: product.vendor || '',
              productType: product.productType || '',
              priceRange: product.priceRange,
              images: { edges: product.images.map(img => ({ node: img })) },
              variants: { edges: product.variants.map(v => ({ node: v })) },
              options: product.options,
            }
          },
          variantId: variant.id,
          variantTitle: variant.title,
          price: variant.price,
          quantity,
          selectedOptions: variant.selectedOptions,
        }
      ]);
      
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      }
    } catch (error) {
      toast.error("Failed to create checkout");
    } finally {
      setBuyNowLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 md:pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 md:pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Product not found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Link to="/products">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariant];
  const productUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          {/* Collections Navigation */}
          {product.collections.length > 0 && (
            <div className="mb-6 pb-6 border-b border-border animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <FolderOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Browse Collections</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.collections.map((collection) => (
                  <Link
                    key={collection.id}
                    to={`/collection/${collection.handle}`}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground text-sm font-medium text-foreground transition-colors border border-border hover:border-primary"
                  >
                    {collection.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Breadcrumb */}
          <nav className="mb-6 animate-fade-in">
            <Link 
              to="/products" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            {/* Product Images */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <ProductImageGallery 
                images={product.images} 
                productTitle={product.title} 
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {/* Badges */}
              <ProductBadges 
                availableForSale={currentVariant?.availableForSale ?? false}
                isBestSeller={true}
              />

              {/* Title & Price */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  {product.title}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-bold text-primary">
                    ${parseFloat(currentVariant.price.amount).toFixed(2)}
                  </span>
                  <span className="text-muted-foreground text-lg">
                    {currentVariant.price.currencyCode}
                  </span>
                </div>
              </div>

              {/* Delivery Time */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">Ships within 1-2 business days</p>
                </div>
              </div>

              {/* Variant Selection */}
              {product.options.length > 0 && product.options[0].name !== "Title" && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const variantIndex = product.variants.findIndex(v =>
                            v.selectedOptions.some(
                              opt => opt.name === option.name && opt.value === value
                            )
                          );
                          const isSelected = product.variants[selectedVariant]?.selectedOptions.some(
                            opt => opt.name === option.name && opt.value === value
                          );
                          return (
                            <button
                              key={value}
                              onClick={() => variantIndex >= 0 && setSelectedVariant(variantIndex)}
                              className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                                  : "border-border hover:border-primary/50 hover:bg-secondary/30"
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary/50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 min-w-[3rem] text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-secondary/50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!currentVariant?.availableForSale}
                    className="flex-1 h-14 text-base"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {currentVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <WishlistButton productId={product.id} productTitle={product.title} />
                  <ShareButtons productTitle={product.title} productUrl={productUrl} />
                </div>

                {/* Buy Now Button */}
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBuyNow}
                  disabled={!currentVariant?.availableForSale || buyNowLoading}
                  className="w-full h-14 text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {buyNowLoading ? "Creating Checkout..." : "Buy Now"}
                </Button>
              </div>

              {/* Trust Badges */}
              <TrustBadges />

              {/* Accordion Content */}
              <div className="pt-6 border-t border-border">
                <ProductAccordion 
                  description={product.descriptionHtml}
                  specifications={{
                    "Product Type": product.productType || "N/A",
                    "Vendor": product.vendor || "N/A",
                    "SKU": currentVariant?.sku || "N/A",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts productId={product.id} currentHandle={product.handle} />

        {/* Recently Viewed */}
        <RecentlyViewed products={recentlyViewed} currentHandle={product.handle} />
      </main>
      <Footer />
    </div>
  );
}
