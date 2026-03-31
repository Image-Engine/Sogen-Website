import { useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoLightbox } from "@/components/VideoLightbox";

interface VideoStripProps {
  title: string;
  subtitle: string;
  videos: { id: string }[];
  viewAllLink?: string;
  viewAllLabel?: string;
}

export function VideoStrip({ title, subtitle, videos, viewAllLink = "/video-reviews", viewAllLabel = "View All Videos" }: VideoStripProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-foreground via-foreground/95 to-foreground overflow-hidden">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-2">
              {title}
            </h2>
            <p className="text-white/60 text-base max-w-xl">
              {subtitle}
            </p>
          </div>
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors shrink-0"
          >
            {viewAllLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal scroll strip */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideoId(video.id)}
              className="group relative shrink-0 w-[300px] md:w-[340px] rounded-xl overflow-hidden snap-start"
            >
              <div className="relative aspect-video">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt="Video review thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
                    <Play className="w-7 h-7 text-primary-foreground fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <VideoLightbox
        videoId={selectedVideoId}
        isOpen={!!selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
    </section>
  );
}
