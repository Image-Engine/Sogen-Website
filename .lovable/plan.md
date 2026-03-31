

# Revitalize Homepage Design — Visual Polish Without New Sections

## Problem
Every section between Hero and EnergyHub uses nearly identical light-grey/white backgrounds with flat cards. There's no visual rhythm, depth, or interactivity — it reads like a static catalog.

## Changes (existing sections only)

### 1. Add hover animations to Features cards
**File:** `src/components/home/Features.tsx`
- Feature cards: add `hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 transition-all duration-300`
- Hero stat cards: add same hover lift effect
- Makes the section feel alive and interactive

### 2. Add a "View All Batteries →" link to ProductGrid header
**File:** `src/components/home/ProductGrid.tsx`
- Add a `Link` to `/products` alongside the section heading
- Gives the section a clear CTA and breaks the static header

### 3. Improve section background rhythm
**File:** `src/components/home/Categories.tsx`
- Change from flat `bg-secondary/30` to a subtle gradient: `bg-gradient-to-b from-background to-secondary/30`

**File:** `src/components/home/ProductGrid.tsx`
- Use clean white `bg-background` instead of `bg-surface-sunken` for contrast against the Categories gradient above

**File:** `src/components/home/Features.tsx`
- Use `bg-gradient-to-b from-secondary/40 to-secondary/10` instead of flat `bg-secondary/30`

### 4. Add depth to ProductCard hover states
**File:** `src/components/products/ProductCard.tsx`
- Enhance hover: `hover:shadow-xl hover:-translate-y-1` for a premium lift effect
- Add subtle border color change on hover: `hover:border-primary/20`

### 5. Improve ProductGrid section header typography
**File:** `src/components/home/ProductGrid.tsx`
- Add a thin decorative line or accent color to the "Featured Products" label
- Style the overline with a small colored bar: `before:` pseudo or a `border-l-2 border-primary pl-3`

### 6. Remove empty TrustBadges from page flow
**File:** `src/pages/Index.tsx`
- Remove `<TrustBadges />` which currently renders `null` — dead weight in the component tree

## Technical Details
- 5 files modified: `Features.tsx`, `ProductGrid.tsx`, `Categories.tsx`, `ProductCard.tsx`, `Index.tsx`
- All changes are CSS/Tailwind classes — no data, API, or structural changes
- Maintains Apple-style minimalism while adding subtle depth and interactivity

