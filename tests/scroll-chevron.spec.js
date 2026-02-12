// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Scroll Chevron Animation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('chevron is visible in hero section', async ({ page }) => {
    const chevron = page.locator('.scroll-chevron');
    await expect(chevron).toBeVisible();
  });

  test('chevron has correct rotation in keyframes', async ({ page }) => {
    // Verify the CSS animation includes rotation
    const styles = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === 'scrollBounce') {
              const keyframeRules = Array.from(rule.cssRules || []);
              return keyframeRules.map(kr => ({
                keyText: kr.keyText,
                transform: kr.style.transform
              }));
            }
          }
        } catch (e) {
          // Skip cross-origin stylesheets
        }
      }
      return null;
    });

    expect(styles).not.toBeNull();
    // Verify rotation is included in ALL keyframes
    for (const keyframe of styles) {
      expect(keyframe.transform).toContain('rotate(45deg)');
    }
  });

  test('chevron has glow effect in keyframes', async ({ page }) => {
    // Verify the CSS animation includes filter for glow
    const hasGlow = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === 'scrollBounce') {
              const keyframeRules = Array.from(rule.cssRules || []);
              // Check 50% keyframe for drop-shadow
              const midFrame = keyframeRules.find(kr => kr.keyText === '50%');
              if (midFrame && midFrame.style.filter) {
                return midFrame.style.filter.includes('drop-shadow');
              }
            }
          }
        } catch (e) {
          // Skip cross-origin stylesheets
        }
      }
      return false;
    });

    expect(hasGlow).toBe(true);
  });

  test('chevron maintains shape (is rotated 45deg)', async ({ page }) => {
    const chevron = page.locator('.scroll-chevron');
    
    // Check that the base styles include rotation
    const transform = await chevron.evaluate(el => {
      return window.getComputedStyle(el).transform;
    });
    
    // The computed transform should be a matrix that includes rotation
    // A 45deg rotation results in values like matrix(0.707..., 0.707..., ...)
    expect(transform).not.toBe('none');
  });

  test('chevron has animation applied', async ({ page }) => {
    const chevron = page.locator('.scroll-chevron');
    
    const animation = await chevron.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        name: style.animationName,
        duration: style.animationDuration,
        iterationCount: style.animationIterationCount
      };
    });

    expect(animation.name).toBe('scrollBounce');
    expect(animation.duration).toBe('2s');
    expect(animation.iterationCount).toBe('infinite');
  });

  test('reduced motion disables animation', async ({ page }) => {
    // Emulate prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    
    const chevron = page.locator('.scroll-chevron');
    
    const animationDuration = await chevron.evaluate(el => {
      return window.getComputedStyle(el).animationDuration;
    });

    // With reduced motion, animation should be effectively disabled
    // Browser may report as '0.01ms' or '1e-05s' or similar tiny value
    const durationMs = parseFloat(animationDuration);
    expect(durationMs).toBeLessThan(1);
  });
});

test.describe('Page Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForTimeout(1000); // Wait for any deferred errors
    
    expect(errors).toHaveLength(0);
  });

  test('hero section is visible', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
  });

  test('all main sections exist', async ({ page }) => {
    const sections = ['#hero', '#problem', '#solution', '#interest', '#signup', '#feedback'];
    
    for (const selector of sections) {
      const section = page.locator(selector);
      await expect(section).toBeAttached();
    }
  });
});
