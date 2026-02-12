# Phase 01 — Chevron Animation Fix & Glow Effect

## Goal
Fix the scroll chevron so it actually bounces, and add a subtle accent glow at peak bounce. This is a CSS-only change in `style.css` lines 300-325.

## Prerequisites
- Read `_CONTEXT.md` first for the root cause explanation.

## Critical Constraint
**Only modify `css/style.css` lines 300-325.** No other files. No other lines.

## Tasks

### 01.1 — Fix Keyframe Animation

In `css/style.css`, replace the `scrollBounce` keyframes (lines 301-310).

Change FROM:
```css
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
```

Change TO:
```css
@keyframes scrollBounce {
  0%, 100% {
    transform: translateY(0) rotate(45deg);
    opacity: 0.5;
    filter: drop-shadow(0 0 0 transparent);
  }
  50% {
    transform: translateY(8px) rotate(45deg);
    opacity: 1;
    filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.6));
  }
}
```

**What changed and why:**
1. **`rotate(45deg)` added to both keyframe steps** — this is the critical fix. Without it, the animation overwrites the static `transform: rotate(45deg)` and the chevron loses its shape.
2. **`opacity` adjusted** — base 0.5 (was 0.4), peak 1.0 (was 0.8). Slightly more visible overall.
3. **`filter: drop-shadow()` added** — at rest, transparent (no glow). At peak bounce, a soft 6px accent-colored glow appears around the chevron shape. `drop-shadow` is used instead of `box-shadow` because the chevron is drawn with borders — `box-shadow` would create a rectangular shadow around the element box, while `drop-shadow` follows the actual visible shape.

### 01.2 — Verify Animation Visually

1. Start the local server: `python -m http.server 8000`
2. Open `http://localhost:8000` in a browser
3. Look at the bottom of the hero section
4. Confirm:
   - The chevron bounces gently (moves down ~8px and back, 2 second cycle)
   - The chevron always looks like a downward `∨` (never a square corner)
   - At the bottom of the bounce, a subtle purple/blue glow appears
   - At the top of the bounce, the glow fades away
   - The chevron is dimmer at rest, brighter at peak
5. Enable `prefers-reduced-motion` in browser DevTools (Rendering panel) and confirm the chevron is static

### 01.3 — Run Existing Playwright Tests

Run the full Playwright test suite to confirm zero regression:

```bash
cd C:\Projects\transpose-landing
npx playwright test
```

All tests must pass. The scroll chevron visibility test should still pass since the chevron is still visible — it now also animates.

## Quality Gate
- [ ] Chevron bounces visibly (not static)
- [ ] Chevron shape is `∨` throughout the entire animation cycle (never a square corner)
- [ ] Accent glow appears at peak bounce and fades at rest
- [ ] Glow color matches accent (#6366f1 / rgba(99, 102, 241, 0.6))
- [ ] `prefers-reduced-motion` disables the bounce (chevron is static)
- [ ] `npx playwright test` passes all tests
- [ ] No console errors
