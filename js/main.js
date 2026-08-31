/* ==========================================================================
   Bipin Saha - Portfolio scripts
   --------------------------------------------------------------------------
   The structured-data (JSON-LD) blocks stay inline in index.html because
   search engines parse them as part of the document. This file holds
   behavioural JavaScript. Loaded with `defer`, so the DOM is ready.
   ========================================================================== */

/* Scroll-spy: highlight the sidebar index entry for the section in view.
   Doubles as the source of GoatCounter "section viewed" events. */
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

  var seen = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      setActive(byId[id]);
      if (id && !seen[id]) {
        seen[id] = true;
        track('view-' + id, 'Viewed section: ' + id);
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  document.querySelectorAll('main section[id]').forEach(function (section) {
    observer.observe(section);
  });
})();

/* --------------------------------------------------------------------------
   GoatCounter custom events - which content visitors actually engage with.
   The pageview itself is counted by gc.zgo.at/count.js (loaded in index.html);
   here we add events for CV downloads, publication links, socials, sub-pages,
   and outbound links. Privacy-friendly: no identifiers, just counts.
   -------------------------------------------------------------------------- */

/* Fire a GoatCounter event. No-ops if the script is blocked or not yet loaded. */
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

document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('a') : null;
  if (!a) return;
  var href = a.getAttribute('href') || '';
  var text = (a.textContent || '').trim().replace(/\s+/g, ' ');

  if (a.classList.contains('btn-cv')) {
    track('click-cv', 'Clicked: Curriculum Vitae');
    return;
  }
  if (/^mailto:/i.test(href)) {
    track('click-email', 'Clicked email: ' + href.replace(/^mailto:/i, ''));
    return;
  }
  if (a.closest('.social')) {
    track('click-social-' + slug(text), 'Social: ' + text);
    return;
  }
  if (href.indexOf('project-pages/') !== -1) {
    track('click-project-' + slug(href.split('/').pop().replace(/\.html$/, '')), 'Project page: ' + text);
    return;
  }
  if (href.indexOf('writeups/') !== -1) {
    track('click-writeup-' + slug(href.split('/').pop().replace(/\.html$/, '')), 'Writeup: ' + text);
    return;
  }
  if (a.closest('#publications') && /^https?:/i.test(href)) {
    var pub = a.closest('.pub');
    var titleEl = pub && pub.querySelector('.pub-title');
    var pubName = titleEl ? titleEl.textContent.trim() : 'unknown';
    track('click-pub-' + slug(pubName).slice(0, 60), 'Pub link (' + text + '): ' + pubName);
    return;
  }
  if (/^https?:\/\//i.test(href) && a.hostname && a.hostname !== window.location.hostname) {
    track('click-outbound', 'Outbound: ' + a.hostname + a.pathname);
  }
});
