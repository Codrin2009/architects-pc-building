/* ============================================================================
   ARCHITECTS PC BUILDING — fișa de proiect (oferta.html)
   ----------------------------------------------------------------------------
   1. preia direcția aleasă din URL (oferta.html?scop=gamer);
   2. completează blocul de titlu pe măsură ce se răspunde;
   3. validează în browser;
   4. trimite — prin SINGURA funcție care trebuie modificată: sendBrief().
   ========================================================================== */

(function () {
  'use strict';

  var form = document.getElementById('briefForm');
  if (!form) return;

  var summary = document.getElementById('formSummary');
  var summaryList = document.getElementById('formSummaryList');
  var done = document.getElementById('formDone');
  var doneNote = document.getElementById('doneNote');

  /* ========================================================================
     AICI SE LEAGĂ FORMULARUL  ←←← SINGURUL LOC DE MODIFICAT
     ------------------------------------------------------------------------
     Pune adresa web app-ului Google Apps Script în ENDPOINT. Arată așa:
       https://script.google.com/macros/s/AKfycb.../exec

     Instrucțiunile de instalare sunt în apps-script/Cod.gs și în README § 5.

     Cât timp ENDPOINT e gol, fișa NU pleacă nicăieri: se scrie doar în
     consola browserului, ca să poți testa formularul.
     ==================================================================== */

  var ENDPOINT = ''; // TODO: pune aici adresa /exec de la Apps Script.

  async function sendBrief(data) {
    if (!ENDPOINT) {
      console.info('[Architects] Fișă completată (netrimisă):', data);
      return { ok: true, delivered: false };
    }

    /* De ce text/plain și nu application/json:
       Apps Script nu răspunde la cererea preliminară OPTIONS pe care browserul
       o trimite înainte de un POST cu application/json. Cu text/plain, cererea
       intră în categoria „simplă” și pleacă direct, fără OPTIONS. Conținutul
       rămâne JSON — îl citim cu JSON.parse în Cod.gs. */
    var response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    });

    if (!response.ok) return { ok: false, delivered: false };

    var result = await response.json();
    return { ok: result.ok !== false, delivered: result.ok !== false };
  }

  /* ------------------------------------------------------------------------
     01  DIRECȚIA PRELUATĂ DIN URL
     ---------------------------------------------------------------------- */

  var SCOP_DIN_URL = {
    gamer: 'Gamer',
    creator: 'Creator',
    profesionist: 'Profesionist'
  };

  var params = new URLSearchParams(window.location.search);
  var scopCerut = SCOP_DIN_URL[(params.get('scop') || '').toLowerCase()];

  if (scopCerut) {
    var preselect = form.querySelector(
      'input[name="scop"][value="' + scopCerut + '"]'
    );
    if (preselect) preselect.checked = true;
  }

  /* ------------------------------------------------------------------------
     02  BLOCUL DE TITLU CARE SE COMPLETEAZĂ SINGUR
     ---------------------------------------------------------------------- */

  var GOL = '—';

  function labelForChecked(name) {
    var input = form.querySelector('input[name="' + name + '"]:checked');
    if (!input) return GOL;
    return input.getAttribute('data-label') || input.value;
  }

  function labelsForChecked(name) {
    var inputs = form.querySelectorAll('input[name="' + name + '"]:checked');
    if (!inputs.length) return GOL;
    return Array.prototype.map
      .call(inputs, function (input) {
        return input.getAttribute('data-label') || input.value;
      })
      .join(', ');
  }

  function textOrDash(id) {
    var field = document.getElementById(id);
    var value = field ? field.value.trim() : '';
    return value || GOL;
  }

  function setCell(id, value) {
    var cell = document.getElementById(id);
    if (cell) cell.textContent = value;
  }

  /* Dacă a ales „Altceva”, în blocul de titlu apare ce a scris el, nu
     cuvântul „Altceva” — e mai util și pentru el, și pentru noi. */
  function scopLabel() {
    var chosen = form.querySelector('input[name="scop"]:checked');
    var liber = document.getElementById('scop_liber');
    var text = liber ? liber.value.trim() : '';

    if (chosen && chosen.value === 'Altceva') return text || 'Altceva';
    if (!chosen && text) return text;
    return chosen ? chosen.getAttribute('data-label') || chosen.value : GOL;
  }

  function refreshTitleBlock() {
    setCell('tbScop', scopLabel());
    setCell('tbBuget', labelForChecked('buget'));
    setCell('tbCarcasa', labelForChecked('carcasa'));
    setCell('tbCuloare', labelForChecked('culoare'));
    setCell('tbRgb', labelForChecked('rgb'));
    setCell('tbSistem', labelForChecked('sistem'));
    setCell('tbProcesor', labelForChecked('procesor'));
    setCell('tbPeriferice', labelsForChecked('periferice'));
    setCell('tbNume', textOrDash('nume'));
    setCell('tbOras', textOrDash('oras'));
  }

  /* ------------------------------------------------------------------------
     „Nu am nevoie de periferice” se exclude reciproc cu celelalte bife.
     Bifezi „nu am nevoie” → se sting toate celelalte.
     Bifezi orice altceva → se stinge „nu am nevoie”.
     ---------------------------------------------------------------------- */

  var PERIFERIC_EXCLUSIV = 'Nu am nevoie de periferice';

  function aplicaExclusivitatePeriferice(target) {
    if (!target || target.name !== 'periferice' || !target.checked) return;

    var toate = form.querySelectorAll('input[name="periferice"]');

    Array.prototype.forEach.call(toate, function (input) {
      if (input === target) return;

      var stingeCelelalte = target.value === PERIFERIC_EXCLUSIV;
      var stingeExclusivul = input.value === PERIFERIC_EXCLUSIV;

      if (stingeCelelalte || stingeExclusivul) input.checked = false;
    });
  }

  function onFormChange(event) {
    aplicaExclusivitatePeriferice(event && event.target);
    refreshTitleBlock();
  }

  var today = new Date();
  setCell(
    'tbData',
    String(today.getDate()).padStart(2, '0') +
      '.' +
      String(today.getMonth() + 1).padStart(2, '0') +
      '.' +
      today.getFullYear()
  );

  form.addEventListener('input', onFormChange);
  form.addEventListener('change', onFormChange);
  refreshTitleBlock();

  /* ------------------------------------------------------------------------
     03  VALIDARE
     ---------------------------------------------------------------------- */

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function showError(errorId, message, field) {
    var slot = document.getElementById(errorId);
    if (slot) slot.textContent = message;
    if (field) field.setAttribute('aria-invalid', 'true');
  }

  function clearError(errorId, field) {
    var slot = document.getElementById(errorId);
    if (slot) slot.textContent = '';
    if (field) field.removeAttribute('aria-invalid');
  }

  function validate() {
    var problems = [];

    // Scopul
    var scopAles = form.querySelector('input[name="scop"]:checked');
    var scopLiber = document.getElementById('scop_liber');

    if (!scopAles) {
      showError('err-scop', 'Alege ce se apropie cel mai mult de ce faci.');
      problems.push({
        text: 'Nu ai ales scopul.',
        focus: form.querySelector('input[name="scop"]')
      });
    } else {
      clearError('err-scop');
    }

    // „Altceva” fără explicație nu ne spune nimic.
    if (scopAles && scopAles.value === 'Altceva' && !scopLiber.value.trim()) {
      showError('err-scop_liber', 'Scrie în două cuvinte ce faci cu el.', scopLiber);
      problems.push({ text: 'Ai ales „Altceva”, dar nu ai scris ce faci.', focus: scopLiber });
    } else {
      clearError('err-scop_liber', scopLiber);
    }

    // Bugetul
    if (!form.querySelector('input[name="buget"]:checked')) {
      showError('err-buget', 'Alege un interval de buget.');
      problems.push({
        text: 'Nu ai ales bugetul.',
        focus: form.querySelector('input[name="buget"]')
      });
    } else {
      clearError('err-buget');
    }

    // Numele
    var nume = document.getElementById('nume');
    if (!nume.value.trim()) {
      showError('err-nume', 'Scrie-ne cum te cheamă.', nume);
      problems.push({ text: 'Lipsește numele.', focus: nume });
    } else {
      clearError('err-nume', nume);
    }

    // Emailul
    var email = document.getElementById('email');
    if (!email.value.trim()) {
      showError('err-email', 'Avem nevoie de un email ca să îți răspundem.', email);
      problems.push({ text: 'Lipsește emailul.', focus: email });
    } else if (!EMAIL_RE.test(email.value.trim())) {
      showError('err-email', 'Emailul nu pare valid. Verifică-l, te rugăm.', email);
      problems.push({ text: 'Emailul nu pare valid.', focus: email });
    } else {
      clearError('err-email', email);
    }

    // Acordul
    var gdpr = document.getElementById('gdpr');
    if (!gdpr.checked) {
      showError('err-gdpr', 'Fără acordul tău nu îți putem răspunde.', gdpr);
      problems.push({ text: 'Lipsește acordul de contact.', focus: gdpr });
    } else {
      clearError('err-gdpr', gdpr);
    }

    return problems;
  }

  function showSummary(problems) {
    summaryList.innerHTML = '';

    problems.forEach(function (problem) {
      var item = document.createElement('li');
      var link = document.createElement('button');
      link.type = 'button';
      link.className = 'link';
      link.style.background = 'none';
      link.style.border = '0';
      link.style.padding = '0';
      link.style.cursor = 'pointer';
      link.textContent = problem.text;
      link.addEventListener('click', function () {
        if (problem.focus) problem.focus.focus();
      });
      item.appendChild(link);
      summaryList.appendChild(item);
    });

    summary.hidden = false;
    summary.focus();
  }

  /* ------------------------------------------------------------------------
     04  TRIMITEREA
     ---------------------------------------------------------------------- */

  function collect() {
    var data = {};
    var raw = new FormData(form);

    raw.forEach(function (value, key) {
      if (key === 'periferice') {
        if (!data.periferice) data.periferice = [];
        data.periferice.push(value);
      } else {
        data[key] = typeof value === 'string' ? value.trim() : value;
      }
    });

    data.pagina = window.location.href;
    data.trimis_la = new Date().toISOString();
    return data;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var problems = validate();

    if (problems.length) {
      showSummary(problems);
      return;
    }

    summary.hidden = true;

    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Se trimite…';

    sendBrief(collect())
      .then(function (result) {
        if (!result.ok) throw new Error('Serverul a răspuns cu eroare.');

        form.hidden = true;
        done.hidden = false;
        done.focus();

        if (!result.delivered) {
          doneNote.innerHTML =
            'Notă pentru administrator: formularul nu e încă legat la un ' +
            'serviciu, așa că fișa a fost doar scrisă în consola browserului. ' +
            'Vezi <code>ENDPOINT</code> în <code>js/oferta.js</code>.';
        }
      })
      .catch(function (error) {
        console.error('[Architects] Trimiterea a eșuat:', error);
        button.disabled = false;
        button.textContent = 'Trimite fișa';

        summaryList.innerHTML =
          '<li>Nu am reușit să trimitem fișa. Încearcă din nou sau scrie-ne pe email.</li>';
        summary.hidden = false;
        summary.focus();
      });
  });
})();
