# bipin-saha.github.io

[![Deploy static content to Pages](https://github.com/bipin-saha/bipin-saha.github.io/actions/workflows/static.yml/badge.svg)](https://github.com/bipin-saha/bipin-saha.github.io/actions/workflows/static.yml)

Personal academic portfolio of **Bipin Saha** — PhD student in Electrical &
Computer Engineering at North Carolina A&T State University (ACCESS Lab),
working on camera–LiDAR fusion and self-supervised perception for autonomous
driving.

**Live:** <https://bipin-saha.github.io>

## Stack

- Plain static HTML — no framework, no bundler, no build step
- One stylesheet (`css/main.css`) and one deferred script (`js/main.js`)
- Google Fonts: Space Grotesk, Newsreader, IBM Plex Mono
- Light + dark themes via `prefers-color-scheme`
- Hosted on GitHub Pages

## Structure

| Path                 | What                                            |
| -------------------- | ---------------------------------------------- |
| `index.html`         | Single-page CV                                  |
| `css/main.css`       | All first-party styling (7 commented sections)  |
| `js/main.js`         | Scroll-spy for the sticky section rail          |
| `writeups/`          | Short technical notes                           |
| `project-pages/`     | Individual project breakdowns                   |
| `resume/resume.pdf`  | Downloadable CV                                 |
| `sitemap.xml`, `robots.txt` | SEO — update the sitemap when adding pages |

## Develop locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Serve from the repo root so root-relative paths (`/css/main.css`) resolve the
same way they do in production.

## Deploy

Automatic — every push to `main` runs `.github/workflows/static.yml`, which
publishes the repo root to GitHub Pages. There is no build step: what is in the
repo is what ships.

## Usage

The source is public for reference. Site content — text, images, CV, writeups,
and personal branding — is © Bipin Saha; please don't reuse it as your own.
