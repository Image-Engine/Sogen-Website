export const blogFallbackImages: Record<string, string> = {
  "victron-smart-shunt-settings-for-sok": "/blog/victron-smart-shunt.webp",
  "understanding-mppt-solar-charge-controller-sizing-1": "/blog/mppt-solar-controller.webp",
  "managing-victron-over-voltage-alarms-with-dvcc": "/blog/victron-dvcc.webp",
  "how-to-wake-up-a-sleeping-lifepo4-battery": "/blog/wake-up-battery.webp",
};

export const defaultBlogImage = "/blog/default-battery-tech.webp";

export function getBlogFallbackImage(handle: string): string {
  return blogFallbackImages[handle] || defaultBlogImage;
}
