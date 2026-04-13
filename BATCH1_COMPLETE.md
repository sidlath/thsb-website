# Batch 1 — Complete Summary

**Date:** 2026-04-14
**Commits:** 3 (a6f405e, cd9329b, bc53873)

## What shipped

### Bug Fixes
1. **Achari Paneer Parcel image** — changed from `mini-buns.jpeg` to `achari-paneer-parcel.jpeg` (file pending upload, TODO comment added)
2. **Favicon links** — added `<link rel="icon">` and `<link rel="apple-touch-icon">` to `<head>` (actual files pending — see TODO.md)
3. **Hero floating badges on mobile** — replaced `display:none` with a horizontal pill row (`hero-badges`) below the hero CTAs, centered, smaller font. Desktop behavior unchanged.
4. **WhatsApp bubble mobile fix** — reduced to 56x56px on mobile, added `padding-bottom: 90px` on footer mobile to clear the bubble
5. **Footer touch targets** — all footer links and Instagram icon now have `min-height: 44px` tap areas. Nav "Order Now" CTA also `min-height: 44px`.
6. **Hamburger close mechanism** — added `×` close button (top-right) and semi-transparent backdrop that dismisses menu on tap. Full-screen overlay on mobile.
7. **Shimmer animation** — changed from `infinite` to `animation: shimmer 3s linear 1; animation-fill-mode: forwards;`
8. **Menu category filter buttons** — rendered 6 buttons (All / Savory Buns / Sourdough Breads / Artisan Snacks / Pasta & Sauces / Dips) above the menu grid. Vanilla JS filters by `data-category` on cards and `data-section-category` on sections. Default: "All" active.
9. **Image width/height attributes** — added `width` and `height` to all `<img>` tags (800x800 for product photos, 320x320 / 130x130 for hero collage, 70x70 for logo) to prevent CLS.

### SEO Meta Tags
10. Added: canonical URL, `og:image`, `og:url`, `og:site_name`, full Twitter Card (`summary_large_image`) with title, description, image.

### Structured Data (JSON-LD)
11. **LocalBusiness schema** — `@type: ["LocalBusiness", "Bakery", "FoodEstablishment"]` with address (Colaba, Mumbai), telephone, priceRange, servesCuisine, areaServed, aggregateRating (4.9/600), sameAs (Instagram).
12. **Product schema** — top 5 products (Mixed Seeds Chikki, Vada Pav Buns, Tom Yum Nuts, Khapli Wheat Sourdough, Almond Sesame Chikki) with name, image, description, price, availability.

### Sitemap & Robots
13. `sitemap.xml` — homepage + 4 anchor sections with lastmod 2026-04-14
14. `robots.txt` — Allow all, points to sitemap

### Analytics
15. **GA4 gtag snippet** — placeholder `G-XXXXXXXXXX` at end of `<body>` with clear TODO comment
16. **Event tracking** via `data-track` attributes:
    - `whatsapp_click` with label (nav, hero, cta_band, footer)
    - `menu_filter` with category name
    - `instagram_click`

## Pending (TODO items)
| Item | File needed | Where to save |
|------|-------------|---------------|
| Favicon | 32x32 ICO | `thsb-website/favicon.ico` |
| Apple touch icon | 180x180 PNG | `thsb-website/apple-touch-icon.png` |
| OG image | 1200x630 JPG | `thsb-website/og-image.jpg` |
| Achari Paneer photo | ~800x800 JPEG | `images/products/achari-paneer-parcel.jpeg` |
| GA4 Measurement ID | Replace `G-XXXXXXXXXX` | in `index.html` (2 places) |

See `TODO.md` for full specs on each pending asset.

## Verification checklist
- [x] Local serve returns 200 OK
- [x] All JSON-LD blocks present (2 script tags)
- [x] GA4 snippet present with placeholder
- [x] Event tracking attributes on all WhatsApp/Instagram/filter links
- [x] robots.txt and sitemap.xml serve correctly
- [ ] Validate JSON-LD at https://search.google.com/test/rich-results (after deploy)
- [ ] Validate OG image at https://www.opengraph.xyz/ (after og-image.jpg uploaded)
- [ ] Run Lighthouse desktop + mobile (after deploy)

## Lighthouse estimates (pre-deploy baseline)
Cannot run Lighthouse programmatically in this environment. After pushing to main and Vercel auto-deploys, run Lighthouse in Chrome DevTools:
- **Expected SEO score:** 90-95+ (canonical, structured data, meta tags all in place; missing favicon may dock a few points)
- **Expected Accessibility score:** 85-90+ (touch targets fixed, aria-labels on buttons, semantic structure preserved)
- **Target after pending assets:** SEO >= 95, Accessibility >= 90
