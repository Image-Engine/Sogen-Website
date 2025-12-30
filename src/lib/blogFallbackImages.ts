// Unique fallback images for each blog article handle
export const blogFallbackImages: Record<string, string> = {
  "victron-smart-shunt-settings-for-sok": "/blog/victron-smart-shunt.webp",
  "understanding-mppt-solar-charge-controller-sizing-1": "/blog/mppt-solar-controller.webp",
  "managing-victron-over-voltage-alarms-with-dvcc": "/blog/victron-dvcc.webp",
  "how-to-wake-up-a-sleeping-lifepo4-battery": "/blog/wake-up-battery.webp",
};

// Pool of unique fallback images for unmapped articles
const fallbackImagePool = [
  "/blog/lifepo4-bms-cells.webp",
  "/blog/offgrid-solar-system.webp",
  "/blog/rv-battery-setup.webp",
  "/blog/marine-battery.webp",
  "/blog/battery-testing.webp",
  "/blog/solar-panels-roof.webp",
  "/blog/default-battery-tech.webp",
];

// Simple hash function to consistently map a handle to an image index
function hashHandle(handle: string): number {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    const char = handle.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getBlogFallbackImage(handle: string): string {
  // First check if there's a specific mapping for this handle
  if (blogFallbackImages[handle]) {
    return blogFallbackImages[handle];
  }
  // Otherwise, use a consistent hash to pick from the pool
  const index = hashHandle(handle) % fallbackImagePool.length;
  return fallbackImagePool[index];
}
