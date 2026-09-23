/* The Homestyle Bakery — site behaviour
   Menu data lives in assets/js/menu-data.js. Nothing in this file needs
   editing for price or item changes. */
(function () {
  'use strict';

  var D = window.THSB;
  if (!D) return;
  var C = D.config;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function inr(n) { return '₹' + Number(n).toLocaleString('en-IN'); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function waLink(text) { return 'https://wa.me/' + C.whatsapp + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function img(name, size) { return 'assets/img/' + name + '-' + size + '.webp'; }
  function srcset(p) { return p.cutout ? img(p.img, 480) + ' 480w' : img(p.img, 480) + ' 480w, ' + img(p.img, 800) + ' 800w'; }

  /* ---------- Analytics hook (GA4 and/or Vercel Analytics if enabled) ---------- */
  function track(name, params) {
    try {
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
      if (typeof window.va === 'function') window.va('event', { name: name, data: params || {} });
    } catch (e) { /* never block the page */ }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]');
    if (a) track(a.getAttribute('data-track'), { label: a.getAttribute('data-track-label') || '' });
  });

  /* ---------- Catalogue ---------- */
  var items = D.items.filter(function (i) { return !i.hidden; });
  var byId = {};
  items.forEach(function (i) { byId[i.id] = i; });
  D.combos.forEach(function (c) { byId['combo:' + c.id] = { id: 'combo:' + c.id, name: c.name, price: c.price, unit: 'combo', img: c.img, isCombo: true, includes: c.includes }; });

  /* ---------- Cart state (saved in this browser only) ---------- */
  var KEY = 'thsb-order-v2';
  var cart = {};
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    Object.keys(saved).forEach(function (id) { if (byId[id] && saved[id] > 0) cart[id] = Math.min(99, saved[id] | 0); });
  } catch (e) { cart = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* private mode */ } }
  function count() { return Object.keys(cart).reduce(function (s, id) { return s + cart[id]; }, 0); }
  function subtotal() { return Object.keys(cart).reduce(function (s, id) { return s + cart[id] * byId[id].price; }, 0); }
  function delivery(sub) { return sub >= C.freeDeliveryAbove ? 0 : C.deliveryFee; }

  function setQty(id, q, source) {
    var before = cart[id] || 0;
    q = Math.max(0, Math.min(99, q));
    if (q === 0) delete cart[id]; else cart[id] = q;
    save();
    render();
    if (q > before) {
      toast('Added ' + byId[id].name + ' to your order');
      var b = $('#cartBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
      track('add_to_order', { item: id, source: source || '' });
    }
  }

  /* ---------- Menu rendering ---------- */
  function control(id) {
    var q = cart[id] || 0;
    var p = byId[id];
    if (!q) return '<button type="button" class="add-btn" data-add="' + id + '" aria-label="Add ' + esc(p.name) + ' to your order">Add <span aria-hidden="true">+</span></button>';
    return '<div class="stepper" role="group" aria-label="' + esc(p.name) + ' quantity">' +
      '<button type="button" data-dec="' + id + '" aria-label="Remove one ' + esc(p.name) + '">−</button>' +
      '<output aria-live="polite">' + q + '</output>' +
      '<button type="button" data-inc="' + id + '" aria-label="Add one more ' + esc(p.name) + '">+</button></div>';
  }

  function badgeClass(b) {
    if (/new/i.test(b)) return 'badge is-new';
    if (/bestseller|no\. 1/i.test(b)) return 'badge is-gold';
    return 'badge';
  }

  function renderMenu() {
    var tabs = $('#catTabs'), host = $('#menuSections');
    if (!tabs || !host) return;
    var tabHtml = '', html = '';
    D.categories.forEach(function (cat, i) {
      var list = items.filter(function (it) { return it.cat === cat.id; });
      if (!list.length) return;
      tabHtml += '<a href="#cat-' + cat.id + '"' + (i === 0 ? ' class="is-active"' : '') + '>' + esc(cat.name) + ' <small>' + list.length + '</small></a>';
      html += '<section class="menu-cat" id="cat-' + cat.id + '" aria-labelledby="h-' + cat.id + '">' +
        '<div class="menu-cat-head"><h3 id="h-' + cat.id + '">' + esc(cat.name) + '</h3><p>' + esc(cat.blurb) + '</p></div>' +
        '<div class="product-grid">' + list.map(card).join('') + '</div></section>';
    });
    tabHtml += '<a href="#combos">Combos <small>' + D.combos.length + '</small></a>';
    tabs.innerHTML = tabHtml;
    host.innerHTML = html;
  }

  function card(p) {
    var tags = p.jain ? '<div class="product-tags"><span class="tag">Jain option</span></div>' : '';
    return '<article class="product" data-product="' + p.id + '">' +
      '<div class="product-media' + (p.cutout ? ' is-cutout' : '') + '">' +
        (p.badge ? '<span class="' + badgeClass(p.badge) + '">' + esc(p.badge) + '</span>' : '') +
        '<img src="' + img(p.img, 480) + '" srcset="' + srcset(p) + '" sizes="(min-width:1100px) 270px, (min-width:720px) 30vw, 46vw" width="480" height="600" alt="' + esc(p.name) + '" loading="lazy" decoding="async">' +
      '</div>' +
      '<div class="product-body">' +
        '<h4 class="product-name">' + esc(p.name) + '</h4>' +
        '<p class="product-desc">' + esc(p.desc) + '</p>' + tags +
        '<div class="product-foot"><div class="price"><strong>' + inr(p.price) + '</strong><span>' + esc(p.unit) + '</span></div>' +
        '<div class="ctl" data-ctl="' + p.id + '">' + control(p.id) + '</div></div>' +
      '</div></article>';
  }

  function renderCombos() {
    var host = $('#comboGrid');
    if (!host) return;
    host.innerHTML = D.combos.map(function (c) {
      var id = 'combo:' + c.id;
      return '<article class="combo">' +
        '<div class="combo-media">' + (c.badge ? '<span class="badge is-gold">' + esc(c.badge) + '</span>' : '') +
          '<img src="' + img(c.img, 800) + '" srcset="' + img(c.img, 480) + ' 480w, ' + img(c.img, 800) + ' 800w" sizes="(min-width:760px) 33vw, 100vw" width="800" height="1000" alt="' + esc(c.name) + '" loading="lazy" decoding="async"></div>' +
        '<div class="combo-body"><h3>' + esc(c.name) + '</h3><p class="combo-tagline">' + esc(c.tagline) + '</p>' +
          '<ul class="combo-includes">' + c.includes.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
          '<div class="combo-foot"><div class="price"><strong>' + inr(c.price) + '</strong><span>per set</span></div>' +
          '<div class="ctl" data-ctl="' + id + '">' + control(id) + '</div></div></div></article>';
    }).join('');
  }

  function renderReviews() {
    var host = $('#reviewGrid');
    if (!host || !D.testimonials) return;
    var shown = D.testimonials.filter(function (t) { return !t.hidden; });
    if (!shown.length) {
      var sec = $('#reviews'); if (sec) sec.hidden = true;
      $$('a[href="#reviews"]').forEach(function (a) { var li = a.closest('li'); (li || a).hidden = true; });
      return;
    }
    host.innerHTML = shown.map(function (t) {
      return '<figure class="review">' +
        (t.img ? '<div class="review-media"><img src="' + img(t.img, 480) + '" width="56" height="56" alt="" loading="lazy"><span>' + esc(t.product || '') + '</span></div>' : '') +
        '<blockquote>' + esc(t.quote) + '</blockquote>' +
        '<figcaption><strong>' + esc(t.name) + '</strong><span>' + esc(t.where) + '</span></figcaption></figure>';
    }).join('');
  }

  /* ---------- UI updates ---------- */
  function render() {
    var n = count(), sub = subtotal(), del = delivery(sub);

    // card controls
    $$('[data-ctl]').forEach(function (el) {
      var id = el.getAttribute('data-ctl');
      var html = control(id);
      if (el.innerHTML !== html) {
        var hadFocus = el.contains(document.activeElement) ? document.activeElement.getAttribute('data-add') || document.activeElement.getAttribute('data-inc') || document.activeElement.getAttribute('data-dec') : null;
        var which = hadFocus && document.activeElement.hasAttribute('data-dec') ? 'dec' : 'inc';
        el.innerHTML = html;
        if (hadFocus) { var t = el.querySelector('[data-' + which + ']') || el.querySelector('[data-add]') || el.querySelector('[data-inc]'); if (t) t.focus(); }
      }
    });

    // header + floating bar
    var cc = $('#cartCount');
    cc.textContent = n; cc.hidden = n === 0;
    $('#cartBtn').setAttribute('aria-label', 'Your order, ' + n + (n === 1 ? ' item' : ' items'));
    document.body.classList.toggle('has-cart', n > 0);
    var bar = $('#orderBar');
    bar.hidden = n === 0 || drawerOpen;
    $('#orderBarCount').textContent = n + (n === 1 ? ' item' : ' items');
    $('#orderBarTotal').textContent = inr(sub);

    // drawer lines (keep keyboard focus on the same stepper button)
    var ae = document.activeElement, keep = null;
    if (ae && $('#cartLines').contains(ae)) keep = ae.hasAttribute('data-dec') ? '[data-dec="' + ae.getAttribute('data-dec') + '"]' : '[data-inc="' + ae.getAttribute('data-inc') + '"]';
    var ids = Object.keys(cart);
    $('#cartEmpty').hidden = ids.length > 0;
    $('#cartSummary').hidden = ids.length === 0;
    $('#cartLines').innerHTML = ids.map(function (id) {
      var p = byId[id];
      return '<li class="cart-line">' +
        '<img src="' + img(p.img, 480) + '" alt="" width="56" height="56" loading="lazy">' +
        '<div><div class="cart-line-name">' + esc(p.name) + '</div><div class="cart-line-meta">' + (p.isCombo ? 'Combo' : esc(p.unit)) + ' · ' + inr(p.price) + '</div></div>' +
        '<div class="cart-line-right"><strong>' + inr(p.price * cart[id]) + '</strong>' +
        '<div class="stepper" role="group" aria-label="' + esc(p.name) + ' quantity"><button type="button" data-dec="' + id + '" aria-label="Remove one ' + esc(p.name) + '">−</button><output>' + cart[id] + '</output><button type="button" data-inc="' + id + '" aria-label="Add one more ' + esc(p.name) + '">+</button></div></div></li>';
    }).join('');

    if (keep) { var k = $('#cartLines ' + keep) || $('#cartLines [data-inc]') || $('#drawerClose'); if (k) k.focus(); }

    // totals
    $('#sumSubtotal').textContent = inr(sub);
    $('#sumDelivery').innerHTML = del === 0 ? '<s aria-hidden="true">' + inr(C.deliveryFee) + '</s> Free' : inr(del);
    $('#sumTotal').textContent = inr(sub + del);
    var short = C.minOrder - sub;
    var mp = $('#minProgress');
    mp.classList.toggle('is-met', short <= 0);
    $('#minMsg').textContent = short > 0 ? 'Add ' + inr(short) + ' more to reach the ₹' + C.minOrder.toLocaleString('en-IN') + ' minimum order.' : 'Minimum order reached.';
    $('#minBar').style.width = Math.min(100, (sub / C.minOrder) * 100) + '%';
    var toFree = C.freeDeliveryAbove - sub;
    $('#freeHint').textContent = toFree > 0 && sub > 0 ? 'Add ' + inr(toFree) + ' more for free delivery.' : '';
    var send = $('#sendOrder');
    send.disabled = short > 0;
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-visible'); }, 2200);
  }

  /* ---------- Clicks on add / steppers ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add],[data-inc],[data-dec]');
    if (!b) return;
    var id = b.getAttribute('data-add') || b.getAttribute('data-inc') || b.getAttribute('data-dec');
    if (!byId[id]) return;
    var src = b.closest('.drawer') ? 'drawer' : (id.indexOf('combo:') === 0 ? 'combos' : 'menu');
    if (b.hasAttribute('data-dec')) setQty(id, (cart[id] || 0) - 1, src);
    else setQty(id, (cart[id] || 0) + 1, src);
  });

  /* ---------- Drawer ---------- */
  var drawer = $('#cartDrawer'), backdrop = $('#drawerBackdrop'), lastFocus = null, drawerOpen = false;
  function openDrawer() {
    lastFocus = document.activeElement;
    drawerOpen = true;
    drawer.hidden = false; backdrop.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add('is-open'); backdrop.classList.add('is-open'); });
    document.body.classList.add('drawer-open');
    $('#cartBtn').setAttribute('aria-expanded', 'true');
    $('#orderBar').hidden = true;
    setTimeout(function () { $('#drawerClose').focus(); }, 60);
    track('view_order', { items: count() });
  }
  function closeDrawer() {
    drawerOpen = false;
    drawer.classList.remove('is-open'); backdrop.classList.remove('is-open');
    document.body.classList.remove('drawer-open');
    $('#cartBtn').setAttribute('aria-expanded', 'false');
    setTimeout(function () { if (!drawerOpen) { drawer.hidden = true; backdrop.hidden = true; } }, 320);
    render();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $('#cartBtn').addEventListener('click', openDrawer);
  $('#orderBar').addEventListener('click', openDrawer);
  $('#drawerClose').addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  $$('[data-close-drawer]').forEach(function (a) { a.addEventListener('click', closeDrawer); });
  document.addEventListener('keydown', function (e) {
    if (!drawerOpen) return;
    if (e.key === 'Escape') { closeDrawer(); return; }
    if (e.key === 'Tab') {
      var f = $$('button:not([disabled]), [href], input, select, textarea', drawer).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Order form → WhatsApp ---------- */
  var form = $('#orderForm'), area = $('#fArea'), date = $('#fDate');
  C.deliveryAreas.forEach(function (a) { var o = document.createElement('option'); o.value = a; o.textContent = a; area.appendChild(o); });
  var other = document.createElement('option'); other.value = 'Other (see notes)'; other.textContent = 'Somewhere else (add it in notes)'; area.appendChild(other);
  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  date.min = today.toISOString().slice(0, 10);
  try {
    var who = JSON.parse(localStorage.getItem('thsb-customer') || '{}');
    if (who.name) $('#fName').value = who.name;
    if (who.area) area.value = who.area;
  } catch (e) { /* ignore */ }

  function fieldError(id, show) {
    var input = $('#' + id);
    input.closest('.field').classList.toggle('has-error', show);
    $('#' + id + 'Err').hidden = !show;
    input.setAttribute('aria-invalid', show ? 'true' : 'false');
  }
  ['fName', 'fArea', 'fNotes', 'fDate'].forEach(function (id) {
    $('#' + id).addEventListener('input', function () { fieldError(id, false); });
    $('#' + id).addEventListener('change', function () { fieldError(id, false); });
  });

  function niceDate(v) {
    if (!v) return '';
    var d = new Date(v + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#fName').value.trim(), ar = area.value, notes = $('#fNotes').value.trim(), dt = date.value;
    var bad = false;
    if (!name) { fieldError('fName', true); bad = true; }
    if (!ar) { fieldError('fArea', true); bad = true; }
    if (ar && ar.indexOf('Other') === 0 && !notes) { fieldError('fNotes', true); bad = true; }
    if (dt && dt < date.min) { fieldError('fDate', true); bad = true; }
    if (bad) { var firstBad = $('.order-form .has-error input, .order-form .has-error select, .order-form .has-error textarea'); if (firstBad) firstBad.focus(); return; }
    var sub = subtotal();
    if (sub < C.minOrder) return;
    var del = delivery(sub);
    var lines = Object.keys(cart).map(function (id) {
      var p = byId[id];
      return '• ' + cart[id] + ' × ' + p.name + (p.isCombo ? ' (combo: ' + p.includes.join(' + ') + ')' : ' (' + p.unit + ')') + ' — ' + inr(p.price * cart[id]);
    });
    var msg = "Hi! I'd like to place an order with The Homestyle Bakery:\n\n" + lines.join('\n') +
      '\n\nSubtotal: ' + inr(sub) +
      '\nDelivery: ' + (del ? inr(del) : 'Free') +
      '\nEstimated total: ' + inr(sub + del) + ' + GST' +
      '\n\nName: ' + name +
      '\nArea: ' + ar +
      (dt ? '\nPreferred date: ' + niceDate(dt) : '') +
      (notes ? '\nNotes: ' + notes : '') +
      '\n\n(Sent from the website)';
    try { localStorage.setItem('thsb-customer', JSON.stringify({ name: name, area: ar })); } catch (err) { /* ignore */ }
    track('send_order_whatsapp', { value: sub, items: count() });
    var url = waLink(msg);
    var w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (err) { /* ignore */ } } else { window.location.href = url; }
    $('#sentNote').hidden = false;
    toast('Your order is ready in WhatsApp. Just tap send.');
  });

  $('#clearOrder').addEventListener('click', function () {
    cart = {}; save(); $('#sentNote').hidden = true; render();
    toast('Order cleared. Thank you!');
    closeDrawer();
  });

  /* ---------- Plain WhatsApp links: keep the number in one place ---------- */
  $$('a[data-wa]').forEach(function (a) {
    var m = a.getAttribute('href').match(/[?&]text=([^&]*)/);
    a.setAttribute('href', waLink(m ? decodeURIComponent(m[1]) : ''));
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  /* ---------- Header: mobile menu + shadow on scroll ---------- */
  var nav = $('#mainNav'), toggle = $('#menuToggle');
  function setNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); } });
  var header = $('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Hero carousel ---------- */
  (function () {
    var root = $('#heroCarousel');
    if (!root) return;
    var slides = $$('.slide', root), dots = $$('.carousel-dots button[data-slide]', root), pauseBtn = $('.carousel-pause', root), i = 0, timer = null, paused = reduceMotion;
    function warm(n) { var im = slides[n % slides.length].querySelector('img'); if (im && im.loading === 'lazy') im.loading = 'eager'; }
    function go(n) {
      slides[i].classList.remove('is-active'); slides[i].setAttribute('aria-hidden', 'true'); dots[i].removeAttribute('aria-current');
      i = (n + slides.length) % slides.length;
      warm(i);
      slides[i].classList.add('is-active'); slides[i].removeAttribute('aria-hidden'); dots[i].setAttribute('aria-current', 'true');
      setTimeout(function () { warm(i + 1); }, 1500);
    }
    slides.forEach(function (s, n) { if (n) s.setAttribute('aria-hidden', 'true'); });
    function start() { if (!paused && !timer) timer = setInterval(function () { go(i + 1); }, 5000); }
    function stop() { clearInterval(timer); timer = null; }
    function setPaused(p) {
      paused = p; if (p) stop(); else start();
      pauseBtn.setAttribute('aria-label', p ? 'Play slideshow' : 'Pause slideshow');
      pauseBtn.classList.toggle('is-paused', p);
    }
    if (pauseBtn) { pauseBtn.addEventListener('click', function () { setPaused(!paused); }); setPaused(paused); }
    dots.forEach(function (d, n) { d.addEventListener('click', function () { stop(); go(n); start(); }); });
    root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop); root.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    window.addEventListener('load', function () { setTimeout(function () { warm(1); }, 1200); });
    start();
  })();

  /* ---------- Kitchen reels: play when on screen ---------- */
  (function () {
    var vids = $$('.reel video');
    if (!vids.length) return;
    vids.forEach(function (v) {
      v.setAttribute('tabindex', '0');
      function toggle() { var p = v.paused ? v.play() : v.pause(); if (p && p.catch) p.catch(function () {}); }
      v.addEventListener('click', toggle);
      v.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting && en.intersectionRatio > 0.55) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: [0, 0.55, 1] });
    vids.forEach(function (v) { io.observe(v); });
  })();

  /* ---------- Scroll spy for nav + menu tabs ---------- */
  function spy(links, attr, rootMargin) {
    if (!('IntersectionObserver' in window) || !links.length) return;
    var map = {};
    links.forEach(function (a) { var id = a.getAttribute('href').slice(1); var el = document.getElementById(id); if (el) map[id] = { a: a, el: el }; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        var hit = map[en.target.id];
        if (hit) {
          hit.a.classList.add('is-active');
          if (attr === 'tabs') {
            var bar = hit.a.parentElement;
            var left = hit.a.offsetLeft - bar.clientWidth / 2 + hit.a.clientWidth / 2;
            bar.scrollTo({ left: left, behavior: reduceMotion ? 'auto' : 'smooth' });
          }
        }
      });
    }, { rootMargin: rootMargin, threshold: 0 });
    Object.keys(map).forEach(function (k) { io.observe(map[k].el); });
  }

  /* ---------- Floating WhatsApp button appears once the hero buttons scroll away ---------- */
  (function () {
    var ctas = $('.hero-ctas');
    if (!ctas || !('IntersectionObserver' in window)) { document.body.classList.add('past-hero'); return; }
    new IntersectionObserver(function (en) {
      document.body.classList.toggle('past-hero', !en[0].isIntersecting && en[0].boundingClientRect.top < 0);
    }).observe(ctas);
  })();

  /* ---------- Structured data: menu + FAQ (for Google) ---------- */
  function addJsonLd(obj) {
    var s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(obj); document.head.appendChild(s);
  }
  function structuredData() {
    addJsonLd({
      '@context': 'https://schema.org', '@type': 'Menu', '@id': C.siteUrl + '/#menu', name: 'The Homestyle Bakery menu', url: C.siteUrl + '/#menu',
      inLanguage: 'en-IN',
      hasMenuSection: D.categories.map(function (cat) {
        return { '@type': 'MenuSection', name: cat.name, hasMenuItem: items.filter(function (i) { return i.cat === cat.id; }).map(function (i) {
          return { '@type': 'MenuItem', name: i.name, description: i.desc + ' (' + i.unit + ')', image: C.siteUrl + '/' + img(i.img, 480),
            suitableForDiet: 'https://schema.org/VegetarianDiet',
            offers: { '@type': 'Offer', price: i.price, priceCurrency: 'INR', valueAddedTaxIncluded: false } };
        }) };
      }).concat([{ '@type': 'MenuSection', name: 'Combos', hasMenuItem: D.combos.map(function (c) {
        return { '@type': 'MenuItem', name: c.name, description: c.includes.join(' + '), offers: { '@type': 'Offer', price: c.price, priceCurrency: 'INR', valueAddedTaxIncluded: false } };
      }) }])
    });
    addJsonLd({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: $$('.faq details').map(function (d) {
        return { '@type': 'Question', name: $('summary', d).textContent.trim(), acceptedAnswer: { '@type': 'Answer', text: $('p', d).textContent.trim() } };
      })
    });
  }

  /* ---------- Boot ---------- */
  renderMenu();
  renderCombos();
  renderReviews();
  render();
  spy($$('.main-nav ul a[href^="#"]'), 'nav', '-45% 0px -50% 0px');
  spy($$('#catTabs a'), 'tabs', '-30% 0px -65% 0px');
  structuredData();
  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
