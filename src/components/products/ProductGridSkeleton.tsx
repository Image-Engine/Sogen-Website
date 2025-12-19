export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl bg-card border border-border overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-placeholder" />
          <div className="p-4 sm:p-5 space-y-3">
            <div className="h-5 bg-placeholder rounded w-3/4" />
            <div className="h-4 bg-placeholder rounded w-full" />
            <div className="h-4 bg-placeholder rounded w-1/2" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-placeholder rounded w-20" />
              <div className="h-8 w-8 sm:h-9 sm:w-9 bg-placeholder rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
