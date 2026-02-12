

## Link Categories to Pages and Create 4 New Application Pages

### Overview
Connect the "Shop by Application" tiles on the homepage to their respective pages, and create 4 new pages (Solar Systems, Home Backup, Industrial, Accessories) using the RV & Campers page as a template.

### Changes Summary

#### 1. Update Categories Component (`src/components/home/Categories.tsx`)
- Add a `link` property to each category object
- Replace `<a href="#">` with React Router `<Link to={...}>` for both mobile and desktop layouts
- Links:
  - Solar Systems -> `/solar-systems`
  - Home Backup -> `/home-backup`
  - RV & Campers -> `/rv-campers`
  - Industrial -> `/industrial`
  - Accessories -> `/accessories`

#### 2. Create 4 New Pages (using RV Campers template)

Each page follows the same structure: Hero section, Feature Highlights Bar, Battery Collection Sections (with pagination), Why Choose Section, and CTA Section -- with content tailored to the application.

**a. `src/pages/SolarSystems.tsx`**
- Hero: Solar-themed imagery and copy about grid-tied and off-grid solar battery solutions
- Highlights bar: Solar-specific benefits (e.g., MPPT Compatible, Max Solar Harvest, etc.)
- Collections: 12V, 24V, 48V lithium batteries (same Shopify collections)
- Features: Solar-specific features (Solar Optimized Charging, High Cycle Life, Parallel Expandable, etc.)
- CTA: "Need Help Designing Your Solar System?"

**b. `src/pages/HomeBackup.tsx`**
- Hero: Home/residential imagery with copy about reliable home power backup
- Highlights bar: Home-specific benefits (e.g., Whole Home Backup, Silent Operation, etc.)
- Collections: 12V, 24V, 48V lithium batteries
- Features: Home backup features (Seamless Switchover, Quiet Operation, Scalable Storage, Grid Independence, etc.)
- CTA: "Need Help Setting Up Home Backup?"

**c. `src/pages/Industrial.tsx`**
- Hero: Industrial/commercial imagery with copy about heavy-duty power solutions
- Highlights bar: Industrial benefits (e.g., High Discharge Rate, Rack Mountable, etc.)
- Collections: 12V, 24V, 48V lithium batteries
- Features: Industrial features (High Power Output, Server Rack Compatible, Remote Monitoring, etc.)
- CTA: "Need a Custom Industrial Solution?"

**d. `src/pages/Accessories.tsx`**
- Hero: Accessories-themed imagery with copy about cables, chargers, and components
- Highlights bar: Accessory benefits (e.g., OEM Quality, Plug & Play, etc.)
- Collections: Instead of voltage-based sections, this page will show accessory-type collections (e.g., "cables-connectors", "circuit-protection", "chargers") if available, or a single products grid
- Features: Accessory features (Perfect Fit, Quality Certified, Easy Installation, etc.)
- CTA: "Need Help Finding the Right Accessories?"

#### 3. Add Routes (`src/App.tsx`)
Add 4 new routes:
- `/solar-systems` -> `SolarSystems`
- `/home-backup` -> `HomeBackup`
- `/industrial` -> `Industrial`
- `/accessories` -> `Accessories`

### Technical Details

- All new pages import the same shared components: `Header`, `Footer`, `ProductCard`, `ProductGridSkeleton`, `Button`, and Lucide icons
- All pages use the same `fetchCollectionByHandle` function from `src/lib/shopify.ts` to fetch products
- Each page uses the same pagination logic as RV Campers (4 products per page with chevron navigation)
- Hero backgrounds will use high-quality Unsplash images (similar to the category tiles) since we don't have dedicated hero images for these pages yet
- All pages are fully responsive following the existing mobile-first patterns
- The Accessories page may use different Shopify collection handles if accessory-specific collections exist; otherwise it will show the same voltage-based collections with accessory-focused messaging

