import { useState } from "react";
import { Link } from "react-router-dom";
const categories = [{
  title: "Solar Systems",
  description: "Grid-tied & off-grid solutions",
  image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  link: "/solar-systems"
}, {
  title: "Home Backup",
  description: "Reliable power storage",
  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  link: "/home-backup"
}, {
  title: "RV & Campers",
  description: "Mobile power freedom",
  image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
  link: "/rv-campers"
}, {
  title: "Industrial",
  description: "Heavy-duty applications",
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  link: "/industrial"
}, {
  title: "Accessories",
  description: "Chargers, cables & more",
  image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
  link: "/accessories"
}];
export function Categories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);
  
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-3 sm:mb-4">
            Shop by Application
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Find the perfect battery solution for your specific needs
          </p>
        </div>

        {/* Mobile: Grid layout, Desktop: Expand on Hover */}
        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {categories.map((category) => (
            <Link
              key={category.title}
              to={category.link}
              className="relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer group"
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-semibold text-white text-sm mb-0.5">
                  {category.title}
                </h3>
                <p className="text-white/70 text-xs line-clamp-1">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Tablet/Desktop: Expand on Hover */}
        <div className="hidden sm:flex gap-3 lg:gap-4 h-[350px] md:h-[400px] lg:h-[500px]">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.link}
              className={`relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer transition-all duration-500 ease-out ${
                hoveredIndex === index ? "flex-[3]" : "flex-1"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 lg:p-6 transition-all duration-500 ${
                  hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-70"
                }`}
              >
                <h3
                  className={`font-semibold text-white transition-all duration-500 ${
                    hoveredIndex === index
                      ? "text-lg md:text-xl lg:text-2xl mb-2"
                      : "text-xs md:text-sm lg:text-base [writing-mode:vertical-lr] lg:[writing-mode:horizontal-tb]"
                  }`}
                >
                  {category.title}
                </h3>
                <p
                  className={`text-white/80 text-sm transition-all duration-500 ${
                    hoveredIndex === index ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  {category.description}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 bg-primary/10 transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}