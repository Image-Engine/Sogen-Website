import { X } from "lucide-react";
import { useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";

interface VideoLightboxProps {
  videoId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoLightbox = ({ videoId, isOpen, onClose }: VideoLightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!videoId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-black/90" />
      <DialogContent className="max-w-5xl w-[95vw] p-0 bg-transparent border-none shadow-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-50 p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Video Container */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Watch on YouTube Link */}
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-white/70 hover:text-white text-sm mt-4 transition-colors"
        >
          Watch on YouTube →
        </a>
      </DialogContent>
    </Dialog>
  );
};
