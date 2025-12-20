import { useState } from "react";
import { Package, ZoomIn } from "lucide-react";
import { ImageLightbox } from "./ImageLightbox";

interface ProductImage {
  url: string;
  altText: string | null;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productTitle: string;
}

export function ProductImageGallery({ images, productTitle }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const currentImage = images[selectedImage];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZooming) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => setIsZooming(false);

  return (
    <div className="space-y-4">
      {/* Main Image with Zoom */}
      <div
        className="relative aspect-square bg-secondary/10 rounded-2xl overflow-hidden border border-border cursor-zoom-in group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsLightboxOpen(true)}
      >
        {currentImage ? (
          <>
            <img
              src={currentImage.url}
              alt={currentImage.altText || productTitle}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isZooming ? "scale-150" : "scale-100"
              }`}
              style={
                isZooming
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : undefined
              }
            />
            {/* Zoom hint */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
              Click to expand
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-24 h-24 text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index
                  ? "border-primary ring-2 ring-primary/20 scale-105"
                  : "border-border hover:border-primary/50 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image.url}
                alt={image.altText || `${productTitle} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        currentIndex={selectedImage}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={setSelectedImage}
      />
    </div>
  );
}
