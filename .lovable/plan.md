

# 3D Tilted & Stacked Category Tiles

## Overview
Transform the "Shop by Application" tiles from a flat layout into a 3D perspective effect where tiles appear slightly tilted and stacked on each other, creating depth and visual interest.

## Design Approach

The 6 tiles will be arranged in **2 groups of 3**, with each group showing 3 cards stacked with slight rotations and offsets -- like a fanned-out deck of cards.

### Desktop Layout
- Two side-by-side stacks (left stack: Solar, Home Backup, RV | right stack: Industrial, Victron, Accessories)
- Each stack has 3 cards fanned out with:
  - Slight Y-axis rotation (rotateY) creating a 3D tilt
  - Small Z-axis rotation for the stacking angle
  - Translate offsets so they overlap but all remain partially visible
  - CSS `perspective` on the container for realistic 3D depth
- On hover, the hovered card lifts forward (translateZ) and straightens out

### Mobile Layout
- Keep the existing 2-column grid but add a subtle tilt to each card (alternating left/right rotations) for a playful stacked feel without breaking usability

## Technical Details

### CSS Transforms Used
- `perspective(1200px)` on the parent container
- `rotateY(2-5deg)` for subtle 3D tilt
- `rotate(-3deg to 3deg)` for stacking angle variation
- `translateZ()` for depth layering
- `translate()` offsets for the fan/overlap effect
- `transform-style: preserve-3d` on the group wrappers

### File Changes

**`src/components/home/Categories.tsx`**
- Replace the desktop flex expand-on-hover layout with a 2-group stacked card layout
- Each group is a `div` with `perspective` and contains 3 absolutely/relatively positioned cards
- Each card gets unique transform values based on its position in the stack (index 0, 1, 2)
- Add hover interaction: card lifts and de-tilts on hover, with a smooth transition
- Add shadow depth to enhance the 3D stacking illusion
- Mobile grid: add alternating subtle rotations (`rotate(-2deg)` / `rotate(2deg)`) to cards

### Interaction
- Hovering a card in a stack brings it to the front (higher z-index), reduces tilt, and adds a lift effect
- Smooth transitions (500ms ease-out) for all transforms
- Cards remain clickable links to their category pages

