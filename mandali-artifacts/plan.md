# === _CONTEXT.md (READ FIRST) ===

# Transpose Landing Page — Global Context

> **READ THIS FIRST.** This context applies to ALL phases.

## Project: Transpose Landing Page (New — Greenfield)

A demand-gauge landing page for **Transpose**, a product concept that converts audio from any instrument into MIDI and sheet music. The page sells the vision, captures interest signals, and collects user feedback — before any product code is written.

**Repository:** `C:\Projects\transpose-landing` (to be created by Phase 01)
**Language:** HTML5, CSS3, vanilla JavaScript (ES6+)
**Dependencies:** None. Zero frameworks. Static files only.
**Form backend:** Formspree (https://formspree.io) — free tier, no server needed
**Deploy target:** Any static host (Vercel, Netlify, GitHub Pages) — zero-config

## Goal

Build a single-page marketing site that:
1. **Sells the Transpose vision** — makes musicians feel seen, makes them want this product yesterday
2. **Captures excitement signals** — one-click "I Need This" email signup (low friction)
3. **Collects structured user feedback** — instrument, frustrations, use cases, time spent transcribing
4. **Is deploy-ready** — works on any static host with no build step

## Architecture Decision: Static HTML (No Framework)

| Rejected | Why |
|----------|-----|
| React / Next.js | Overkill for a single landing page. Adds build complexity, no benefit for static content. |
| WordPress / CMS | Adds hosting complexity, security surface, unnecessary for a validation page. |
| Webflow / Squarespace | Lock-in, limited customization, harder to version control. |

**Chosen: Static HTML + CSS + vanilla JS** because:
- Zero build step — open `index.html` in a browser and it works
- Deploys anywhere with zero config
- Full control over every pixel
- Easy to hand off or modify later
- Fast page load — no JS framework overhead

## Architecture Diagram

```
C:\Projects\transpose-landing\
├── index.html          # Single-page site (all sections)
├── css/
│   └── style.css       # All styling — dark theme, responsive, animations
├── js/
│   └── main.js         # Form handling, scroll animations, counter UX
├── assets/
│   ├── favicon.svg     # SVG favicon (musical note or waveform)
│   └── og-image.png    # Open Graph preview image (1200x630) — placeholder
└── README.md           # Setup & deploy instructions
```

## Design Decisions (Locked)

| # | Decision | Detail |
|---|----------|--------|
| 1 | **Single HTML file** | All sections in one `index.html`. No routing, no multi-page. Single-page scroll. |
| 2 | **Dark theme** | Dark background (#0a0a0f or similar), light text, accent color for CTAs. Musical "stage lighting" feel. |
| 3 | **Accent color** | Electric blue/purple gradient (#6366f1 → #8b5cf6). Evokes digital, modern, musical. |
| 4 | **Typography** | Google Fonts: `Inter` for body, `Space Grotesk` for headings. Both free, modern, highly legible. |
| 5 | **Formspree for forms** | Both the email signup and feedback form submit to Formspree. No backend server. Two separate Formspree form endpoints. |
| 6 | **No build tools** | No npm, no webpack, no Sass. Raw CSS, raw JS. Keep it simple. |
| 7 | **Mobile-first responsive** | Design for 375px width first, scale up. Musicians will find this on social media (phone). |
| 8 | **CSS custom properties** | Use CSS variables for colors, spacing, fonts. Makes theming consistent and easy to tweak. |
| 9 | **Smooth scroll** | Nav anchor links use `scroll-behavior: smooth`. Sections have IDs. |
| 10 | **Intersection Observer** | Use `IntersectionObserver` for scroll-triggered fade-in animations. No animation library. |
| 11 | **Formspree placeholder IDs** | Use `YOUR_FORMSPREE_SIGNUP_ID` and `YOUR_FORMSPREE_FEEDBACK_ID` as placeholders in form `action` attributes. User replaces after creating Formspree forms. |

## Product Copy (Locked)

These are the final copy decisions. Agents must use this exact text.

| Element | Text |
|---------|------|
| **Product name** | Transpose |
| **Tagline** | Transpose your playing into notation. |
| **Hero pain statement** | You've spent years mastering your instrument. But the moment you need your playing as MIDI or sheet music, you're stuck clicking notes one by one. That ends now. |
| **CTA button (hero)** | I Need This |
| **CTA button (signup)** | Count Me In |
| **Signup confirmation** | You're in. We'll let you know the moment Transpose is ready. |
| **Feedback CTA** | Help Us Build This Right |
| **Footer tagline** | Play it. Score it. |

## Page Sections (in scroll order)

1. **Hero** — Name, tagline, pain statement, CTA, waveform-to-notation SVG visual
2. **Problem** — 4 pain-point cards (guitarist, brass player, arranger, producer)
3. **Solution** — 3-step "how it works" (Play → Transpose → Create)
4. **Signup** — "Count Me In" email capture with interest counter
5. **Feedback** — Structured form (instruments, frustrations, use cases, time)
6. **Footer** — Tagline, social links, copyright

## Pain Point Cards (Locked Copy)

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | 🎸 | "I wrote a riff. Getting it into my DAW took longer than writing it." | You play guitar. You think in frets and strings. But your DAW thinks in piano keys and mouse clicks. |
| 2 | 🎺 | "20 years of trumpet. Zero years of piano. That shouldn't matter." | You're a virtuoso on your instrument. But to input MIDI, you need to be a pianist too? That's absurd. |
| 3 | 🎼 | "The arranging is the fun part. The transcribing is the tax." | You hear a song and know exactly how to arrange it. But first you spend hours clicking notes into a score, one by one. |
| 4 | 🎧 | "I lose creative momentum at the MIDI input step." | The idea is flowing. You can hear the whole track. But the moment you sit down to input it digitally, the magic fades. |

## Solution Steps (Locked Copy)

| Step | Icon/Visual | Title | Body |
|------|-------------|-------|------|
| 1 | 🎵 | Play | Pick up your instrument — guitar, trumpet, violin, voice, anything. Play your part the way you've always played it. |
| 2 | ⚡ | Transpose | Our AI listens and transcribes in real-time. No MIDI controller. No piano keyboard. Just your sound. |
| 3 | 🎹 | Create | Get MIDI, sheet music, or both. Drop it into your DAW, notation software, or arrangement. Keep creating. |

## Feedback Form Fields (Locked)

| Field | Type | Options |
|-------|------|---------|
| What instrument(s) do you play? | Checkboxes | Guitar, Bass, Vocals, Trumpet, Saxophone, Violin/Viola, Cello, Piano/Keys, Drums/Percussion, Flute/Clarinet, Other (free text) |
| What's your biggest frustration getting your playing into digital format? | Textarea | — |
| What would you use Transpose for? | Checkboxes | MIDI for production, Sheet music / lead sheets, Arranging for ensembles, Transcription services, Teaching / education, Other (free text) |
| How much time do you spend transcribing per week? | Radio | Less than 1 hour, 1–3 hours, 3–5 hours, 5+ hours |
| Email (so we can follow up) | Email input | Optional |
| Anything else you want us to know? | Textarea | — |

## Non-Negotiables

1. **No JavaScript frameworks.** Vanilla JS only. No React, Vue, jQuery, etc.
2. **No build step.** The site must work by opening `index.html` directly (or via a simple HTTP server).
3. **Mobile-first.** Must look great on 375px screens. Desktop is a progressive enhancement.
4. **Forms degrade gracefully.** If JS is disabled, forms still submit via native HTML form `action` to Formspree.
5. **Accessible.** Semantic HTML, proper heading hierarchy, form labels, sufficient color contrast (WCAG AA on dark background), focus indicators.
6. **Fast.** No images except favicon and OG image. Use CSS and SVG for visuals. Page should load in under 1 second on 3G.
7. **The copy in this document is final.** Do not rewrite headlines, pain points, or CTAs. Implement them exactly as specified.

## Agents Needed

- **@Dev** — HTML structure, CSS styling, JS interactions
- **@Designer** — Visual polish, animation timing, responsive breakpoints, SVG visuals
- **@QA** — Cross-browser testing, mobile testing, accessibility audit, form validation
- **@PM** — Acceptance criteria tracking, copy verification
- **@Security** — Form submission security (Formspree config, no PII leaks, CSP headers)
- **@SRE** — Deploy-readiness, static hosting config, performance baseline



# === _INDEX.md ===

# Transpose Landing Page — Phase Index

## Overview
Build a demand-gauge landing page for Transpose (audio-to-transcription product) that sells the vision, captures email signups, and collects structured user feedback.

## Phases

| Phase | File | Status | Description |
|-------|------|--------|-------------|
| 01 | phase-01-scaffold-and-hero.md | NOT STARTED | Create project structure, HTML skeleton, CSS foundation (variables, reset, dark theme), hero section with full copy and CTA |
| 02 | phase-02-content-sections.md | NOT STARTED | Problem cards, solution steps, signup section with email capture, feedback form with all fields |
| 03 | phase-03-polish-and-deploy.md | NOT STARTED | Scroll animations, mobile responsive refinements, form backend wiring, accessibility pass, deploy-readiness |

## Dependencies
- Phase 02 depends on Phase 01
- Phase 03 depends on Phase 02

## Success Criteria
- [ ] Page loads from `index.html` with no build step and no errors in browser console
- [ ] All 6 sections render correctly on mobile (375px) and desktop (1440px)
- [ ] Email signup form submits to Formspree (or placeholder action) and shows confirmation
- [ ] Feedback form submits all fields to Formspree (or placeholder action)
- [ ] All copy matches `_CONTEXT.md` exactly — headlines, pain points, CTAs
- [ ] Page scores 90+ on Lighthouse performance audit
- [ ] WCAG AA color contrast passes on all text
- [ ] Site deploys to Vercel/Netlify/GitHub Pages with zero configuration



# === phase-01-scaffold-and-hero.md ===

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



# === phase-02-content-sections.md ===

# Phase 02 — Content Sections

## Goal
Build all remaining content sections: problem cards, solution steps, email signup with counter, full feedback form, and footer. After this phase, the page has all its content and is functionally complete (minus animations and final polish).

## Prerequisites
- Read `_CONTEXT.md` first for all copy, field definitions, and design decisions.
- Phase 01 complete — `index.html` exists with hero section and all placeholder sections. CSS foundation (variables, reset, dark theme, `.btn-primary`, `.fade-in`) is in place.

## Critical Constraint
**Use the exact copy from `_CONTEXT.md`.** Do not rephrase, reword, or "improve" any headlines, pain points, or CTAs. Implement them verbatim.

## Tasks

### 02.1 — Problem Section (4 Pain-Point Cards)

Build the `#problem` section with a heading and 4 cards in a responsive grid.

**HTML structure:**
```html
<section id="problem" class="fade-in">
  <h2>Sound familiar?</h2>
  <div class="problem-grid">
    <div class="problem-card">
      <span class="problem-icon">🎸</span>
      <h3>"I wrote a riff. Getting it into my DAW took longer than writing it."</h3>
      <p>You play guitar. You think in frets and strings. But your DAW thinks in piano keys and mouse clicks.</p>
    </div>
    <!-- 3 more cards with copy from _CONTEXT.md Pain Point Cards table -->
  </div>
</section>
```

**CSS for problem section:**
- `.problem-grid` — CSS Grid, `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`, `gap: 1.5rem`
- `.problem-card` — `background: var(--bg-card)`, `border-radius: 16px`, `padding: 2rem`, subtle border `1px solid rgba(255,255,255,0.06)`
- `.problem-card:hover` — `border-color: var(--accent-start)`, subtle `box-shadow`
- `.problem-icon` — `font-size: 2.5rem`, `margin-bottom: 1rem`, `display: block`
- `.problem-card h3` — `font-size: 1.1rem`, `margin-bottom: 0.75rem`, `color: var(--text-primary)`, `font-style: italic`
- `.problem-card p` — `color: var(--text-secondary)`, `line-height: 1.6`
- On mobile (≤768px): grid collapses to single column

All 4 cards. Exact copy from `_CONTEXT.md`.

### 02.2 — Solution Section (3 Steps)

Build the `#solution` section with a heading and 3 steps in a horizontal flow.

**HTML structure:**
```html
<section id="solution" class="fade-in">
  <h2>How it works</h2>
  <div class="solution-steps">
    <div class="solution-step">
      <div class="step-number">1</div>
      <div class="step-icon">🎵</div>
      <h3>Play</h3>
      <p>Pick up your instrument — guitar, trumpet, violin, voice, anything. Play your part the way you've always played it.</p>
    </div>
    <!-- Step 2 (Transpose) and Step 3 (Create) with copy from _CONTEXT.md -->
  </div>
</section>
```

**CSS for solution section:**
- `.solution-steps` — `display: flex`, `gap: 2rem`, `justify-content: center`, `flex-wrap: wrap`
- `.solution-step` — `flex: 1`, `min-width: 250px`, `max-width: 320px`, `text-align: center`, `padding: 2rem`
- `.step-number` — `width: 48px`, `height: 48px`, `border-radius: 50%`, `background: var(--accent-gradient)`, `color: white`, `display: flex`, `align-items: center`, `justify-content: center`, `font-weight: 700`, `font-size: 1.2rem`, `margin: 0 auto 1rem`
- `.step-icon` — `font-size: 3rem`, `margin-bottom: 1rem`
- Between steps (on desktop): a subtle connector — a horizontal dashed line or arrow. Use a CSS `::after` pseudo-element on steps 1 and 2. On mobile, hide the connector.

All 3 steps. Exact copy from `_CONTEXT.md`.

### 02.3 — Email Signup Section

Build the `#signup` section — the primary conversion point.

**HTML structure:**
```html
<section id="signup" class="fade-in">
  <div class="signup-content">
    <h2>Be first to know</h2>
    <p class="signup-subtitle">Transpose is coming. Drop your email and we'll notify you the moment it's ready.</p>
    <form class="signup-form" action="https://formspree.io/f/YOUR_FORMSPREE_SIGNUP_ID" method="POST">
      <div class="signup-input-group">
        <input type="email" name="email" placeholder="your@email.com" required aria-label="Email address">
        <button type="submit" class="btn-primary">Count Me In</button>
      </div>
      <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
    </form>
    <div class="signup-confirmation" hidden>
      <p>✓ You're in. We'll let you know the moment Transpose is ready.</p>
    </div>
    <p class="signup-counter">
      Join <span class="counter-number">0</span> musicians waiting for Transpose
    </p>
  </div>
</section>
```

**CSS for signup section:**
- `#signup` — `background: var(--bg-secondary)`, full-width (break out of max-width), `text-align: center`, extra vertical padding
- `.signup-form` — centered, `max-width: 500px`
- `.signup-input-group` — `display: flex`, `gap: 0.5rem`. On mobile: `flex-direction: column`
- `input[type="email"]` — dark input styling: `background: var(--bg-primary)`, `border: 1px solid rgba(255,255,255,0.1)`, `color: var(--text-primary)`, `padding: 1rem 1.5rem`, `border-radius: 50px`, `flex: 1`, `font-size: 1rem`. Focus: `border-color: var(--accent-start)`, `outline: none`, `box-shadow: 0 0 0 3px var(--accent-glow)`
- Hidden honeypot field `_gotcha` for spam protection (Formspree feature)
- `.signup-confirmation` — shown after successful submit, green check, friendly message
- `.signup-counter` — `color: var(--text-muted)`, `margin-top: 1.5rem`, `font-size: 0.9rem`
- `.counter-number` — `color: var(--accent-start)`, `font-weight: 700`

**Note:** The counter number is a placeholder. Start it at `0`. In `main.js` (Phase 03), add logic to increment it locally on submission for immediate feedback. A real count would require a backend — out of scope for v1. For now, hardcode a seed number or leave at 0.

### 02.4 — Feedback Form Section

Build the `#feedback` section with all fields from `_CONTEXT.md`.

**HTML structure:**
```html
<section id="feedback" class="fade-in">
  <h2>Help us build exactly what you need</h2>
  <p class="feedback-subtitle">Tell us about your workflow. Your answers directly shape what we build first.</p>
  <form class="feedback-form" action="https://formspree.io/f/YOUR_FORMSPREE_FEEDBACK_ID" method="POST">

    <!-- Instruments (checkboxes) -->
    <fieldset>
      <legend>What instrument(s) do you play?</legend>
      <div class="checkbox-grid">
        <label><input type="checkbox" name="instruments[]" value="Guitar"> Guitar</label>
        <label><input type="checkbox" name="instruments[]" value="Bass"> Bass</label>
        <label><input type="checkbox" name="instruments[]" value="Vocals"> Vocals</label>
        <label><input type="checkbox" name="instruments[]" value="Trumpet"> Trumpet</label>
        <label><input type="checkbox" name="instruments[]" value="Saxophone"> Saxophone</label>
        <label><input type="checkbox" name="instruments[]" value="Violin/Viola"> Violin/Viola</label>
        <label><input type="checkbox" name="instruments[]" value="Cello"> Cello</label>
        <label><input type="checkbox" name="instruments[]" value="Piano/Keys"> Piano/Keys</label>
        <label><input type="checkbox" name="instruments[]" value="Drums/Percussion"> Drums/Percussion</label>
        <label><input type="checkbox" name="instruments[]" value="Flute/Clarinet"> Flute/Clarinet</label>
        <label><input type="checkbox" name="instruments[]" value="Other"> Other</label>
      </div>
      <input type="text" name="instruments_other" placeholder="Other instruments..." class="other-input">
    </fieldset>

    <!-- Frustration (textarea) -->
    <fieldset>
      <legend>What's your biggest frustration getting your playing into digital format?</legend>
      <textarea name="frustration" rows="4" placeholder="Tell us about your workflow..."></textarea>
    </fieldset>

    <!-- Use cases (checkboxes) -->
    <fieldset>
      <legend>What would you use Transpose for?</legend>
      <div class="checkbox-grid">
        <label><input type="checkbox" name="use_cases[]" value="MIDI for production"> MIDI for production</label>
        <label><input type="checkbox" name="use_cases[]" value="Sheet music / lead sheets"> Sheet music / lead sheets</label>
        <label><input type="checkbox" name="use_cases[]" value="Arranging for ensembles"> Arranging for ensembles</label>
        <label><input type="checkbox" name="use_cases[]" value="Transcription services"> Transcription services</label>
        <label><input type="checkbox" name="use_cases[]" value="Teaching / education"> Teaching / education</label>
        <label><input type="checkbox" name="use_cases[]" value="Other"> Other</label>
      </div>
    </fieldset>

    <!-- Time spent (radio) -->
    <fieldset>
      <legend>How much time do you spend transcribing per week?</legend>
      <div class="radio-group">
        <label><input type="radio" name="time_spent" value="Less than 1 hour"> Less than 1 hour</label>
        <label><input type="radio" name="time_spent" value="1-3 hours"> 1–3 hours</label>
        <label><input type="radio" name="time_spent" value="3-5 hours"> 3–5 hours</label>
        <label><input type="radio" name="time_spent" value="5+ hours"> 5+ hours</label>
      </div>
    </fieldset>

    <!-- Email (optional) -->
    <fieldset>
      <legend>Email (so we can follow up)</legend>
      <input type="email" name="email" placeholder="your@email.com (optional)">
    </fieldset>

    <!-- Anything else (textarea) -->
    <fieldset>
      <legend>Anything else you want us to know?</legend>
      <textarea name="anything_else" rows="3" placeholder="Ideas, wishes, rants — all welcome..."></textarea>
    </fieldset>

    <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
    <button type="submit" class="btn-primary">Help Us Build This Right</button>
  </form>
  <div class="feedback-confirmation" hidden>
    <p>🙏 Thank you! Your input directly shapes what we build.</p>
  </div>
</section>
```

**CSS for feedback form:**
- `.feedback-form` — `max-width: 650px`, `margin: 2rem auto 0`, `text-align: left`
- `fieldset` — no default border, `margin-bottom: 2rem`
- `legend` — `font-size: 1.05rem`, `font-weight: 500`, `color: var(--text-primary)`, `margin-bottom: 0.75rem`
- `.checkbox-grid` — CSS Grid, `grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))`, `gap: 0.5rem`
- Checkbox/radio label styling — `display: flex`, `align-items: center`, `gap: 0.5rem`, `color: var(--text-secondary)`, `cursor: pointer`, `padding: 0.5rem`, `border-radius: 8px`. Hover: subtle background highlight.
- Custom checkbox/radio appearance — hide default, use `::before` pseudo-element with border + accent color when checked. OR use `accent-color: var(--accent-start)` for simplicity.
- `textarea` — same dark styling as email input: `background: var(--bg-primary)`, `border`, `border-radius: 12px`, `padding: 1rem`, `width: 100%`, `color: var(--text-primary)`, `resize: vertical`
- `.other-input` — smaller text input, shown below "Other" checkbox, same dark styling
- Submit button centered: `display: block`, `margin: 2rem auto 0`

### 02.5 — Footer

Build the `<footer id="footer">`.

**HTML structure:**
```html
<footer id="footer">
  <div class="footer-content">
    <p class="footer-brand"><span class="text-gradient">Transpose</span></p>
    <p class="footer-tagline">Play it. Score it.</p>
    <div class="footer-links">
      <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter">𝕏</a>
      <a href="mailto:hello@transpose.fm" aria-label="Email">✉</a>
    </div>
    <p class="footer-copyright">© 2026 Transpose. All rights reserved.</p>
  </div>
</footer>
```

**CSS for footer:**
- `footer` — `background: var(--bg-secondary)`, `text-align: center`, `padding: 3rem 1.5rem`
- `.footer-brand` — `font-size: 1.5rem`, `font-weight: 700`, `margin-bottom: 0.5rem`
- `.footer-tagline` — `color: var(--text-muted)`, `margin-bottom: 1.5rem`
- `.footer-links` — `display: flex`, `gap: 1.5rem`, `justify-content: center`, `margin-bottom: 1.5rem`
- `.footer-links a` — `color: var(--text-secondary)`, `text-decoration: none`, `font-size: 1.2rem`. Hover: `color: var(--accent-start)`
- `.footer-copyright` — `color: var(--text-muted)`, `font-size: 0.8rem`

## Quality Gate
- [ ] All 4 problem cards render with correct copy from `_CONTEXT.md` — icons, titles, body text match exactly
- [ ] All 3 solution steps render with correct copy — step numbers, icons, titles, body text match exactly
- [ ] Email signup form has email input + "Count Me In" button + honeypot field
- [ ] Feedback form has all 6 field groups with correct options matching `_CONTEXT.md` Feedback Form Fields table
- [ ] Footer shows brand, tagline, social links, copyright
- [ ] Forms have `action` attributes pointing to Formspree placeholder URLs
- [ ] All sections use `.fade-in` class for scroll animation readiness
- [ ] Problem cards show in 2x2 grid on desktop, single column on mobile
- [ ] Solution steps show horizontally on desktop, vertically on mobile
- [ ] Signup input + button show side-by-side on desktop, stacked on mobile
- [ ] No console errors



# === phase-03-polish-and-deploy.md ===

# Phase 03 — Polish & Deploy

## Goal
Add scroll animations, form submission handling (with confirmation UX), final responsive tweaks, accessibility pass, and ensure the site is deploy-ready on any static host. After this phase, the site is production-ready.

## Prerequisites
- Read `_CONTEXT.md` first for design decisions and non-negotiables.
- Phase 02 complete — all 6 sections are built with correct content. CSS styling is in place. Forms have Formspree placeholder actions.

## Critical Constraint
**Zero regression.** All content, styling, and structure from Phase 01 and 02 must remain intact. This phase adds behavior and polish — it does not restructure.

## Tasks

### 03.1 — Form Submission Handling (main.js)

Add JavaScript to handle both forms with fetch API (avoiding full page redirect on submit).

```javascript
function handleFormSubmit(form, confirmationEl) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.hidden = true;
        confirmationEl.hidden = false;
      } else {
        submitBtn.textContent = 'Something went wrong. Try again?';
        submitBtn.disabled = false;
      }
    } catch (error) {
      submitBtn.textContent = 'Something went wrong. Try again?';
      submitBtn.disabled = false;
    }
  });
}
```

Wire this to both forms:
- Signup form → `.signup-confirmation`
- Feedback form → `.feedback-confirmation`

**Important:** The form `action` still points to Formspree, so if JS is disabled, native form submission still works (Formspree shows its own confirmation page). This is the graceful degradation required by the non-negotiables.

### 03.2 — Signup Counter UX

In `main.js`, add a simple animated counter for the signup section:

```javascript
// Animate counter when it scrolls into view
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

- Seed the counter at a reasonable number (e.g., `47`) — this is a social proof placeholder. Put the seed value in a `data-count` attribute on `.counter-number` so it's easy to update.
- Trigger the animation when the signup section enters the viewport (use the existing `IntersectionObserver` or a new one).
- After a successful signup submission, increment the displayed count by 1 (local only — no backend persistence).

### 03.3 — Scroll Animations

Enhance the `IntersectionObserver` from Phase 01:

- Add `.fade-in` class to these elements (if not already present):
  - Each `.problem-card` (stagger: add `transition-delay` of `0.1s`, `0.2s`, `0.3s`, `0.4s` via CSS nth-child)
  - Each `.solution-step` (stagger similarly)
  - `.signup-content`
  - `.feedback-form`
- The hero section should NOT use `.fade-in` — it should be immediately visible (it's above the fold)
- Hero elements get a simple CSS entrance animation on page load:
  ```css
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-title { animation: heroFadeUp 0.8s ease forwards; }
  .hero-tagline { animation: heroFadeUp 0.8s ease 0.2s forwards; opacity: 0; }
  .hero-description { animation: heroFadeUp 0.8s ease 0.4s forwards; opacity: 0; }
  .hero-cta { animation: heroFadeUp 0.8s ease 0.6s forwards; opacity: 0; }
  .hero-visual { animation: heroFadeUp 0.8s ease 0.8s forwards; opacity: 0; }
  ```

### 03.4 — Responsive Refinements

Do a full responsive pass. Test at these breakpoints and fix any issues:

| Breakpoint | Target |
|-----------|--------|
| 375px | iPhone SE — smallest supported |
| 414px | iPhone Plus / standard Android |
| 768px | iPad portrait |
| 1024px | iPad landscape / small laptop |
| 1440px | Standard desktop |

**Known things to check:**
- Hero title: does `clamp()` scale properly at all sizes?
- Problem cards: do they stack to 1 column below 768px?
- Solution steps: do they stack vertically below 768px? Are connectors hidden?
- Signup form: does input+button stack below 480px?
- Feedback form: do checkbox grids reflow cleanly?
- Footer: does it look clean at all sizes?
- No horizontal scroll at any breakpoint

Add media queries in `style.css` as needed. Prefer `min-width` media queries (mobile-first).

### 03.5 — Accessibility Pass

Verify and fix:

1. **Heading hierarchy:** `h1` (hero) → `h2` (section headings) → `h3` (card/step titles). No skipped levels.
2. **Form labels:** Every input has either a visible `<label>` or `aria-label`. The `<legend>` inside `<fieldset>` serves as the label for field groups.
3. **Color contrast:** All text passes WCAG AA (4.5:1 for body text, 3:1 for large text) against dark backgrounds. Check `--text-secondary` (#a0a0b5) against `--bg-primary` (#0a0a0f) — this should pass but verify. Check `--text-muted` (#6b6b80) — this may need to be lightened for body text (OK for decorative/supplementary text).
4. **Focus indicators:** All interactive elements (buttons, links, inputs) have visible focus rings. Use `outline: 2px solid var(--accent-start)` with `outline-offset: 2px` on `:focus-visible`.
5. **Button states:** Submit buttons show disabled state visually (reduced opacity) when submitting.
6. **Skip to content:** Add a visually-hidden "Skip to content" link at the top of the page that becomes visible on focus:
   ```html
   <a href="#hero" class="skip-link">Skip to content</a>
   ```
   ```css
   .skip-link {
     position: absolute;
     top: -100%;
     left: 0;
     padding: 1rem;
     background: var(--accent-start);
     color: white;
     z-index: 100;
   }
   .skip-link:focus { top: 0; }
   ```
7. **Reduced motion:** Respect `prefers-reduced-motion`:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

### 03.6 — Performance & Meta

1. **Font loading:** Add `font-display: swap` to Google Fonts URL: `&display=swap`
2. **Meta description:** Add `<meta name="description" content="Transpose — turn any instrument into a MIDI controller. Play guitar, trumpet, violin, or voice and get MIDI and sheet music instantly.">`
3. **Canonical URL:** Add `<link rel="canonical" href="https://transpose.fm/">` (placeholder domain)
4. **OG image placeholder:** Create a simple placeholder at `assets/og-image.png` — can be a 1200x630 solid color with "Transpose" text, or just a placeholder file. Note in README that this should be replaced with a real image before launch.
5. **No-JS fallback:** Verify forms work without JS (native form submission to Formspree).

### 03.7 — Deploy Readiness

1. **Verify zero-config deploy:** The site should work when dropped into Vercel, Netlify, or GitHub Pages with no configuration files needed.
2. **Create `.gitignore`:**
   ```
   .DS_Store
   Thumbs.db
   *.log
   ```
3. **Test local server:** `python -m http.server 8000` from the project root — verify everything loads correctly at `http://localhost:8000`.
4. **Final console check:** Open browser DevTools — zero errors, zero warnings.

## Quality Gate
- [ ] Email signup: submit → form hides → confirmation appears → counter increments by 1
- [ ] Feedback form: submit → form hides → confirmation appears
- [ ] Both forms degrade gracefully with JS disabled (native submit to Formspree)
- [ ] Scroll animations: sections fade in as they enter viewport, with staggered card/step animations
- [ ] Hero has entrance animation on page load (no scroll trigger)
- [ ] `prefers-reduced-motion` disables all animations
- [ ] All text passes WCAG AA contrast against its background
- [ ] All form inputs have accessible labels
- [ ] Focus indicators visible on all interactive elements
- [ ] "Skip to content" link works on keyboard navigation
- [ ] No horizontal scroll at any viewport between 375px and 1440px
- [ ] `python -m http.server 8000` serves the site correctly
- [ ] Zero browser console errors or warnings
- [ ] `.gitignore` exists
- [ ] README has setup, deploy, and Formspree configuration instructions
