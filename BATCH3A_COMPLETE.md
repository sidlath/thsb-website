# BATCH 3A — Cart Shell + WhatsApp Live + Online Checkout (Stubbed)

**Shipped:** 2026-04-14

## Features Shipped

### Cart UI
- **Add to Cart buttons** on every menu card — morphs into quantity stepper (- 1 +) on click
- **Floating cart icon** (top-right desktop, bottom-right mobile) with badge showing total item count; hidden when cart is empty
- **Cart drawer** slides in from right (desktop 440px, mobile full-screen):
  - Header: "Your Order" + close button
  - Item list with thumbnail, name, unit price, quantity stepper, line total, remove (trash icon)
  - Combo discount line (shown when combos are in cart)
  - Subtotal
  - Two CTAs: [Order via WhatsApp] (green) + [Pay & Order Online] (gold)
  - Footer note: "Minimum order ₹500. Free delivery on orders above ₹1,500."
- **Cart state** persisted in `localStorage` under key `thsb_cart` as JSON `{items: [...], updatedAt}`
- Survives page refresh. Escape key closes drawer/modals.

### WhatsApp Checkout (fully working)
- "Order via WhatsApp" generates a pre-formatted WhatsApp message with all line items, prices, totals
- Opens `wa.me/919619122581?text=ENCODED`
- Cart is NOT cleared (customer may not send)
- Toast: "WhatsApp opened — your cart is saved."

### Online Checkout Form (stubbed)
- "Pay & Order Online" opens inline checkout modal with:
  - Name (required), Phone (required, Indian mobile validation), Email (optional)
  - Delivery address (required, textarea), Preferred delivery slot (dropdown), Notes (optional)
  - Read-only order summary with delivery fee logic (free above ₹1,500, otherwise ₹50)
  - "Pay ₹[Total]" submit button
- On submit: shows fallback modal explaining online payment is coming soon
- Fallback offers [Send via WhatsApp] (with all form fields pre-filled) or [Cancel]
- Fires GA4 event: `checkout_online_fallback`

### Popular Combos Section
- New section above the menu with 3 combo cards:
  - **Party Pack:** Vada Pav Buns + Samosa Croissant + Mixed Seeds Chikki (10% off)
  - **Sourdough Sampler:** Khapli + Pesto + Cheddar Jalapeno (8% off)
  - **Snack Lover's Box:** Mixed Seeds Chikki + Tom Yum Nuts + Almond Sesame Chikki (10% off)
- Each combo is a single Add-to-Cart item with discount tracked
- "Combo Discount" line shown in cart summary

### GA4 Events
- `cart_add` (item_name, item_count)
- `cart_remove` (item_name, item_count)
- `cart_open` (item_count)
- `checkout_whatsapp` (item_count, subtotal)
- `checkout_online` (item_count)
- `checkout_online_fallback` (item_count)

## TODO BATCH 3B Hooks Left in Code

All in the cart system `<script>` block, inside `submitCheckout()`:

```
// TODO BATCH 3B: replace stub with Razorpay Standard Checkout init
// TODO BATCH 3B: call /api/create-order
// TODO BATCH 3B: call /api/verify-payment on payment success
// TODO BATCH 3B: call /api/log-order before showing success modal
```

Find via: `grep "BATCH 3B" index.html`

## Verification Checklist

- [ ] Add 3 items, open WhatsApp — verify message format and total
- [ ] Online checkout stub: fill form, submit, verify fallback modal, verify WhatsApp message includes form fields
- [ ] Empty cart: cart icon hidden, drawer shows empty state, CTAs hidden
- [ ] Single item: correct total, WhatsApp message correct
- [ ] Large order (10+ items): all render in drawer and WhatsApp message
- [ ] Refresh mid-checkout: cart persists from localStorage
- [ ] Close drawer with items: badge persists
- [ ] Combos: add combo, verify discount line in drawer and checkout summary
- [ ] Mobile: drawer goes full-screen, cart icon at bottom-right above WA float
- [ ] Lighthouse: Performance >= 80 mobile (no new network requests, all inline)
- [ ] Test on iPhone Safari + Android Chrome
