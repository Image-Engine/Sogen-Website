import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { ProductGrid } from "@/components/home/ProductGrid";
import { Features } from "@/components/home/Features";
import { EnergyHub } from "@/components/home/EnergyHub";
import { VideoStrip } from "@/components/home/VideoStrip";

const batteryReviewVideos = [
  { id: "nY0BSsF-aSY" },
  { id: "SU86EJXcTMM" },
  { id: "POf424nczxg" },
  { id: "zJmIS5tmzPU" },
  { id: "QrPED4uPsFw" },
  { id: "kisLSdFVF6I" },
];


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead />
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <ProductGrid />
        <Features />
        <VideoStrip
          title="Battery Video Reviews"
          subtitle="Watch real-world tests and reviews from trusted YouTube creators."
          videos={batteryReviewVideos}
        />
        <EnergyHub />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
