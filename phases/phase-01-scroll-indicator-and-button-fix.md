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
