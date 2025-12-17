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
    <section className="py-16 lg:py-24 bg-surface-sunken">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-display-md mb-4">Video Resources</h2>
          <p className="text-muted-foreground text-body-lg max-w-2xl mx-auto">
            Learn more about SOK batteries through our video guides and reviews
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Featured Video */}
        <div 
          className="relative aspect-video rounded-2xl overflow-hidden mb-8 cursor-pointer group"
          onClick={() => openVideo(featuredVideo.youtubeId)}
        >
          <img
            src={featuredVideo.thumbnail}
            alt={featuredVideo.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-foreground ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-xl font-semibold mb-2">{featuredVideo.title}</h3>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {featuredVideo.duration}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {featuredVideo.views} views
              </span>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {gridVideos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer"
              onClick={() => {
                setFeaturedVideo(video);
                openVideo(video.youtubeId);
              }}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center">
                    <Play className="h-5 w-5 text-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                  {video.duration}
                </div>
              </div>
              <h4 className="font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                {video.title}
              </h4>
              <p className="text-sm text-muted-foreground">{video.views} views</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};