

# Fix SEO, Meta Tags & Accessories Products Issue

## Issues Identified

1. **Page title says "Lovable App"** — `index.html` has default boilerplate title, description, and OG tags
2. **Solar/Accessories shows no products** — The Accessories page fetches from battery collection handles (`12v-lithium-batteries`, `24v-lithium-batteries`, `48v-lithium-batteries`) instead of actual accessory collections. The Solar Systems page filters by `productType === "Solar Accessories"` which may not match any products in Shopify.
3. **SSR / crawlability** — This is a platform limitation of Lovable (client-side SPA). Lovable does not support Next.js or SSR. The client's suggestion to export to GitHub and convert to Next.js is valid for serious SEO needs. We can connect to GitHub via project settings.

## Plan

### 1. Fix `index.html` — SEO meta tags
Update title, description, OG tags, and Twitter cards with proper Sogen Energy / SOK Battery branding:
- Title: `"SOK Battery | LiFePO4 Lithium Batteries & Solar Solutions"`
- Description: proper business description
- OG image: keep or replace with a brand image URL
- Remove all "Lovable" references from meta tags

### 2. Fix Accessories page — wrong collection handles
**File:** `src/pages/Accessories.tsx`
- The `collectionOptions` array uses battery collection handles, not accessory handles
- Need to investigate which Shopify collections actually contain accessories — I'll use the Shopify tools to search for accessory products/collections and update the handles accordingly
- Alternative: switch to `fetchProducts()` with a query filter for accessories (like the Solar page does with `fetchProducts(250, "solar")`)

### 3. Fix Solar Systems page — "Solar Accessories" empty filter
**File:** `src/pages/SolarSystems.tsx`  
- The priority type `"Solar Accessories"` may not match any product's `productType` field in Shopify
- Will verify actual product types returned by the solar query and adjust the priority list to match real data

### 4. SSR limitation — communicate clearly
- Lovable is a client-side SPA platform and cannot do SSR or Next.js
- The site can be exported to GitHub for conversion to Next.js if the client wants crawler visibility
- We can connect the project to GitHub via project settings so the client's developer can convert it

## What this does NOT fix
- SSR/prerendering (platform limitation — requires exporting to Next.js)
- Google indexing (depends on SSR fix above)

