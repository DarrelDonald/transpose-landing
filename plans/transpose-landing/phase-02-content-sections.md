# Phase 02 — Content Sections

## Goal
Build all remaining content sections: problem cards, solution steps, email signup with counter, full feedback form, and footer. After this phase, the page has all its content and is functionally complete (minus animations and final polish).

## Prerequisites
- Read `_CONTEXT.md` first for all copy, field definitions, and design decisions.
- Phase 01 complete — `index.html` exists with hero section and all placeholder sections. CSS foundation (variables, reset, dark theme, `.btn-primary`, `.fade-in`) is in place.

## Critical Constraint
**Use the exact copy from `_CONTEXT.md`.** Do not rephrase, reword, or "improve" any headlines, pain points, or CTAs. Implement them verbatim.

## Tasks

### 02.1 — Problem Section (4 Pain-Point Cards)

Build the `#problem` section with a heading and 4 cards in a responsive grid.

**HTML structure:**
```html
<section id="problem" class="fade-in">
  <h2>Sound familiar?</h2>
  <div class="problem-grid">
    <div class="problem-card">
      <span class="problem-icon">🎸</span>
      <h3>"I wrote a riff. Getting it into my DAW took longer than writing it."</h3>
      <p>You play guitar. You think in frets and strings. But your DAW thinks in piano keys and mouse clicks.</p>
    </div>
    <!-- 3 more cards with copy from _CONTEXT.md Pain Point Cards table -->
  </div>
</section>
```

**CSS for problem section:**
- `.problem-grid` — CSS Grid, `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`, `gap: 1.5rem`
- `.problem-card` — `background: var(--bg-card)`, `border-radius: 16px`, `padding: 2rem`, subtle border `1px solid rgba(255,255,255,0.06)`
- `.problem-card:hover` — `border-color: var(--accent-start)`, subtle `box-shadow`
- `.problem-icon` — `font-size: 2.5rem`, `margin-bottom: 1rem`, `display: block`
- `.problem-card h3` — `font-size: 1.1rem`, `margin-bottom: 0.75rem`, `color: var(--text-primary)`, `font-style: italic`
- `.problem-card p` — `color: var(--text-secondary)`, `line-height: 1.6`
- On mobile (≤768px): grid collapses to single column

All 4 cards. Exact copy from `_CONTEXT.md`.

### 02.2 — Solution Section (3 Steps)

Build the `#solution` section with a heading and 3 steps in a horizontal flow.

**HTML structure:**
```html
<section id="solution" class="fade-in">
  <h2>How it works</h2>
  <div class="solution-steps">
    <div class="solution-step">
      <div class="step-number">1</div>
      <div class="step-icon">🎵</div>
      <h3>Play</h3>
      <p>Pick up your instrument — guitar, trumpet, violin, voice, anything. Play your part the way you've always played it.</p>
    </div>
    <!-- Step 2 (Transpose) and Step 3 (Create) with copy from _CONTEXT.md -->
  </div>
</section>
```

**CSS for solution section:**
- `.solution-steps` — `display: flex`, `gap: 2rem`, `justify-content: center`, `flex-wrap: wrap`
- `.solution-step` — `flex: 1`, `min-width: 250px`, `max-width: 320px`, `text-align: center`, `padding: 2rem`
- `.step-number` — `width: 48px`, `height: 48px`, `border-radius: 50%`, `background: var(--accent-gradient)`, `color: white`, `display: flex`, `align-items: center`, `justify-content: center`, `font-weight: 700`, `font-size: 1.2rem`, `margin: 0 auto 1rem`
- `.step-icon` — `font-size: 3rem`, `margin-bottom: 1rem`
- Between steps (on desktop): a subtle connector — a horizontal dashed line or arrow. Use a CSS `::after` pseudo-element on steps 1 and 2. On mobile, hide the connector.

All 3 steps. Exact copy from `_CONTEXT.md`.

### 02.3 — Email Signup Section

Build the `#signup` section — the primary conversion point.

**HTML structure:**
```html
<section id="signup" class="fade-in">
  <div class="signup-content">
    <h2>Be first to know</h2>
    <p class="signup-subtitle">Transpose is coming. Drop your email and we'll notify you the moment it's ready.</p>
    <form class="signup-form" action="https://formspree.io/f/YOUR_FORMSPREE_SIGNUP_ID" method="POST">
      <div class="signup-input-group">
        <input type="email" name="email" placeholder="your@email.com" required aria-label="Email address">
        <button type="submit" class="btn-primary">Count Me In</button>
      </div>
      <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
    </form>
    <div class="signup-confirmation" hidden>
      <p>✓ You're in. We'll let you know the moment Transpose is ready.</p>
    </div>
    <p class="signup-counter">
      Join <span class="counter-number">0</span> musicians waiting for Transpose
    </p>
  </div>
</section>
```

**CSS for signup section:**
- `#signup` — `background: var(--bg-secondary)`, full-width (break out of max-width), `text-align: center`, extra vertical padding
- `.signup-form` — centered, `max-width: 500px`
- `.signup-input-group` — `display: flex`, `gap: 0.5rem`. On mobile: `flex-direction: column`
- `input[type="email"]` — dark input styling: `background: var(--bg-primary)`, `border: 1px solid rgba(255,255,255,0.1)`, `color: var(--text-primary)`, `padding: 1rem 1.5rem`, `border-radius: 50px`, `flex: 1`, `font-size: 1rem`. Focus: `border-color: var(--accent-start)`, `outline: none`, `box-shadow: 0 0 0 3px var(--accent-glow)`
- Hidden honeypot field `_gotcha` for spam protection (Formspree feature)
- `.signup-confirmation` — shown after successful submit, green check, friendly message
- `.signup-counter` — `color: var(--text-muted)`, `margin-top: 1.5rem`, `font-size: 0.9rem`
- `.counter-number` — `color: var(--accent-start)`, `font-weight: 700`

**Note:** The counter number is a placeholder. Start it at `0`. In `main.js` (Phase 03), add logic to increment it locally on submission for immediate feedback. A real count would require a backend — out of scope for v1. For now, hardcode a seed number or leave at 0.

### 02.4 — Feedback Form Section

Build the `#feedback` section with all fields from `_CONTEXT.md`.

**HTML structure:**
```html
<section id="feedback" class="fade-in">
  <h2>Help us build exactly what you need</h2>
  <p class="feedback-subtitle">Tell us about your workflow. Your answers directly shape what we build first.</p>
  <form class="feedback-form" action="https://formspree.io/f/YOUR_FORMSPREE_FEEDBACK_ID" method="POST">

    <!-- Instruments (checkboxes) -->
    <fieldset>
      <legend>What instrument(s) do you play?</legend>
      <div class="checkbox-grid">
        <label><input type="checkbox" name="instruments[]" value="Guitar"> Guitar</label>
        <label><input type="checkbox" name="instruments[]" value="Bass"> Bass</label>
        <label><input type="checkbox" name="instruments[]" value="Vocals"> Vocals</label>
        <label><input type="checkbox" name="instruments[]" value="Trumpet"> Trumpet</label>
        <label><input type="checkbox" name="instruments[]" value="Saxophone"> Saxophone</label>
        <label><input type="checkbox" name="instruments[]" value="Violin/Viola"> Violin/Viola</label>
        <label><input type="checkbox" name="instruments[]" value="Cello"> Cello</label>
        <label><input type="checkbox" name="instruments[]" value="Piano/Keys"> Piano/Keys</label>
        <label><input type="checkbox" name="instruments[]" value="Drums/Percussion"> Drums/Percussion</label>
        <label><input type="checkbox" name="instruments[]" value="Flute/Clarinet"> Flute/Clarinet</label>
        <label><input type="checkbox" name="instruments[]" value="Other"> Other</label>
      </div>
      <input type="text" name="instruments_other" placeholder="Other instruments..." class="other-input">
    </fieldset>

    <!-- Frustration (textarea) -->
    <fieldset>
      <legend>What's your biggest frustration getting your playing into digital format?</legend>
      <textarea name="frustration" rows="4" placeholder="Tell us about your workflow..."></textarea>
    </fieldset>

    <!-- Use cases (checkboxes) -->
    <fieldset>
      <legend>What would you use Transpose for?</legend>
      <div class="checkbox-grid">
        <label><input type="checkbox" name="use_cases[]" value="MIDI for production"> MIDI for production</label>
        <label><input type="checkbox" name="use_cases[]" value="Sheet music / lead sheets"> Sheet music / lead sheets</label>
        <label><input type="checkbox" name="use_cases[]" value="Arranging for ensembles"> Arranging for ensembles</label>
        <label><input type="checkbox" name="use_cases[]" value="Transcription services"> Transcription services</label>
        <label><input type="checkbox" name="use_cases[]" value="Teaching / education"> Teaching / education</label>
        <label><input type="checkbox" name="use_cases[]" value="Other"> Other</label>
      </div>
    </fieldset>

    <!-- Time spent (radio) -->
    <fieldset>
      <legend>How much time do you spend transcribing per week?</legend>
      <div class="radio-group">
        <label><input type="radio" name="time_spent" value="Less than 1 hour"> Less than 1 hour</label>
        <label><input type="radio" name="time_spent" value="1-3 hours"> 1–3 hours</label>
        <label><input type="radio" name="time_spent" value="3-5 hours"> 3–5 hours</label>
        <label><input type="radio" name="time_spent" value="5+ hours"> 5+ hours</label>
      </div>
    </fieldset>

    <!-- Email (optional) -->
    <fieldset>
      <legend>Email (so we can follow up)</legend>
      <input type="email" name="email" placeholder="your@email.com (optional)">
    </fieldset>

    <!-- Anything else (textarea) -->
    <fieldset>
      <legend>Anything else you want us to know?</legend>
      <textarea name="anything_else" rows="3" placeholder="Ideas, wishes, rants — all welcome..."></textarea>
    </fieldset>

    <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
    <button type="submit" class="btn-primary">Help Us Build This Right</button>
  </form>
  <div class="feedback-confirmation" hidden>
    <p>🙏 Thank you! Your input directly shapes what we build.</p>
  </div>
</section>
```

**CSS for feedback form:**
- `.feedback-form` — `max-width: 650px`, `margin: 2rem auto 0`, `text-align: left`
- `fieldset` — no default border, `margin-bottom: 2rem`
- `legend` — `font-size: 1.05rem`, `font-weight: 500`, `color: var(--text-primary)`, `margin-bottom: 0.75rem`
- `.checkbox-grid` — CSS Grid, `grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))`, `gap: 0.5rem`
- Checkbox/radio label styling — `display: flex`, `align-items: center`, `gap: 0.5rem`, `color: var(--text-secondary)`, `cursor: pointer`, `padding: 0.5rem`, `border-radius: 8px`. Hover: subtle background highlight.
- Custom checkbox/radio appearance — hide default, use `::before` pseudo-element with border + accent color when checked. OR use `accent-color: var(--accent-start)` for simplicity.
- `textarea` — same dark styling as email input: `background: var(--bg-primary)`, `border`, `border-radius: 12px`, `padding: 1rem`, `width: 100%`, `color: var(--text-primary)`, `resize: vertical`
- `.other-input` — smaller text input, shown below "Other" checkbox, same dark styling
- Submit button centered: `display: block`, `margin: 2rem auto 0`

### 02.5 — Footer

Build the `<footer id="footer">`.

**HTML structure:**
```html
<footer id="footer">
  <div class="footer-content">
    <p class="footer-brand"><span class="text-gradient">Transpose</span></p>
    <p class="footer-tagline">Play it. Score it.</p>
    <div class="footer-links">
      <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter">𝕏</a>
      <a href="mailto:hello@transpose.fm" aria-label="Email">✉</a>
    </div>
    <p class="footer-copyright">© 2026 Transpose. All rights reserved.</p>
  </div>
</footer>
```

**CSS for footer:**
- `footer` — `background: var(--bg-secondary)`, `text-align: center`, `padding: 3rem 1.5rem`
- `.footer-brand` — `font-size: 1.5rem`, `font-weight: 700`, `margin-bottom: 0.5rem`
- `.footer-tagline` — `color: var(--text-muted)`, `margin-bottom: 1.5rem`
- `.footer-links` — `display: flex`, `gap: 1.5rem`, `justify-content: center`, `margin-bottom: 1.5rem`
- `.footer-links a` — `color: var(--text-secondary)`, `text-decoration: none`, `font-size: 1.2rem`. Hover: `color: var(--accent-start)`
- `.footer-copyright` — `color: var(--text-muted)`, `font-size: 0.8rem`

## Quality Gate
- [ ] All 4 problem cards render with correct copy from `_CONTEXT.md` — icons, titles, body text match exactly
- [ ] All 3 solution steps render with correct copy — step numbers, icons, titles, body text match exactly
- [ ] Email signup form has email input + "Count Me In" button + honeypot field
- [ ] Feedback form has all 6 field groups with correct options matching `_CONTEXT.md` Feedback Form Fields table
- [ ] Footer shows brand, tagline, social links, copyright
- [ ] Forms have `action` attributes pointing to Formspree placeholder URLs
- [ ] All sections use `.fade-in` class for scroll animation readiness
- [ ] Problem cards show in 2x2 grid on desktop, single column on mobile
- [ ] Solution steps show horizontally on desktop, vertically on mobile
- [ ] Signup input + button show side-by-side on desktop, stacked on mobile
- [ ] No console errors
