# Phase 01 — Scaffold & Hero

## Goal
Create the `transpose-landing` project from scratch with the full folder structure, CSS foundation (dark theme, typography, variables), HTML skeleton with all section placeholders, and the complete hero section — the first thing visitors see.

## Prerequisites
- Read `_CONTEXT.md` first for all design decisions, copy, and constraints.

## Tasks

### 01.1 — Create Project Structure

Create the following at `C:\Projects\transpose-landing\`:

```
transpose-landing/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── favicon.svg
└── README.md
```

**README.md** should contain:
```markdown
# Transpose — Landing Page

> Transpose your playing into notation.

## Local Development
Open `index.html` in a browser, or run a local server:
```bash
python -m http.server 8000
# or
npx serve .
```

## Deploy
This is a static site. Deploy to any static host:
- **Vercel:** `vercel --prod`
- **Netlify:** drag & drop the folder
- **GitHub Pages:** push to `gh-pages` branch

## Forms
Email signup and feedback forms use Formspree. Replace the placeholder IDs in `index.html`:
- `YOUR_FORMSPREE_SIGNUP_ID` — create at https://formspree.io
- `YOUR_FORMSPREE_FEEDBACK_ID` — create at https://formspree.io
```

**favicon.svg** — a simple musical note SVG:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="10" cy="24" r="6" fill="#6366f1"/>
  <rect x="14" y="4" width="3" height="20" fill="#6366f1"/>
  <path d="M17 4 Q24 2 24 8 Q24 14 17 12" fill="#8b5cf6"/>
</svg>
```

### 01.2 — CSS Foundation

In `css/style.css`, create the full CSS foundation. This must include:

**CSS Custom Properties (`:root`):**
```css
:root {
  /* Colors */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: #1a1a2e;
  --text-primary: #f0f0f5;
  --text-secondary: #a0a0b5;
  --text-muted: #6b6b80;
  --accent-start: #6366f1;
  --accent-end: #8b5cf6;
  --accent-gradient: linear-gradient(135deg, var(--accent-start), var(--accent-end));
  --accent-glow: rgba(99, 102, 241, 0.3);

  /* Typography */
  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Spacing */
  --section-padding: 5rem 1.5rem;
  --max-width: 1100px;

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-medium: 0.4s ease;
}
```

**CSS Reset:** Use a minimal modern reset:
- `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`
- `html { scroll-behavior: smooth; }`
- `body` with `--bg-primary` background, `--text-primary` color, `--font-body` font

**Base Styles:**
- `section` elements: centered with `max-width: var(--max-width)`, `margin: 0 auto`, `padding: var(--section-padding)`
- Heading styles: `h1` through `h3` using `--font-heading`, with appropriate sizing (h1: `clamp(2.5rem, 6vw, 4.5rem)`, h2: `clamp(1.8rem, 4vw, 2.8rem)`)
- Link and button base styles
- A `.btn-primary` class with `--accent-gradient` background, white text, padding `1rem 2.5rem`, `border-radius: 50px`, no border, `cursor: pointer`, `font-size: 1.1rem`, `font-weight: 600`, hover state with `transform: translateY(-2px)` and `box-shadow: 0 8px 30px var(--accent-glow)`
- A `.btn-primary:active` with `transform: translateY(0)`

**Utility Classes:**
- `.text-gradient` — `background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
- `.fade-in` — `opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease;`
- `.fade-in.visible` — `opacity: 1; transform: translateY(0);`

### 01.3 — HTML Skeleton with All Section Placeholders

In `index.html`, create the full HTML document with:

**`<head>`:**
- `charset="UTF-8"`, `viewport` meta
- `<title>Transpose — Play it. Score it.</title>`
- Open Graph meta tags: `og:title`, `og:description` ("Transpose your playing into notation. Turn any instrument into a MIDI controller."), `og:image` (placeholder path to `assets/og-image.png`), `og:type` ("website")
- Google Fonts link for Inter (400, 500) and Space Grotesk (500, 700)
- Link to `css/style.css`
- Favicon link to `assets/favicon.svg`

**`<body>` sections** (each with an `id` for anchor navigation):
```html
<section id="hero">
  <!-- Phase 01 builds this fully -->
</section>

<section id="problem">
  <!-- Phase 02 -->
</section>

<section id="solution">
  <!-- Phase 02 -->
</section>

<section id="signup">
  <!-- Phase 02 -->
</section>

<section id="feedback">
  <!-- Phase 02 -->
</section>

<footer id="footer">
  <!-- Phase 02 -->
</footer>
```

- Script tag at end of body: `<script src="js/main.js"></script>`

### 01.4 — Build the Hero Section

The hero section is the most important part of the page. It must stop visitors in their tracks.

**HTML structure inside `<section id="hero">`:**
```html
<section id="hero">
  <div class="hero-content">
    <h1 class="hero-title">
      <span class="text-gradient">Transpose</span>
    </h1>
    <p class="hero-tagline">Transpose your playing into notation.</p>
    <p class="hero-description">
      You've spent years mastering your instrument. But the moment you need
      your playing as MIDI or sheet music, you're stuck clicking notes one
      by one. That ends now.
    </p>
    <a href="#signup" class="btn-primary hero-cta">I Need This</a>
  </div>
  <div class="hero-visual">
    <!-- SVG waveform-to-notation visual -->
  </div>
</section>
```

**Hero CSS:**
- `#hero` — `min-height: 100vh`, `display: flex`, `align-items: center`, `justify-content: center`, `text-align: center`, `flex-direction: column`
- `.hero-content` — `max-width: 700px`, centered
- `.hero-title` — the `clamp(2.5rem, 6vw, 4.5rem)` sizing, `margin-bottom: 1rem`
- `.hero-tagline` — `font-size: clamp(1.1rem, 2.5vw, 1.5rem)`, `color: var(--text-secondary)`, `margin-bottom: 1.5rem`
- `.hero-description` — `font-size: 1.1rem`, `color: var(--text-secondary)`, `line-height: 1.7`, `margin-bottom: 2.5rem`, `max-width: 550px`, `margin-left/right: auto`
- `.hero-cta` — the `.btn-primary` styles plus `font-size: 1.2rem`

**Hero Visual — SVG waveform-to-notation:**

Create an inline SVG that shows a waveform on the left morphing into musical notes on the right. This should be a decorative illustration, not interactive. Keep it simple — clean lines, use accent colors.

Suggested SVG approach:
- Left side: 5-7 vertical bars of varying heights (audio waveform)
- Right side: 3-4 musical note shapes (quarter notes / eighth notes)
- A subtle gradient or dotted line connecting them (the "transpose" moment)
- Colors: `var(--accent-start)` and `var(--accent-end)` (use the hex values directly in SVG: `#6366f1`, `#8b5cf6`)
- Width: responsive, `max-width: 500px`, centered below hero text
- Add a subtle CSS animation: the waveform bars gently pulse (scale Y), notes gently float (translateY)

### 01.5 — Basic JS Setup

In `js/main.js`, set up the foundation:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // Observe all elements with .fade-in class
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
```

This is the scaffold — Phase 03 will add form handling and more interactions.

## Quality Gate
- [ ] `C:\Projects\transpose-landing\` exists with all files: `index.html`, `css/style.css`, `js/main.js`, `assets/favicon.svg`, `README.md`
- [ ] Opening `index.html` in a browser shows the hero section — dark background, gradient "Transpose" title, tagline, pain statement, CTA button
- [ ] CTA button has hover animation (lift + glow)
- [ ] SVG waveform-to-notation visual renders below hero text with subtle animation
- [ ] Google Fonts load (Inter + Space Grotesk visible in text)
- [ ] No console errors
- [ ] Page looks correct on mobile (375px) — text is readable, button is tappable, nothing overflows
- [ ] Placeholder sections exist in HTML (empty but present) for problem, solution, signup, feedback, footer
