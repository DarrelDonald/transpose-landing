# Phase 01 — CSS Fixes & Playwright Verification

## Goal
Fix the invisible scroll chevron and off-center interest button, then verify both fixes with automated Playwright tests at multiple viewports.

## Prerequisites
- Read `_CONTEXT.md` first for root cause analysis, exact fix instructions, and line references.
- Node.js must be available to run Playwright.

## Critical Constraint
**Zero regression.** Only modify the specific CSS rules identified. Do not restructure HTML or change any content.

## Tasks

### 01.1 — Fix Hero Flex Layout for Scroll Chevron

The scroll chevron exists in HTML and CSS but is not visible because the hero's `justify-content: center` prevents `margin-top: auto` from pushing it to the bottom.

**In `css/style.css`, modify `#hero`** (lines 183-191):

Change FROM:
```css
#hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 2rem 1.5rem;
}
```

Change TO:
```css
#hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 2rem 1.5rem;
}
```

The only change is **removing `justify-content: center`**.

**Modify `.hero-content`** (lines 193-195):

Change FROM:
```css
.hero-content {
  max-width: 700px;
  margin: 0 auto;
}
```

Change TO:
```css
.hero-content {
  max-width: 700px;
  margin: 0 auto;
  margin-top: auto;
}
```

This pushes the content down so it's vertically centered (with `.scroll-indicator` at the bottom via its own `margin-top: auto`).

**The `.scroll-indicator`** already has `margin-top: auto` (line 313) — no change needed there.

### 01.2 — Increase Chevron Visibility

The chevron is 24x24px with 0.4 base opacity — too subtle to notice.

**In `css/style.css`, modify `.scroll-chevron`** (lines 317-325):

Change FROM:
```css
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

Change TO:
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

**Modify the `scrollBounce` keyframes** (lines 301-310):

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
  }
  50% {
    transform: translateY(8px) rotate(45deg);
    opacity: 1;
  }
}
```

**Critical:** The `rotate(45deg)` MUST be included in both keyframe steps. CSS animation `transform` values replace the static `transform` entirely — without `rotate(45deg)` in the keyframes, the chevron will lose its rotation during the animation and display as a square corner instead of a downward-pointing angle.

### 01.3 — Fix Interest Button Centering

The button appears off-center because the `#interest` section inherits the base `section` rule which constrains it to `max-width: var(--max-width)` (1100px) and `margin: 0 auto`. The section is centered, but within the section the button centering may look off relative to the full viewport.

**In `css/style.css`, modify `#interest`** (lines 463-466):

Change FROM:
```css
#interest {
  text-align: center;
  padding: 3rem 1.5rem 4rem;
}
```

Change TO:
```css
#interest {
  text-align: center;
  padding: 3rem 1.5rem 4rem;
  max-width: none;
}
```

This makes the interest section span the full viewport width (like `#signup` does at line 495), ensuring the button centers relative to the viewport rather than the constrained section width.

### 01.4 — Install Playwright and Write Tests

Set up Playwright in the project for visual verification. These tests are development-only and NOT part of the deployed site.

**Install Playwright:**
```bash
cd C:\Projects\transpose-landing
npm init -y
npm install -D @playwright/test
npx playwright install chromium
```

**Add to `.gitignore`:**
```
node_modules/
package-lock.json
test-results/
playwright-report/
```

**Create `tests/visual.spec.js`:**

```javascript
const { test, expect } = require('@playwright/test');

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

// Start a local server before tests
test.describe('Transpose Landing Page', () => {

  for (const vp of viewports) {
    test.describe(`${vp.name} (${vp.width}x${vp.height})`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } });

      test('scroll chevron is visible in hero section', async ({ page }) => {
        await page.goto('http://localhost:8000');

        // Wait for hero animations to complete
        await page.waitForTimeout(2000);

        const chevron = page.locator('.scroll-chevron');
        await expect(chevron).toBeVisible();

        // Verify chevron is in the lower portion of the viewport
        const box = await chevron.boundingBox();
        expect(box).not.toBeNull();
        // Chevron should be in the bottom 30% of the viewport
        expect(box.y).toBeGreaterThan(vp.height * 0.6);
      });

      test('interest button is horizontally centered', async ({ page }) => {
        await page.goto('http://localhost:8000');

        // Scroll to interest section
        await page.locator('#interest').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const button = page.locator('.interest-btn');
        await expect(button).toBeVisible();

        const box = await button.boundingBox();
        expect(box).not.toBeNull();

        // Button center should be within 10px of viewport center
        const buttonCenter = box.x + box.width / 2;
        const viewportCenter = vp.width / 2;
        expect(Math.abs(buttonCenter - viewportCenter)).toBeLessThan(10);
      });

      test('hero has no CTA button', async ({ page }) => {
        await page.goto('http://localhost:8000');
        const heroCta = page.locator('#hero .hero-cta');
        await expect(heroCta).toHaveCount(0);
      });

      test('no AI references on page', async ({ page }) => {
        await page.goto('http://localhost:8000');
        const bodyText = await page.locator('body').textContent();
        expect(bodyText).not.toContain('Our AI');
        // Allow "Email" which contains "ai" substring
        const sections = await page.locator('section').allTextContents();
        for (const text of sections) {
          expect(text).not.toMatch(/\bAI\b/);
        }
      });

      test('interest button shows feedback on click', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.locator('#interest').scrollIntoViewIfNeeded();

        const button = page.locator('.interest-btn');
        await button.click();

        // Button should show confirmation text
        await expect(button).toHaveText('✓ You want this!');
        // Button should have the clicked class
        await expect(button).toHaveClass(/clicked/);
      });

      test('all four problem cards are present', async ({ page }) => {
        await page.goto('http://localhost:8000');
        const cards = page.locator('.problem-card');
        await expect(cards).toHaveCount(4);
      });

      test('all three solution steps are present', async ({ page }) => {
        await page.goto('http://localhost:8000');
        const steps = page.locator('.solution-step');
        await expect(steps).toHaveCount(3);
      });

      test('signup form is present and has email input', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.locator('#signup').scrollIntoViewIfNeeded();
        const emailInput = page.locator('#signup input[type="email"]');
        await expect(emailInput).toBeVisible();
        const submitBtn = page.locator('#signup button[type="submit"]');
        await expect(submitBtn).toBeVisible();
      });

      test('feedback form has all field groups', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.locator('#feedback').scrollIntoViewIfNeeded();
        const fieldsets = page.locator('#feedback fieldset');
        await expect(fieldsets).toHaveCount(6);
      });

      test('footer has correct year and no social links', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.locator('#footer').scrollIntoViewIfNeeded();

        const copyright = page.locator('.footer-copyright');
        await expect(copyright).toContainText('2026');

        const socialLinks = page.locator('.footer-links');
        await expect(socialLinks).toHaveCount(0);
      });

      test('no horizontal scroll', async ({ page }) => {
        await page.goto('http://localhost:8000');
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
      });

      test('no console errors', async ({ page }) => {
        const errors = [];
        page.on('console', msg => {
          if (msg.type() === 'error') errors.push(msg.text());
        });
        await page.goto('http://localhost:8000');
        await page.waitForTimeout(2000);
        expect(errors).toHaveLength(0);
      });
    });
  }
});
```

**Create `playwright.config.js`:**
```javascript
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:8000',
    screenshot: 'only-on-failure',
  },
});
```

### 01.5 — Run Tests and Verify

1. **Start the local server** in one terminal:
   ```bash
   cd C:\Projects\transpose-landing
   python -m http.server 8000
   ```

2. **Run Playwright tests** in another terminal:
   ```bash
   cd C:\Projects\transpose-landing
   npx playwright test
   ```

3. **All tests must pass.** If any test fails:
   - Read the failure message carefully
   - Fix the CSS issue
   - Re-run the failing test: `npx playwright test --grep "test name"`
   - Do not proceed until all tests pass

4. **Take screenshots** for manual review:
   ```bash
   npx playwright test --update-snapshots
   ```

## Quality Gate
- [ ] `npx playwright test` passes ALL tests (0 failures)
- [ ] Scroll chevron is visible at the bottom of the hero at 375px, 768px, and 1440px
- [ ] Scroll chevron is in the bottom 30% of the viewport (verified by test)
- [ ] Scroll chevron animates with bounce (manual verification)
- [ ] "I Want This" button center is within 10px of viewport center at all viewports (verified by test)
- [ ] Clicking "I Want This" shows "✓ You want this!" (verified by test)
- [ ] No `AI` references on page (verified by test)
- [ ] No hero CTA button (verified by test)
- [ ] 4 problem cards present (verified by test)
- [ ] 3 solution steps present (verified by test)
- [ ] Signup form present with email input (verified by test)
- [ ] Feedback form has 6 fieldsets (verified by test)
- [ ] Footer says 2026, no social links (verified by test)
- [ ] No horizontal scroll at any viewport (verified by test)
- [ ] No console errors (verified by test)
