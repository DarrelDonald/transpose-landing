# Transpose Landing Page v4 — Global Context

> **READ THIS FIRST.** This context applies to ALL phases.

## Project: Transpose Landing Page (Bugfix — CSS Issues from v3)

Two CSS bugs remain after the v3 implementation. The HTML and CSS are in place but the visual output is broken. This plan fixes both bugs and adds Playwright-based visual verification to prevent future regressions.

**Repository:** `C:\Projects\transpose-landing`
**Language:** HTML5, CSS3, vanilla JavaScript (ES6+)
**Dependencies:** None for the site. Playwright (Node.js) for testing only.

**Main file(s):**
- `index.html` — Single-page site, all sections
- `css/style.css` — All styling — dark theme, responsive, animations
- `js/main.js` — Form handling, IntersectionObserver fade-ins

## Goal

1. **Fix the scroll indicator chevron** — it exists in HTML (line 100-102) and CSS (lines 300-325) but is NOT visible on the page
2. **Fix the "I Want This" button centering** — the interest CTA button is not horizontally centered
3. **Verify all fixes with Playwright** — automated browser tests that confirm visual correctness at multiple viewports

## Root Cause Analysis

### Bug 1: Scroll Chevron Not Visible

**HTML** (`index.html` lines 100-102):
```html
<div class="scroll-indicator" aria-hidden="true">
  <div class="scroll-chevron"></div>
</div>
```
This is correctly placed inside `<section id="hero">`, after `.hero-visual`.

**CSS** (`style.css` lines 312-325):
```css
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

**Root cause:** The `#hero` section (`style.css` lines 183-191) has:
```css
#hero {
  min-height: 90vh;
  display: flex;
  align-items: center;   /* ← THIS IS THE PROBLEM */
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 2rem 1.5rem;
}
```

In a flex column with `align-items: center`, the cross-axis alignment is horizontal — that's fine. But `justify-content: center` vertically centers ALL flex children in the column. The `margin-top: auto` on `.scroll-indicator` SHOULD override `justify-content` and push it to the bottom — this is valid CSS. However, `margin-top: auto` only works to push a flex child to the bottom when the flex container has **enough space**. With `min-height: 90vh` and `justify-content: center`, the available space after content is split equally above and below the centered content group. The `margin-top: auto` on the LAST child should consume the remaining space below the centered group.

**The likely actual issue** is that the chevron IS rendering but is either:
1. Too small to notice (24x24px with `opacity: 0.4` at the dim end of the animation cycle), OR
2. The `justify-content: center` is distributing space in a way that the chevron doesn't reach the bottom

**Fix:** Remove `justify-content: center` from `#hero`. Instead, use `margin-top: auto` on `.hero-content` to push the content group to vertical center, and `margin-top: auto` on `.scroll-indicator` to push the chevron to the bottom. This gives explicit control over vertical positioning:

```css
#hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 2rem 1.5rem;
  /* NO justify-content — use margin-top: auto on children instead */
}
```

And add `margin-top: auto` to `.hero-content`:
```css
.hero-content {
  max-width: 700px;
  margin: 0 auto;
  margin-top: auto;  /* push content down from top */
}
```

And `.scroll-indicator` keeps its `margin-top: auto` to push to the bottom.

This creates the layout:
```
[top padding]
    ↕ auto space (consumed by .hero-content margin-top)
[.hero-content]
[.hero-visual]
    ↕ auto space (consumed by .scroll-indicator margin-top)
[.scroll-indicator / chevron]
[bottom padding]
```

Also make the chevron more visible — increase size and base opacity:
```css
.scroll-chevron {
  width: 30px;
  height: 30px;
  border-right: 2px solid var(--text-muted);
  border-bottom: 2px solid var(--text-muted);
  transform: rotate(45deg);
  margin: 0 auto;
  animation: scrollBounce 2s ease-in-out infinite;
}
```

And adjust the animation to be more visible:
```css
@keyframes scrollBounce {
  0%, 100% {
    transform: translateY(0) rotate(45deg);
    opacity: 0.5;
  }
  50% {
    transform: translateY(8px) rotate(45deg);
    opacity: 1;
  }
}
```

**Important:** The `rotate(45deg)` must be in BOTH the static `transform` and the keyframe `transform` values. CSS animations replace the entire `transform` property — if the keyframes only have `translateY`, the `rotate(45deg)` from the static rule will be overridden and the chevron will appear as a square corner instead of a downward-pointing angle.

### Bug 2: Interest Button Not Centered

**HTML** (`index.html` lines 157-165):
```html
<section id="interest" class="fade-in">
  <div class="interest-content">
    <p class="interest-prompt">Ready to stop clicking notes one by one?</p>
    <button class="btn-primary interest-btn" id="interest-btn">I Want This</button>
    ...
  </div>
</section>
```

**CSS** (`style.css` lines 463-483):
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

**Root cause:** The `.btn-primary` class has `display: inline-block` (line 99). With `text-align: center` on the parent, an `inline-block` element SHOULD be centered. If it's not centering visually, the issue is likely that the `<section>` base rule (`style.css` lines 56-60) applies `max-width: var(--max-width)` and `margin: 0 auto`, so the section itself is centered but might not be full-width. Check if the section container is narrower than expected, making the button appear off-center relative to the viewport.

**Fix:** Ensure `#interest` breaks out of the base `section` max-width, similar to how `#signup` does it:
```css
#interest {
  text-align: center;
  padding: 3rem 1.5rem 4rem;
  max-width: none;  /* break out of section max-width — center relative to viewport */
}
```

## Key Internals

### Current File Line References

| File | Key Lines |
|------|-----------|
| `index.html:34-103` | Hero section (content + visual + scroll indicator) |
| `index.html:157-167` | Interest CTA section |
| `css/style.css:56-60` | Base `section` rule (max-width, margin auto) |
| `css/style.css:97-111` | `.btn-primary` base class |
| `css/style.css:183-191` | `#hero` flex layout |
| `css/style.css:193-195` | `.hero-content` |
| `css/style.css:300-325` | Scroll indicator + chevron styles |
| `css/style.css:463-488` | Interest section styles |
| `css/style.css:725-728` | Interest button mobile override |

### CSP Note
Playwright runs locally and does not affect CSP headers or deploy config.

## Design Decisions (Locked)

| # | Decision | Detail |
|---|----------|--------|
| 1 | **Fix hero layout with margin-top auto** | Remove `justify-content: center` from `#hero`. Use `margin-top: auto` on `.hero-content` and `.scroll-indicator` to create the vertical layout. |
| 2 | **Chevron must include rotate in keyframes** | The `scrollBounce` keyframe transforms must include `rotate(45deg)` alongside `translateY` to avoid losing the rotation. |
| 3 | **Increase chevron visibility** | Bump size to 30x30px, base opacity to 0.5, peak opacity to 1. |
| 4 | **Interest section full viewport width** | Add `max-width: none` to `#interest` so the centering is relative to the full viewport, not the constrained section width. |
| 5 | **Playwright tests are verification-only** | Tests live in a `tests/` directory. They are NOT part of the deployed site. They verify the fixes work at 375px, 768px, and 1440px viewports. |

## Non-Negotiables

1. **Zero regression.** All content, forms, animations, and interactions must remain intact.
2. **The chevron must be visible** on page load without scrolling. It must be at or near the bottom of the hero viewport.
3. **The chevron must animate** with a gentle bounce (unless `prefers-reduced-motion`).
4. **The interest button must be horizontally centered** at ALL viewports (375px, 768px, 1440px).
5. **Playwright tests must pass** before the phase is considered complete.

## Agents Needed

- **@Dev** — CSS fixes, Playwright test implementation
- **@Designer** — Verify visual correctness of chevron and button centering
- **@QA** — Run Playwright tests, manual verification at all viewports
- **@PM** — Acceptance criteria verification
