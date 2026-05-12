## Plan: Update Battery Warranty Content

Update all on-site battery warranty references to reflect the new policy: **7 years for all batteries, 10 years for rack batteries**.

### Files to change

1. **`src/pages/Warranty.tsx`** (main warranty page)
   - Update the "How long does the coverage last?" bullet: change "7 or 10 years depending on model type" to state that all batteries are covered for 7 years and rack batteries for 10 years.
   - Restructure the "Battery Warranty Periods" grid:
     - **7 Years Warranty** — all standard SOK batteries (SK12V100, SK12V206, SK12V280, SK24V100, etc.)
     - **10 Years Warranty** — SOK rack batteries (SK48V100 / server rack models)

2. **`src/components/home/Hero.tsx`** (homepage trust indicators)
   - Change the "10-Year Warranty" badge label to "7-Year Warranty" to accurately reflect the baseline coverage for all batteries.

3. **`src/components/products/TrustBadges.tsx`** (product page trust badges)
   - Change the "Warranty / 1 Year Coverage" badge to accurately reflect battery warranty terms. Update sublabel to "7-10 Year Coverage".

4. **`src/components/products/ProductAccordion.tsx`** (product page FAQ accordion)
   - Optionally make the warranty FAQ slightly more informative: "All SOK batteries carry a 7-year warranty. Rack batteries are covered for 10 years."

### Out of scope
- The external PDF download link (`SOK-Warranty.pdf`) — this is a hosted document that cannot be edited via code.
- Victron product warranties (5-year) remain unchanged as they are distributor terms.
- Non-battery items (12 months) and clearance items (3 months) remain unchanged.