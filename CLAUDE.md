# Architects PC's — context pentru sesiunile următoare

Written for the next Claude session. Read it fully before touching anything.
**All site copy and all code comments are in Romanian** — keep it that way.
This file is in English because it is instructions to an agent, not content.

---

## 1. Who this is for

**Architects PC's** — custom-built PCs, made to order, Iași, Romania.

- **Codrin Ciobanasu**, 17, founder. The person you talk to. Technical side:
  configurations, assembly, repairs. Also sales, customer relations, and public
  speaking — he gave the Innovation Labs pitch. GitHub: `Codrin2009`.
  Email: `architectspcs@gmail.com`.
- **Tudor**, co-founder. Visual identity, filming, editing. Age unconfirmed —
  do not state it on the site.
- Both students at Liceul de Informatică, Iași. **Do not add the school's
  patron name** — it was invented once and removed.
- Won the **Innovation Labs 2025 Idea Jam**.

**Business model:** customer fills a 5-minute questionnaire → they get a
configuration by email with every part priced and justified → they approve →
they pay in advance via a Stripe payment link → parts are ordered from
distributors (ASBIS, NOD, ELKO, Royal) → assembled, Windows/Linux installed
clean, BIOS set → delivered ready to work.

---

## 2. Where everything lives

| | |
|---|---|
| Local | `D:\Architects PC site` (moved from `C:\Users\Codrin` — old path is gone) |
| Repo | <https://github.com/Codrin2009/architects-pc-building> (public) |
| Live | <https://codrin2009.github.io/architects-pc-building/> |
| Preview artifact | <https://claude.ai/code/artifact/70ab82dc-6238-4270-80e1-d33014412532> |

Five pages: `index.html`, `oferta.html`, `termeni.html`,
`confidentialitate.html`, `cookies.html`.

**The site is `noindex` on purpose.** Every page carries
`<meta name="robots" content="noindex, nofollow">` because the legal pages are
unreviewed drafts and the spec tables are still TODO. Removing it is the first
item in README § 7.A. Do not remove it unprompted.

---

## 3. Stack and constraints — these are hard rules

- Plain HTML, CSS, vanilla JS. **No framework, no npm, no build step.** It must
  work by double-clicking `index.html`.
- **Zero external network requests.** Fonts, logo, icons, OG image all local.
  This is not a preference — the cookie policy publicly claims it and tells the
  reader how to verify it in DevTools. Adding any CDN, analytics, embedded
  video or web font makes that page a lie.
- No cookies, no localStorage, no trackers. Hence no consent banner.
- Fonts, self-hosted in `assets/fonts/` (8 × woff2, ~263 KB):
  **Archivo** variable (`wght 400–700`, `wdth 62–125%`) and
  **IBM Plex Mono** 400/500/600, latin + latin-ext subsets. latin-ext is
  required for `ș ț ă â î`.
- Responsive from 320px. Verified at 320 / 390 / 768 / 1280 / 1920.
- WCAG AA: body 19.3:1, secondary 6.3:1, accent 6.0:1 on white.

---

## 4. Design system

Everything lives in the `:root` block at the top of `css/style.css`. There are
no hard-coded colours or sizes anywhere else in the file.

```css
--ink: #0c0e12;          /* text, outlines, footer ground */
--paper: #ffffff;        /* page ground */
--panel: #f1f3f6;        /* raised surfaces: sheets, cards, form fields */
--graphite: #59616e;     /* secondary text */
--construction: #d2d7de; /* construction lines. NEVER text — 1.45:1 */
--redline: #c21f1f;      /* the single accent */
```

**Palette history — do not undo this.** The site started cream `#F5ECDB` +
ink `#151F21`, taken from the original temple logo. Codrin rejected cream
outright: *"that weird beige… obviously AI"*. It is now pure white. The greys
lean very slightly blue on purpose — a neutral grey next to pure white drifts
warm and reads beige again. Tokens were renamed `--cream`→`--paper`,
`--sheet`→`--panel` so the names stay truthful.

**Redline discipline.** Red appears only where something demands attention or
marks a change: primary button, focus ring, required-field markers, revision
triangles, TODO markers, the draft notices on legal pages. It is the markup pen
from a drawing. If it starts appearing decoratively, it stops meaning anything.
It is also never used as text on the dark footer (2.8:1 there) — the footer
overrides `--focus` to `--paper`.

**Line weights** — a drawing hierarchy, used in both CSS and SVG:
`--w-object: 2px` (outlines, sheet borders) and `--w-visible: 1px` (edges,
table rules). SVG classes `.dw-object`, `.dw-edge`, `.dw-con`, `.dw-hidden`
use `vector-effect: non-scaling-stroke` so drawn lines match CSS borders
exactly at any scale.

**Type.** One family does display and body: Archivo's **width axis** is the
distinction (`--wdth-display: 114%` for headings, 100% for text), exactly as a
drafting standard uses one alphabet graded by size. IBM Plex Mono carries all
data, labels and title blocks. Scale is a 1.25 ratio from 17px
(`--fs-11` … `--fs-66`) — don't add steps between them.

**The signature element** is the **title block** — the boxed legend from a
drawing sheet. It appears three times, identically constructed: the project
fiche in the hero, the spec table on each tier sheet, and on `oferta.html`
where it **fills itself in as the customer answers**. That last one is the best
idea in the project; protect it.

**The tier drawings** are hand-authored inline SVG — orthographic sections of
three machines, differentiated by real information (Gamer: 360mm radiator, long
GPU; Creator: air tower, 4 RAM sticks emphasised, 3 drives; Profesionist:
visibly smaller micro-ATX chassis drawn at the same scale, GPU in a **dashed**
line because it's optional). Captions label them as indicative. These are the
one thing no competitor has.

**Numbering rule.** `01–05` appears only in the process section, because that
is the only genuinely sequential content, and as article numbers in the legal
pages, where clause numbering is required. Tier codes are `TIP-G` / `TIP-C` /
`TIP-P` — identifiers, not a sequence. Notes are `N1–N6` — indices, not order.

---

## 5. Decisions already made — do not re-litigate

Each of these was a deliberate call, usually after seeing it rendered.

- **Bay lines deleted.** An early version had three vertical construction lines
  at 25/50/75%, echoing the old logo's columns. Rendering showed they cut
  through the headline and aligned to nothing — they claimed a grid that didn't
  exist. One honest division rule remains in the hero.
- **Photo placeholders removed.** The crossed-rectangle `FOTO · TODO` boxes in
  *Despre* read as unfinished on a public site. The `<figure>` blocks remain
  **commented out** in `index.html`, styled and ready, for when real photos
  exist. Do not re-add empty placeholders.
- **Per-tier order buttons removed.** "Cere ofertă pentru Gamer" promised
  something Gamer-specific and delivered the same generic form with one radio
  pre-ticked. Same reason the bottom picks list was removed.
- **No phone. Anywhere.** Codrin works by email only. No phone field, no phone
  validation, no number in the footer. The site says so explicitly.
- **No painting, no modding.** Note N4 states this outright. The original brief
  offered custom paint jobs; Codrin retracted it. Customers choose case size,
  colour, and RGB — nothing more.
- **No 20-minute meeting.** The process starts with the questionnaire. Every
  "we'll discuss" was rewritten to "we'll email you".
- **Stripe, but no payment code.** Static site never touches money. Codrin
  creates a Payment Link per order in the Stripe dashboard and emails it.
- **Form goes to Google Apps Script**, not Formspree — Codrin chose it. Free,
  no cap, and every enquiry also becomes a row in a Google Sheet, which is his
  order book. Script is in `apps-script/Cod.gs`.
- **Name is "Architects PC's".** The newest logo reads ARCHITECHT PC'S;
  Codrin chose the correct spelling and **Tudor still has to re-export the
  logo**. 41 occurrences were renamed from "Architects PC Building".
- **The logo currently on the site is a reconstruction.** Codrin pasted the
  real logo into chat but never saved it to disk. The header/footer lockup —
  crescent, wordmark, crescent — is drawn in SVG from what the image showed.
  He asked for the genuine file to be used "even if it's wrong". **If a real
  logo file appears in `assets/logo/`, swap it in.**
- **Legal pages are drafts** with red notices saying so. The most valuable
  clause is termeni.html art. 07: custom-spec PCs are **exempt from the 14-day
  distance-selling withdrawal right** under OUG 34/2014. That protects him.
- **SRL with Codrin's mother as administrator** is the chosen legal route
  (he's 17, restricted capacity until 18). Recommendation on record: Codrin
  should also be an *associate*, not just run it. README § 0.1 has the full
  checklist and the six questions for the accountant.

---

## 6. Traps that will bite you

Learned the hard way in this project.

1. **PowerShell 5.1 reads `.ps1` files as ANSI unless they have a BOM.**
   Romanian diacritics in script literals become mojibake (`negÄƒzduitÄƒ`).
   Always write generated `.ps1` with `New-Object Text.UTF8Encoding $true`.
   Files read with an explicit `[Text.Encoding]::UTF8` are fine.
2. **`git commit -m` with double quotes inside the message breaks** — PowerShell
   word-splits it and git sees pathspecs. Write the message to a file and use
   `git commit -F file`.
3. **`git push` returning exit 255 is usually not a failure.** PowerShell wraps
   git's stderr progress output as an error. Check `git log --oneline origin/main`
   before "fixing" anything.
4. **Edge headless clamps its window to ~492px minimum width.** Asking for
   `--window-size=390,x` gives you a 492px viewport cropped to 390px, which
   looks like broken layout but isn't. To test narrow widths, load the page in
   a sized `<iframe>` inside a wrapper page.
5. **Edge writes screenshots asynchronously.** The file often appears after the
   command returns. Check for it in a follow-up call.
6. **`overflow-wrap: break-word` does not shrink a grid track's min-content
   size**; `anywhere` does. This caused real horizontal overflow on
   `confidentialitate.html` at 320px ("CONFIDENȚIALITATE" is 17 characters).
7. **The preview artifact is a snapshot, not a live view.** After any change,
   rebuild and republish it or Codrin sees stale content — this already caused
   a confusing exchange where he reported the old cream palette.
8. **Apps Script: editing the code is not enough.** You must
   *Deploy → Manage deployments → New version → Deploy*, or the old code keeps
   running.
9. Files on disk may change between reads. Re-read before edits that depend on
   surrounding content.

---

## 7. How to verify work

Do not assume a change worked — render it.

```powershell
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
& $edge --headless --disable-gpu --allow-file-access-from-files --hide-scrollbars `
        --force-device-scale-factor=1 --window-size=1280,900 --virtual-time-budget=8000 `
        --screenshot="out.png" "file:///D:/Architects PC site/index.html"
```

Then `Read` the PNG. `--virtual-time-budget` matters — without it you capture
scroll reveals mid-transition.

To capture a section lower down, load the page in an iframe with a negative
`top` offset inside a clipping wrapper. To test the form, append a script to a
copy of `oferta.html` that drives it and rewrites `document.documentElement`
with the results, then screenshot that.

**Helper scripts** (in the session scratchpad, recreate if lost):
- `build-preview.ps1` — bundles all 5 pages into one self-contained HTML for
  the artifact: fonts as data URIs, CSS/JS inlined, a small JS router standing
  in for page navigation, plus a preview bar explaining the red TODOs.
- `build-assets.ps1` — regenerates `og-image.png` (1200×630) and the PNG icons
  from the drawn mark, in the current palette.

---

## 8. Open items

**Blocking a real launch** (full list in README § 7.A):
- Remove `noindex` from all five pages
- SRL registered; CUI + registration number into the footer of all five pages
- Legal drafts reviewed by a lawyer
- Company email published (Gmail exists: `architectspcs@gmail.com`)
- Google account display name set to `Architects PC's`, not Codrin's own name

**Waiting on Codrin:**
- The genuine logo file → `assets/logo/`
- The Apps Script `/exec` URL → `ENDPOINT` in `js/oferta.js`
- Two real photos → `assets/photos/`, then uncomment the figures in `index.html`
- 21 spec rows across the three tier title blocks
- Confirm the budget bands are realistic

**Agreed next step:** he was told `architectspcs` is free on GitHub. Once he
creates the free **organization**, transfer the repo there and rename it to
`architectspcs.github.io`, so the site serves from
`https://architectspcs.github.io` instead of a personal subpath. Then re-enable
Pages and verify.

**Later:** buy a `.ro` domain (not `.io` — it's never free and reads as a tech
startup, wrong for a local Romanian business). GitHub Pages supports custom
domains free with HTTPS, so nothing needs to move.

---

## 9. How Codrin works

- Direct, fast, and he pushes back when something is weak — he was right every
  time so far (the beige, the lips-shaped logo, the tier buttons that promised
  nothing). Take the criticism at face value and act on it.
- He cannot spend money right now. Every recommendation must have a free path.
- He is learning the business side in parallel. Explanations of *why* land
  well; unexplained instructions don't.
- Be honest about what you can't do. He asked twice for things that were
  impossible (a free `.io`, using a logo that was never saved to disk) and the
  useful answer was the correction plus the nearest real option.
- Don't quote tax or legal figures from memory. Romanian fiscal rules change
  yearly. Give him the questions to ask an accountant instead — that pattern is
  already established in README § 0.1.
