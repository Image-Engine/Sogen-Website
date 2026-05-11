## Goal
Add live typeahead suggestions to the navbar search so users see matching products as they type, with the option to click a result and go straight to the product page (instead of always being routed to `/products?search=...`).

## UX
- As soon as the user types 2+ characters, a dropdown appears under the search input with up to 6 closest-matching products.
- Each result row: small thumbnail, product title, price.
- Keyboard support: ↑/↓ to navigate, Enter to open the highlighted result (or run full search if none highlighted), Esc to close.
- Clicking a result → navigates to `/products/{handle}`.
- Pressing Enter with no selection → existing behavior: navigate to `/products?search=...`.
- A "View all results for '<query>'" row at the bottom of the dropdown.
- Loading spinner while fetching; "No matches" empty state.
- Debounced (~200ms) so we don't fire a request on every keystroke.
- Works in both desktop popover search and mobile menu search.

## Data source
Use Shopify Storefront API `products(query: "title:*foo* OR vendor:*foo*", first: 6)` via the existing `src/lib/shopify.ts` client. Add a new helper `searchProductsQuick(term: string)` that returns `{ id, handle, title, featuredImage, priceRange }`. No backend/edge function needed — Storefront API is already used client-side.

## Implementation

### 1. `src/lib/shopify.ts`
Add `searchProductsQuick(term, limit=6)` that runs a small GraphQL query and returns a typed minimal result list. Reuse existing client config.

### 2. New component: `src/components/layout/SearchAutocomplete.tsx`
Self-contained controlled component:
- Props: `value`, `onChange`, `onSubmit(term)`, `onSelect(handle)`, `placeholder`, `variant: "desktop" | "mobile"`, `autoFocus?`.
- Internal: debounced query, results state, loading state, highlighted index, click-outside to close.
- Renders the input + an absolutely-positioned dropdown panel (uses existing design tokens; matches current `bg-secondary` input styling).

### 3. `src/components/layout/Header.tsx`
Replace the two raw `<input>` blocks (desktop popover + mobile menu) with `<SearchAutocomplete />`. Keep the existing submit behavior (`navigate('/products?search=...')`) as the fallback when the user presses Enter without picking a suggestion. Remove now-unused local `searchQuery` / `mobileSearchQuery` plumbing if fully replaced.

### 4. No changes to `src/pages/Products.tsx`
The `?search=` URL param flow stays exactly as it is for the "view all results" path.

## Out of scope
- No fuzzy search / typo correction (Storefront API doesn't support it natively; would require Algolia/Meilisearch).
- No search-by-collection or category suggestions — products only.
- No analytics events on suggestion clicks.
- No recent-searches memory.

## Technical notes
- Debounce with a small `useEffect` + `setTimeout` (no new dependency).
- Abort in-flight fetches when query changes (AbortController) to avoid out-of-order results.
- Dropdown z-index above header glass nav.
- Mobile variant renders the dropdown inline (not absolute) so it pushes menu content down naturally.
