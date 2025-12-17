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
const videos: Video[] = [{
  id: "1",
  title: "SOK Battery Review",
  category: "reviews",
  thumbnail: "https://img.youtube.com/vi/nY0BSsF-aSY/hqdefault.jpg",
  duration: "12:45",
  views: "24K",
  youtubeId: "nY0BSsF-aSY"
}, {
  id: "2",
  title: "SOK Battery Guide",
  category: "guides",
  thumbnail: "https://img.youtube.com/vi/zJmIS5tmzPU/hqdefault.jpg",
  duration: "8:30",
  views: "18K",
  youtubeId: "zJmIS5tmzPU"
}, {
  id: "3",
  title: "SOK Battery Installation",
  category: "howto",
  thumbnail: "https://img.youtube.com/vi/EwHTOsy5_70/hqdefault.jpg",
  duration: "15:20",
  views: "32K",
  youtubeId: "EwHTOsy5_70"
}, {
  id: "4",
  title: "SOK Battery Setup",
  category: "guides",
  thumbnail: "https://img.youtube.com/vi/POf424nczxg/hqdefault.jpg",
  duration: "10:15",
  views: "12K",
  youtubeId: "POf424nczxg"
}];
const categories = [{
  id: "all",
  label: "All Videos"
}, {
  id: "reviews",
  label: "Product Reviews"
}, {
  id: "guides",
  label: "Buyer Guides"
}, {
  id: "howto",
  label: "How-To"
}];
export const VideoGallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [featuredVideo, setFeaturedVideo] = useState(videos[0]);
  const filteredVideos = activeCategory === "all" ? videos : videos.filter(v => v.category === activeCategory);
  const gridVideos = filteredVideos.filter(v => v.id !== featuredVideo.id).slice(0, 3);

  const openVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-caption uppercase tracking-widest text-muted-foreground mb-3">
            Video Resources
          </p>
          <h2 className="text-display-md text-foreground mb-4">
            Learn From Experts
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Watch detailed reviews, installation guides, and how-to videos
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured Video */}
          <div 
            className="lg:col-span-2 lg:row-span-2 group cursor-pointer"
            onClick={() => openVideo(featuredVideo.youtubeId)}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square h-full">
              <img
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 text-primary-foreground ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
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

          {/* Grid Videos */}
          {gridVideos.map((video) => (
            <div 
              key={video.id} 
              className="group cursor-pointer"
              onClick={() => openVideo(video.youtubeId)}
            >
              <div className="relative rounded-xl overflow-hidden aspect-video mb-3">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                  {video.duration}
                </div>
              </div>
              <h4 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {video.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.views} views
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};