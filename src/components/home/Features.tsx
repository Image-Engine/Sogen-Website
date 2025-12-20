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
  const [currentIndex, setCurrentIndex] = useState(0);

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

        {/* Advantages Section */}
        <div className="mb-10 sm:mb-14 lg:mb-20">
          <h3 className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 mb-6 sm:mb-8 text-sm sm:text-base text-center font-semibold">
            Advantages
          </h3>
          
          {/* Hero Stats - All 3 Visible */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto mb-6">
            {heroCarouselData.map((stat, index) => {
              const StatIcon = stat.icon;
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl text-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-2 border-amber-400/50 shadow-[0_0_40px_rgba(251,191,36,0.15)] scale-100'
                      : 'bg-white/5 border border-white/10 opacity-60 hover:opacity-80 hover:bg-white/10 scale-95'
                  }`}
                >
                  {/* Badge - Only on active */}
                  {isActive && (
                    <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1 sm:py-1.5 bg-amber-500 rounded-full text-[10px] sm:text-xs font-bold text-black uppercase tracking-wider shadow-lg">
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" />
                      <span className="hidden sm:inline">{stat.badge}</span>
                    </div>
                  )}
                  
                  <div className={`rounded-xl sm:rounded-2xl backdrop-blur-sm flex items-center justify-center mx-auto mb-2 sm:mb-4 transition-all duration-300 ${
                    isActive 
                      ? 'w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-amber-500/30 group-hover:scale-110' 
                      : 'w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/15'
                  }`}>
                    <StatIcon className={`transition-all duration-300 ${
                      isActive 
                        ? 'w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-amber-300' 
                        : 'w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white/70'
                    }`} strokeWidth={1.5} />
                  </div>
                  <div className={`font-bold text-white mb-1 transition-all duration-300 ${
                    isActive 
                      ? 'text-2xl sm:text-4xl lg:text-5xl' 
                      : 'text-lg sm:text-2xl lg:text-3xl'
                  }`}>
                    {stat.title}
                  </div>
                  <div className={`font-semibold mb-1 transition-all duration-300 ${
                    isActive 
                      ? 'text-xs sm:text-base lg:text-lg text-amber-200' 
                      : 'text-[10px] sm:text-sm lg:text-base text-white/60'
                  }`}>
                    {stat.subtitle}
                  </div>
                  <div className={`text-white/70 transition-all duration-300 ${
                    isActive ? 'text-[10px] sm:text-sm hidden sm:block' : 'hidden'
                  }`}>
                    {stat.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mb-8 sm:mb-10">
            {heroCarouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-amber-400 w-6' 
                    : 'bg-white/40 w-2 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Subtle Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-8 sm:mb-10" />

          {/* Sub-Cards - All 9 visible in 3 columns with dynamic highlighting */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {heroCarouselData.map((group, groupIndex) => {
              const isActiveGroup = groupIndex === currentIndex;
              return (
                <div 
                  key={groupIndex}
                  className={`transition-all duration-300 ${
                    isActiveGroup ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                  }`}
                >
                  {/* Category Header */}
                  <h4 className={`text-xs uppercase tracking-[0.15em] font-medium text-center mb-4 transition-all duration-300 ${
                    isActiveGroup ? 'text-amber-400' : 'text-white/40'
                  }`}>
                    {group.advantages.label}
                  </h4>
                  
                  {/* Sub-Cards */}
                  <div className="space-y-3">
                    {group.advantages.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className={`group flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                            isActiveGroup 
                              ? 'bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30' 
                              : 'bg-white/5 border border-white/10'
                          }`}
                        >
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl backdrop-blur-sm flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActiveGroup 
                              ? 'bg-white/15 group-hover:scale-110' 
                              : 'bg-white/10'
                          }`}>
                            <ItemIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                              isActiveGroup ? 'text-white/90' : 'text-white/50'
                            }`} strokeWidth={1.5} />
                          </div>
                          <span className={`text-xs sm:text-sm font-medium leading-tight transition-all duration-300 ${
                            isActiveGroup ? 'text-white' : 'text-white/50'
                          }`}>
                            {item.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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