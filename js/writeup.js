/* ==========================================================================
   Bipin Saha - Writeup template scripts
   --------------------------------------------------------------------------
   Shared behaviour for every /writeups/ article. Loaded with `defer`, so the
   DOM is ready. Four jobs, all progressive enhancement - the page is fully
   usable with JS disabled:

     1. Contents rail scroll-spy (mirrors js/main.js on the home page).
     2. Hover "#" anchors on section headings for deep-linking.
     3. GoatCounter custom events (reading depth, reference + outbound clicks).
     4. English / Bangla language toggle (persisted in localStorage). A tiny
        inline <head> script applies the stored choice before first paint;
        this block wires the buttons and keeps <html lang> + aria in sync.

   Structured data (JSON-LD) stays inline in each article's <head>.
   ========================================================================== */

/* Fire a GoatCounter event. No-ops if the script is blocked or not loaded. */
function track(path, title) {
  try {
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({ path: path, title: title || path, event: true });
    }
  } catch (e) { /* analytics must never break the page */ }
}

function slug(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/* --- 1. Contents rail scroll-spy ---------------------------------------- */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.w-toc a'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var pageSlug = slug(document.title.split('|')[0]) || 'writeup';
  var byId = {};
  links.forEach(function (a) {
    var id = (a.getAttribute('href') || '').replace(/^#/, '');
    if (id) byId[id] = a;
  });

  var current = null;
  function setActive(a) {
    if (a === current) return;
    if (current) current.classList.remove('is-active');
    if (a) a.classList.add('is-active');
    current = a || null;
  }

  var seen = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      if (byId[id]) setActive(byId[id]);
      if (id && !seen[id]) {
        seen[id] = true;
        track('writeup-' + pageSlug + '-' + id, 'Read section: ' + id);
      }
    });
  }, { rootMargin: '-15% 0px -75% 0px', threshold: 0 });

  document.querySelectorAll('.prose section[id], .prose > h2[id]').forEach(function (el) {
    observer.observe(el);
  });
})();

/* --- 2. Heading anchor links ------------------------------------------- */
(function () {
  var heads = document.querySelectorAll('.prose h2[id], .prose h3[id]');
  Array.prototype.forEach.call(heads, function (h) {
    var a = document.createElement('a');
    a.className = 'w-anchor';
    a.href = '#' + h.id;
    a.textContent = '#';
    a.setAttribute('aria-label', 'Link to this section');
    h.appendChild(a);
  });
})();

/* --- 3. Reference + outbound click events ---------------------------- */
(function () {
  var pageSlug = slug(document.title.split('|')[0]) || 'writeup';

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';

    if (a.classList.contains('ref-link')) {
      track('writeup-' + pageSlug + '-cite', 'Citation jump: ' + href);
      return;
    }
    if (a.closest && a.closest('.w-refs') && /^https?:/i.test(href)) {
      track('writeup-ref-out', 'Reference source: ' + (a.hostname || href));
      return;
    }
    if (a.closest && a.closest('.w-prevnext')) {
      track('writeup-prevnext', 'Prev/next: ' + (a.textContent || '').trim());
      return;
    }
    if (/^https?:\/\//i.test(href) && a.hostname && a.hostname !== window.location.hostname) {
      track('writeup-outbound', 'Outbound: ' + a.hostname + a.pathname);
    }
  });
})();

/* --- 4. English / Bangla language toggle ------------------------------- */
(function () {
  var KEY = 'writeup-lang';
  var root = document.documentElement;
  var pageSlug = slug(document.title.split('|')[0]) || 'writeup';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function apply(lang) {
    lang = (lang === 'bn') ? 'bn' : 'en';
    root.setAttribute('lang', lang);
    var btns = document.querySelectorAll('.lang-toggle button');
    Array.prototype.forEach.call(btns, function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang-set') === lang));
    });
  }

  /* The inline <head> script already set <html lang>; mirror it onto aria. */
  apply(root.getAttribute('lang') || stored() || 'en');

  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('.lang-toggle button') : null;
    if (!b) return;
    var lang = b.getAttribute('data-lang-set') === 'bn' ? 'bn' : 'en';
    try { localStorage.setItem(KEY, lang); } catch (err) { /* private mode */ }
    apply(lang);
    track('writeup-' + pageSlug + '-lang-' + lang, 'Language: ' + lang);
  });
})();
