## Plan: Per-product warranty on product pages

Replace the static "Up to 10 Years" warranty badge with a dynamic value driven by Shopify product tags: products tagged `rack` (case-insensitive) show **10 Years**, all others show **7 Years**.

### Changes

**1. `src/lib/shopify.ts`**
- Add `tags` to `GET_PRODUCT_BY_HANDLE` GraphQL query.
- Add `tags: string[]` to the `ProductDetails` type/mapping.

**2. `src/components/products/TrustBadges.tsx`**
- Accept a `warrantyYears: 7 | 10` prop.
- Render sublabel as `"7 Years"` or `"10 Years"` instead of `"Up to 10 Years"`.

**3. `src/pages/Product.tsx`**
- Compute `const isRack = product.tags?.some(t => t.toLowerCase().includes('rack'))`.
- Pass `warrantyYears={isRack ? 10 : 7}` to `<TrustBadges />`.

### Out of scope
- Hero, Warranty page, ProductAccordion FAQ — already updated previously and remain accurate.
- Non-product pages where TrustBadges isn't rendered with product context.
