# === _CONTEXT.md (READ FIRST) ===

# Transpose Landing Page v3 — Global Context

> **READ THIS FIRST.** This context applies to ALL phases.

## Project: Transpose Landing Page (Hotfix — Post-v2 Review)

Two UX issues found during owner review of the v2 implementation. This plan fixes both.

**Repository:** `C:\Projects\transpose-landing`
**Language:** HTML5, CSS3, vanilla JavaScript (ES6+)
**Dependencies:** None. Zero frameworks. Static files only.

**Main file(s):**
- `index.html` — Single-page site, all sections (266 lines)
- `css/style.css` — All styling (719 lines) — dark theme, responsive, animations
- `js/main.js` — Form handling, IntersectionObserver fade-ins (84 lines)

## Goal

Fix two specific issues identified during owner review:
1. **"I Want This" button is not centered** — the interest CTA button is visually off-center on the page
2. **Hero section feels like the entire page** — there's no visual cue that content exists below the fold, making visitors think the hero is all there is

## Architecture Decision: Surgical CSS + HTML Fix

| Rejected | Why |
|----------|-----|
| Redesign the hero layout | Overkill — the hero content is fine, it just needs a scroll affordance |
| Add a navigation bar | Adds complexity, not needed for a single-page landing |

**Chosen: Add a scroll indicator to the hero + fix button centering CSS** because:
- Minimal changes — one new HTML element, a few CSS rules
- Scroll indicators are a proven UX pattern for full-viewport hero sections
- Button centering is a pure CSS fix

## Architecture Diagram

```
C:\Projects\transpose-landing\
├── index.html          # ← EDIT: add scroll indicator element to hero section
├── css/
│   └── style.css       # ← EDIT: scroll indicator styles, interest button centering fix, remove duplicate CSS block
├── js/
│   └── main.js         # (no change)
```

## Design Decisions (Locked)

| # | Decision | Detail |
|---|----------|--------|
| 1 | **Scroll indicator style** | A subtle bouncing chevron/arrow at the bottom of the hero section. Uses `--text-muted` color. Animated with a gentle vertical bounce (2s infinite ease-in-out). Fades slightly at rest, brightens at peak bounce. |
| 2 | **Scroll indicator is decorative** | Mark with `aria-hidden="true"`. Not a link, not interactive — purely a visual affordance. |
| 3 | **Chevron, not arrow** | Use a CSS-drawn chevron (`∨` shape via borders or the `chevron-down` unicode ‹ ˅ ›) rather than a text arrow character. CSS borders give a cleaner, more modern look than a `↓` character. |
| 4 | **Button centering approach** | The `#interest` section already has `text-align: center`. The `.btn-primary` base class is `display: inline-block`. This should center it via text-align inheritance. If the button is not centering, the issue is likely a conflicting rule or the button is `display: block` without `margin: 0 auto`. Diagnose and fix the actual cause. |
| 5 | **Remove duplicate CSS** | There are two identical `Interest CTA Section` CSS blocks in `style.css` (one around line 433 and another around line 521). Remove the duplicate. |
| 6 | **Respect reduced motion** | The scroll indicator bounce animation must be disabled when `prefers-reduced-motion: reduce` is active. The existing reduced-motion media query (line 310-318) uses a blanket `animation-duration: 0.01ms !important` rule that will handle this automatically. |

## Key Internals You Need to Know

### Current State of Relevant Code

**Hero section** (`index.html` lines 34-101):
- `<section id="hero">` contains `.hero-content` (text) and `.hero-visual` (SVG)
- The scroll indicator should be added as a sibling AFTER `.hero-visual`, still inside `#hero`
- The section closes at line 101 with `</section>`

**Hero CSS** (`style.css` lines 183-191):
```css
#hero {
  min-height: 100vh;    /* ← This is why it feels like the whole page */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 2rem 1.5rem;
}
```
The hero is a flex column, centered both ways. The scroll indicator needs to be pushed to the bottom. Use `margin-top: auto` on the indicator to push it to the bottom of the flex container.

**Interest button** (`index.html` around line 155-163 after v2 changes add it):
- Lives in `<section id="interest">` with `text-align: center` on the section
- The button has class `btn-primary interest-btn`
- `.btn-primary` is `display: inline-block` (line 99) — this should center via `text-align: center` on the parent
- Check if there's a conflicting `display: block` somewhere, or if the interest section inherits `max-width` constraints from the base `section` rule (line 56-60) that might cause misalignment

**Duplicate CSS blocks:**
- First instance: lines 433-460 (Interest CTA Section)
- Second instance: lines 521-548 (exact duplicate)
- Remove the second instance (lines 521-548)

### Reduced Motion

The existing blanket rule at lines 310-318 will automatically handle the scroll indicator:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Non-Negotiables

1. **Zero regression.** All existing sections, forms, animations, and interactions must remain intact.
2. **Scroll indicator is decorative only.** `aria-hidden="true"`, no interactive behavior.
3. **Mobile-first.** Scroll indicator must look correct on 375px screens.
4. **No JavaScript for scroll indicator.** Pure CSS animation.
5. **The chevron must be visually centered** horizontally within the hero.
6. **The interest button must be visually centered** on all viewports.

## Agents Needed

- **@Dev** — HTML element addition, CSS fixes
- **@Designer** — Scroll indicator visual design, spacing, animation timing
- **@QA** — Verify centering on multiple viewports, check reduced motion, regression test
- **@PM** — Acceptance criteria verification



# === _INDEX.md ===

# Transpose Landing Page v3 — Phase Index

## Overview
Fix two UX issues from v2 review: off-center "I Want This" button and missing scroll indicator in hero section.

## Phases

| Phase | File | Status | Description |
|-------|------|--------|-------------|
| 01 | phase-01-scroll-indicator-and-button-fix.md | NOT STARTED | Add scroll indicator to hero bottom, fix interest button centering, remove duplicate CSS |

## Dependencies
- None (single phase)

## Success Criteria
- [ ] A subtle animated chevron appears at the bottom of the hero section, signaling more content below
- [ ] The chevron is horizontally centered and bounces gently
- [ ] The chevron respects `prefers-reduced-motion` (no animation)
- [ ] The chevron is `aria-hidden="true"` (decorative only)
- [ ] The "I Want This" interest button is visually centered on all viewports (375px, 768px, 1440px)
- [ ] No duplicate CSS blocks in `style.css`
- [ ] All existing sections, forms, and animations still work (zero regression)
- [ ] No console errors



# === phase-01-hero-and-cta-restructure.md ===

# Phase 01 — Hero & CTA Restructure

## Goal
Restructure the page's emotional arc: make the hero a compelling hook (no CTA), update solution copy to remove AI references, and add a zero-friction "I Want This" interest button after the solution section that silently logs clicks to Formspree and scrolls visitors to the signup/feedback area.

## Prerequisites
- Read `_CONTEXT.md` first for all updated copy, design decisions, and non-negotiables.
- The existing site is fully built. This phase EDITS existing files — it does not create new ones.

## Critical Constraint
**Zero regression on untouched sections.** Problem cards, signup form, and feedback form must remain fully intact. Only hero, solution, and the area between solution and signup are modified.

## Tasks

### 01.1 — Remove CTA from Hero, Fix Hero Copy

In `index.html`, hero section (around line 34-101):

**Remove the "I Need This" button:**
Delete this line:
```html
<a href="#signup" class="btn-primary hero-cta">I Need This</a>
```

**Update the hero pain statement** (around line 41-44):
Change:
```
But the moment you need your playing as MIDI or sheet music, you're stuck clicking notes one by one.
```
To:
```
But when it's time to get your playing into MIDI or sheet music, you're stuck clicking notes one by one.
```

In `css/style.css`, the `.hero-cta` animation rule (around line 261-264) can be removed since the element no longer exists:
```css
.hero-cta {
  animation: heroFadeUp 0.8s ease 0.6s forwards;
  opacity: 0;
}
```
Remove that block. The `.hero-visual` animation delay should shift from `0.8s` to `0.6s` to keep the stagger smooth:
```css
.hero-visual {
  animation: heroFadeUp 0.8s ease 0.6s forwards;
  opacity: 0;
}
```

Also remove the generic `.hero-cta` sizing rule (around line 219-221):
```css
.hero-cta {
  font-size: 1.2rem;
}
```

And in the responsive section (around line 687-690), remove:
```css
.hero-cta {
  width: 100%;
  text-align: center;
}
```

### 01.2 — Enhance Hero Visual Presence

The owner feedback: "the first thing I see being so empty makes me feel like what even is this? There's so much empty space and tiny lettering."

In `css/style.css`, make these adjustments to the hero:

**Increase hero description text size** — change `.hero-description` (around line 209):
```css
.hero-description {
  font-size: 1.15rem;
```
(from `1.1rem` — subtle but helps readability)

**Make the SVG visual larger and closer to the text** — change `.hero-visual` (around line 225-228):
```css
.hero-visual {
  margin-top: 2rem;    /* was 3rem — bring it closer */
  width: 100%;
  max-width: 600px;    /* was 500px — make it more prominent */
}
```

**Reduce hero vertical padding** so it doesn't feel as cavernous — the `min-height: 100vh` on `#hero` (line 184) keeps the section full-height. Consider changing to `min-height: 90vh` to reduce the bottom gap:
```css
#hero {
  min-height: 90vh;
```

The overall effect: text feels more substantial, visual is larger and closer, less dead space below the fold line.

### 01.3 — Update Solution Section Copy

In `index.html`, solution section (around line 130-153):

**Step 2 body text** — change:
```html
<p>Our AI listens and transcribes in real-time. No MIDI controller. No piano keyboard. Just your sound.</p>
```
To:
```html
<p>We listen and transcribe in real-time. No extra gear. Just your sound.</p>
```

**Step 3 body text** — change:
```html
<p>Get MIDI, sheet music, or both. Drop it into your DAW, notation software, or arrangement. Keep creating.</p>
```
To:
```html
<p>Get MIDI, sheet music, or both. Drop it straight into your DAW or notation software. Keep creating.</p>
```

### 01.4 — Add "I Want This" Interest Button

Add a new CTA element between the solution section and the signup section. This is the primary conversion point.

In `index.html`, after the closing `</section>` of `#solution` (around line 153) and before `#signup` (around line 155), add:

```html
<!-- Interest CTA -->
<section id="interest" class="fade-in">
  <div class="interest-content">
    <p class="interest-prompt">Ready to stop clicking notes one by one?</p>
    <button class="btn-primary interest-btn" id="interest-btn">I Want This</button>
    <form id="interest-form" action="https://formspree.io/f/YOUR_FORMSPREE_INTEREST_ID" method="POST" hidden>
      <input type="hidden" name="action" value="interest_click">
      <input type="hidden" name="timestamp" id="interest-timestamp">
    </form>
  </div>
</section>
```

**CSS for interest section** — add to `css/style.css` before the Signup section comment:

```css
/* ============================================
   Interest CTA Section
   ============================================ */
#interest {
  text-align: center;
  padding: 3rem 1.5rem 4rem;
}

.interest-content {
  max-width: var(--max-width);
  margin: 0 auto;
}

.interest-prompt {
  color: var(--text-secondary);
  font-size: 1.15rem;
  margin-bottom: 1.5rem;
}

.interest-btn {
  font-size: 1.3rem;
  padding: 1.2rem 3rem;
}

.interest-btn.clicked {
  background: linear-gradient(135deg, #4ade80, #22c55e);
  pointer-events: none;
}
```

### 01.5 — Wire Up Interest Button in JavaScript

In `js/main.js`, add the interest click handler. Add this after the form wiring section (around line 67):

```javascript
// ============================================
// Interest "I Want This" Button
// ============================================
const interestBtn = document.getElementById('interest-btn');
const interestForm = document.getElementById('interest-form');

if (interestBtn && interestForm) {
  interestBtn.addEventListener('click', async () => {
    // Log click to Formspree silently
    const timestampInput = document.getElementById('interest-timestamp');
    if (timestampInput) {
      timestampInput.value = new Date().toISOString();
    }

    try {
      await fetch(interestForm.action, {
        method: 'POST',
        body: new FormData(interestForm),
        headers: { 'Accept': 'application/json' }
      });
    } catch (e) {
      // Silent fail — don't block UX for analytics
    }

    // Visual feedback
    interestBtn.textContent = '✓ You want this!';
    interestBtn.classList.add('clicked');

    // Scroll to signup section
    const signupSection = document.getElementById('signup');
    if (signupSection) {
      setTimeout(() => {
        signupSection.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    }
  });
}
```

Also, remove the counter code that is no longer needed (around lines 72-84):
```javascript
// ============================================
// Signup Counter
// ============================================
let counterAnimated = false;

function incrementCounter() {
  const counterEl = document.querySelector('.counter-number');
  if (counterEl) {
    const currentCount = parseInt(counterEl.textContent) || 0;
    counterEl.textContent = currentCount + 1;
  }
}

// Counter starts at 0, showing "Be among the first to know" message
// No fake seed number per Decision #1
```

And remove the `incrementCounter()` call inside the `handleFormSubmit` function (around line 41-43):
```javascript
// If this is the signup form, trigger counter increment
if (form.classList.contains('signup-form')) {
  incrementCounter();
}
```

## Quality Gate
- [ ] Hero section: shows product name, tagline, pain statement (updated copy), and SVG visual — NO CTA button
- [ ] Hero feels more substantial — less empty space, larger visual, readable text
- [ ] Pain statement reads: "But when it's time to get your playing into MIDI or sheet music"
- [ ] The word "AI" does not appear anywhere on the page
- [ ] Solution step 2: "We listen and transcribe in real-time. No extra gear. Just your sound."
- [ ] Solution step 3: "...Drop it straight into your DAW or notation software..."
- [ ] "I Want This" button appears after solution section, centered, prominent
- [ ] Clicking "I Want This": button changes to "✓ You want this!", scrolls to signup section
- [ ] Formspree receives a POST with `action=interest_click` and `timestamp` on button click
- [ ] Button cannot be clicked twice (pointer-events: none after click)
- [ ] Problem cards are completely unchanged
- [ ] Signup form still works (email submit → confirmation)
- [ ] Feedback form still works (all fields submit → confirmation)
- [ ] No console errors
- [ ] Mobile (375px): interest button is full-width and tappable, hero looks good



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



# === phase-01-scroll-indicator-and-button-fix.md ===

# Phase 01 — Scroll Indicator & Button Centering Fix

## Goal
Add a scroll-down indicator to the hero section so visitors know there's content below the fold, fix the off-center "I Want This" button, and remove a duplicate CSS block.

## Prerequisites
- Read `_CONTEXT.md` first for design decisions, line references, and non-negotiables.
- The site is built and functional. This phase makes surgical edits to existing files.

## Critical Constraint
**Zero regression.** Do not modify any section other than the hero (for scroll indicator) and the interest section CSS (for button centering). All forms, animations, and content must remain intact.

## Tasks

### 01.1 — Add Scroll Indicator to Hero Section

Add a scroll indicator element at the bottom of the hero section. This is a decorative chevron that bounces gently, telling visitors to scroll down.

**In `index.html`**, inside `<section id="hero">`, after the `.hero-visual` div (line 99 closes the SVG, line 100 closes `.hero-visual`) and before the `</section>` tag (line 101), add:

```html
    <div class="scroll-indicator" aria-hidden="true">
      <div class="scroll-chevron"></div>
    </div>
```

The full hero section should end like:
```html
      </svg>
    </div>
    <div class="scroll-indicator" aria-hidden="true">
      <div class="scroll-chevron"></div>
    </div>
  </section>
```

**In `css/style.css`**, add scroll indicator styles. Place them after the hero visual animation rules (after line 307, `.music-note:nth-child(3)`) and before the `/* Reduced Motion */` comment (line 309):

```css
/* Scroll Indicator */
@keyframes scrollBounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  50% {
    transform: translateY(8px);
    opacity: 0.8;
  }
}

.scroll-indicator {
  margin-top: auto;
  padding-bottom: 1.5rem;
}

.scroll-chevron {
  width: 24px;
  height: 24px;
  border-right: 2px solid var(--text-muted);
  border-bottom: 2px solid var(--text-muted);
  transform: rotate(45deg);
  margin: 0 auto;
  animation: scrollBounce 2s ease-in-out infinite;
}
```

**Key detail:** The `margin-top: auto` on `.scroll-indicator` is critical. The `#hero` section is `display: flex; flex-direction: column`. The `margin-top: auto` pushes the scroll indicator to the bottom of the viewport, regardless of how much content is above it. Without this, the chevron sits directly below the SVG visual instead of at the bottom of the viewport.

The `padding-bottom: 1.5rem` gives breathing room from the very bottom edge.

### 01.2 — Fix Interest Button Centering

The "I Want This" button in the `#interest` section is not horizontally centered.

**Diagnosis:** The `#interest` section has `text-align: center` and the `.btn-primary` class is `display: inline-block`. This combination should center the button via text-align inheritance. If it's not centering, the likely cause is one of:
1. The interest section isn't getting `text-align: center` applied (check specificity)
2. A conflicting rule is overriding the display or margin
3. The button's parent `.interest-content` doesn't have centering

**Fix approach:** Ensure the interest section and its content are explicitly centered. In `css/style.css`, in the Interest CTA Section block (starting around line 433), verify and update:

```css
#interest {
  text-align: center;
  padding: 3rem 1.5rem 4rem;
}

.interest-content {
  max-width: var(--max-width);
  margin: 0 auto;
  text-align: center;
}

.interest-btn {
  font-size: 1.3rem;
  padding: 1.2rem 3rem;
}
```

Confirm that `.interest-btn` does NOT have `display: block` without a corresponding `margin: 0 auto`. If it does, either:
- Change to `display: inline-block` (centers via parent's `text-align: center`), OR
- Keep `display: block` but add `margin: 0 auto`

Also check the responsive section (around line 680+). If there's a mobile override that sets `.interest-btn { width: 100% }`, ensure it also has `display: block; margin: 0 auto;` or just `text-align: center` on the parent.

### 01.3 — Remove Duplicate Interest CSS Block

There are two identical "Interest CTA Section" CSS blocks in `style.css`:
- First: around lines 433-460
- Second: around lines 521-548 (immediately after `.signup-confirmation`)

**Remove the second duplicate block entirely** (lines 521-548). Keep only the first instance (around lines 433-460).

Verify after removal that the interest section still renders correctly — the first block should have all the needed styles.

## Quality Gate
- [ ] Hero section shows a bouncing chevron at the bottom of the viewport
- [ ] The chevron is drawn with CSS borders (not a text character), forming a downward-pointing `∨` shape
- [ ] The chevron bounces gently (translateY 8px, 2s cycle) and fades between 0.4 and 0.8 opacity
- [ ] The chevron is horizontally centered in the hero
- [ ] The chevron is at the BOTTOM of the hero (pushed there by `margin-top: auto` in the flex column)
- [ ] With `prefers-reduced-motion: reduce`, the chevron is static (no bounce)
- [ ] The chevron has `aria-hidden="true"` (not announced by screen readers)
- [ ] The "I Want This" button is horizontally centered on desktop (1440px)
- [ ] The "I Want This" button is horizontally centered on tablet (768px)
- [ ] The "I Want This" button is horizontally centered (or full-width) on mobile (375px)
- [ ] No duplicate "Interest CTA Section" CSS blocks exist in `style.css`
- [ ] All 4 problem cards render correctly (unchanged)
- [ ] All 3 solution steps render correctly (unchanged)
- [ ] Signup form submits and shows confirmation (unchanged)
- [ ] Feedback form submits and shows confirmation (unchanged)
- [ ] No horizontal scroll at any viewport 375px–1440px
- [ ] Zero console errors



# === phase-02-cleanup-and-polish.md ===

# Phase 02 — Cleanup & Polish

## Goal
Remove the signup counter, fix footer (year update, remove social links), update README with the new Formspree interest form, and do a final regression pass to ensure all changes from Phase 01 integrate cleanly.

## Prerequisites
- Read `_CONTEXT.md` first for all design decisions and non-negotiables.
- Phase 01 complete — hero restructured, interest button working, solution copy updated.

## Critical Constraint
**Zero regression.** All changes from Phase 01 must still work. Problem cards, signup form, and feedback form must remain fully intact.

## Tasks

### 02.1 — Remove Signup Counter

In `index.html`, in the signup section (around line 170), remove the counter paragraph:
```html
<p class="signup-counter">Be among the first to know</p>
```

In `css/style.css`, remove the counter-related styles (around lines 501-511):
```css
.signup-counter {
  color: var(--text-muted);
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.counter-number {
  color: var(--accent-start);
  font-weight: 700;
}
```

### 02.2 — Fix Footer

In `index.html`, footer section (around line 250-261):

**Remove the social links div entirely:**
```html
<div class="footer-links">
  <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter">𝕏</a>
  <a href="mailto:hello@transpose.fm" aria-label="Email">✉</a>
</div>
```

**Update the copyright year:**
Change:
```html
<p class="footer-copyright">© 2025 Transpose. All rights reserved.</p>
```
To:
```html
<p class="footer-copyright">© 2026 Transpose. All rights reserved.</p>
```

In `css/style.css`, remove the footer-links styles (around lines 655-670):
```css
.footer-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1.2rem;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--accent-start);
}
```

### 02.3 — Update README

In `README.md`, update the Forms section to include the interest click form:

Change:
```markdown
## Forms
Email signup and feedback forms use Formspree. Replace the placeholder IDs in `index.html`:
- `YOUR_FORMSPREE_SIGNUP_ID` — create at https://formspree.io
- `YOUR_FORMSPREE_FEEDBACK_ID` — create at https://formspree.io
```
To:
```markdown
## Forms
Email signup, feedback, and interest tracking use Formspree. Replace the placeholder IDs in `index.html` and `js/main.js`:
- `YOUR_FORMSPREE_SIGNUP_ID` — email signup form. Create at https://formspree.io
- `YOUR_FORMSPREE_FEEDBACK_ID` — feedback survey form. Create at https://formspree.io
- `YOUR_FORMSPREE_INTEREST_ID` — "I Want This" click tracking. Create at https://formspree.io. Receives `action` and `timestamp` fields.
```

### 02.4 — Add Responsive Styles for Interest Section

In `css/style.css`, in the responsive section (around line 680), add mobile styles for the interest button:

```css
/* Interest CTA: full-width button on mobile */
.interest-btn {
  width: 100%;
  text-align: center;
}
```

This goes inside the existing `@media (max-width: 768px)` block.

### 02.5 — Final Regression Pass

Verify the full page end-to-end:

1. **Open `index.html` in a browser** (or via `python -m http.server 8000`)
2. **Hero section:** Product name with gradient, tagline, updated pain statement, SVG visual. No CTA button. Feels substantial — not too much empty space.
3. **Problem section:** 4 cards, all correct copy, hover effects work, fade-in animation triggers on scroll.
4. **Solution section:** 3 steps with updated copy. No "AI" anywhere. Connectors visible on desktop, hidden on mobile.
5. **Interest section:** "I Want This" button centered. Clicking it shows "✓ You want this!" and scrolls to signup.
6. **Signup section:** Email input + "Count Me In" button. No counter text. Submit shows confirmation.
7. **Feedback section:** All 6 field groups present. Submit shows confirmation.
8. **Footer:** Brand, tagline, copyright 2026. No social links.
9. **Mobile (375px):** All sections stack properly. Interest button full-width. No horizontal scroll.
10. **Desktop (1440px):** Layout is clean. Problem cards in grid. Solution steps horizontal with connectors.
11. **Console:** Zero errors, zero warnings.
12. **Accessibility:** Skip link works. Focus indicators visible on all interactive elements. Heading hierarchy correct (h1 → h2 → h3).

## Quality Gate
- [ ] No signup counter text anywhere on the page
- [ ] Footer shows only: brand name, "Play it. Score it.", "© 2026 Transpose. All rights reserved." — no social links
- [ ] README documents all three Formspree form IDs including the interest click tracker
- [ ] Interest button is full-width on mobile (375px)
- [ ] Full page scrolls correctly: hero → problem → solution → interest → signup → feedback → footer
- [ ] All forms still submit correctly (signup and feedback)
- [ ] Interest button click → green feedback → scroll to signup
- [ ] Zero console errors
- [ ] No horizontal scroll at any viewport 375px–1440px
- [ ] The word "AI" does not appear anywhere in the rendered page
- [ ] All problem card copy matches v1 exactly (zero changes)
- [ ] All feedback form fields match v1 exactly (zero changes)



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
