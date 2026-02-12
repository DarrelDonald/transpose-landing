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
