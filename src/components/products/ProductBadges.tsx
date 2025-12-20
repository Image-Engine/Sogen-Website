import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Zap, TrendingUp } from "lucide-react";

interface ProductBadgesProps {
  availableForSale: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export function ProductBadges({ availableForSale, isNew, isBestSeller }: ProductBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Stock Status */}
      {availableForSale ? (
        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
          In Stock
        </Badge>
      ) : (
        <Badge variant="destructive" className="bg-red-500/10 text-red-600 border-red-500/20">
          <XCircle className="w-3.5 h-3.5 mr-1" />
          Out of Stock
        </Badge>
      )}

      {/* Best Seller Badge */}
      {isBestSeller && (
        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          Best Seller
        </Badge>
      )}

      {/* New Badge */}
      {isNew && (
        <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20">
          <Zap className="w-3.5 h-3.5 mr-1" />
          New
        </Badge>
      )}
    </div>
  );
}
