import { useState } from "react";
import { Link } from "react-router-dom";
import victronTile from "@/assets/victron-tile.jpg";

const categories = [
  {
    title: "Solar Systems",
    description: "Grid-tied & off-grid solutions",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    link: "/solar-systems",
  },
  {
    title: "Home Backup",
    description: "Reliable power storage",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    link: "/home-backup",
  },
  {
    title: "RV & Campers",
    description: "Mobile power freedom",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
    link: "/rv-campers",
  },
  {
    title: "Industrial",
    description: "Heavy-duty applications",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    link: "/industrial",
  },
  {
    title: "Victron",
    description: "Professional power electronics",
    image: victronTile,
    link: "/victron",
    objectPosition: "left",
  },
  {
    title: "Accessories",
    description: "Chargers, cables & more",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    link: "/accessories",
  },
];

// Transform presets for each card position in a stack (index 0, 1, 2)
const stackTransforms = [
  { rotate: -4, translateX: -10, translateY: 8, rotateY: -3 },
  { rotate: 0, translateX: 0, translateY: 0, rotateY: 0 },
  { rotate: 4, translateX: 10, translateY: -8, rotateY: 3 },
];

export function Categories() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const leftStack = categories.slice(0, 3);
  const rightStack = categories.slice(3, 6);

  const renderStack = (stack: typeof categories) => (
    <div
      className="relative w-full h-[420px] lg:h-[480px]"
      style={{ perspective: "1200px" }}
    >
      {stack.map((category, index) => {
        const isHovered = hoveredCard === category.title;
        const t = stackTransforms[index];
        const baseZ = index * 1; // z-index layering

        return (
          <Link
            key={category.title}
            to={category.link}
            className="absolute inset-x-0 mx-auto overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer shadow-xl"
            style={{
              width: "85%",
              height: "75%",
              top: "12%",
              transformStyle: "preserve-3d",
              transition: "all 500ms cubic-bezier(0.23, 1, 0.32, 1)",
              zIndex: isHovered ? 20 : baseZ,
              transform: isHovered
                ? `rotate(0deg) translateX(0px) translateY(-12px) rotateY(0deg) translateZ(40px) scale(1.03)`
                : `rotate(${t.rotate}deg) translateX(${t.translateX}px) translateY(${t.translateY}px) rotateY(${t.rotateY}deg)`,
              boxShadow: isHovered
                ? "0 25px 60px -12px rgba(0,0,0,0.4)"
                : "0 10px 30px -8px rgba(0,0,0,0.25)",
            }}
            onMouseEnter={() => setHoveredCard(category.title)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img
              src={category.image}
              alt={category.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={
                category.objectPosition
                  ? { objectPosition: category.objectPosition }
                  : undefined
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div
              className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 transition-all duration-500"
              style={{ opacity: isHovered ? 1 : 0.85 }}
            >
              <h3 className="font-semibold text-white text-lg lg:text-xl mb-1">
                {category.title}
              </h3>
              <p
                className="text-white/80 text-sm transition-all duration-500"
                style={{
                  opacity: isHovered ? 1 : 0.6,
                  transform: isHovered ? "translateY(0)" : "translateY(4px)",
                }}
              >
                {category.description}
              </p>
            </div>
            {/* Hover glow */}
            <div
              className="absolute inset-0 bg-primary/10 transition-opacity duration-500"
              style={{ opacity: isHovered ? 1 : 0 }}
            />
          </Link>
        );
      })}
    </div>
  );

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

        {/* Mobile: Grid with subtle tilt */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.link}
              className="relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer group"
              style={{
                transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                transition: "transform 300ms ease",
              }}
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={
                  category.objectPosition
                    ? { objectPosition: category.objectPosition }
                    : undefined
                }
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

        {/* Desktop: Two stacked groups */}
        <div className="hidden sm:grid grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {renderStack(leftStack)}
          {renderStack(rightStack)}
        </div>
      </div>
    </section>
  );
}
