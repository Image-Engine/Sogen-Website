Replace the warranty page content with the new 12-section terms provided by the user, while preserving the current visual formatting (card sections, icons, hero banner, styled lists, and section headers).

### What to change
- **src/pages/Warranty.tsx**: Full content rewrite across all sections while keeping:
  - Hero banner with Shield icon and "SOK Battery Warranty" badge
  - Card-based section containers (`bg-card rounded-xl border border-border p-6 md:p-8`)
  - Section header pattern (icon in `w-10 h-10 rounded-lg bg-primary/10` + h2 title)
  - Numbered and bulleted list styling
  - The "Download Full Warranty Document" CTA section
  - SEOHead, Header, Footer, PageBreadcrumb wrappers

### New content structure (12 sections)
1. Coverage
2. Who Is Covered
3. What We Will Do to Correct Problems
4. Batteries – Pro-rata Remedy
5. How Long Does the Coverage Last? (updated periods: SOK batteries 10yr, Energy Hub 3yr, Victron per manufacturer, other items 12mo, clearance 3mo)
6. Energy Hub Systems – Specific Terms (6.1 What Is Covered, 6.2 Installation Requirements, 6.3 Third-Party Equipment Integration)
7. Capacity and Normal Wear
8. Inverter / Charger Support and Warranty
9. Shipping and Other Costs
10. Clearance Items – Sales Terms
11. What This Limited Warranty Does Not Cover
12. Statutory Rights (New Zealand)

### Technical details
- Single file edit: `src/pages/Warranty.tsx`
- No dependency changes or new files needed
- Keep all existing imports; add any missing icons if new ones are needed
- No routing or navigation changes