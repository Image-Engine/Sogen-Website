export function TrustBadges() {
  return (
    <section className="py-10 lg:py-14 border-y border-border bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Stats */}
          <div className="flex flex-wrap justify-center md:justify-start gap-8 lg:gap-12">
            <div className="text-center md:text-left">
              <p className="text-display-sm text-foreground">10,000+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-display-sm text-foreground">50,000+</p>
              <p className="text-sm text-muted-foreground">Batteries Sold</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-display-sm text-foreground">4.9★</p>
              <p className="text-sm text-muted-foreground">Customer Rating</p>
            </div>
          </div>

          {/* Payment & Trust Logos (Placeholders) */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-8 rounded bg-placeholder flex items-center justify-center">
                  <div className="w-6 h-4 bg-placeholder-hover rounded-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
