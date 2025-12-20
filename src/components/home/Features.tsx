import { useState, useEffect } from "react";
import { Clock, ShieldCheck, Thermometer, BatteryLow, Wrench, Zap, Timer, RefreshCw, Feather, Wind, Gauge, Award, Battery, Bluetooth, Shield, Settings, Gem, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import featuresBg from "@/assets/features-bg.webp";

// Unified hero carousel data - each hero stat links to its advantages
const heroCarouselData = [
  {
    icon: RefreshCw,
    title: "8000+",
    subtitle: "Charge Cycles",
    desc: "Industry-leading longevity",
    badge: "Industry Leading",
    advantages: {
      label: "Safety & Reliability",
      items: [
        { icon: ShieldCheck, title: "Increased Safety" },
        { icon: Thermometer, title: "Thermal Stability" },
        { icon: BatteryLow, title: "Low Self-Discharge" }
      ]
    }
  },
  {
    icon: Clock,
    title: "20 Year",
    subtitle: "Lifespan",
    desc: "Decades of reliable power",
    badge: "Long Lasting",
    advantages: {
      label: "Performance",
      items: [
        { icon: Timer, title: "Fast Charging" },
        { icon: Gauge, title: "High Power Density" },
        { icon: Gem, title: "Premium Build" }
      ]
    }
  },
  {
    icon: Zap,
    title: "99%",
    subtitle: "Efficiency",
    desc: "Maximum power delivery",
    badge: "Maximum Power",
    advantages: {
      label: "Convenience",
      items: [
        { icon: Wrench, title: "Low Maintenance" },
        { icon: Feather, title: "Lightweight" },
        { icon: Wind, title: "No Off-Gassing" }
      ]
    }
  }
];

const features = [
  {
    icon: Award,
    title: "Warranty & Support",
    desc: "Manufacturer backed warranty with dedicated technical assistance for peace of mind"
  },
  {
    icon: Battery,
    title: "Grade A Cells",
    desc: "Genuine new prismatic cells ensure superior performance and reliability"
  },
  {
    icon: Clock,
    title: "20 Year Lifespan",
    desc: "Up to 4000-8000 cycles of consistent, reliable power output"
  },
  {
    icon: Bluetooth,
    title: "Smart BMS",
    desc: "High quality Bluetooth battery management system for real-time monitoring"
  },
  {
    icon: Shield,
    title: "Premium Build",
    desc: "Superior build quality with carefully selected components"
  },
  {
    icon: Settings,
    title: "User Serviceable",
    desc: "Robust and durable enclosures designed for easy maintenance"
  }
];

export function Features() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const currentAdvantages = heroCarouselData[currentIndex].advantages;

  return (
    <section
      className="relative py-16 sm:py-20 lg:py-32 overflow-hidden"
      style={{
        backgroundImage: `url(${featuresBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 sm:bg-black/40" />

      <div className="container max-w-6xl relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-4 sm:mb-6">
            The SOK LiFePO4 Battery Advantage
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light px-4">
            Unlock the full potential of your off-grid, RV, motorhome or home
            power needs with our high-performance LiFePO4 batteries.
          </p>
        </div>

        {/* Advantages Section - Carousel Layout */}
        <div className="mb-10 sm:mb-14 lg:mb-20">
          <h3 className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 mb-6 sm:mb-8 text-sm sm:text-base text-center font-semibold">
            Advantages
          </h3>
          
          {/* Hero Stats Carousel */}
          <div className="max-w-md mx-auto mb-6">
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {heroCarouselData.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <CarouselItem key={index}>
                      <div className="group relative rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-2 border-amber-400/50 hover:border-amber-400/70 shadow-[0_0_40px_rgba(251,191,36,0.15)] hover:shadow-[0_0_60px_rgba(251,191,36,0.25)] transition-all duration-300 text-center">
                        {/* Badge */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 rounded-full text-xs font-bold text-black uppercase tracking-wider shadow-lg">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {stat.badge}
                        </div>
                        
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/30 backdrop-blur-sm flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                          <StatIcon className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" strokeWidth={1.5} />
                        </div>
                        <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2">
                          {stat.title}
                        </div>
                        <div className="text-lg sm:text-xl text-amber-200 font-semibold mb-2">
                          {stat.subtitle}
                        </div>
                        <div className="text-sm text-white/70">
                          {stat.desc}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="flex items-center justify-center gap-4 mt-5">
                <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/30 text-white" />
                <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/30 text-white" />
              </div>
            </Carousel>
            
            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {heroCarouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-amber-400 w-6' 
                      : 'bg-white/40 w-2 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Subtle Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-8 sm:mb-10" />

          {/* Dynamic Sub-Cards - Changes based on carousel */}
          <div key={currentIndex} className="animate-fade-in">
            {/* Category Header */}
            <h4 className="text-xs uppercase tracking-[0.15em] text-white/50 font-medium text-center mb-4">
              {currentAdvantages.label}
            </h4>
            
            {/* Sub-Cards Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto">
              {currentAdvantages.items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 transition-all duration-300 text-center"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <ItemIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" strokeWidth={1.5} />
                    </div>
                    <span className="text-white text-xs sm:text-sm font-medium leading-tight">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Features Section - Carousel */}
        <div>
          <h3 className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 mb-6 sm:mb-8 text-sm sm:text-base text-center font-semibold">
            Features
          </h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {features.map((item, index) => (
                <CarouselItem key={index} className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="group h-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/15 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-white text-lg sm:text-xl font-semibold mb-3">
                      {item.title}
                    </h4>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
              <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/30 text-white" />
              <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/30 text-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}