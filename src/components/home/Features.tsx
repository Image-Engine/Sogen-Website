import { Clock, ShieldCheck, Thermometer, BatteryLow, Wrench, Zap, Timer, RefreshCw, Feather, Wind, Gauge, Award, Battery, Bluetooth, Shield, Settings, Gem } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import featuresBg from "@/assets/features-bg.webp";

// Hero advantages - displayed larger with descriptions
const heroAdvantages = [
  {
    icon: RefreshCw,
    title: "8000+",
    subtitle: "Charge Cycles",
    desc: "Industry-leading longevity"
  },
  {
    icon: Clock,
    title: "20 Year",
    subtitle: "Lifespan",
    desc: "Decades of reliable power"
  },
  {
    icon: Zap,
    title: "99%",
    subtitle: "Efficiency",
    desc: "Maximum power delivery"
  }
];

// Secondary advantages - displayed as compact cards
const secondaryAdvantages = [
  { icon: ShieldCheck, title: "Increased Safety" },
  { icon: Thermometer, title: "Thermal Stability" },
  { icon: BatteryLow, title: "Low Self-Discharge" },
  { icon: Wrench, title: "Low Maintenance" },
  { icon: Timer, title: "Fast Charging" },
  { icon: Gauge, title: "High Power Density" },
  { icon: Feather, title: "Lightweight" },
  { icon: Wind, title: "No Off-Gassing" },
  { icon: Gem, title: "Premium Build" }
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

        {/* Advantages Section - Bento Grid Layout */}
        <div className="mb-10 sm:mb-14 lg:mb-20">
          <h3 className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 mb-6 sm:mb-8 text-sm sm:text-base text-center font-semibold">
            Advantages
          </h3>
          
          {/* Hero Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {heroAdvantages.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/15 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">
                  {item.title}
                </div>
                <div className="text-sm sm:text-base text-white/90 font-medium mb-2">
                  {item.subtitle}
                </div>
                <div className="text-xs sm:text-sm text-white/60">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Advantages - Compact Pills Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-3">
            {secondaryAdvantages.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-white text-[9px] sm:text-[10px] lg:text-xs font-medium leading-tight">
                  {item.title}
                </span>
              </div>
            ))}
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
