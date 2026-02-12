# Phase 01 — Hero & CTA Restructure

## Goal
Restructure the page's emotional arc: make the hero a compelling hook (no CTA), update solution copy to remove AI references, and add a zero-friction "I Want This" interest button after the solution section that silently logs clicks to Formspree and scrolls visitors to the signup/feedback area.

## Prerequisites
- Read `_CONTEXT.md` first for all updated copy, design decisions, and non-negotiables.
- The existing site is fully built. This phase EDITS existing files — it does not create new ones.

## Critical Constraint
**Zero regression on untouched sections.** Problem cards, signup form, and feedback form must remain fully intact. Only hero, solution, and the area between solution and signup are modified.

## Tasks

### 01.1 — Remove CTA from Hero, Fix Hero Copy

In `index.html`, hero section (around line 34-101):

**Remove the "I Need This" button:**
Delete this line:
```html
<a href="#signup" class="btn-primary hero-cta">I Need This</a>
```

**Update the hero pain statement** (around line 41-44):
Change:
```
But the moment you need your playing as MIDI or sheet music, you're stuck clicking notes one by one.
```
To:
```
But when it's time to get your playing into MIDI or sheet music, you're stuck clicking notes one by one.
```

In `css/style.css`, the `.hero-cta` animation rule (around line 261-264) can be removed since the element no longer exists:
```css
.hero-cta {
  animation: heroFadeUp 0.8s ease 0.6s forwards;
  opacity: 0;
}
```
Remove that block. The `.hero-visual` animation delay should shift from `0.8s` to `0.6s` to keep the stagger smooth:
```css
.hero-visual {
  animation: heroFadeUp 0.8s ease 0.6s forwards;
  opacity: 0;
}
```

Also remove the generic `.hero-cta` sizing rule (around line 219-221):
```css
.hero-cta {
  font-size: 1.2rem;
}
```

And in the responsive section (around line 687-690), remove:
```css
.hero-cta {
  width: 100%;
  text-align: center;
}
```

### 01.2 — Enhance Hero Visual Presence

The owner feedback: "the first thing I see being so empty makes me feel like what even is this? There's so much empty space and tiny lettering."

In `css/style.css`, make these adjustments to the hero:

**Increase hero description text size** — change `.hero-description` (around line 209):
```css
.hero-description {
  font-size: 1.15rem;
```
(from `1.1rem` — subtle but helps readability)

**Make the SVG visual larger and closer to the text** — change `.hero-visual` (around line 225-228):
```css
.hero-visual {
  margin-top: 2rem;    /* was 3rem — bring it closer */
  width: 100%;
  max-width: 600px;    /* was 500px — make it more prominent */
}
```

**Reduce hero vertical padding** so it doesn't feel as cavernous — the `min-height: 100vh` on `#hero` (line 184) keeps the section full-height. Consider changing to `min-height: 90vh` to reduce the bottom gap:
```css
#hero {
  min-height: 90vh;
```

The overall effect: text feels more substantial, visual is larger and closer, less dead space below the fold line.

### 01.3 — Update Solution Section Copy

In `index.html`, solution section (around line 130-153):

**Step 2 body text** — change:
```html
<p>Our AI listens and transcribes in real-time. No MIDI controller. No piano keyboard. Just your sound.</p>
```
To:
```html
<p>We listen and transcribe in real-time. No extra gear. Just your sound.</p>
```

**Step 3 body text** — change:
```html
<p>Get MIDI, sheet music, or both. Drop it into your DAW, notation software, or arrangement. Keep creating.</p>
```
To:
```html
<p>Get MIDI, sheet music, or both. Drop it straight into your DAW or notation software. Keep creating.</p>
```

### 01.4 — Add "I Want This" Interest Button

Add a new CTA element between the solution section and the signup section. This is the primary conversion point.

In `index.html`, after the closing `</section>` of `#solution` (around line 153) and before `#signup` (around line 155), add:

```html
<!-- Interest CTA -->
<section id="interest" class="fade-in">
  <div class="interest-content">
    <p class="interest-prompt">Ready to stop clicking notes one by one?</p>
    <button class="btn-primary interest-btn" id="interest-btn">I Want This</button>
    <form id="interest-form" action="https://formspree.io/f/YOUR_FORMSPREE_INTEREST_ID" method="POST" hidden>
      <input type="hidden" name="action" value="interest_click">
      <input type="hidden" name="timestamp" id="interest-timestamp">
    </form>
  </div>
</section>
```

**CSS for interest section** — add to `css/style.css` before the Signup section comment:

```css
/* ============================================
   Interest CTA Section
   ============================================ */
#interest {
  text-align: center;
  padding: 3rem 1.5rem 4rem;
}

.interest-content {
  max-width: var(--max-width);
  margin: 0 auto;
}

.interest-prompt {
  color: var(--text-secondary);
  font-size: 1.15rem;
  margin-bottom: 1.5rem;
}

.interest-btn {
  font-size: 1.3rem;
  padding: 1.2rem 3rem;
}

.interest-btn.clicked {
  background: linear-gradient(135deg, #4ade80, #22c55e);
  pointer-events: none;
}
```

### 01.5 — Wire Up Interest Button in JavaScript

In `js/main.js`, add the interest click handler. Add this after the form wiring section (around line 67):

```javascript
// ============================================
// Interest "I Want This" Button
// ============================================
const interestBtn = document.getElementById('interest-btn');
const interestForm = document.getElementById('interest-form');

if (interestBtn && interestForm) {
  interestBtn.addEventListener('click', async () => {
    // Log click to Formspree silently
    const timestampInput = document.getElementById('interest-timestamp');
    if (timestampInput) {
      timestampInput.value = new Date().toISOString();
    }

    try {
      await fetch(interestForm.action, {
        method: 'POST',
        body: new FormData(interestForm),
        headers: { 'Accept': 'application/json' }
      });
    } catch (e) {
      // Silent fail — don't block UX for analytics
    }

    // Visual feedback
    interestBtn.textContent = '✓ You want this!';
    interestBtn.classList.add('clicked');

    // Scroll to signup section
    const signupSection = document.getElementById('signup');
    if (signupSection) {
      setTimeout(() => {
        signupSection.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    }
  });
}
```

Also, remove the counter code that is no longer needed (around lines 72-84):
```javascript
// ============================================
// Signup Counter
// ============================================
let counterAnimated = false;

function incrementCounter() {
  const counterEl = document.querySelector('.counter-number');
  if (counterEl) {
    const currentCount = parseInt(counterEl.textContent) || 0;
    counterEl.textContent = currentCount + 1;
  }
}

// Counter starts at 0, showing "Be among the first to know" message
// No fake seed number per Decision #1
```

And remove the `incrementCounter()` call inside the `handleFormSubmit` function (around line 41-43):
```javascript
// If this is the signup form, trigger counter increment
if (form.classList.contains('signup-form')) {
  incrementCounter();
}
```

## Quality Gate
- [ ] Hero section: shows product name, tagline, pain statement (updated copy), and SVG visual — NO CTA button
- [ ] Hero feels more substantial — less empty space, larger visual, readable text
- [ ] Pain statement reads: "But when it's time to get your playing into MIDI or sheet music"
- [ ] The word "AI" does not appear anywhere on the page
- [ ] Solution step 2: "We listen and transcribe in real-time. No extra gear. Just your sound."
- [ ] Solution step 3: "...Drop it straight into your DAW or notation software..."
- [ ] "I Want This" button appears after solution section, centered, prominent
- [ ] Clicking "I Want This": button changes to "✓ You want this!", scrolls to signup section
- [ ] Formspree receives a POST with `action=interest_click` and `timestamp` on button click
- [ ] Button cannot be clicked twice (pointer-events: none after click)
- [ ] Problem cards are completely unchanged
- [ ] Signup form still works (email submit → confirmation)
- [ ] Feedback form still works (all fields submit → confirmation)
- [ ] No console errors
- [ ] Mobile (375px): interest button is full-width and tappable, hero looks good
