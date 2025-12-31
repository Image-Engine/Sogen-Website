import { Play } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const videos = [
  { id: "nY0BSsF-aSY" },
  { id: "SU86EJXcTMM" },
  { id: "POf424nczxg" },
  { id: "zJmIS5tmzPU" },
  { id: "QrPED4uPsFw" },
  { id: "kisLSdFVF6I" },
  { id: "bsooDvbwD5g" },
  { id: "dpV3rLJAQO4" },
  { id: "RjpkI8quyzQ" },
  { id: "PkvdIrAQjsI" },
];

const VideoReviews = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Battery Video Reviews
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch real-world reviews and tests of SOK batteries from trusted YouTube creators. 
              See how our batteries perform in RVs, off-grid setups, and more.
            </p>
          </div>
        </section>

        {/* Video Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-xl bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to hqdefault if maxresdefault doesn't exist
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                      }}
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/40">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground fill-current ml-1" />
                      </div>
                    </div>

                    {/* YouTube Badge */}
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      YouTube
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Power Your Adventure?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of satisfied customers who trust SOK batteries for their power needs.
            </p>
            <a
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Shop Batteries
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VideoReviews;
