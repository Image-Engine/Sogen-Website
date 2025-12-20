import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share2, Link2, Facebook, Twitter, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  productTitle: string;
  productUrl: string;
}

export function ShareButtons({ productTitle, productUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(productTitle)}&url=${encodeURIComponent(productUrl)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <Share2 className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-sm"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Link2 className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <button
            onClick={shareToFacebook}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-sm"
          >
            <Facebook className="w-4 h-4 text-blue-600" />
            Facebook
          </button>
          <button
            onClick={shareToTwitter}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-sm"
          >
            <Twitter className="w-4 h-4 text-sky-500" />
            Twitter
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
