# Architects PC's — site

Site static, cinci pagini. HTML, CSS și JavaScript simplu: **fără framework, fără
npm, fără pas de build**. Se deschide direct din fișier și funcționează.

Nu face **niciun** request către un server extern. Fonturile, sigla, iconițele și
imaginea de Open Graph sunt toate în folder. De asta site-ul nu are nevoie de
bandă de cookie-uri.

- **Live acum:** <https://codrin2009.github.io/architects-pc-building/>
- **Cod:** <https://github.com/Codrin2009/architects-pc-building> (public)
- **Găzduire:** GitHub Pages, gratuit, din branch-ul `main`.
- **Domeniu propriu:** încă niciunul. `architectspc.ro` e doar un text în cod — vezi §2.
- **Formular:** ajunge pe email. Fără telefon.
- **Plăți:** link Stripe trimis manual pe email, per comandă. Nu e nimic de scris în cod.

> ⚠ Site-ul e **noindex** cât timp e ciornă: Google nu îl va lista. Scoaterea
> marcajului e primul lucru de făcut la lansare — vezi §7.A.

---

## 0. Înainte să iei primul leu de la cineva

Patru lucruri care nu sunt opționale. Le pun primele pentru că restul e cosmetic
pe lângă ele.

1. **Forma juridică.** Ca să vinzi și să emiți facturi îți trebuie PFA sau SRL.
   Fără asta nu poți completa articolul 01 din termeni și nici operatorul de date
   din politica de confidențialitate.
2. **Vârsta — rezolvată prin SRL.** Decizia luată: SRL, cu mama lui Codrin ca
   administrator. Vânzătorul e firma, nu tu personal, deci capacitatea restrânsă
   până la 18 ani nu mai blochează contractele. Detaliile de înființare sunt în
   §0.1 de mai jos.
3. **Cele trei documente legale sunt CIORNE.** Le-am scris pornind de la ce face
   efectiv site-ul și de la cum mi-ai zis că vrei să lucrezi, dar nu sunt redactate
   de un avocat. Fiecare are un chenar roșu în capul paginii care spune asta.
   Dă-le la verificat înainte de lansare.
4. **Emailul firmei.** Fără el nu poate funcționa nici formularul, nici cererile
   GDPR, nici garanția.

   Dacă tot cumperi domeniul, nu publica o adresă `@gmail.com`. Cloudflare are
   **Email Routing**, gratuit: îți face `contact@architectspc.ro` și îl redirectează
   în Gmail-ul tău. Scrii și primești ca de obicei, dar adresa publicată e a firmei.
   Se activează din același panou Cloudflare în care legi domeniul, la secțiunea
   *Email* — durează cinci minute și arată infinit mai serios pe o factură.

### 0.1 Înființarea SRL-ului

Nu e sfat juridic sau fiscal — e lista de lucruri de pregătit și de întrebat.
Regulile fiscale se schimbă în fiecare an, deci **nu lua cifre din memorie sau
de pe forumuri: întreabă un contabil înainte să depui actele.**

**Ce ai de decis înainte**

- [ ] **Numele firmei.** Se rezervă la ONRC. Pregătește 3 variante, prima poate fi
      respinsă dacă seamănă cu alta existentă. Nu trebuie să fie identic cu marca:
      firma poate fi „Architects Build SRL”, iar site-ul rămâne Architects PC's.
- [ ] **Cine sunt asociații.** Aici e singura decizie cu adevărat importantă.
      Dacă mama e unic asociat, firma e a ei în acte, iar tu nu deții nimic.
      **Recomandarea mea: fii și tu asociat.** Un minor poate deține părți sociale,
      prin reprezentant legal — adică exact mama ta, care oricum e în firmă.
      Administrator rămâne ea până împlinești 18 ani; după aceea se schimbă printr-o
      simplă hotărâre a asociaților. Așa munca ta construiește ceva ce e și al tău.
- [ ] **Sediul social.** Poate fi acasă, cu acordul proprietarului. Dacă locuiți
      în bloc, poate fi nevoie și de acordul asociației și al vecinilor de palier —
      întreabă la ONRC ce se cere în situația voastră.
- [ ] **Codurile CAEN.** De verificat cu contabilul, dar cele care descriu ce
      faceți efectiv sunt:
      - `2620` fabricarea calculatoarelor și a echipamentelor periferice — ăsta e
        cel principal, pentru că asamblați, nu doar revindeți;
      - `4741` comerț cu amănuntul al calculatoarelor și software-ului;
      - `9511` repararea calculatoarelor și a echipamentelor periferice;
      - `6209` alte activități de servicii IT (instalare, configurare);
      - `5911` / `5912` producție și montaj video, dacă vreți să facturați și partea de conținut.
- [ ] **Capitalul social.** Cerința de minimum 200 lei a fost eliminată, deci poate
      fi mic. Confirmă suma cu contabilul.

**Ce întrebi contabilul — exact astea**

1. Microîntreprindere sau impozit pe profit, în situația noastră? Ce cotă și ce
   plafon de venituri se aplică **anul ăsta**?
2. De la ce cifră de afaceri devenim plătitori de TVA? *(Răspunsul intră direct în
   art. 04 din `termeni.html`, unde acum e un TODO.)*
3. Ce obligații lunare avem: declarații, salariu de administrator, contribuții?
4. Cât costă contabilitatea lunar? Intră în calculul prețurilor.
5. Cum se scot banii din firmă — dividende, și cu ce impozit?
6. Ce documente trebuie să însoțească fiecare comandă și cât le păstrăm?
   *(Răspunsul intră în art. 03 din `confidentialitate.html`.)*

**Ce trebuie să știe mama ta, clar**

Administratorul răspunde legal pentru activitatea firmei: declarații depuse la
timp, taxe plătite, obligații față de clienți. Nu e o semnătură formală. Merită
să aibă discuția asta cu contabilul de la început, nu peste un an.

**După înregistrare primești** certificatul de înregistrare cu **CUI** și
**numărul din registrul comerțului**. Alea două plus denumirea exactă deblochează
aproape tot din §7.A.

---

## 1. Cum îl rulezi local

**Varianta rapidă.** Dublu-click pe `index.html`. Atât.

**Varianta corectă** (dacă modifici ceva — unele browsere sunt mai stricte cu
fișierele locale):

```bash
cd architects-pc-building
python -m http.server 8000
# deschide http://localhost:8000
```

sau, cu Node: `npx serve .`

**Verificare că nu pleacă nimic în afară:** DevTools → *Network* → reîncarcă.
Toate liniile trebuie să fie fișiere locale. Dacă apare un domeniu străin, s-a
stricat ceva — și politica de cookies devine falsă.

---

## 2. Domeniul

Am pus peste tot `architectspc.ro`. Înainte să cumperi:

1. Verifică-l pe [rotld.ro](https://rotld.ro) sau la orice registrar românesc.
2. Dacă e liber, ia-l. Dacă nu, alternative în aceeași logică: `architectspc.com`,
   `architects-pc.ro`, `architectsbuild.ro`.

**Dacă alegi alt domeniu, îl schimbi în 8 locuri:**

| Fișier | Ce |
|---|---|
| `index.html` | `canonical` + `og:url` + `og:image` + blocul JSON-LD |
| `oferta.html` | `canonical` + `og:url` + `og:image` |
| `termeni.html` | `canonical` + `og:url` + `og:image` |
| `confidentialitate.html` | `canonical` + `og:url` + `og:image` |
| `cookies.html` | `canonical` + `og:url` + `og:image` |
| `sitemap.xml` | toate cele cinci `<loc>` |
| `robots.txt` | linia `Sitemap:` |

Caută pur și simplu `architectspc.ro` în tot folderul și înlocuiește peste tot.

---

## 3. Publicarea

Deja e publicat, pe GitHub Pages, din branch-ul `main`:
<https://codrin2009.github.io/architects-pc-building/>

### Cum publici o modificare

Nu există pas de build. Modifici fișierul, apoi:

```bash
cd architects-pc-building
git add -A
git commit -m "ce ai schimbat"
git push
```

GitHub reconstruiește singur în 1–2 minute. Dacă nu vezi schimbarea, e cache-ul
browserului: `Ctrl + Shift + R`.

### Legarea domeniului propriu, când îl cumperi

GitHub Pages acceptă domenii proprii, gratuit și cu HTTPS. Nu trebuie să muți
site-ul în altă parte.

1. La registrar, în DNS-ul domeniului:
   - pentru domeniul fără `www`: patru înregistrări `A` către adresele IP ale
     GitHub Pages — **ia lista curentă din documentația GitHub**, se mai schimbă;
   - pentru `www`: o înregistrare `CNAME` către `codrin2009.github.io`.
2. Pe GitHub: **Settings → Pages → Custom domain**, scrii domeniul, **Save**.
   Se creează automat un fișier `CNAME` în depozit — nu-l șterge.
3. Aștepți verificarea, apoi bifezi **Enforce HTTPS**.

Site-ul folosește doar căi relative, deci funcționează la fel și pe subcale
(`/architects-pc-building/`), și direct pe domeniu. Nu ai nimic de schimbat în
cod la mutare, în afară de adresele din §2.

### După lansarea reală

1. Scoți `noindex` din cele cinci pagini (§7.A).
2. Trimiți `sitemap.xml` în
   [Google Search Console](https://search.google.com/search-console).

---

## 4. Unde se schimbă design-ul

**Un singur loc: blocul `:root` din capul lui `css/style.css`.** Nu există culori
sau mărimi scrise direct în restul fișierului.

### Culori

```css
--ink:          #151F21;   /* linie de contur, text principal, fundal subsol */
--cream:        #F5ECDB;   /* fundalul paginii */
--sheet:        #FCF8F0;   /* hârtia: foi, carduri, câmpuri de formular */
--graphite:     #5A6466;   /* text secundar */
--construction: #C9BFAC;   /* linii de construcție — NICIODATĂ text */
--redline:      #C21F1F;   /* accentul unic */
```

- **`--ink` și `--cream` vin din siglă.** Le schimbi, nu mai e marca ta.
- **`--redline` are o regulă:** apare doar unde ceva cere atenție sau marchează o
  schimbare — butonul principal, inelul de focus, câmpurile obligatorii, marcajele
  de revizie, `TODO`-urile, chenarul de avertisment de pe paginile legale. E
  creionul de corectură de pe planșă. Dacă apare peste tot, nu mai înseamnă nimic.
- **`--construction` nu are contrast pentru text** (1.66:1). Doar linii.

### Tipografie

```css
--font-body: 'Archivo', ...;       /* titluri și text curent */
--font-mono: 'IBM Plex Mono', ...;  /* date, etichete, blocuri de titlu */

--wdth-display: 114%;   /* lățimea Archivo pentru titluri */
--wdth-sub:     106%;   /* pentru subtitluri */
```

Archivo e variabil: axa de lățime 62–125% și de grosime 400–700, într-un singur
fișier. Titlurile sunt același font ca textul, doar mai lat — ca un standard de
desen tehnic, care folosește un singur alfabet gradat.

Scara de mărimi (`--fs-11` … `--fs-66`) e o progresie 1.25 de la 17px. Nu adăuga
trepte între ele.

### Spațiere și linii

```css
--s-1 … --s-10   /* 4, 8, 16, 24, 32, 48, 64, 96, 128, 160 px */
--section-y      /* aerul de sus și de jos al fiecărei secțiuni */
--gutter         /* marginile laterale */

--w-object:  2px;  /* contur: chenar de foaie, limită de secțiune */
--w-visible: 1px;  /* muchie: linii de tabel, celule */
```

Aceleași grosimi se folosesc și în CSS, și în desenele SVG (clasele
`.dw-object`, `.dw-edge`, `.dw-con`, `.dw-hidden`).

### Ca să schimbi fontul

1. Fișierele `.woff2` în `assets/fonts/`.
2. Rescrii `@font-face` în `css/fonts.css`.
3. Schimbi `--font-body` / `--font-mono` în `css/style.css`.

Fonturile actuale sunt sub SIL Open Font License 1.1 — găzduire și uz comercial
gratuite: **Archivo** (Omnibus-Type), **IBM Plex Mono** (IBM).

---

## 5. Cum legi formularul

Formularul validează în browser, dar **nu trimite nicăieri** până nu îi dai o
adresă. Cât timp nu e legat, datele apar în consola browserului (F12).

Deschide `js/oferta.js`. Singurul loc de modificat, aproape de început:

```js
var ENDPOINT = ''; // TODO: pune aici adresa endpointului.
```

### Instalarea Google Apps Script — o singură dată, ~10 minute

Rulează pe contul tău Google, gratuit, fără plafon. Fiecare cerere ajunge și pe
email, și ca rând într-un Google Sheet — registrul tău de comenzi.

1. **Fă-ți emailul firmei** pe [gmail.com](https://gmail.com), dacă nu îl ai
   deja. Nu folosi adresa personală: pe asta o vei da mai încolo contabilului.
2. Din același cont, deschide [sheets.new](https://sheets.new) — o foaie nouă.
   Denumește-o de exemplu *Cereri Architects*.
3. În foaie: **Extensions → Apps Script**. Se deschide un editor de cod.
4. Șterge tot ce e în `Code.gs` și lipește conținutul din
   [`apps-script/Cod.gs`](apps-script/Cod.gs).
5. Schimbă prima linie cu date: `const EMAIL_CATRE = 'TODO@gmail.com';` — pune
   adresa ta.
6. **Salvează** (dischetă sau `Ctrl+S`).
7. Apasă **Run** pe funcția `testeazaLocal`. Google îți va cere permisiuni:
   *Review permissions → contul tău → Advanced → Go to … (unsafe) → Allow*.
   Ecranul de avertisment apare pentru că e propriul tău script, nepublicat.
   Dacă a mers, ai un rând nou în foaie și un email de test în inbox.
8. **Deploy → New deployment**. La *Select type* alegi **Web app**:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`  ← obligatoriu, altfel site-ul nu poate trimite
9. **Deploy** → copiază adresa **Web app URL**. Se termină în `/exec`.
10. Pune adresa în `ENDPOINT` din `js/oferta.js`, apoi `git add -A`,
    `git commit -m "formular conectat"`, `git push`.
11. Intră pe site și trimite o fișă de test. Verifică inboxul și foaia.

> **Dacă modifici mai târziu `Cod.gs`**, trebuie să faci
> **Deploy → Manage deployments → creion → Version: New version → Deploy**.
> Fără asta rămâne activă versiunea veche — e capcana clasică la Apps Script.

### Ce primești pe email

Subiectul e `Cerere nouă · Nume · Scop`, iar corpul are toate răspunsurile, câte
unul pe rând. **Reply-To e setat pe adresa clientului**, deci apeși „Răspunde”
în Gmail și îi scrii direct lui — nu trebuie să copiezi nimic.

### Dacă vrei altceva în locul lui

`sendBrief()` din `js/oferta.js` e singurul loc de modificat. Trimite un `POST`
cu JSON în corp, deci merge și cu [Formspree](https://formspree.io),
[Basin](https://usebasin.com) sau orice backend. Atenție la
`Content-Type: text/plain` — e pus intenționat, ca să evite cererea preliminară
OPTIONS pe care Apps Script nu o tratează. Alte servicii pot cere
`application/json`.

### Ce primești pe email

Toate câmpurile completate — scop, buget, carcasă, culoare, RGB, sistem de
operare, procesor, periferice, preferințe exacte, nume, email, localitate — plus
`pagina` (de unde s-a trimis) și `trimis_la` (ISO). `periferice` vine ca listă.

### Notă despre bifele de periferice

„Nu am nevoie” se exclude reciproc cu celelalte, în ambele sensuri. Logica e în
`aplicaExclusivitatePeriferice()` din `js/oferta.js`. Dacă adaugi periferice noi,
nu trebuie să schimbi nimic — funcționează după valoarea
`'Nu am nevoie de periferice'`, definită într-o singură constantă.

---

## 6. Plățile cu Stripe

**Nu e nimic de programat.** Site-ul e static și nu atinge bani. Fluxul e:

1. Cont pe [stripe.com](https://stripe.com), cu datele firmei. Îți va cere CUI și
   cont bancar — de aici încă un motiv pentru §0.1.
2. Când un client aprobă configurația, în dashboard-ul Stripe: **Payment links**
   → **New** → suma exactă a acelei comenzi → îți dă un URL.
3. Trimiți URL-ul pe email. Clientul plătește cu cardul, pe pagina Stripe.
4. Banii ajung în contul firmei. Stripe reține un comision pe tranzacție —
   verifică-l, se schimbă.

Datele cardului nu trec niciodată prin site-ul tău. Asta e și motivul pentru care
politica de confidențialitate poate spune, corect, că nu stocăm date de card.

Dacă mai încolo vrei un buton de plată direct în site, se poate face tot fără
cod, cu un Payment Link fix — dar are sens doar pentru un preț fix, iar voi
lucrați pe comandă.

---

## 7. Checklist — tot ce trebuie completat

Fiecare `TODO` e **vizibil pe site**, roșu și subliniat punctat, ca să nu se
publice din greșeală. Caută `TODO` în cod ca să le găsești pe toate.

### A. Blocante — fără astea nu poți lansa

- [ ] **Scoate `noindex` din toate cele cinci pagini HTML.** Caută `noindex` și
      șterge meta-ul împreună cu comentariul de deasupra. Cât timp rămâne, site-ul
      nu apare în Google — util acum, fatal după lansare.
- [ ] SRL înființat — lista completă de pregătit e în §0.1
- [ ] CUI și număr din registrul comerțului obținute
- [ ] Contabil găsit și cele 6 întrebări din §0.1 puse
- [ ] Emailul firmei — apare în subsolul tuturor celor 5 pagini, în JSON-LD, în politica de confidențialitate și în termeni
- [ ] Verificarea celor trei documente legale de către un jurist
- [ ] Denumire juridică, CUI, nr. registrul comerțului — subsolul tuturor paginilor
- [ ] Domeniul cumpărat și înlocuit în cele 8 locuri din §2

### B. Documentele legale

**`termeni.html`**
- [ ] Art. 01 — date firmă
- [ ] Art. 03 — valabilitatea ofertei (propunere: 7 zile)
- [ ] Art. 04 — dacă prețurile includ TVA
- [ ] Art. 05 — în cât timp emiți factura
- [ ] Art. 06 — termen de execuție, zone de livrare, curier, cost, ridicare din Iași
- [ ] Art. 07 — intervalul în care clientul se poate răzgândi după plată; clauza despre costurile deja făcute (de verificat juridic)
- [ ] Art. 08 — procedura concretă de garanție
- [ ] Art. 09 — tipul licenței Windows și prețul
- [ ] Art. 12 — ce obligații de afișare privind litigiile există la data lansării (platforma SOL a fost închisă, nu pune linkul vechi)
- [ ] Art. 13 — dacă poți indica instanțele din Iași
- [ ] Art. 14 — data publicării

**`confidentialitate.html`**
- [ ] Art. 01 — operator, date firmă, email pentru cereri
- [ ] Art. 02 — ce ceri la facturare
- [ ] Art. 03 — termene de păstrare (propunere: 12 luni), confirmate cu contabilul
- [ ] Art. 04 — numele serviciului de formulare și al firmei de curierat
- [ ] Art. 05 — temeiul transferurilor în afara UE, după ce alegi furnizorii
- [ ] Art. 08 — activează autentificarea în doi pași pe Gmail, Cloudflare, Stripe, Formspree
- [ ] Art. 10 — data publicării

**`cookies.html`**
- [ ] Art. 04 — link către politica de cookies a serviciului de formulare
- [ ] Art. 07 — data publicării
- [ ] De recitit ori de câte ori adaugi ceva extern în site

### C. Specificațiile celor trei tipuri — `index.html`

Pentru fiecare din TIP-G, TIP-C, TIP-P:

- [ ] Procesor · Placă video · Memorie · Stocare · Răcire · Preț de la · Garanție

(Rândul „Sistem” e deja completat.)

### D. Conținut — `index.html`

- [ ] Fișa proiectului din erou — zone și mod de livrare, data lansării
- [ ] Etapa 04 — termenul de livrare
- [ ] Despre — o frază despre ce ați prezentat la Innovation Labs 2025
- [ ] **Foto 1** — blocul marcat `SLOT FOTO 1` (raport 3:2, ideal 1200×800px)
- [ ] **Foto 2** — blocul marcat `SLOT FOTO 2`
- [ ] JSON-LD — `priceRange`, adresă, linkuri de social

### E. Formular — `oferta.html` și `js/oferta.js`

- [ ] `EMAIL_CATRE` în `apps-script/Cod.gs`
- [ ] `ENDPOINT` în `js/oferta.js` (adresa `/exec` de la Apps Script)
- [ ] Confirmă intervalele de buget (sunt o propunere)
- [ ] Intervalul de răspuns — apare în două locuri: lângă buton și în panoul de confirmare

### F. Social — subsolul tuturor paginilor

- [ ] Instagram, TikTok, YouTube

> **Pentru poze:** în `assets/photos/`, raport 3:2, maximum 1600px lățime, sub
> ~250 KB fiecare. Scrie un `alt` care descrie ce se vede, nu „poză de la concurs”.

---

## 8. Ce e în folder

```
architects-pc-building/
├── index.html                  pagina principală
├── oferta.html                 fișa de proiect (chestionarul)
├── termeni.html                termeni și condiții
├── confidentialitate.html      politica de confidențialitate (GDPR)
├── cookies.html                politica de cookies
├── favicon.svg                 iconița, desenată după siglă
├── robots.txt · sitemap.xml · README.md
├── css/
│   ├── fonts.css               @font-face, fișiere locale
│   └── style.css               tot design-ul; tokenurile sunt în :root, sus
├── js/
│   ├── main.js                 meniu mobil, dezvăluiri, secțiunea curentă
│   └── oferta.js               formularul, exclusivitatea perifericelor, sendBrief()
└── assets/
    ├── fonts/                  8 × .woff2 (~263 KB total)
    └── logo/
        ├── architects-logo.png     sigla completă, originalul
        ├── architects-mark.png     doar templul, transparent
        ├── apple-touch-icon.png    180×180
        ├── icon-512.png            512×512
        └── og-image.png            1200×630, pentru linkuri pe social
```

---

## 9. Note tehnice

**Accesibilitate.** HTML semantic, un `<h1>` pe pagină, stări de focus vizibile,
text alternativ peste tot, desenele au `<title>` și `<desc>` citite de
cititoarele de ecran, grupurile de opțiuni au `role="radiogroup"` cu etichetă,
formularul are erori legate prin `aria-describedby` și un sumar anunțat prin
`role="alert"`. Contraste WCAG AA: text principal 14.4:1, secundar 5.2:1, roșu pe
crem 5.1:1.

**Mișcare.** Doar apariția discretă a blocurilor la derulare și stările de hover.
`prefers-reduced-motion: reduce` le oprește. Starea ascunsă se aplică doar dacă
JavaScript rulează, deci fără JS conținutul e vizibil normal.

**Responsive.** Verificat la 320, 390, 768, 1280 și 1920px. Fără derulare
orizontală la nicio lățime, pe nicio pagină.

**Fără JavaScript** site-ul rămâne complet lizibil. Se pierd doar: butonul de
meniu pe mobil (lista rămâne deschisă), apariția la derulare (totul e vizibil) și
trimiterea formularului.

**Compatibilitate.** Chrome, Edge, Firefox, Safari — versiuni din ultimii ~3 ani.
Folosește `aspect-ratio`, `clamp()`, proprietăți personalizate CSS și fonturi
variabile.
