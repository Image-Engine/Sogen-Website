import { Check } from "lucide-react";
import featuresBg from "@/assets/features-bg.webp";
export function Features() {
  const advantages = ["Longer lifespan", "Increased safety", "High thermal stability", "Low self-discharge rate", "Lower maintenance cost", "High efficiency"];
  const features = ["Faster charging times", "Higher power density", "Longer cycle life", "Lighter weight", "No off-gassing", "Grade A prismatic cells"];
  return <section className="relative py-24 lg:py-32 overflow-hidden" style={{
    backgroundImage: `url(${featuresBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }}>
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/25" />
      
      <div className="container max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
            The SOK Battery Difference
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Unlock the full potential of your off-grid, RV, motorhome or home power needs with our high-performance LiFePO4 batteries.
          </p>
        </div>

        {/* Liquid Glass Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Advantages Card */}
          <div className="rounded-3xl p-8 lg:p-10 backdrop-blur-2xl bg-white/20 border border-white/40 shadow-2xl">
            <h3 className="uppercase tracking-[0.2em] text-white/60 mb-8 text-2xl text-center font-bold">
              Advantages
            </h3>
            <ul className="space-y-4">
              {advantages.map(item => <li key={item} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-full backdrop-blur-sm flex items-center justify-center shrink-0 transition-colors text-white bg-green-500">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-white text-base font-light">{item}</span>
                </li>)}
            </ul>
          </div>

          {/* Features Card */}
          <div className="rounded-3xl p-8 lg:p-10 backdrop-blur-2xl bg-white/20 border border-white/40 shadow-2xl">
            <h3 className="uppercase tracking-[0.2em] text-white/60 mb-8 text-2xl text-center font-bold">
              Features
            </h3>
            <ul className="space-y-4">
              {features.map(item => <li key={item} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-full backdrop-blur-sm flex items-center justify-center shrink-0 transition-colors bg-blue-500">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-white text-base font-light">{item}</span>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="inline-block rounded-2xl px-8 py-4 backdrop-blur-2xl bg-white/25 border border-white/40">
            <p className="text-white/90 text-sm max-w-lg mx-auto leading-relaxed">
              With longer lifespan, faster charging times, and superior efficiency, SOK LiFePO4 batteries are the ultimate power storage solution.
            </p>
          </div>
        </div>
      </div>
    </section>;
}