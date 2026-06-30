# VLSI & Digital Design Portfolio

<!-- REVIEW: Replace "REPLACE WITH MY NAME" with your actual name. -->

Personal portfolio website for **REPLACE WITH MY NAME** — a VLSI and Digital Design Enthusiast based in Bangladesh, exploring RTL design, functional verification, FPGA implementation, digital electronics, and semiconductor technology.

---

## Table of Contents

1. [Project purpose](#project-purpose)
2. [Folder structure](#folder-structure)
3. [Technology used](#technology-used)
4. [Sections](#sections)
5. [How to customise](#how-to-customise)
6. [Images and assets](#images-and-assets)
7. [Before you deploy](#before-you-deploy)
8. [Accessibility](#accessibility)
9. [Security and privacy](#security-and-privacy)
10. [Performance](#performance)
11. [License](#license)

---

## Project purpose

This portfolio is intended to help recruiters, professors, research supervisors, and semiconductor companies understand your VLSI interests, technical skills, projects, education, and career goals. It is a static website — no server, no database, no backend.

---

## Folder structure

```
vlsi_portfolio/
├── index.html              Main portfolio page
├── style.css               All styles
├── script.js               All JavaScript (vanilla, no libraries)
├── 404.html                Custom error page
├── robots.txt              Search engine crawl instructions
├── sitemap.xml             Sitemap for search engines
├── README.md               This file
└── assets/
    ├── images/             All images (use WebP where possible)
    │   ├── favicon.svg
    │   ├── favicon-32.png
    │   ├── favicon-16.png
    │   ├── apple-touch-icon.png
    │   ├── og-preview.webp         Open Graph preview image (1200×630)
    │   ├── alu-waveform.webp
    │   ├── uart-waveform.webp
    │   ├── riscv-block.webp
    │   ├── fifo-waveform.webp
    │   ├── fsm-diagram.webp
    │   ├── cmos-inverter.webp
    │   └── evidence-*.webp         Technical evidence screenshots
    ├── resume.pdf                  Your current CV
    └── project_reports/            PDF reports for individual projects
        ├── alu-report.pdf
        ├── uart-report.pdf
        ├── riscv-report.pdf
        ├── fifo-report.pdf
        ├── fsm-report.pdf
        └── cmos-inverter-report.pdf
```

---

## Technology used

| Layer | Choice | Reason |
|---|---|---|
| Markup | HTML5 (semantic) | Accessibility, SEO, no build step |
| Style | CSS3 (custom properties) | Zero runtime cost, full control |
| Behaviour | Vanilla JavaScript (ES5-compatible) | No dependencies, no supply-chain risk |
| Fonts | System font stack | Zero download weight |
| Icons | Inline SVG | Crisp at all sizes, no external request |
| Images | WebP (with fallback) | Best compression for modern browsers |

No frameworks, no npm, no build process, no external CDN, no analytics, no cookies.

---

## Sections

| # | Section | Purpose |
|---|---|---|
| 1 | Home / Hero | Name, title, tagline, intro, CTAs |
| 2 | About | VLSI background, interests, quick facts |
| 3 | Technical Interests | Nine editable interest cards |
| 4 | Skills | HDL, digital design, verification, FPGA, VLSI concepts, EDA tools |
| 5 | VLSI Design Flow | 13-step simplified ASIC flow diagram |
| 6 | Projects | Six editable project cards |
| 7 | Technical Evidence | Block diagrams, waveforms, reports, layout screenshots |
| 8 | Education | University, degree, coursework, thesis |
| 9 | Academic & Practical Experience | Projects, labs, training, internships |
| 10 | Contact | Email, GitHub, LinkedIn, location; disabled contact form |

---

## How to customise

### Step 1 — Personal information

Search for these placeholder strings in `index.html` and replace every instance:

| Placeholder | Replace with |
|---|---|
| `REPLACE WITH MY NAME` | Your full name |
| `REPLACE-WITH-MY-EMAIL` | Your professional email address |
| `REPLACE-WITH-MY-GITHUB` | Your GitHub username |
| `REPLACE-WITH-MY-LINKEDIN` | Your LinkedIn profile slug |
| `REPLACE-WITH-YOUR-DOMAIN.com` | Your deployed domain or GitHub Pages URL |

### Step 2 — About section

Edit the paragraphs inside `<div class="about-text">` in `index.html` to reflect your actual background, interests, and goals. Do not claim experience you do not have.

### Step 3 — Technical Interests

Remove any `<li class="interest-card">` block whose topic does not genuinely represent your focus. You can also reorder the cards.

### Step 4 — Skills

- Remove any `<li class="skill-tag">` for skills you have not practised.
- Remove any EDA tool tag for tools you have not personally used.
- The dashed-border `skill-tag--optional` tags (VHDL, Assertions, Coverage, UVM) should be removed if you have not studied them.
- Do not add percentage bars or experience levels unless you can substantiate them with evidence.

### Step 5 — Projects

For each project card:

1. Replace `REPLACE WITH ACTUAL RESULT` placeholders with your real measured or simulated values (frequency, LUT count, timing slack, etc.).
2. Update the tools list to match what you actually used.
3. Update the `href` attributes on the GitHub and Report links.
4. Replace the placeholder images with your actual waveforms, block diagrams, or screenshots.
5. Remove any project you have not done.

### Step 6 — Technical Evidence

Replace every placeholder image in the evidence section with your actual screenshots. Update the `alt` attribute of each image with a meaningful description of what the image shows.

### Step 7 — Education

Fill in the education timeline with your real university name, degree, department, start year, expected graduation year, and relevant coursework. Remove the thesis block if it does not apply to you.

### Step 8 — Experience

Add one `<article class="timeline-entry">` block for each real experience entry. Remove the placeholder article entirely. Do not invent organisations, roles, or dates.

### Step 9 — Meta and SEO

Update the following in `<head>` of `index.html`:

- `<title>` — replace name placeholder
- `<meta name="description">` — write a genuine 150-character description
- `<meta name="author">` — your name
- All `og:` Open Graph tags
- `<link rel="canonical">` — your actual URL

Update `sitemap.xml` with your real domain and the correct `<lastmod>` date.

---

## Images and assets

### Recommended image sizes

| Image | Dimensions | Format |
|---|---|---|
| Open Graph preview | 1200 × 630 px | WebP or JPEG |
| Project waveform / diagram | 960 × 480 px | WebP |
| Evidence screenshots | 800 × 600 px | WebP |
| Favicon (SVG) | Scalable | SVG |
| Favicon (PNG) | 32 × 32 px, 16 × 16 px | PNG |
| Apple touch icon | 180 × 180 px | PNG |

### Converting images to WebP

If you have PNG or JPEG screenshots, convert them to WebP to reduce file size. On Linux/macOS with `cwebp` installed:

```bash
cwebp -q 85 input.png -o output.webp
```

On Windows, use [Squoosh](https://squoosh.app) (browser-based, no install needed).

### Resume

Place your current CV at `assets/resume.pdf`. Verify that it does not contain your home address, national ID number, or other private information you do not wish to share publicly.

---

## Before you deploy

Work through this checklist in order. Do not skip any item.

### Personal information
- [ ] Replace `REPLACE WITH MY NAME` in `index.html`, `404.html`, `sitemap.xml`
- [ ] Replace `REPLACE-WITH-MY-EMAIL` with your real professional email
- [ ] Replace `REPLACE-WITH-MY-GITHUB` with your GitHub username
- [ ] Replace `REPLACE-WITH-MY-LINKEDIN` with your LinkedIn slug
- [ ] Replace `REPLACE-WITH-YOUR-DOMAIN.com` in `index.html`, `404.html`, `robots.txt`, `sitemap.xml`

### Content accuracy
- [ ] All `REPLACE WITH ACTUAL RESULT` placeholders replaced with real values, or removed
- [ ] All `REPLACE WITH ARCHITECTURE` / `REPLACE WITH APPLICATION` placeholders filled
- [ ] EDA tools list pruned to only tools you have personally used
- [ ] Skills list pruned to only skills you have genuinely practised
- [ ] Project cards reflect real, completed or in-progress work
- [ ] Education section filled with accurate information
- [ ] Experience section contains only real entries (placeholder article removed)
- [ ] About section text edited to match your actual background

### Assets
- [ ] `assets/resume.pdf` is your current CV and is safe to share publicly
- [ ] Project images replaced (waveforms, block diagrams, screenshots)
- [ ] Evidence section images replaced
- [ ] Favicon files created and placed in `assets/images/`
- [ ] Open Graph preview image (`og-preview.webp`) created

### Privacy and security
- [ ] No private email, home address, student ID, or national ID in any file
- [ ] No API keys, passwords, tokens, or credentials anywhere in the project
- [ ] No proprietary chip designs, licensed EDA files, or confidential IP in `assets/`
- [ ] Contact form remains disabled — you have not added a backend or action attribute
- [ ] No analytics, tracking, or advertising scripts added

### SEO
- [ ] `<title>` and `<meta name="description">` updated in `index.html`
- [ ] Canonical URL set in `index.html`
- [ ] Open Graph tags updated
- [ ] `sitemap.xml` domain and `<lastmod>` date updated
- [ ] `robots.txt` Sitemap URL updated

---

## Accessibility

This portfolio was built with the following accessibility features:

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`, `<dl>`, `<time>`)
- Single `<h1>` per page with logical heading order (`h2` → `h3` → `h4`)
- Skip to main content link (visible on keyboard focus)
- All interactive elements reachable and operable by keyboard
- `aria-label`, `aria-expanded`, `aria-controls`, `aria-describedby` used where appropriate
- All images have meaningful `alt` attributes (replace placeholder alt text with real descriptions)
- Colour contrast designed to meet WCAG 2.1 AA for normal text
- `prefers-reduced-motion` respected — all animations disabled for users who request it
- Mobile navigation is keyboard accessible and closeable with Escape
- Form labels are associated with inputs via `for` / `id` pairs

---

## Security and privacy

- Fully static — no server-side code, no database, no authentication
- No `eval()`, `Function()`, or `document.write()` anywhere
- No `innerHTML` used for any dynamic or user-controlled content
- All dynamic text uses `textContent` or `createTextNode`
- No inline JavaScript event handlers in HTML
- No external scripts, CDN dependencies, or third-party resources
- No cookies, `localStorage`, `sessionStorage`, or any storage used
- No analytics, fingerprinting, advertising, or visitor tracking
- No data is collected or transmitted from visitor browsers
- All external links use `target="_blank" rel="noopener noreferrer"`
- Contact form is permanently disabled with no backend — uses `mailto:` link instead

> **Important:** Because this site is deployed to a public GitHub repository, every file in the repository — including your resume, images, and reports — is publicly accessible. Do not commit anything you are not comfortable sharing with anyone on the internet.

---

## Performance

- System font stack — zero font download weight
- WebP images for best compression
- `loading="lazy"` on all below-the-fold images
- Width and height attributes on all images to prevent layout shift
- Minimal JavaScript — no frameworks, no libraries
- No large videos or heavy animations
- CSS uses `will-change` sparingly (none currently)
- Scroll-reveal uses `IntersectionObserver` — no scroll event polling

---

## License

This portfolio template is for your personal use. You may customise and deploy it freely for your own professional portfolio.

Do not remove the `<!-- REVIEW -->` and `<!-- SECURITY -->` comments until you have addressed each one — they are reminders to protect your privacy and accuracy before going live.

---

*Built with HTML, CSS, and vanilla JavaScript. No tracking. No cookies. No frameworks.*
