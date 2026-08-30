/* ==========================================================================
   Bipin Saha - Portfolio scripts
   --------------------------------------------------------------------------
   The structured-data (JSON-LD) blocks stay inline in index.html because
   search engines parse them as part of the document. This file holds
   behavioural JavaScript. Loaded with `defer`, so the DOM is ready.
   ========================================================================== */

/* Scroll-spy: highlight the sidebar index entry for the section in view. */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.rail a'));
  if (!links.length || !('IntersectionObserver' in window)) return;

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

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(byId[entry.target.id]);
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  document.querySelectorAll('main section[id]').forEach(function (section) {
    observer.observe(section);
  });
})();

/* Google Analytics - disabled.
   To re-enable: add the gtag.js loader <script> back to index.html <head>,
   then uncomment the four lines below.
--------------------------------------------------------------------------- */
// window.dataLayer = window.dataLayer || [];
// function gtag() { dataLayer.push(arguments); }
// gtag('js', new Date());
// gtag('config', 'G-WCNN3YFX6X');
