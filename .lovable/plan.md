# Fix Navbar Search

## Problem
The search inputs in `Header.tsx` (both desktop and mobile) are purely visual — they have no `value`, `onChange`, or submit handler, so typing does nothing.

## Fix
Wire the search inputs to navigate to `/products?search=<query>` on submit, and have `Products.tsx` read that query from the URL to pre-filter the grid.

## Changes

**1. `src/components/layout/Header.tsx`**
- Add `searchQuery` state and `useNavigate` from react-router-dom.
- Wrap both desktop and mobile search inputs in a `<form>` with an `onSubmit` that:
  - Trims the query, navigates to `/products?search=<encoded query>`.
  - Closes the desktop search popover / mobile menu.
  - Clears the input.
- Also submit on Enter (native form behavior).

**2. `src/pages/Products.tsx`**
- Use `useSearchParams` to read `?search=` on mount and whenever it changes.
- Initialize `searchQuery` state from the URL param so the existing client-side filter (already implemented on lines ~76–82) immediately runs.
- Keep the existing in-page search input synced with the URL (optional: update URL on type, or just seed once).

## Out of scope
- No backend / Shopify search API change — we keep the existing client-side title/description filter that Products already uses.
- No new search results page or autocomplete dropdown.
