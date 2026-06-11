# Sogen Energy Website

Official website for **SOK Battery NZ** — LiFePO4 lithium batteries, solar panels, and energy storage solutions in New Zealand.

**Live site:** https://sogenenergy.co.nz  
**Blog:** https://blog.sogenenergy.co.nz

## Local development

```sh
git clone https://github.com/SOKBattery/Sogen_Website.git
cd Sogen_Website
npm i
npm run dev
```

The dev server runs at http://localhost:8080.

## Testing

Run these from the project root after `npm i`:

| Command | What it does |
|---------|----------------|
| `npm run test` | All Vitest tests (unit + live Shopify API) |
| `npm run test:unit` | Fast static checks — routes, link inventory, OAuth helpers (no network) |
| `npm run test:live` | Validates hardcoded collection/blog handles against live Shopify Storefront API |
| `npm run test:e2e` | Playwright browser tests — main site routes, nav, dynamic pages, auth redirects (port 8080) |
| `npm run test:e2e:blog` | Playwright blog subdomain tests (`NEXT_PUBLIC_BLOG_HOST_DEV=true`, paths like `/FAQ/{handle}`) |
| `npm run test:links` | Standalone markdown link health report (internal links + live Shopify validation) |

**Suggested order before a deploy:**

```sh
npm run test:unit    # quick sanity check
npm run test:live    # catch broken Shopify handles
npm run test:e2e     # catch broken pages and navigation
npm run test:links   # full report (exits non-zero if issues found)
```

## Blog subdomain

Blog content lives at **https://blog.sogenenergy.co.nz** (article URLs: `/FAQ/{article-handle}`). The main store links out to the subdomain; legacy `/blog/*` paths on `sogenenergy.co.nz` 301-redirect via `next.config.ts`, `public/_redirects`, and `vercel.json`.

URL helpers are centralized in `src/lib/blogUrls.ts`. Set `NEXT_PUBLIC_BLOG_HOST_DEV=true` when running the dev server locally to simulate the blog subdomain on `localhost:8080`.

## Tech stack

- Next.js 15 (App Router)
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Shopify Storefront API
- Next.js API routes (Shopify customer OAuth, Google reviews)

## Build & deploy

```sh
npm run build
npm run start
```

Deploy to Vercel, Netlify, or any Node.js host that supports Next.js. Point both `sogenenergy.co.nz` and `blog.sogenenergy.co.nz` at the same deployment.
