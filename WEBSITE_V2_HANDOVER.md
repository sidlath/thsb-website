# THSB Website v2: Handover

**Date:** 23 Sep 2026
**Branch:** `website-v2` (committed locally, not pushed)
**Replaces:** the single 2,600-line `index.html` (v1, Apr 2026)

---

## 1. What changed and why

The site was rebuilt from first principles around one job: **get a hungry visitor from "what is this?" to a ready-to-send WhatsApp order in under a minute, on a phone.** About 75–93% of revenue comes in through WhatsApp, so the website's role is to pre-sell and hand off to WhatsApp. It is not trying to be a shop.

| Decision | Why |
|---|---|
| **Agency photos and videos throughout** (51 photos, 23 clips supplied) | The old site used low-res cut-outs from the PDF menu. The new shoot is the biggest quality jump available. |
| **Menu rebuilt from the two Sep 2026 menu PDFs** (Bites, Sourdough, Snacks, Dips, Combos) | The old site listed items that are no longer on the menu (Khapli, Jowar and Gluten-Free breads, Samosa Croissant, Aglio Olio Pockets, Achari Paneer Parcel). |
| **One data file for the whole menu** (`assets/js/menu-data.js`) | Price and item changes are a one-line edit. Cards, combos, cart, the WhatsApp message and the Google menu data all update from it. |
| **Cart → WhatsApp only.** The stubbed "Pay online" button was removed | A button that doesn't work costs trust. Payment is confirmed in the chat, as it is today. |
| **Agency copy used verbatim** for SEO, hero, story, delivery banner and footer | Their markup has been applied in full (see §4). |
| **"Community" is now kitchen reels plus WhatsApp updates** | The old "Community & Giving" section claimed charity work (shelter donations, charity bakes) that isn't documented anywhere. Unverifiable claims were removed. The nav label the agency kept now points to real content: 6 short kitchen videos, Instagram, and a "join our WhatsApp updates" button. |
| **Email/list form replaced with a "Join WhatsApp updates" button** | The old form needed a Google Apps Script backend that was never deployed. It was hidden. The new button opens WhatsApp pre-filled, and Mum just adds the number to a broadcast list. It works on day one with nothing to maintain. |
| **Hosting and bulk-order block added** under Combos | Bulk and party orders are the largest single orders in the data, and the agency shot a hosting set. It links to a pre-filled WhatsApp: date, headcount, occasion. |
| **FAQ added** (7 questions) | This cuts the repeat questions Mum answers on chat and adds FAQ data for Google. |
| **"4.9 rating", "3,400+ orders" and "19 months" removed** | There was no source for 4.9. The other two were stale hard-coded numbers. "600+ happy customers" stays, because the data had 599 by Feb 2026. |
| **Self-hosted fonts, WebP images, 540p video loops** | Faster on Mumbai mobile data. Nothing else loads from Google. |

### Page order
Header → Hero (4-photo slideshow with the agency's labels) → Delivery band → Our Story → Menu (order facts, sticky category tabs, 18 items) → Combos + Hosting → How to order → Community (reels) → Kind Words (hidden until real reviews are added) → FAQ → Final CTA → Footer. A floating WhatsApp button shows after the hero. Once there's something in the order it becomes a "View order" bar.

### The order flow
1. Tap **Add** on any card, which turns into a − 1 + stepper. A toast confirms and the basket icon bounces.
2. The bottom bar shows the item count and subtotal. Tapping it opens the order drawer.
3. The drawer shows lines, a progress bar to the ₹500 minimum, delivery (₹50, free at ₹1,500+) and the estimated total excluding GST. It then asks for name, area (dropdown), an optional date and notes (Jain, allergies, gift message).
4. **Send order on WhatsApp** opens WhatsApp with the full order typed out. The customer taps send. The basket is remembered on that phone until they tap "Clear my order".

Example of the message Mum receives:
```
Hi! I'd like to place an order with The Homestyle Bakery:

• 2 × Vada Pav Buns (12 pcs) — ₹2,400
• 1 × The Grazing Duo (combo: Seeded Crackers (75 g) + Olive Tapenade (1 jar)) — ₹750

Subtotal: ₹3,150
Delivery: Free
Estimated total: ₹3,150 + GST

Name: …
Area: Colaba
Preferred date: Sat, 26 Sep
Notes: Jain version please

(Sent from the website)
```

---

## 2. Files

```
index.html                 page structure and all fixed copy
assets/js/menu-data.js     ← EDIT THIS for prices, items, combos, reviews, delivery rules
assets/js/app.js           behaviour (cart, drawer, slideshow, reels); no edits needed
assets/css/styles.css      design
assets/img/                WebP images (names like vada-pav-480.webp / -800.webp)
assets/video/              6 reels (.mp4) + poster frames (.webp)
assets/fonts/              Fraunces + Inter (open licence)
og-image.jpg               link preview for WhatsApp, Instagram etc. (new)
vercel.json                caching and security headers
WEBSITE_V2_HANDOVER.md     this file
```
Old v1 files (old product cut-outs, batch notes, Apps Script) were moved to `_archive_v1/`, which git ignores. They're still in git history if ever needed. The agency zip stays in `AGENCY REVIEW/`, also git-ignored (it's 1.1 GB).

### Common edits (ask Claude, or do it yourself)
- **Change a price:** in `menu-data.js`, change `price: 1200`.
- **Hide an item:** add `hidden: true`.
- **Tag Jain items:** add `jain: true` and a "Jain option" tag appears on the card.
- **Add a review:** copy a block under `testimonials`.
- **Change delivery rules:** edit `minOrder`, `deliveryFee`, `freeDeliveryAbove` or `deliveryAreas` at the top of the file. Also update the FAQ answer and the "Minimum order" box in `index.html`, which are plain text.

---

## 3. How to publish

**Recommended: preview first, then go live.**
1. In Terminal: `cd ~/THSB/thsb-website && git push -u origin website-v2`
2. Vercel builds a **preview URL** for the branch automatically. You'll find it in the Vercel dashboard, or on GitHub next to the branch. Check it on your phone.
3. When happy: `git checkout main && git merge website-v2 && git push`. The live site updates in about a minute.

**Or go straight live:** `git checkout main && git merge website-v2 && git push`.

To preview on the Mac without pushing, double-click `index.html`. Everything works offline except the WhatsApp hand-off.

---

## 4. Agency feedback: what was done

| Agency note | Status |
|---|---|
| Title, description and social preview copy | ✅ Used verbatim |
| Nav: Our Story • Menu • Combos • Community • Kind Words • Call Us • Order Now | ✅ Exactly this order |
| Hero headline, blurb, buttons | ✅ Verbatim. The stray line "Sourdough, stuffed buns and snacks made the homestyle way" is used as the small line above the headline |
| Delivery area in hero ("Delivering across South Mumbai — Colaba to Bandra") | ✅ Pill under the blurb |
| Carousel labels on each photo | ✅ All four labels. The first slide says "Seeded Sourdough" instead of "Khapli Wheat Sourdough" because Khapli isn't on the new menu (see questions) |
| Delivery banner with zones | ✅ |
| Story: "Hi, I'm Swati and this is my kitchen", specific story, founder photo | ✅ Copy verbatim. Photo: agency shot of hands in the Homestyle apron holding a loaf. No surname was provided, so none is used |
| Three values | ✅ Quality Ingredients · Baked in a Home Kitchen · Made with Care |
| Add-to-cart feedback | ✅ Toast + basket bounce + button turns into a stepper |
| Weight/quantity on every card | ✅ Every item shows pcs, g or jar |
| Jain tagging | ✅ Menu note ("available on request") + FAQ + notes field. The `jain: true` tag is ready to switch on per item once you confirm which items |
| Allergen note | ✅ In the menu facts row and the FAQ |
| Minimum ₹500 shown before adding items | ✅ First box in the menu facts row, highlighted |
| 5–6 more testimonials | ⏳ Needs real reviews from you. All three old reviews are hidden until confirmed as real. The Kind Words section and its nav link hide themselves until at least one review is switched on |
| Product photos next to testimonials | ✅ |
| Footer copy | ✅ Verbatim |

---

## 5. To-do list for Sid (in order)

1. **Skim the open questions in §6** (delivery rules, Jain items, Vietnamese Rolls). The defaults are sensible, so this doesn't block launch.
2. **Preview:** push the `website-v2` branch, open the Vercel preview on your phone, and place a test order to your own WhatsApp.
3. **Show Mum the WhatsApp message format** so she recognises website orders ("(Sent from the website)" is on the last line).
4. **Set up a WhatsApp Broadcast list** called "Website updates" for people who tap "Join our WhatsApp updates".
5. **Collect 4–6 real reviews** (WhatsApp screenshots are fine) and get an OK to use first name + area. Then ask Claude to add them, and Kind Words switches back on.
6. **Go live:** merge to `main` and push.
7. **Turn on analytics:** Vercel dashboard → the project → Analytics → Enable, then uncomment the one line at the bottom of `index.html`. The site already sends events for WhatsApp clicks, add-to-order and send-order.
8. **Google Business Profile:** create or claim it, then add its link to the site. This is the biggest local-SEO step, and it's done outside the website.
9. **Custom domain (optional):** if you buy one (e.g. thehomestylebakery.in), add it in Vercel and ask Claude to swap the URL in 5 places (canonical, og tags, sitemap, robots, menu-data `siteUrl`).
10. **Ask the agency for** proper photos of Ghee Podi Snack Mix, Ghee Podi Crackers, Tom Yum Chivda and Seeded Crackers. These four currently use small cut-outs from the PDF menu. Also ask for one photo each of the Pesto and Cheddar-Jalapeño loaves. Those cards use general sourdough shots for now.

---

## 6. Decisions and open questions

**Decided by Sid on 23 Sep 2026 (applied):**
- Seeded Crackers: ₹300 (Menu 2).
- Mixed Seed Chikki: ₹750 for **250 g**. The PDFs' "750gms" is a typo, so **get the menu PDFs corrected** too.
- Pasta & sauces (Fresh Pasta, Marinara, Aglio e Olio): **hidden** until they're back on the menu. "Pasta" was also removed from the page copy and the pasta reel was dropped. The items stay in `menu-data.js` with `hidden: true`.
- Reviews: **all hidden** until confirmed as real. Kind Words and its nav/footer links hide themselves automatically. They reappear as soon as one review has `hidden: false`.

**Still open (defaults in use):**

| # | Question | Used for now |
|---|---|---|
| 1 | Delivery: ₹500 minimum, ₹50 fee, free at ₹1,500+. Still right? | As stated |
| 2 | Which items can be made Jain? | "On request" note only |
| 3 | Vietnamese Rolls (photographed): on the menu? Price and unit? | Hidden |
| 4 | Grazing Duo = Seeded Crackers + Olive Tapenade? (read from the combo photo) | As stated |
| 5 | Khapli, Jowar and Gluten-Free breads, Samosa Croissant, Aglio Olio Pockets, Achari Paneer Parcel: all discontinued? | Removed |
| 6 | Swiggy / Zomato links on the site? | Not shown (keeps orders direct) |
| 7 | Agency copy says "baking fresh sourdough every morning". Literally true? | Kept, since it's the agency's copy |

## 7. Checks run
- Automated browser tests at 320 / 360 / 390 / 768 / 1024 / 1440 px: no horizontal overflow, no console errors, no broken images or 404s.
- Order flow: add/remove, steppers, minimum-order lock, delivery maths, required fields, the "other area" and past-date rules, the WhatsApp message text, the basket surviving a reload, Esc/backdrop close, the keyboard focus trap.
- An independent QA pass (axe accessibility, contrast, SEO, performance) was run. Its findings were fixed, including a bug where WhatsApp opened twice, low-contrast labels, focus loss in the drawer, and a pause button for the slideshow.
- Structured data: Bakery, Menu (18 items + 3 combos, GST-exclusive offers) and FAQPage, all valid JSON-LD.
- Mobile first load is about 1.2–1.9 MB depending on the phone screen (hero photo, fonts, first menu photos). Videos load only when scrolled to.
