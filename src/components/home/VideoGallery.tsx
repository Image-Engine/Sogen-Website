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
  return;
};