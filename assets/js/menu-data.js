/* =====================================================================
   THE HOMESTYLE BAKERY — MENU & SITE DATA
   ---------------------------------------------------------------------
   This is the ONE file to edit when prices, items or combos change.
   Everything on the website (menu cards, combos, cart, WhatsApp order
   message, Google menu data) is generated from this file.

   Source of truth: the two menu PDFs shared on 23 Sep 2026
   (Bites · Sourdough · Snacks · Dips · Combos).

   Quick guide
   - price:   number in rupees, excluding GST (menus say "Prices excluding taxes")
   - unit:    what the price buys ("12 pcs", "500 g", "1 jar")
   - badge:   optional small tag on the photo ("Bestseller", "New")
   - jain:    true  → shows a "Jain option" tag on the card
   - hidden:  true  → item stays in this file but is not shown on the site
   - img:     file name in assets/img without the "-480.webp" / "-800.webp" end
   - cutout:  true  → photo is a small cut-out from the PDF menu (shown on a
              cream tile). Replace with a proper photo when available.
   ===================================================================== */

window.THSB = {
  config: {
    phone: '+91 96191 22581',
    whatsapp: '919619122581',
    instagram: 'the_homestyle_bakery',
    minOrder: 500,            // ₹ — checkout button stays locked below this
    deliveryFee: 50,          // ₹ — shown in the cart below the free-delivery threshold
    freeDeliveryAbove: 1500,  // ₹ — delivery free at or above this subtotal
    deliveryAreas: ['Colaba', 'Cuffe Parade', 'Churchgate', 'Fort', 'Marine Lines', 'Worli', 'Bandra'],
    siteUrl: 'https://thsb-website.vercel.app'
  },

  categories: [
    { id: 'bites',     name: 'Bites',        blurb: 'Stuffed buns and savoury bakes, sold by the dozen. Our bestselling category.' },
    { id: 'sourdough', name: 'Sourdough',    blurb: 'Naturally leavened 500 g loaves.' },
    { id: 'snacks',    name: 'Snacks',       blurb: 'Chikkis, nuts and crackers for the snack drawer, the office and gifting.' },
    { id: 'dips',      name: 'Dips',         blurb: 'Jars for your cheese board, your crackers and your toast.' }
  ],

  items: [
    // ---------------- BITES ----------------
    { id: 'vada-pav-buns', cat: 'bites', name: 'Vada Pav Buns', price: 1200, unit: '12 pcs',
      desc: "Soft baked buns filled with spiced potato vada. Mumbai's favourite, baked differently.",
      img: 'vada-pav', badge: 'Bestseller' },
    { id: 'pizza-twists', cat: 'bites', name: 'Pizza Twists', price: 1200, unit: '12 pcs',
      desc: 'Golden twists with a cheesy, herby pizza filling. Made for parties.',
      img: 'pizza-twists' },
    { id: 'pesto-pinwheels', cat: 'bites', name: 'Pesto Pinwheels', price: 1200, unit: '12 pcs',
      desc: 'Soft swirls rolled with our house-made basil pesto.',
      img: 'pesto-pinwheels' },
    { id: 'chana-kulcha-buns', cat: 'bites', name: 'Chana Kulcha Buns', price: 1200, unit: '12 pcs',
      desc: 'Seeded buns stuffed with spiced chana. Street-food flavour in a soft bake.',
      img: 'chana-kulcha' },
    { id: 'marinara-pizzette', cat: 'bites', name: 'Marinara Pizzette', price: 1200, unit: '12 pcs',
      desc: 'Mini pizzas on soft dough with our marinara, melted cheese and fresh basil.',
      img: 'marinara-pizzette', badge: 'New' },
    { id: 'bite-sized-buns', cat: 'bites', name: 'Bite-Sized Buns', price: 1200, unit: '24 pcs',
      desc: 'An assorted box of mini buns, easy to pass around at a party.',
      img: 'bite-sized-buns' },

    // ---------------- SOURDOUGH ----------------
    { id: 'cheddar-jalapeno-sourdough', cat: 'sourdough', name: 'Cheddar Cheese & Jalapeño Sourdough', price: 550, unit: '500 g',
      desc: 'Cubes of cheddar and jalapeño folded into the dough. Excellent toasted.',
      img: 'sourdough-cut', badge: 'Popular' },
    { id: 'pesto-sourdough', cat: 'sourdough', name: 'Pesto Sourdough', price: 500, unit: '500 g',
      desc: 'Basil pesto and cheese folded through a naturally leavened loaf.',
      img: 'sourdough-crumb' },
    { id: 'seeded-sourdough', cat: 'sourdough', name: 'Seeded Sourdough', price: 450, unit: '500 g',
      desc: 'A seed-crusted everyday loaf for toast, sandwiches and dipping.',
      img: 'sourdough-board' },

    // ---------------- SNACKS ----------------
    { id: 'mixed-seed-chikki', cat: 'snacks', name: 'Mixed Seed Chikki', price: 750, unit: '250 g',
      desc: 'Crunchy, nutty, naturally sweet. Our No. 1 bestseller.',
      img: 'mixed-seed-chikki', badge: 'No. 1 bestseller' },
    { id: 'almond-sesame-chikki', cat: 'snacks', name: 'Roasted Almond & Sesame Chikki', price: 900, unit: '250 g',
      desc: 'Made for gifting, snacking and hiding from the family.',
      img: 'almond-sesame-chikki' },
    { id: 'tom-yum-nuts', cat: 'snacks', name: 'Tom Yum Nuts', price: 700, unit: '200 g',
      desc: 'Roasted nuts with a Thai tom yum kick. Hard to stop at one handful.',
      img: 'tom-yum-nuts', badge: 'Popular' },
    { id: 'tom-yum-chivda', cat: 'snacks', name: 'Tom Yum Chivda', price: 300, unit: '150 g',
      desc: 'Classic chivda with a tom yum twist.',
      img: 'tom-yum-chivda', cutout: true, badge: 'New' },
    { id: 'ghee-podi-snack-mix', cat: 'snacks', name: 'Ghee Podi Snack Mix', price: 350, unit: '150 g',
      desc: 'A crunchy mix tossed in ghee and South Indian podi spice.',
      img: 'ghee-podi-mix', cutout: true, badge: 'New' },
    { id: 'ghee-podi-crackers', cat: 'snacks', name: 'Ghee Podi Crackers', price: 350, unit: '100 g',
      desc: 'Crisp crackers tossed in ghee and podi spice.',
      img: 'ghee-podi-crackers', cutout: true, badge: 'New' },
    { id: 'seeded-crackers', cat: 'snacks', name: 'Seeded Crackers', price: 300, unit: '75 g',
      desc: 'Thin, crisp and packed with seeds. Made for dips.',
      img: 'seeded-crackers', cutout: true },

    // ---------------- DIPS & PASTA ----------------
    { id: 'olive-tapenade', cat: 'dips', name: 'Olive Tapenade', price: 500, unit: '1 jar',
      desc: 'A briny, savoury olive spread for crackers, toast and cheese boards.',
      img: 'olive-tapenade-jars' },
    { id: 'pesto', cat: 'dips', name: 'Pesto', price: 550, unit: '1 jar',
      desc: 'House-made basil pesto. Toss it with pasta or spread it on sourdough.',
      img: 'pesto' },
    // Pasta and sauces: not on the Sep 2026 menus, so hidden (Sid, 23 Sep 2026).
    // Prices are from the old website. Set hidden: false (and check the price)
    // to bring them back; you may also want to rename the category above.
    { id: 'marinara', cat: 'dips', name: 'Marinara Sauce', price: 450, unit: '1 jar',
      desc: 'Slow-cooked tomato sauce with garlic and herbs.',
      img: 'marinara', hidden: true },
    { id: 'aglio-olio', cat: 'dips', name: 'Aglio e Olio', price: 550, unit: '1 jar',
      desc: 'Garlic, chilli and olive oil. Toss with hot pasta or dip your bread in it.',
      img: 'aglio-olio', hidden: true },
    { id: 'fresh-pasta', cat: 'dips', name: 'Fresh Pasta', price: 300, unit: '1 pack',
      desc: 'Fresh ribbon pasta that cooks in minutes. Pair it with any of our sauces.',
      img: 'fresh-pasta', hidden: true },

    // Photographed by the agency but not on the menu. Add a price and set
    // hidden: false to put it on the site.
    { id: 'vietnamese-rolls', cat: 'bites', name: 'Vietnamese Rolls', price: 0, unit: '',
      desc: 'Fresh rice-paper rolls with crunchy vegetables and a peanut dip.',
      img: 'vietnamese-rolls', hidden: true }
  ],

  combos: [
    { id: 'grazing-duo', name: 'The Grazing Duo', price: 750,
      tagline: 'Crackers and a dip, ready for the cheese board.',
      includes: ['Seeded Crackers (75 g)', 'Olive Tapenade (1 jar)'],
      img: 'grazing-duo' },
    { id: 'heartwarming-hits', name: 'The Heartwarming Hits', price: 3600,
      tagline: 'Our three most-loved bites. Enough for a houseful.',
      includes: ['12 Vada Pav Buns', '12 Pizza Twists', '12 Pesto Pinwheels'],
      img: 'buns-assorted', badge: 'For parties' },
    { id: 'tea-time-favourites', name: 'Tea-Time Favourites', price: 2100,
      tagline: 'Something savoury, something sweet, for 5 pm chai.',
      includes: ['12 Chana Kulcha Buns', 'Roasted Almond & Sesame Chikki (250 g)'],
      img: 'chana-kulcha-wood' }
  ],

  /* Customer reviews. Only real words from real customers, with their
     permission. Add more by copying a block. `img` is optional.
     hidden: true keeps a review in this file without showing it.
     All three below are hidden until confirmed as real (Sid, 23 Sep 2026).
     While no review is visible, the Kind Words section and its menu links
     hide themselves automatically. */
  testimonials: [
    { quote: 'The vada pav buns are absolutely incredible — they taste just like home. We order every week without fail! The kids love them as much as the adults.',
      name: 'Manisha V.', where: 'Colaba · Repeat customer', img: 'vada-pav-basket', product: 'Vada Pav Buns', hidden: true },
    { quote: "The mixed seeds chikki is the best I've ever had. I keep ordering it as gifts for friends and family — everyone asks where it's from.",
      name: 'Meera B.', where: 'Bandra · Loyal customer', img: 'chikki-hand', product: 'Mixed Seed Chikki', hidden: true },
    // Neha's review also praises gluten-free bread, which is not on the current menu.
    { quote: "Finally a gluten-free bread that actually tastes good! The sourdough has changed my mornings. Can't go back to store-bought.",
      name: 'Neha K.', where: 'South Mumbai · WhatsApp customer', img: 'sourdough-board', product: 'Sourdough', hidden: true }
  ]
};
