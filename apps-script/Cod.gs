/**
 * ============================================================================
 * ARCHITECTS PC'S — primirea fișelor din formularul de pe site
 * ----------------------------------------------------------------------------
 * Codul ăsta NU rulează pe site. Rulează la Google, pe contul tău.
 * Face două lucruri de fiecare dată când cineva trimite fișa:
 *   1. scrie un rând într-un Google Sheet — registrul tău de comenzi;
 *   2. îți trimite un email cu tot ce a completat clientul.
 *
 * Emailul are Reply-To setat pe adresa clientului, deci apeși „Răspunde”
 * în Gmail și îi scrii direct lui. Nu trebuie să copiezi nimic.
 *
 * INSTALARE — vezi README.md § 5. Pe scurt:
 *   1. Google Sheets → foaie nouă → Extensions → Apps Script
 *   2. ștergi ce e acolo, lipești fișierul ăsta
 *   3. schimbi EMAIL_CATRE mai jos
 *   4. Deploy → New deployment → Web app
 *        Execute as:      Me
 *        Who has access:  Anyone
 *   5. copiezi adresa /exec și mi-o dai (sau o pui singur în js/oferta.js)
 * ========================================================================== */

/** Unde ajung cererile. SCHIMBĂ CU EMAILUL FIRMEI. */
const EMAIL_CATRE = 'TODO@gmail.com';

/** Numele filei din Sheet. Se creează singură la prima cerere. */
const NUME_FOAIE = 'Cereri';

/**
 * Ordinea coloanelor din Sheet și a rândurilor din email.
 * Cheia din stânga e numele câmpului din formular; textul din dreapta e
 * eticheta pe care o vezi tu. Ca să adaugi un câmp nou în formular, adaugă-l
 * și aici — restul se descurcă singur.
 */
const CAMPURI = [
  ['trimis_la', 'Data'],
  ['nume', 'Nume'],
  ['email', 'Email'],
  ['oras', 'Localitate'],
  ['scop', 'Scop'],
  ['scop_liber', 'Scop — descris de client'],
  ['buget', 'Buget'],
  ['carcasa', 'Carcasă'],
  ['culoare', 'Culoare'],
  ['rgb', 'RGB'],
  ['sistem', 'Sistem de operare'],
  ['procesor', 'Procesor'],
  ['periferice', 'Periferice'],
  ['activitate', 'Ce jocuri / programe'],
  ['monitor', 'Monitor'],
  ['termen', 'Până când'],
  ['preferinte', 'Preferințe exacte'],
  ['pagina', 'Pagina']
];

/* ---------------------------------------------------------------------------
   Punctul de intrare. Site-ul trimite aici un POST cu JSON.
   --------------------------------------------------------------------------- */
function doPost(e) {
  try {
    const date = JSON.parse(e.postData.contents);
    scrieInFoaie(date);
    trimiteEmail(date);
    return raspuns({ ok: true });
  } catch (err) {
    // Erorile apar în Apps Script → Executions, dacă trebuie să depanezi.
    console.error(err);
    return raspuns({ ok: false, eroare: String(err) });
  }
}

/** Ca să poți deschide adresa în browser și să vezi că e vie. */
function doGet() {
  return raspuns({ ok: true, mesaj: 'Endpoint activ. Formularul poate trimite aici.' });
}

function raspuns(obiect) {
  return ContentService.createTextOutput(JSON.stringify(obiect)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/* ---------------------------------------------------------------------------
   Registrul de comenzi
   --------------------------------------------------------------------------- */
function scrieInFoaie(date) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let foaie = ss.getSheetByName(NUME_FOAIE);

  if (!foaie) {
    foaie = ss.insertSheet(NUME_FOAIE);
    foaie.appendRow(CAMPURI.map(function (c) { return c[1]; }));
    foaie.setFrozenRows(1);
    foaie.getRange(1, 1, 1, CAMPURI.length).setFontWeight('bold');
  }

  foaie.appendRow(CAMPURI.map(function (c) { return valoare(date[c[0]]); }));
}

/** Listele (perifericele) devin text separat prin virgulă. */
function valoare(v) {
  if (v === undefined || v === null || v === '') return '';
  return Array.isArray(v) ? v.join(', ') : String(v);
}

/* ---------------------------------------------------------------------------
   Emailul către tine
   --------------------------------------------------------------------------- */
function trimiteEmail(date) {
  const linii = CAMPURI
    .filter(function (c) { return valoare(date[c[0]]) !== ''; })
    .map(function (c) { return c[1] + ': ' + valoare(date[c[0]]); });

  const corp =
    'Cerere nouă de pe site.\n\n' +
    linii.join('\n') +
    '\n\n— Apasă „Răspunde” ca să îi scrii direct clientului.';

  const subiect =
    'Cerere nouă · ' +
    (valoare(date.nume) || 'fără nume') +
    (valoare(date.scop) ? ' · ' + valoare(date.scop) : '');

  MailApp.sendEmail({
    to: EMAIL_CATRE,
    replyTo: valoare(date.email) || EMAIL_CATRE,
    subject: subiect,
    body: corp
  });
}

/* ---------------------------------------------------------------------------
   Test manual: apasă Run pe funcția asta ca să verifici că merg și Sheet-ul,
   și emailul, fără să treci prin site. Prima rulare îți cere permisiuni.
   --------------------------------------------------------------------------- */
function testeazaLocal() {
  const exemplu = {
    trimis_la: new Date().toISOString(),
    nume: 'Test Testescu',
    email: 'test@exemplu.ro',
    oras: 'Iași',
    scop: 'Gamer',
    buget: '5.000 – 8.000 lei',
    carcasa: 'ATX',
    culoare: 'Negru',
    rgb: 'Fără RGB',
    sistem: 'Windows',
    procesor: 'AMD',
    periferice: ['Monitor', 'Mouse'],
    activitate: 'CS2 la 1440p',
    preferinte: 'doar AMD, fără Nvidia',
    pagina: 'test manual'
  };
  scrieInFoaie(exemplu);
  trimiteEmail(exemplu);
}
