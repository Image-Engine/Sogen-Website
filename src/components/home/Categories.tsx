import { Sun, Home, Truck, Anchor, Factory, Wrench } from "lucide-react";

const categories = [
  {
    icon: Sun,
    title: "Solar Systems",
    description: "Grid-tied & off-grid solutions",
    productCount: 24,
  },
  {
    icon: Home,
    title: "Home Backup",
    description: "Reliable power storage",
    productCount: 18,
  },
  {
    icon: Truck,
    title: "RV & Campers",
    description: "Mobile power freedom",
    productCount: 15,
  },
  {
    icon: Anchor,
    title: "Marine",
    description: "Boats & watercraft",
    productCount: 12,
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Heavy-duty applications",
    productCount: 8,
  },
  {
    icon: Wrench,
    title: "Accessories",
    description: "Chargers, cables & more",
    productCount: 32,
  },
];

export function Categories() {
  return (
    <section className="py-16 lg:py-24 bg-background">
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

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 stagger-children">
          {categories.map((category) => (
            <a
              key={category.title}
              href="#"
              className="group relative flex flex-col items-center p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-product-hover transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <category.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-foreground text-center mb-1">
                {category.title}
              </h3>
              <p className="text-xs text-muted-foreground text-center">
                {category.description}
              </p>
              <span className="mt-3 text-caption text-muted-foreground">
                {category.productCount} Products
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
