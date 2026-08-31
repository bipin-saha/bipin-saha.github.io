# CLAUDE.md

Project notes for Claude Code — tracked in git so the guidance travels with the
repo. Keep anything private or machine-specific in `CLAUDE.local.md` (still
git-ignored) instead.

---

## What this is

The personal academic portfolio / CV website of **Bipin Saha**, a PhD student in
Electrical & Computer Engineering at North Carolina A&T State University (ACCESS
Lab) working on **camera–LiDAR fusion and self-supervised perception for
autonomous driving**. It is a single long HTML page plus a few small sub-pages.
Live at **https://bipin-saha.github.io**.

### Audience — read before making content decisions

This is a **job-market document**, not a general blog. The primary readers are
**industry research-scientist recruiters / hiring managers** (Waymo, NVIDIA,
Bosch, Toyota Research, Zoox, Apple, FAIR-type labs) and **faculty search
committees for postdocs**. They skim first, read later.

Content and ordering favour what those readers scan for:

- a crisp research identity (problem + method + why it matters)
- first-author publications at named venues, with PDF / arXiv / DOI / code links
- a research narrative / throughline (the "Research focus" thrusts)
- evidence of independent research: datasets released, reproducible benchmarks
- engineering depth: PyTorch at scale, CUDA/ROS, real-time, which AV datasets
- research **and** shipping (the ML-Engineer role is an asset, not noise)
- advisor, lab, timeline, and an explicit "seeking …" line

De-emphasise anything that reads as early-career padding (online-course
certificates, minor honourable mentions, long volunteer lists). When in doubt,
cut or condense rather than pad.

## Tech stack

- **Plain static HTML.** No framework, no bundler, no package.json, no Jekyll.
- **No CSS framework.** Bootstrap 3, Font Awesome, and Academicons were all
  removed in the 2026 "perception" redesign and never came back.
- Only external `<head>` resource is **Google Fonts**: Space Grotesk (display),
  Newsreader (body serif), IBM Plex Mono (labels / dates / metrics / eyebrows).
  One other external script loads at end of `<body>`: **GoatCounter**
  (`gc.zgo.at/count.js`, `async`) — privacy-friendly, cookieless analytics,
  dashboard at `https://bipinsaha.goatcounter.com`.
- **`css/main.css`** — all first-party styling (~718 lines), organised into 7
  commented sections (Tokens / Base / Layout / Masthead / Components / Footer /
  Motion & responsive). Light + dark via `prefers-color-scheme`.
- **`js/main.js`** (~115 lines, loaded with `defer`) — an IntersectionObserver
  scroll-spy that toggles `.is-active` on the sidebar rail links, plus a
  `track()` helper that fires **GoatCounter custom events** (section-viewed,
  CV download, publication-link, social, sub-page, and outbound-link clicks).
  The old disabled Google Analytics snippet was removed when GoatCounter
  was added.
- **`favicon.svg`** — inline SVG mark (BEV grid + corner brackets + detection dot).

## Deployment

`.github/workflows/static.yml` uploads the **entire repo root, as-is**, to
GitHub Pages on every push to `main`. There is no build step — what is in the
repo is what ships. It is a *user* Pages site, so the site root is the domain
root (`/css/main.css` resolves correctly).

## Run locally

```bash
python3 -m http.server 8000        # then open http://localhost:8000
# or, for auto-reload:
npx live-server --port=8000
```

Serve from the repo root so root-relative paths (`/css/main.css`,
`images/…`) resolve the same way they do on GitHub Pages.

## Layout

```
README.md               Short public-facing repo readme (keep distinct from this file).
index.html              Single-page CV (~657 lines). Everything of substance.
css/main.css            All first-party CSS (~718 lines), 7 commented sections.
js/main.js              Deferred script: scroll-spy + GoatCounter custom events.
favicon.svg             Inline SVG site mark.
writeups/               Minimal unstyled article pages + writeups/index.html.
project-pages/          Minimal unstyled project breakdown pages (3 of them).
images/                 The 6 photos/logos still referenced by index.html:
                        profile/ comp/ exp/{access_lab,get_aid} volunteering/{ieee_*}.
resume/resume.pdf       Linked from the "Curriculum Vitae" button.
sitemap.xml, robots.txt SEO. Update sitemap when adding pages.
versions.txt            Manual changelog of deploy commits — update on release.
```

`index.html` structure (2026 "archival" redesign): a full-width `.masthead`
hero (portrait framed as a "detection crop" with corner brackets + a faint
BEV-grid SVG), then a `.container > .layout` two-column grid — sticky `.rail`
index on the left, `<main>` on the right. Sections are `<section id>` with a
`.section-head` (mono `.eyebrow` with a small oxblood tick + `<h2>` + hairline).

The hero (`.masthead-text`) carries, in order: `.kicker`, `<h1>`, `.lede`
(concrete one-line research statement), `.affil` (mono — degree, university,
lab, advisor), `.status` (oxblood callout box — the "seeking …" line),
`.chips` (methods keywords), `.contact`, `.social` (Scholar / GitHub /
LinkedIn first), and the `.btn-cv` filled button.

### Section order & anchors

Ordered as a job-market CV: identity → momentum → evidence → capabilities →
credentials → recognition.

`#about` (with `.thrusts` "Research focus" + `.facts`) · `#news` ·
`#publications` (Selected / Additional `.subhead`s) · `#experience`
(sub-anchors `#research-experience` `#industry-experience` `#undergrad-research`) ·
`#skills` · `#projects` · `#writeups` · `#education` · `#awards`
(Awards + Service & leadership).

The rail `<a href="#…">` list, the scroll-spy (`js/main.js` observes
`main section[id]`), and the JSON-LD `BreadcrumbList` must all stay in sync
with these ids.

## Conventions — follow these when editing

- **No inline `style="…"` and no `<style>` blocks in HTML.** All styling lives
  in `css/main.css`. When a new element needs styling, add a semantic class
  there. `main.css` is grouped: Tokens / Base / Layout / Masthead / Components /
  Footer / Motion & responsive — put new rules in the matching group and add a
  short comment.
- **JSON-LD (`<script type="application/ld+json">`) stays inline** in
  `index.html <head>`. It is SEO structured data and must be in the document.
  Keep it in sync with real content: `Person` (jobTitle, affiliation, alumniOf,
  knowsAbout, sameAs), `WebSite`, `BreadcrumbList` (Home / Publications /
  Experience), and two `ScholarlyArticle` blocks (the QPAIN 2026 + 2025 papers).
- Images: keep `loading="lazy" decoding="async"` and explicit `width`/`height`.
  The header portrait is the exception (`fetchpriority="high" loading="eager"`).
- Projects are a **typographic list** (`.project-list`), no thumbnails. Do not
  reintroduce an image gallery without a reason — the mixed real-image / empty
  tiles it replaced looked unfinished.
- When adding content, also update the visible **"Last updated"** date in the
  footer of `index.html` and, for new pages, `sitemap.xml`.
- The **`.status` "seeking" line is time-sensitive** — it names "Summer 2026"
  internships. Revisit it whenever the site is touched.
- Retired blocks are not kept as commented-out HTML; a one-line comment before
  `</body>` records what was removed. Git history has the originals.

## Design baseline ("archival" redesign, 2026)

The current design is deliberate — a restrained, academic, university-press
identity (not "fancy"), tuned so the signal is front-loaded for recruiters:

- Warm **ivory paper `#f7f4ec`** (dark `#16130f`), body ink `#1c1a17`,
  **charcoal-navy headings `#26303a`** (token `--head`).
- **One oxblood accent** — `--accent #8a2722` (non-text: ticks, rules, markers),
  `--accent-ink` (links), `--accent-strong` (hover), `--accent-wash` (faint
  tint for callouts). Dark mode brightens it to a brick `#c8534b`.
  Used with discipline: rail active-item block, `.btn-cv` fill, `.eyebrow`
  tick, `.thrusts` / `.status` left borders, links, metric figures. One
  confident moment per area, never large fills of colour.
- Fonts: Space Grotesk 500–700 (display/headings), Newsreader (body serif,
  `line-height: 1.7`), IBM Plex Mono 400–500 (eyebrows, dates, metrics, chips,
  code-ish labels).
- **Hairlines, not shadows.** `--line` for structural rules (section heads,
  masthead border), `--line-soft` for the lighter dividers between list rows.
  Keep hairline density low — group with whitespace first.
- Consistent `6px` radius. Generous, slightly uneven vertical rhythm
  (`section + section { margin-top: 4.5rem }`).
- Signature elements: the portrait **"detection crop"** (grayscale + corner
  brackets) and faint **BEV occupancy grid** behind the hero; the oxblood
  `.status` box; `.thrusts` research-focus items with oxblood left borders;
  the sticky scroll-spy `.rail` with an oxblood `.is-active` block.

Do not change visual design, layout, spacing, or colours unless the user asks.
Refactors must be visually identical — verify with before/after screenshots.
Headless Chrome:
`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new
--screenshot=out.png --window-size=1280,13500 --virtual-time-budget=3000
--default-background-color=FFFFFFFF <url>`
(`--virtual-time-budget` lets the hero's `rise` entrance animation settle;
for dark mode add `--blink-settings=preferredColorScheme=0`). Notes: old
`--headless` clamps the viewport to a 500px minimum; external logos
(Wikimedia, ba-systems.com, yp.ieee.org) load non-deterministically in
headless captures.

## Known issues / tech debt

- **Content the user still owns:** the `#skills` "Datasets & tooling" line only
  claims datasets Bipin built (BNVD, FORS-EMG). If he has used **nuScenes /
  KITTI / Waymo Open**, add them — near the top of a perception-RS checklist.
  Expected graduation year is stated nowhere; consider adding it to `.affil`
  or Education. The `.status` line's "Summer 2026" wording will date.
- Project GitHub links are still omitted (were placeholder
  `github.com/your-repo-link`); only the three real `project-pages/*.html`
  links remain. Add real repo URLs when available.
- `writeups/` and `project-pages/` are minimal and **do not load
  `css/main.css`** — they render unstyled. Restyle to match the archival
  design at some point.
- Certifications' "Show credential" links were dead — the section was removed
  entirely in this redesign.
- ~~Font Awesome / Bootstrap 3 / Academicons~~ — resolved (removed in 2026).
- ~~LiDAR-teal accent~~ — replaced by oxblood in the "archival" redesign.
- ~~`.gitignore` typo / tracked `.DS_Store`~~ — resolved.
- ~~Unused assets~~ — resolved (Aug 2026): `git rm`'d `icons/`, `images/proj/`,
  `images/writeups/`, and two stray `images/` files. `images/` now holds only
  the 6 files `index.html` references; shipped payload ~468 KB. Old assets
  remain in git history if ever needed.

## History

- **2026 extraction refactor** — `css/main.css` and `js/main.js` were pulled
  out of `index.html`, ~60 inline styles converted to classes. Verified
  pixel-identical.
- **2026 "perception" redesign** — full visual rebuild: dropped
  Bootstrap/FA/Academicons, added the 3 Google Fonts, token system, hero
  detection-crop + BEV grid, sticky scroll-spy rail, citation-style
  publications, projects gallery, collapsed certifications, dark mode.
  LiDAR-teal accent on warm paper.
- **2026 "archival" redesign** (current) — palette swapped teal → **oxblood**
  on warm ivory, with charcoal-navy headings and lighter hairline density.
  Information architecture re-sequenced for a **research-scientist / postdoc
  recruiter** audience: hero gained a concrete research one-liner, an affiliation
  line, a `.status` "seeking" box, methods `.chips`, and a filled CV button;
  About gained a "Research focus" `.thrusts` block; Publications split into
  **Selected** (first-author, AV/perception) and **Additional**; a new
  **Skills** section; the projects **gallery → typographic list** (6 shown +
  an "also" line); **Certifications removed**; Competitions + volunteer
  condensed into **Awards & Service**. Anchors changed:
  `#experiences → #experience`, `#competitions`/`#certifications → #awards`.
