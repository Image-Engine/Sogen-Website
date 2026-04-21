import { useRef } from "react";

/**
 * Returns a ref to attach to a scroll target element and a function to
 * smoothly scroll to it (accounting for the sticky header height).
 */
export function useScrollToRef<T extends HTMLElement = HTMLDivElement>(headerOffset = 96) {
  const ref = useRef<T | null>(null);

  const scrollToRef = () => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return { ref, scrollToRef };
}
