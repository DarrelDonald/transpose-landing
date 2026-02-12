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
