

# Home Backup Page Cleanup Plan

## Current Problems
- Too much dense text crammed into sections, competing with product carousels for attention
- Inconsistent spacing and visual rhythm between sections
- The 2-column text-beside-carousel layout in the SOK Rack section feels cramped
- The "Off-Grid Living" section has two text columns above the bundles carousel -- redundant and cluttered
- Energy Hub section uses a stock photo placeholder that adds no value
- The spec card with 7 bullet points in the rack section adds visual noise

## Revised Structure

Each section follows one clear pattern: **headline + short description, then content**.

### 1. Hero (keep, minor cleanup)
- Keep as-is. Remove the "Solar Power Solutions" pill badge -- unnecessary label on a page already titled "Home Backup".

### 2. SOK 48V Rack Batteries
- **Full-width section header** with title + one-line subtitle, centered.
- Move the spec card and long paragraphs into a collapsible accordion or remove entirely -- the products speak for themselves.
- Keep only 2-3 short sentences of context above the carousel.
- **Full-width product carousel** (4 cards on desktop, 2 on tablet, 1 on mobile) instead of cramming it into a half-width column.
- "View All" link below the carousel, right-aligned.

### 3. 48V Battery Bundles
- Light background (`bg-secondary/30`) for visual separation.
- Same pattern: centered section header + subtitle, then full-width carousel.
- Remove the "Off-Grid Living" and "Modular 5 kWh" text blocks entirely -- they add clutter and duplicate information already on product pages.
- "View 48V Bundles" link below.

### 4. Solagen Energy Hub 2
- White background. Two-column layout: left text + feature checklist, right image card with CTA.
- Replace stock Unsplash image with a placeholder that at least references the product correctly.
- Tighten the text to one paragraph + the 6-item feature grid.
- Keep the "Learn More" CTA linking to `/energy-hub-2`.

### 5. Why Choose / Reliable Home Energy Storage
- Keep the 3x2 feature grid with icons. No changes needed -- this section is clean.
- Light background for alternation.

### 6. CTA Section
- Keep as-is. Dark background, centered text, two buttons. Already clean.

## Technical Changes

**File: `src/pages/HomeBackup.tsx`**
- Remove `rackBatteryFeatures` array and spec card rendering
- Remove the two "Off-Grid Living" text columns (lines 229-258)
- Restructure SOK Rack section from 2-col (text + carousel) to stacked (header + full-width carousel with `lg:basis-1/4` cards)
- Restructure Bundles section similarly: header + full-width carousel
- Remove Sun icon pill badge from hero
- Consistent section spacing: `py-16 lg:py-24` throughout
- Carousel items: `basis-full sm:basis-1/2 lg:basis-1/4` for both carousels to show 4 products on desktop

## Visual Rhythm
```text
┌──────────────────────────────────┐
│  HERO (dark bg, full bleed)      │
├──────────────────────────────────┤
│  SOK 48V Rack Batteries          │
│  Short intro text                │
│  [card] [card] [card] [card] →   │
│                      View All →  │
├──────────────────────────────────┤
│  48V Battery Bundles (light bg)  │
│  Short intro text                │
│  [card] [card] [card] [card] →   │
│                 View 48V Bundles →│
├──────────────────────────────────┤
│  Energy Hub 2 (white bg)         │
│  [text + features] [image+CTA]   │
├──────────────────────────────────┤
│  Why Choose (light bg)           │
│  [6 icon cards in 3x2 grid]     │
├──────────────────────────────────┤
│  CTA (dark bg)                   │
└──────────────────────────────────┘
```

This creates a clean, breathing layout where each section has one job and the product carousels are the focal point -- not competing with walls of text.

