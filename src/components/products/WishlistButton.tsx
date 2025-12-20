import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

interface WishlistButtonProps {
  productId: string;
  productTitle: string;
}

export function WishlistButton({ productId, productTitle }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.includes(productId));
  }, [productId]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    
    if (isWishlisted) {
      const newWishlist = wishlist.filter((id: string) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      setIsWishlisted(false);
      toast.success("Removed from wishlist", {
        description: productTitle,
      });
    } else {
      wishlist.push(productId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
      toast.success("Added to wishlist", {
        description: productTitle,
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleWishlist}
      className={`h-10 w-10 transition-colors ${
        isWishlisted
          ? "bg-red-50 border-red-200 hover:bg-red-100 dark:bg-red-950 dark:border-red-800"
          : ""
      }`}
    >
      <Heart
        className={`w-4 h-4 transition-colors ${
          isWishlisted ? "fill-red-500 text-red-500" : ""
        }`}
      />
    </Button>
  );
}
