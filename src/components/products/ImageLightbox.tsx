import { useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: Array<{ url: string; altText: string | null }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrevious, handleNext, onClose]);

  if (!images.length) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
        <div className="relative w-full h-[90vh] flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-4 z-50 text-white hover:bg-white/20 h-12 w-12"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-4 z-50 text-white hover:bg-white/20 h-12 w-12"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          {/* Main image */}
          <img
            src={images[currentIndex]?.url}
            alt={images[currentIndex]?.altText || "Product image"}
            className="max-w-full max-h-full object-contain"
          />

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    currentIndex === index
                      ? "border-white opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
