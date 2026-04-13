# Batch 2 — Trust + Conversion: Complete

## Changes Made

### Trust Elements
1. **Founder photo slot** — Added in Our Story section with `images/swati-founder.jpeg` src and a warm beige placeholder fallback (camera icon + "Founder photo" label) via `onerror` handler. Circular frame with gold border.
2. **External review link** — "Read more reviews on Google" button added below testimonial cards, linking to Google Business Profile (placeholder URL).

### Delivery Banner
3. **Delivery info band** — Cream background band between Stats Bar and Our Story. Shows delivery zones as pill badges. Desktop: inline pills. Mobile: horizontal-scrollable row. Includes minimum order (₹500) and same-day cutoff (11 AM).

### How to Order
4. **3-step explainer** — New section between Menu and Community. Steps: Browse Menu (book icon) → WhatsApp Your Order (chat icon) → Fresh Delivery (scooter icon). Connected by a gradient line on desktop. Ends with "Order Now on WhatsApp" CTA.

### Price Disambiguation
5. **All menu prices now have explicit units:**
   - Savory Buns: already had `/dz` or `/24pc` — unchanged
   - Sourdough Breads: added `/loaf` to all 7 items
   - Artisan Snacks: `/250g` (chikkis), `/200g` (tom yum), `/pack` (crackers)
   - Pasta & Sauces: `/pack` (pasta), `/jar` (all sauces)
   - Dips: `/jar` (both items)

### Click-to-Call
6. **Nav call link** — `tel:+919619122581` with phone icon. Desktop: visible next to "Order Now". Mobile: inside hamburger menu.
7. **Footer phone** — Now a `tel:` link alongside the WhatsApp link.

### Email/WhatsApp Capture
8. **List capture form** — Cream band between How to Order section and CTA Band. Fields: Name + WhatsApp/Email (validated as Indian phone or email). Submits via `fetch` (no-cors) to Google Apps Script endpoint. Shows inline success message. Fires `list_signup` GA4 event on success.
   - Created `_apps-script-list-capture.gs` with full setup instructions.

### Accessibility Polish
9. **Focus states** — All interactive elements (links, buttons, inputs, CTAs, filter buttons) now show a 2px solid gold outline with 2px offset on `:focus-visible`.
10. **Aria labels** — Added/verified on all icon-only buttons: hamburger (`Open navigation menu`), close (`Close navigation menu`), Call Us, WhatsApp float (`Chat on WhatsApp`), Instagram social link.

## New Files
- `_apps-script-list-capture.gs` — Google Apps Script code for list signup endpoint

## TODOs (Action Required)
- [ ] Drop `swati-founder.jpeg` into `images/` (recommended: 280x280px+, square crop)
- [ ] Set up Google Business Profile and replace `https://g.page/r/the-homestyle-bakery` with real reviews URL
- [ ] Set up Google Apps Script endpoint:
  1. Create Google Sheet "THSB Website — List Signups" with headers: Timestamp | Name | Contact | Type | Source
  2. Extensions → Apps Script → paste `_apps-script-list-capture.gs`
  3. Deploy → New deployment → Web app → Execute as Me → Anyone access
  4. Replace `PLACEHOLDER` in index.html with the deployment URL
- [ ] Replace `G-XXXXXXXXXX` with real GA4 measurement ID (carried over from Batch 1)
- [ ] Upload `achari-paneer-parcel.jpeg` to `images/products/` (carried over from Batch 1)
- [ ] Upload favicon, apple-touch-icon, og-image (carried over from Batch 1)

## Lighthouse Notes
- Accessibility score should improve due to: focus-visible states on all interactive elements, aria-labels on icon-only buttons, semantic form with labels
- Performance: no new external resources added; all new sections use inline CSS/JS; images use `loading="lazy"` and `onerror` fallback
- Run `npx lighthouse https://localhost:PORT --view` after deploying to verify deltas
