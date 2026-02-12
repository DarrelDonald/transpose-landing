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
