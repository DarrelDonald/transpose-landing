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
