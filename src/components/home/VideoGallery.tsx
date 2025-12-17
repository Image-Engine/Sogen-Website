import { useState } from "react";
import { Play, Clock, Eye } from "lucide-react";

interface Video {
  id: string;
  title: string;
  category: "reviews" | "guides" | "howto";
  thumbnail: string;
  duration: string;
  views: string;
  youtubeId: string;
}

const videos: Video[] = [
  {
    id: "1",
    title: "SOK 206Ah Battery Full Review",
    category: "reviews",
    thumbnail: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80",
    duration: "12:45",
    views: "24K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "How to Choose the Right Battery",
    category: "guides",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    duration: "8:30",
    views: "18K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Installing Your SOK Battery System",
    category: "howto",
    thumbnail: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
    duration: "15:20",
    views: "32K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Marine Battery Setup Guide",
    category: "guides",
    thumbnail: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    duration: "10:15",
    views: "12K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "SOK vs Competition - Honest Review",
    category: "reviews",
    thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    duration: "18:40",
    views: "45K",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Solar Integration Tutorial",
    category: "howto",
    thumbnail: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    duration: "22:10",
    views: "28K",
    youtubeId: "dQw4w9WgXcQ",
  },
];

const categories = [
  { id: "all", label: "All Videos" },
  { id: "reviews", label: "Product Reviews" },
  { id: "guides", label: "Buyer Guides" },
  { id: "howto", label: "How-To" },
];

export const VideoGallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [featuredVideo, setFeaturedVideo] = useState(videos[0]);

  const filteredVideos =
    activeCategory === "all"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  const gridVideos = filteredVideos.filter((v) => v.id !== featuredVideo.id).slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            Learn & Explore
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Video Resources
          </h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Video */}
        <div className="mb-8">
          <div
            className="relative aspect-video rounded-2xl overflow-hidden bg-muted cursor-pointer group"
            onClick={() => window.open(`https://youtube.com/watch?v=${featuredVideo.youtubeId}`, "_blank")}
          >
            <img
              src={featuredVideo.thumbnail}
              alt={featuredVideo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                {featuredVideo.title}
              </h3>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {featuredVideo.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {featuredVideo.views} views
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gridVideos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer"
              onClick={() => setFeaturedVideo(video)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-3">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white font-medium">
                  {video.duration}
                </div>
              </div>

              <h4 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors line-clamp-2">
                {video.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {video.views} views
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
