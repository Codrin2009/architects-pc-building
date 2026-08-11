/* ============================================================================
   ARCHITECTS PC BUILDING — comportament comun
   ----------------------------------------------------------------------------
   Trei lucruri, atât:
   1. meniul de pe mobil;
   2. dezvăluirile la derulare (singura mișcare din site);
   3. marcarea secțiunii curente în navigație.

   Fără dependențe. Fără pas de build.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     01  MENIU MOBIL
     Navigația e ascunsă doar dacă JS rulează și doar sub 900px, ca fără JS
     lista să rămână accesibilă.
     ---------------------------------------------------------------------- */

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  var mqMobile = window.matchMedia('(max-width: 899px)');

  function syncNavForViewport() {
    if (!nav || !toggle) return;
    if (mqMobile.matches) {
      nav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      nav.hidden = false;
    }
  }

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Închide' : 'Meniu';
  }

  if (toggle && nav) {
    syncNavForViewport();

    if (typeof mqMobile.addEventListener === 'function') {
      mqMobile.addEventListener('change', syncNavForViewport);
    } else if (typeof mqMobile.addListener === 'function') {
      mqMobile.addListener(syncNavForViewport);
    }

    toggle.addEventListener('click', function () {
      setNavOpen(nav.hidden);
    });

    // Un link atins pe mobil închide meniul.
    nav.addEventListener('click', function (e) {
      if (mqMobile.matches && e.target.closest('a')) setNavOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mqMobile.matches && !nav.hidden) {
        setNavOpen(false);
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     02  DEZVĂLUIRI LA DERULARE
     Elementele apar o singură dată, discret. Dacă utilizatorul a cerut mai
     puțină mișcare sau browserul nu are IntersectionObserver, totul e vizibil
     de la început.
     ---------------------------------------------------------------------- */

  var revealables = document.querySelectorAll('.reveal');

  function showAll() {
    for (var i = 0; i < revealables.length; i++) {
      revealables[i].classList.add('is-in');
    }
  }

  if (!revealables.length) {
    // nimic de făcut
  } else if (reduceMotion || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    for (var j = 0; j < revealables.length; j++) {
      observer.observe(revealables[j]);
    }
  }

  /* ------------------------------------------------------------------------
     03  SECȚIUNEA CURENTĂ ÎN NAVIGAȚIE
     Stare, nu animație: linkul secțiunii în care ești primește o linie roșie.
     ---------------------------------------------------------------------- */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav__link[href^="#"]')
  );

  if (navLinks.length && 'IntersectionObserver' in window) {
    var sections = navLinks
      .map(function (link) {
        return document.querySelector(link.getAttribute('href'));
      })
      .filter(Boolean);

    var visible = {};

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting;
        });

        var currentId = null;
        for (var k = 0; k < sections.length; k++) {
          if (visible[sections[k].id]) {
            currentId = sections[k].id;
            break;
          }
        }

        navLinks.forEach(function (link) {
          if (currentId && link.getAttribute('href') === '#' + currentId) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }
})();
