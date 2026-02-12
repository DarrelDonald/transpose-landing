# Transpose Landing Page v5 — Global Context

> **READ THIS FIRST.** This context applies to ALL phases.

## Project: Transpose Landing Page (Polish — Scroll Chevron Animation)

The scroll chevron is visible and correctly positioned, but it's static — no animation is playing. This plan fixes the animation and adds a subtle accent glow highlight.

**Repository:** `C:\Projects\transpose-landing`
**Language:** HTML5, CSS3, vanilla JavaScript (ES6+)

**Main file(s):**
- `css/style.css` — lines 300-325 contain all scroll indicator styles

## Goal

1. **Fix the scroll chevron animation** — it should gently bounce up and down
2. **Add a subtle glow highlight** — the chevron should pulse with the accent color at peak bounce

## Root Cause: Why the Chevron Is Static

The `scrollBounce` keyframes (`style.css` lines 301-310) currently read:

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

The `.scroll-chevron` static rule (line 322) has `transform: rotate(45deg)`. But CSS animations **completely replace** the `transform` property on each frame — they don't merge with the static value. So when the animation runs:
- Frame 0%: `transform: translateY(0)` → **rotation is gone**, chevron becomes an invisible square corner
- Frame 50%: `transform: translateY(8px)` → still no rotation

The chevron appears "static" because it's actually animating, but the rotation that makes it look like a downward chevron is being stripped on every frame. The fix is to include `rotate(45deg)` in every keyframe step.

## Architecture Diagram

```
css/style.css (lines 300-325)
├── @keyframes scrollBounce    ← FIX: add rotate(45deg) to all transform values
├── .scroll-indicator          ← no change
└── .scroll-chevron            ← ENHANCE: add accent glow via filter/box-shadow
```

No other files are modified. No HTML changes. No JS changes.

## Design Decisions (Locked)

| # | Decision | Detail |
|---|----------|--------|
| 1 | **Include rotate(45deg) in ALL keyframe transforms** | Every keyframe step that sets `transform` must include `rotate(45deg)` alongside `translateY`. This is the fix for the static chevron. |
| 2 | **Accent glow at peak bounce** | At the 50% keyframe (peak of bounce), add a subtle glow using the accent color. Use `filter: drop-shadow()` on the chevron element — this works on border-drawn shapes where `box-shadow` would show a rectangular shadow. |
| 3 | **Glow color matches accent** | Use `var(--accent-start)` (#6366f1) for the glow color with transparency. Example: `filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.6))`. |
| 4 | **Bounce distance stays at 8px** | The existing 8px translateY is a good distance — noticeable but not distracting. |
| 5 | **Animation duration stays at 2s** | The 2s cycle is appropriately calm for a background indicator. |
| 6 | **Base state: muted, no glow** | At 0%/100%, the chevron is `--text-muted` colored with no glow. The glow only appears as it bounces down. |
| 7 | **Respect prefers-reduced-motion** | The existing blanket reduced-motion rule (lines 328-336) handles this automatically. |

## Non-Negotiables

1. **The chevron must visually bounce.** Not just fade — it must translate vertically.
2. **The rotation must be preserved throughout the animation.** The chevron must always look like a downward-pointing `∨`, never a square corner.
3. **Zero regression.** Only `style.css` lines 300-325 are modified. Nothing else changes.

## Agents Needed

- **@Dev** — CSS keyframe fix
- **@Designer** — Glow intensity and timing review
- **@QA** — Visual verification, run existing Playwright tests
