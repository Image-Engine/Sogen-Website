import { useState } from "react";

const categories = [
  {
    title: "Solar Systems",
    description: "Grid-tied & off-grid solutions",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  },
  {
    title: "Home Backup",
    description: "Reliable power storage",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    title: "RV & Campers",
    description: "Mobile power freedom",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
  },
  {
    title: "Marine",
    description: "Boats & watercraft",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  },
  {
    title: "Industrial",
    description: "Heavy-duty applications",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    title: "Accessories",
    description: "Chargers, cables & more",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
  },
];

export function Categories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-caption uppercase tracking-widest text-muted-foreground mb-3">
            Browse Categories
          </p>
          <h2 className="text-display-md text-foreground mb-4">
            Shop by Application
          </h2>
          <p className="text-body-md text-muted-foreground max-w-2xl mx-auto">
            Find the perfect battery solution for your specific needs
          </p>
        </div>

        {/* Categories - Expand on Hover */}
        <div className="flex gap-3 lg:gap-4 h-[400px] lg:h-[500px]">
          {categories.map((category, index) => (
            <a
              key={category.title}
              href="#"
              className={`relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer transition-all duration-500 ease-out ${
                hoveredIndex === index 
                  ? "flex-[3]" 
                  : "flex-1"
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
              <div className={`absolute bottom-0 left-0 right-0 p-4 lg:p-6 transition-all duration-500 ${
                hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-70"
              }`}>
                <h3 className={`font-semibold text-white transition-all duration-500 ${
                  hoveredIndex === index 
                    ? "text-xl lg:text-2xl mb-2" 
                    : "text-sm lg:text-base writing-mode-vertical lg:writing-mode-horizontal"
                }`}>
                  {category.title}
                </h3>
                <p className={`text-white/80 text-sm transition-all duration-500 ${
                  hoveredIndex === index 
                    ? "opacity-100 max-h-20" 
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}>
                  {category.description}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-primary/10 transition-opacity duration-500 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
