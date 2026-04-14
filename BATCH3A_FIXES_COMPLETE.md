# Batch 3A Fixes — Complete

**Date:** 2026-04-14

## What Shipped

### Asset Link Verification
1. Favicon links updated: `<link rel="icon" href="/favicon.ico">` + modern fallback `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">` + apple-touch-icon confirmed
2. OG image and Twitter image confirmed pointing to `https://thsb-website.vercel.app/og-image.jpg`

### Bug Fixes
3. **Footer separator fix:** The `·` between phone and WhatsApp in "Get in Touch" column now renders inline with proper spacing via `<span style="display:inline; margin:0 0.25rem">` and inline display on both `<a>` tags
4. **Form error clearing:** Input event listeners on `co_name`, `co_phone`, `co_address` hide adjacent `.form-error` on user input
5. **Sitemap cleaned:** Removed all hash-fragment entries (`#menu`, `#story`, etc.) — only the root URL remains
6. **List capture safety check:** If endpoint contains `PLACEHOLDER`, form auto-hides and shows "Signups launching soon — follow us on Instagram for updates!"
7. **Combo card images:** Each combo card now displays its product image (160px tall, cover fit, rounded top corners)

### Mobile / Accessibility
8. **Touch targets (44px min):** `.cart-btn`, `.menu-cat-btn`, `.hamburger`, `footer .footer-col a` all meet 44px minimum height on mobile
9. **FAB collision fixed:** WhatsApp FAB repositioned to `bottom: 24px; right: 16px; 52x52px`. Cart FAB moved to `bottom: 6.5rem`
10. **Menu category overflow:** `.menu-categories` now has `overflow-x: auto; white-space: nowrap` so "Dips" button is always reachable on narrow screens

### Polish
11. **Scroll-spy:** Already existed in codebase (IntersectionObserver-based) — confirmed working
12. **Step 2 copy updated:** "Add to Cart, Then Send via WhatsApp" with new sub-text reflecting the cart workflow
13. **Minimum order enforcement (₹500):** When subtotal < 500, both checkout CTAs are disabled with muted gold message "Add ₹X more to meet the ₹500 minimum order."
14. **Delivery fee line in cart drawer:** Shows Subtotal, Delivery (₹50 or FREE with strikethrough), Total. Muted note: "Free delivery on orders above ₹1,500."
15. **100% Vegetarian badge:** Green dot + "100% Vegetarian Kitchen" pill in hero section below CTAs
16. **Privacy copy:** "We'll never spam you. Unsubscribe anytime." under list capture form
17. **Menu categories scroll:** Horizontal scroll on narrow viewports ensures all filter buttons (including "Dips") are accessible

## What's Hidden (Placeholders for Later)

| Element | Status | Re-enable When |
|---------|--------|----------------|
| Founder photo (`.founder-photo-wrap`) | `display:none` | `swati-founder.jpeg` added to `images/` |
| Google Reviews link | Commented out | Real Google Business Profile URL obtained |
| GA4 scripts | Commented out | Real GA4 Measurement ID available |
| List capture form | Auto-hidden via JS | Google Apps Script endpoint deployed (replace `PLACEHOLDER` in `LIST_ENDPOINT`) |

## Lighthouse Scores

> Manual browser verification required — run Lighthouse in Chrome DevTools after deploying.
> Pre-batch baseline was not recorded; post-batch scores should be run at next deploy.

## Files Changed

- `index.html` — all 19 items
- `sitemap.xml` — simplified to single root URL entry
