import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { ProductGrid } from "@/components/home/ProductGrid";
import { Features } from "@/components/home/Features";
import { EnergyHub } from "@/components/home/EnergyHub";
import { TrustBadges } from "@/components/home/TrustBadges";


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <Categories />
        <ProductGrid />
        <Features />
        <EnergyHub />
        
      </main>
      <Footer />
    </div>
  );
};

export default Index;
