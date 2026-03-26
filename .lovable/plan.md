

# Minimise "The SOK LiFePO4 Battery Advantage" Section

## Problem
The current section is visually heavy and doesn't match the Apple-style minimalist vibe of the rest of the site:
- Dark background image with overlay feels disconnected from the clean white aesthetic
- Amber/orange glow effects, badges, and gradients add visual noise
- Two sub-sections (Advantages carousel + Features carousel) crammed into one section
- Auto-playing carousel with scaling, glowing cards, dot indicators, and sub-cards is overly complex
- Too many interactive elements competing for attention

## Proposed Approach: Clean White Section

Replace the entire dark image-backed section with a clean, white-background layout that matches the site's premium minimalist identity.

### Structure

```text
┌──────────────────────────────────────────┐
│  The SOK LiFePO4 Battery Advantage       │
│  Short subtitle                          │
│                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │  8000+  │ │ 20 Year │ │   99%   │    │
│  │ Cycles  │ │Lifespan │ │Efficiency│    │
│  └─────────┘ └─────────┘ └─────────┘    │
│                                          │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐         │
│  │W │ │G │ │20│ │BT│ │P │ │U │         │
│  │ar│ │ra│ │Yr│ │MS│ │re│ │se│         │
│  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘         │
│  6 feature cards in 3x2 grid             │
└──────────────────────────────────────────┘
```

### Key Changes

1. **Remove dark background image** — switch to `bg-secondary/30` (light gray) or white, matching other sections
2. **Remove the carousel/auto-play logic** — display all 3 hero stats as a static row of clean cards with subtle borders
3. **Remove amber glow effects, badges, dot indicators, and sub-advantage cards entirely** — these add complexity without value
4. **Flatten the 9 sub-advantage items into the 6 feature cards** — merge the best items into one clean 3x2 (desktop) / 2x3 (mobile) grid, no carousel
5. **Simplify card styling** — light background, subtle border, icon + title + short description. No backdrop-blur, no gradients
6. **Typography** — use `text-foreground` and `text-muted-foreground` instead of white/opacity variants

### Technical Detail

**File: `src/components/home/Features.tsx`**
- Remove all state (`currentIndex`, `isPaused`), refs, useEffect hooks, and autoplay imports
- Remove `featuresBg` image import and Carousel/Autoplay imports
- Remove `heroCarouselData` array (merge useful sub-items into features)
- Keep `features` array (6 items) as the single data source
- Section: `<section className="py-16 lg:py-24 bg-secondary/30">`
- Hero stats: static 3-column grid with large numbers, no interactivity
- Features: static `grid grid-cols-2 lg:grid-cols-3 gap-6` with simple cards
- Cards: `rounded-2xl border bg-background p-6` with icon, title, description

This removes ~100 lines of carousel/animation logic and replaces it with ~50 lines of clean static markup.

