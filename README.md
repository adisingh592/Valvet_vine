# Velvet Vine — Fashion for every you

Front-end prototype for a **fashion discovery + affiliate** platform. Velvet Vine
doesn't sell anything: every product sends the shopper to a partner retailer
("View on Myntra ↗") who handles checkout, delivery and returns.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion for React · Lucide.
Local mock data only — no backend, auth, cart or checkout.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (pre-renders ~124 static pages)
npm run start
npm run typecheck
```

Scripts use webpack (`--webpack`); it's the configuration that was verified.

> **Disk space note (this machine):** drive `E:` has ~250 MB free, which is not
> enough for `node_modules` (~500 MB) plus `.next`. Next.js also requires the
> project folder and its `node_modules` to be on the **same drive** (a junction
> across drives fails at build time). Either free ~1.5 GB on `E:`, or work from
> a copy on another drive (a verified copy lives at `D:\velvet-vine`).

## Where things are

```
src/
  app/                      routes (one folder per URL)
    page.tsx                home
    women|men|accessories/  section pages + [category] subpages (/women/dresses)
    new-in, deals/          filtered listings
    collections/[slug]      curated edits
    inspiration/[slug]      style guides;  pinterest/ = masonry board
    products/[slug]         affiliate product page (+ JSON-LD)
    search, wishlist, brands, about, contact, privacy, terms, affiliate-disclosure
    sitemap.ts, robots.ts
  components/
    layout/    AnnouncementBar, Navbar, SearchBar, MobileMenu, Footer, Newsletter,
               ScrollToTop, PageTransition, ContentPage
    home/      HeroSection, HeroSideCard, CategoryScroller, TrendingNow, StyleGuideCard, InstagramGrid
    product/   ProductCard, ProductGrid, WishlistButton, RetailerButton,
               ProductGallery, ProductInfo, RetailerComparison, ProductTabs
    category/  CategoryHero, CategoryView (filters/sort/load more), FilterSidebar, SortDropdown
    ui/        Morph, Reveal, SectionHeading, ButtonLink, Skeleton, EmptyState, …
  data/        products.ts, categories.ts, collections.ts, inspiration.ts, navigation.ts, photos.ts
  lib/         catalog.ts (data access), filters.ts, affiliate.ts, seo.ts, motion.ts, images.ts
  types/       shared types (Product, RetailerOffer, Collection, …)
```

## Things to replace before launch

| What | Where | Now |
|---|---|---|
| Affiliate links | `src/lib/affiliate.ts` → `placeholderRetailerUrl` | Plain retailer **search** URLs, no tracking IDs |
| Click tracking | `handleAffiliateClick()` in `src/lib/affiliate.ts` | Emits a `vv:affiliate-click` browser event only |
| Social profiles | `socialLinks` in `src/data/navigation.ts` | Platform homepages |
| Imagery | `src/data/photos.ts`, `photo:` in `products.ts` | Unsplash editorial stand-ins (not the retailers' real product photos) |
| Brands, prices, ratings | `src/data/products.ts` | Fictional / illustrative |
| Newsletter + contact forms | `Newsletter.tsx`, `ContactForm.tsx` | Validate and confirm, send nothing |
| Legal copy | `privacy`, `terms` pages | Marked as drafts |
| Site URL | `NEXT_PUBLIC_SITE_URL` env var | Defaults to `http://localhost:3000` |

## Connecting Supabase later

Pages never read the mock arrays directly; they call functions in
`src/lib/catalog.ts` (`getProductBySlug`, `getSectionProducts`, `getProductsByTag`, …).
Swap those for Supabase queries returning the same `Product` shape
(`src/types/index.ts`) — likely tables: `products`, `retailer_offers`, `collections`,
`collection_products`, `clicks`. There is no orders table by design.

## Motion system

- Timing tokens: `src/lib/motion.ts` (and the same values as CSS variables in `globals.css`):
  micro 190ms · fast 250ms · normal 350ms · medium 550ms · slow 1200ms.
- **Page transitions:** `<PageTransition>` wraps each page and uses the browser View
  Transition API via React's `<ViewTransition>` (fade + 10px rise). Unsupported browsers just navigate.
- **Shared-element morphs:** `<Morph kind slug>` names an image; the `<Link>` that should
  trigger it passes `transitionTypes={[morphType(kind, slug)]}`. Only the clicked item morphs,
  even if the same product appears on both pages. Used for product card → product page,
  category circle → category page, hero card → section, collection banner → collection,
  and pin → style guide. `MorphScrollFix` makes this work from a scrolled page.
- **Reduced motion:** Motion runs with `reducedMotion="user"`; CSS removes hover lifts/zooms
  and morphs but keeps opacity fades.
