import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Package, ChevronLeft, ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, ProductDetails, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export default function Product() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductDetails['variants'][0] | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      
      setLoading(true);
      setNotFound(false);
      
      const data = await fetchProductByHandle(handle);
      
      if (!data) {
        setNotFound(true);
      } else {
        setProduct(data);
        if (data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      }
      
      setLoading(false);
    }
    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    
    // Create a ShopifyProduct-compatible structure for cart
    const shopifyProduct: ShopifyProduct = {
      node: {
        id: product.id,
        title: product.title,
        description: product.description,
        handle: product.handle,
        priceRange: product.priceRange,
        images: {
          edges: product.images.map(img => ({ node: { url: img.url, altText: img.altText } })),
        },
        variants: {
          edges: product.variants.map(v => ({ node: v })),
        },
        options: product.options,
      },
    };
    
    addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });
    
    toast.success("Added to cart", {
      description: `${product.title} x ${quantity}`,
    });
  };

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container py-16 sm:py-24 text-center">
            <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Product not found</h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              The product you're looking for doesn't exist.
            </p>
            <Link to="/products">
              <Button variant="outline">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to All Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-6 sm:py-8 lg:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/products" className="hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground truncate max-w-[200px] sm:max-w-none">
                {loading ? "Loading..." : product?.title}
              </li>
            </ol>
          </nav>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image skeleton */}
              <div className="space-y-4">
                <div className="aspect-square bg-placeholder rounded-2xl animate-pulse" />
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 bg-placeholder rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
              {/* Info skeleton */}
              <div className="space-y-6 animate-pulse">
                <div className="h-8 bg-placeholder rounded w-3/4" />
                <div className="h-6 bg-placeholder rounded w-1/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-placeholder rounded w-full" />
                  <div className="h-4 bg-placeholder rounded w-full" />
                  <div className="h-4 bg-placeholder rounded w-2/3" />
                </div>
                <div className="h-12 bg-placeholder rounded" />
              </div>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-secondary/10 rounded-xl sm:rounded-2xl overflow-hidden">
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[selectedImage].url}
                      alt={product.images[selectedImage].altText || product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 sm:w-24 sm:h-24 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-primary"
                            : "border-transparent hover:border-border"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.altText || `${product.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
                    {product.title}
                  </h1>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-foreground">
                      ${parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)}
                    </span>
                    <span className="text-sm sm:text-base text-muted-foreground">
                      {selectedVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode}
                    </span>
                  </div>
                </div>

                {/* Variant Options */}
                {product.options.length > 0 && product.options[0].name !== "Title" && (
                  <div className="space-y-4">
                    {product.options.map((option) => (
                      <div key={option.name}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {option.name}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {option.values.map((value) => {
                            const isSelected = selectedVariant?.selectedOptions.some(
                              (opt) => opt.name === option.name && opt.value === value
                            );
                            return (
                              <button
                                key={value}
                                onClick={() => {
                                  const variant = product.variants.find((v) =>
                                    v.selectedOptions.some(
                                      (opt) => opt.name === option.name && opt.value === value
                                    )
                                  );
                                  if (variant) setSelectedVariant(variant);
                                }}
                                className={`px-3 py-2 sm:px-4 text-sm rounded-lg border transition-all ${
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border hover:border-foreground"
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                  className="w-full h-12 sm:h-14 text-base"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
                </Button>

                {/* Availability */}
                {selectedVariant?.availableForSale && (
                  <div className="flex items-center gap-2 text-sm text-success">
                    <Check className="h-4 w-4" />
                    In Stock
                  </div>
                )}

                {/* Description */}
                {product.descriptionHtml ? (
                  <div className="pt-6 border-t border-border">
                    <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
                    <div 
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    />
                  </div>
                ) : product.description && (
                  <div className="pt-6 border-t border-border">
                    <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
