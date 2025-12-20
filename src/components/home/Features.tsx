import { Clock, ShieldCheck, Thermometer, BatteryLow, Wrench, Zap, Timer, RefreshCw, Feather, Wind, Gauge, Award, Battery, Bluetooth, Shield, Settings, Gem } from "lucide-react";
import featuresBg from "@/assets/features-bg.webp";
const advantages = [{
  icon: Clock,
  title: "Longer Lifespan",
  desc: "Outlasts traditional batteries by years"
}, {
  icon: ShieldCheck,
  title: "Increased Safety",
  desc: "Stable LiFePO4 chemistry"
}, {
  icon: Thermometer,
  title: "High Thermal Stability",
  desc: "Performs in extreme conditions"
}, {
  icon: BatteryLow,
  title: "Low Self-Discharge",
  desc: "Holds charge for months"
}, {
  icon: Wrench,
  title: "Lower Maintenance",
  desc: "Virtually maintenance-free"
}, {
  icon: Zap,
  title: "High Efficiency",
  desc: "99% round-trip efficiency"
}, {
  icon: Timer,
  title: "Faster Charging",
  desc: "Reduced charging times"
}, {
  icon: Gauge,
  title: "Higher Power Density",
  desc: "More power, less space"
}, {
  icon: RefreshCw,
  title: "Longer Cycle Life",
  desc: "4000-8000 charge cycles"
}, {
  icon: Feather,
  title: "Lighter Weight",
  desc: "Easy to transport & install"
}, {
  icon: Wind,
  title: "No Off-Gassing",
  desc: "Safe for indoor use"
}, {
  icon: Gem,
  title: "Superior Build",
  desc: "Premium quality construction"
}];
const features = [{
  icon: Award,
  title: "Warranty & Support",
  desc: "Manufacturer backed warranty & technical assistance"
}, {
  icon: Battery,
  title: "Grade A Cells",
  desc: "Genuine new prismatic cells for superior performance"
}, {
  icon: Clock,
  title: "20 Year Lifespan",
  desc: "Up to 4000-8000 cycles of reliable power"
}, {
  icon: Bluetooth,
  title: "Smart BMS",
  desc: "High quality Bluetooth battery management system"
}, {
  icon: Shield,
  title: "Premium Build",
  desc: "Superior build quality and components"
}, {
  icon: Settings,
  title: "User Serviceable",
  desc: "Robust and durable enclosures you can maintain"
}];
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
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-4 sm:mb-6">
            The SOK LiFePO4 Battery Advantage
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light px-4">
            Unlock the full potential of your off-grid, RV, motorhome or home
            power needs with our high-performance LiFePO4 batteries.
          </p>
        </div>

        {/* Frosted Glass Cards */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Advantages Card */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl">
            <h3 className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg text-center font-semibold">
              Advantages
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {advantages.map(item => (
                <div
                  key={item.title}
                  className="group flex flex-col items-center text-center p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-white text-[9px] sm:text-[10px] lg:text-xs font-medium leading-tight">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Features Card */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl">
            <h3 className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg text-center font-semibold">
              Features
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {features.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="group flex flex-col items-center text-center p-3 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-white text-[10px] sm:text-xs lg:text-sm font-medium leading-tight mb-0.5 sm:mb-1">
                    {item.title}
                  </span>
                  <span className="text-white/60 text-[9px] sm:text-[10px] lg:text-xs leading-tight hidden sm:block">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}