export function Features() {
  const advantages = [
    "Longer lifespan",
    "Increased safety",
    "High thermal stability",
    "Low self-discharge rate",
    "Lower maintenance cost",
    "High efficiency",
    "Faster charging times",
    "Higher power density",
    "Longer cycle life",
    "Lighter weight",
    "No off-gassing",
  ];

  const features = [
    "Manufacturer backed warranty & technical assistance",
    "Genuine new Grade A prismatic cells",
    "Up to 20 year lifespan (4000-8000 cycles)",
    "High quality Bluetooth battery management system (BMS)",
    "Superior build quality and components",
    "Robust and durable user serviceable enclosures",
  ];

  return (
    <section className="py-0">
      <div className="grid lg:grid-cols-3">
        {/* Column 1 - Dark Navy Introduction */}
        <div className="bg-[#1a2744] p-10 lg:p-14 flex flex-col justify-center min-h-[400px]">
          <p className="text-white/90 text-lg lg:text-xl font-light leading-relaxed mb-6">
            Unlock the full potential of your off-grid, RV, motorhome or home power needs with our high-performance LiFePO4 batteries.
          </p>
          <p className="text-white/70 text-base leading-relaxed">
            With longer lifespan, faster charging times, and superior efficiency, SOK LiFePO4 batteries are the ultimate power storage solution.
          </p>
        </div>

        {/* Column 2 - Rust Red Advantages */}
        <div className="bg-[#a63c32] p-10 lg:p-14 min-h-[400px]">
          <h3 className="text-white text-lg font-semibold mb-6 tracking-wide">
            The SOK LiFePO4 Battery Advantage
          </h3>
          <ul className="space-y-2.5">
            {advantages.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-white/80 mt-0.5">•</span>
                <span className="text-white/90 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Amber Features */}
        <div className="bg-[#d4883a] p-10 lg:p-14 min-h-[400px]">
          <h3 className="text-white text-lg font-semibold mb-6 tracking-wide">
            Features of SOK LiFePO4 Batteries
          </h3>
          <ul className="space-y-3">
            {features.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-white/80 mt-0.5">•</span>
                <span className="text-white/90 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
