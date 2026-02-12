# Transpose Landing Page v2 — Global Context

> **READ THIS FIRST.** This context applies to ALL phases.

## Project: Transpose Landing Page (Iteration — Existing Codebase)

An iteration on the existing demand-gauge landing page for **Transpose**, a product concept that converts audio from any instrument into MIDI and sheet music. The page sells the vision, captures interest signals, and collects user feedback — before any product code is written.

This is NOT a greenfield build. The site already exists and is feature-complete from a prior 3-phase plan. This plan addresses UX and copy issues identified during owner review.

**Repository:** `C:\Projects\transpose-landing`
**Language:** HTML5, CSS3, vanilla JavaScript (ES6+)
**Dependencies:** None. Zero frameworks. Static files only.
**Form backend:** Formspree (https://formspree.io) — free tier, no server needed
**Deploy target:** Any static host (Vercel, Netlify, GitHub Pages) — zero-config

**Main file(s):**
- `index.html` — Single-page site, all sections
- `css/style.css` — All styling (~719 lines) — dark theme, responsive, animations
- `js/main.js` — Form handling, IntersectionObserver fade-ins (~84 lines)

## Goal

Improve the landing page based on owner feedback to:
1. **Make the hero section more compelling** — reduce empty space, stronger hook, no premature CTA
2. **Fix awkward copy** — rewrite the hero pain statement for natural flow
3. **Add a zero-friction interest signal** — "I Want This" button that logs a click to Formspree and scrolls to the email/survey section
4. **Remove AI references** — avoid alienating artists who distrust AI marketing
5. **Fix copy inconsistencies** — remove "or arrangement" from solution step 3, fix footer year and social links
6. **Restructure CTA flow** — hero hooks → problem builds tension → solution provides relief → CTA captures interest

## Architecture Decision: Iteration on Existing Static Site

| Rejected | Why |
|----------|-----|
| Rebuild from scratch | Site is 90% good. Surgical changes are faster and lower risk. |
| Add framework | Still overkill. The changes are copy, layout, and one new Formspree endpoint. |

**Chosen: Edit existing files in place** because:
- Minimal diff = minimal regression risk
- All infrastructure (Formspree, Vercel, CSP headers) already works
- Changes are primarily copy, layout adjustments, and one new form interaction

## Architecture Diagram

```
C:\Projects\transpose-landing\
├── index.html          # ← EDIT: hero restructure, CTA move, copy fixes
├── css/
│   └── style.css       # ← EDIT: hero layout changes, interest-btn styles
├── js/
│   └── main.js         # ← EDIT: interest click handler, Formspree silent submit
├── assets/
│   ├── favicon.svg     # (no change)
│   └── og-image.png    # (no change)
├── _headers            # (no change)
├── vercel.json         # (no change)
└── README.md           # ← EDIT: add note about interest click Formspree form
```

## Design Decisions (Locked)

| # | Decision | Detail |
|---|----------|--------|
| 1 | **No CTA in hero** | Hero section hooks and intrigues. No "I Need This" button. CTA comes AFTER the solution section. |
| 2 | **"I Want This" button** | New primary CTA after solution section. Clicking it: (a) silently submits a Formspree form with a timestamp, (b) smooth-scrolls to the signup/feedback area. |
| 3 | **No AI language** | Do not use the word "AI" anywhere on the page. Step 2 body text becomes: "We listen and transcribe in real-time. No extra gear. Just your sound." |
| 4 | **No displayed counter** | No signup counter shown on page. Interest data lives in Formspree dashboard only. |
| 5 | **No social links in footer** | Remove Twitter/X link. Remove footer-links section entirely. Users communicate via forms. |
| 6 | **Footer year: 2026** | Update copyright to current year. |
| 7 | **Hero must feel substantial** | Reduce empty space. Make the SVG visual larger/more prominent. Increase hero text size or visual weight so the above-the-fold experience feels rich, not sparse. |
| 8 | **Keep feedback form as-is** | The full feedback form stays unchanged. It's in its own section and is optional. |
| 9 | **Formspree for interest clicks** | Use a third Formspree form endpoint (`YOUR_FORMSPREE_INTEREST_ID`) to log anonymous "I want this" clicks. Submit via JS fetch with timestamp only. |
| 10 | **Dark theme, accent color, typography** | All visual design decisions from v1 remain locked. No changes to colors, fonts, or overall aesthetic. |

## Updated Page Flow (in scroll order)

1. **Hero** — Product name, tagline, stronger pain statement, NO CTA button, prominent SVG visual
2. **Problem ("Sound familiar?")** — 4 pain-point cards (unchanged)
3. **Solution ("How it works")** — 3 steps with updated copy (no AI reference)
4. **Interest CTA** — "I Want This" button (integrated as a closer to the solution section). Clicks log to Formspree, scrolls to signup.
5. **Signup** — "Count Me In" email capture (counter text removed)
6. **Feedback ("Help us build exactly what you need")** — Full structured form (unchanged fields)
7. **Footer** — Brand, tagline, copyright 2026 (no social links)

## Updated Copy

These are the updated copy decisions. Agents must use this exact text.

| Element | Old Text | New Text | Reason |
|---------|----------|----------|--------|
| **Hero pain statement** | "You've spent years mastering your instrument. But the moment you need your playing as MIDI or sheet music, you're stuck clicking notes one by one. That ends now." | "You've spent years mastering your instrument. But when it's time to get your playing into MIDI or sheet music, you're stuck clicking notes one by one. That ends now." | "the moment you need your playing as MIDI" reads awkwardly. |
| **Solution step 2 body** | "Our AI listens and transcribes in real-time. No MIDI controller. No piano keyboard. Just your sound." | "We listen and transcribe in real-time. No extra gear. Just your sound." | Remove AI reference. Cleaner phrasing. |
| **Solution step 3 body** | "Get MIDI, sheet music, or both. Drop it into your DAW, notation software, or arrangement. Keep creating." | "Get MIDI, sheet music, or both. Drop it straight into your DAW or notation software. Keep creating." | "or arrangement" was abstract next to concrete software references. |
| **Interest CTA button** | (did not exist) | "I Want This" | New zero-friction interest signal. |
| **Signup counter text** | "Be among the first to know" | (removed entirely) | No counter displayed. |
| **Footer copyright** | "© 2025 Transpose. All rights reserved." | "© 2026 Transpose. All rights reserved." | Year update. |
| **Footer social links** | Twitter (𝕏) + Email (✉) | (removed entirely) | Owner has no Twitter. Forms handle communication. |

## Copy That Does NOT Change

The following copy is locked and must remain exactly as-is:

- Product name: **Transpose**
- Tagline: **Transpose your playing into notation.**
- Hero heading: `<span class="text-gradient">Transpose</span>`
- Problem section heading: **Sound familiar?**
- All 4 pain-point card titles and body text
- Solution section heading: **How it works**
- Solution step 1 (Play) — title and body unchanged
- Solution step 2 (Transpose) — title unchanged, body updated (see table above)
- Solution step 3 (Create) — title unchanged, body updated (see table above)
- Signup heading: **Be first to know**
- Signup subtitle: **Transpose is coming. Drop your email and we'll notify you the moment it's ready.**
- Signup CTA: **Count Me In**
- Signup confirmation: **You're in. We'll let you know the moment Transpose is ready.**
- Feedback heading: **Help us build exactly what you need**
- Feedback subtitle and all form fields unchanged
- Feedback CTA: **Help Us Build This Right**
- Footer tagline: **Play it. Score it.**

## Key Internals You Need to Know

### Current File State

| File | Lines | Key Sections |
|------|-------|-------------|
| `index.html` | 266 | Hero (L34-101), Problem (L103-128), Solution (L130-153), Signup (L155-172), Feedback (L174-248), Footer (L250-261) |
| `css/style.css` | 719 | Variables (L6-30), Hero (L183-318), Problem (L322-366), Solution (L376-441), Signup (L444-511), Feedback (L514-628), Footer (L632-676), Responsive (L680-719) |
| `js/main.js` | 84 | IntersectionObserver (L5-14), Form handler (L19-53), Form wiring (L56-67), Counter (L72-84) |

### Critical Functions

| Function | File:Line | Purpose |
|----------|-----------|---------|
| `handleFormSubmit(form, confirmationEl)` | `main.js:19` | Generic form submit handler — POST to Formspree, show confirmation |
| `incrementCounter()` | `main.js:74` | Increments counter display — TO BE REMOVED |
| IntersectionObserver | `main.js:5` | Adds `.visible` class on scroll for fade-in animations |

### CSP Headers

Both `_headers` (Netlify) and `vercel.json` allow `connect-src 'self' https://formspree.io` — the new interest click Formspree submission will work without CSP changes.

## Non-Negotiables

1. **No JavaScript frameworks.** Vanilla JS only.
2. **No build step.** `index.html` opens directly in a browser.
3. **Mobile-first.** Must look great on 375px screens.
4. **Forms degrade gracefully.** Native HTML form submission to Formspree works without JS.
5. **Accessible.** Semantic HTML, proper heading hierarchy, WCAG AA contrast, focus indicators.
6. **Fast.** No images except favicon and OG image. CSS and SVG for visuals.
7. **Zero regression.** Problem cards, feedback form, and all existing functionality must remain intact.
8. **No AI language.** The word "AI" must not appear anywhere on the page.
9. **No displayed counter.** Interest metrics are backend-only (Formspree dashboard).
10. **No social media links.** Footer has no social links section.

## Agents Needed

- **@Dev** — HTML edits, CSS adjustments, JS interest-click handler
- **@Designer** — Hero visual improvements, spacing/layout refinements
- **@QA** — Regression testing, mobile testing, copy verification
- **@PM** — Acceptance criteria tracking, copy verification against this document
- **@Security** — Verify CSP still works with new Formspree endpoint, no PII in interest clicks
- **@SRE** — Verify deploy still works, no new config needed
