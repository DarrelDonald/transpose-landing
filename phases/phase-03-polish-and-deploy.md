# Phase 03 — Polish & Deploy

## Goal
Add scroll animations, form submission handling (with confirmation UX), final responsive tweaks, accessibility pass, and ensure the site is deploy-ready on any static host. After this phase, the site is production-ready.

## Prerequisites
- Read `_CONTEXT.md` first for design decisions and non-negotiables.
- Phase 02 complete — all 6 sections are built with correct content. CSS styling is in place. Forms have Formspree placeholder actions.

## Critical Constraint
**Zero regression.** All content, styling, and structure from Phase 01 and 02 must remain intact. This phase adds behavior and polish — it does not restructure.

## Tasks

### 03.1 — Form Submission Handling (main.js)

Add JavaScript to handle both forms with fetch API (avoiding full page redirect on submit).

```javascript
function handleFormSubmit(form, confirmationEl) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.hidden = true;
        confirmationEl.hidden = false;
      } else {
        submitBtn.textContent = 'Something went wrong. Try again?';
        submitBtn.disabled = false;
      }
    } catch (error) {
      submitBtn.textContent = 'Something went wrong. Try again?';
      submitBtn.disabled = false;
    }
  });
}
```

Wire this to both forms:
- Signup form → `.signup-confirmation`
- Feedback form → `.feedback-confirmation`

**Important:** The form `action` still points to Formspree, so if JS is disabled, native form submission still works (Formspree shows its own confirmation page). This is the graceful degradation required by the non-negotiables.

### 03.2 — Signup Counter UX

In `main.js`, add a simple animated counter for the signup section:

```javascript
// Animate counter when it scrolls into view
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

- Seed the counter at a reasonable number (e.g., `47`) — this is a social proof placeholder. Put the seed value in a `data-count` attribute on `.counter-number` so it's easy to update.
- Trigger the animation when the signup section enters the viewport (use the existing `IntersectionObserver` or a new one).
- After a successful signup submission, increment the displayed count by 1 (local only — no backend persistence).

### 03.3 — Scroll Animations

Enhance the `IntersectionObserver` from Phase 01:

- Add `.fade-in` class to these elements (if not already present):
  - Each `.problem-card` (stagger: add `transition-delay` of `0.1s`, `0.2s`, `0.3s`, `0.4s` via CSS nth-child)
  - Each `.solution-step` (stagger similarly)
  - `.signup-content`
  - `.feedback-form`
- The hero section should NOT use `.fade-in` — it should be immediately visible (it's above the fold)
- Hero elements get a simple CSS entrance animation on page load:
  ```css
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-title { animation: heroFadeUp 0.8s ease forwards; }
  .hero-tagline { animation: heroFadeUp 0.8s ease 0.2s forwards; opacity: 0; }
  .hero-description { animation: heroFadeUp 0.8s ease 0.4s forwards; opacity: 0; }
  .hero-cta { animation: heroFadeUp 0.8s ease 0.6s forwards; opacity: 0; }
  .hero-visual { animation: heroFadeUp 0.8s ease 0.8s forwards; opacity: 0; }
  ```

### 03.4 — Responsive Refinements

Do a full responsive pass. Test at these breakpoints and fix any issues:

| Breakpoint | Target |
|-----------|--------|
| 375px | iPhone SE — smallest supported |
| 414px | iPhone Plus / standard Android |
| 768px | iPad portrait |
| 1024px | iPad landscape / small laptop |
| 1440px | Standard desktop |

**Known things to check:**
- Hero title: does `clamp()` scale properly at all sizes?
- Problem cards: do they stack to 1 column below 768px?
- Solution steps: do they stack vertically below 768px? Are connectors hidden?
- Signup form: does input+button stack below 480px?
- Feedback form: do checkbox grids reflow cleanly?
- Footer: does it look clean at all sizes?
- No horizontal scroll at any breakpoint

Add media queries in `style.css` as needed. Prefer `min-width` media queries (mobile-first).

### 03.5 — Accessibility Pass

Verify and fix:

1. **Heading hierarchy:** `h1` (hero) → `h2` (section headings) → `h3` (card/step titles). No skipped levels.
2. **Form labels:** Every input has either a visible `<label>` or `aria-label`. The `<legend>` inside `<fieldset>` serves as the label for field groups.
3. **Color contrast:** All text passes WCAG AA (4.5:1 for body text, 3:1 for large text) against dark backgrounds. Check `--text-secondary` (#a0a0b5) against `--bg-primary` (#0a0a0f) — this should pass but verify. Check `--text-muted` (#6b6b80) — this may need to be lightened for body text (OK for decorative/supplementary text).
4. **Focus indicators:** All interactive elements (buttons, links, inputs) have visible focus rings. Use `outline: 2px solid var(--accent-start)` with `outline-offset: 2px` on `:focus-visible`.
5. **Button states:** Submit buttons show disabled state visually (reduced opacity) when submitting.
6. **Skip to content:** Add a visually-hidden "Skip to content" link at the top of the page that becomes visible on focus:
   ```html
   <a href="#hero" class="skip-link">Skip to content</a>
   ```
   ```css
   .skip-link {
     position: absolute;
     top: -100%;
     left: 0;
     padding: 1rem;
     background: var(--accent-start);
     color: white;
     z-index: 100;
   }
   .skip-link:focus { top: 0; }
   ```
7. **Reduced motion:** Respect `prefers-reduced-motion`:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

### 03.6 — Performance & Meta

1. **Font loading:** Add `font-display: swap` to Google Fonts URL: `&display=swap`
2. **Meta description:** Add `<meta name="description" content="Transpose — turn any instrument into a MIDI controller. Play guitar, trumpet, violin, or voice and get MIDI and sheet music instantly.">`
3. **Canonical URL:** Add `<link rel="canonical" href="https://transpose.fm/">` (placeholder domain)
4. **OG image placeholder:** Create a simple placeholder at `assets/og-image.png` — can be a 1200x630 solid color with "Transpose" text, or just a placeholder file. Note in README that this should be replaced with a real image before launch.
5. **No-JS fallback:** Verify forms work without JS (native form submission to Formspree).

### 03.7 — Deploy Readiness

1. **Verify zero-config deploy:** The site should work when dropped into Vercel, Netlify, or GitHub Pages with no configuration files needed.
2. **Create `.gitignore`:**
   ```
   .DS_Store
   Thumbs.db
   *.log
   ```
3. **Test local server:** `python -m http.server 8000` from the project root — verify everything loads correctly at `http://localhost:8000`.
4. **Final console check:** Open browser DevTools — zero errors, zero warnings.

## Quality Gate
- [ ] Email signup: submit → form hides → confirmation appears → counter increments by 1
- [ ] Feedback form: submit → form hides → confirmation appears
- [ ] Both forms degrade gracefully with JS disabled (native submit to Formspree)
- [ ] Scroll animations: sections fade in as they enter viewport, with staggered card/step animations
- [ ] Hero has entrance animation on page load (no scroll trigger)
- [ ] `prefers-reduced-motion` disables all animations
- [ ] All text passes WCAG AA contrast against its background
- [ ] All form inputs have accessible labels
- [ ] Focus indicators visible on all interactive elements
- [ ] "Skip to content" link works on keyboard navigation
- [ ] No horizontal scroll at any viewport between 375px and 1440px
- [ ] `python -m http.server 8000` serves the site correctly
- [ ] Zero browser console errors or warnings
- [ ] `.gitignore` exists
- [ ] README has setup, deploy, and Formspree configuration instructions
