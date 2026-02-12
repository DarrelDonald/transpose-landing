# Transpose Landing Page v5 — Phase Index

## Overview
Fix static scroll chevron animation and add accent glow highlight effect.

## Phases

| Phase | File | Status | Description |
|-------|------|--------|-------------|
| 01 | phase-01-chevron-animation.md | NOT STARTED | Fix keyframe rotation, add glow effect, verify with Playwright |

## Dependencies
- None (single phase)

## Success Criteria
- [ ] Scroll chevron visibly bounces up and down (8px travel)
- [ ] Scroll chevron maintains its downward-pointing `∨` shape throughout the animation (never becomes a square corner)
- [ ] At peak bounce, a subtle accent-colored glow appears around the chevron
- [ ] At rest, no glow — just the muted border color
- [ ] Animation respects `prefers-reduced-motion`
- [ ] Existing Playwright tests still pass: `npx playwright test`
- [ ] No console errors
