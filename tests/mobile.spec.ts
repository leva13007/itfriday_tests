import { test, expect } from './fixtures';
import { representativePages, representativePagesEn } from './support/representative-pages';

/**
 * Mobile navigation test cases (docs/test-cases/TC-RSP-*.md), automated.
 * Tagged @mobile, so they run only in the mobile-chrome and mobile-safari projects.
 */

test.describe('Mobile @mobile', () => {
  test('TC-RSP-001 Hamburger menu replaces the header nav on mobile', async ({ page, header, mobileMenu }) => {
    await page.goto('/');
    await expect(header.nav).toBeHidden();

    await mobileMenu.open();
    await expect(mobileMenu.screen).toBeVisible();
    await expect(mobileMenu.links).toHaveCount(8);
    await expect(mobileMenu.languageGroup).toBeVisible();
    await expect(mobileMenu.appearance).toBeVisible();

    await mobileMenu.hamburger.click();
    await expect(mobileMenu.screen).toBeHidden();
  });

  test('TC-RSP-002 Tapping a mobile menu item navigates and closes the menu', async ({ page, mobileMenu }) => {
    await page.goto('/');
    await mobileMenu.open();
    await mobileMenu.link('Стріми').click();
    await expect(page).toHaveURL(/\/streams\/$/);
    await expect(mobileMenu.screen).toBeHidden();

    await mobileMenu.open();
    await mobileMenu.switchLanguage('English');
    await expect(page).toHaveURL(/\/en\/streams\/$/);
  });

  test('TC-RSP-003 Pages have no horizontal scroll at mobile width', async ({ page }) => {
    test.setTimeout(90_000);
    for (const { name, path } of [...representativePages, ...representativePagesEn]) {
      await page.goto(path);
      const { scrollWidth, viewport } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect.soft(scrollWidth, `${name} ${path}: page width vs viewport`).toBeLessThanOrEqual(viewport);
    }
    // Wide tables and code blocks must scroll inside their own box, not widen the page.
    await page.goto('/streams/');
    await expect(page.locator('.vp-doc table')).toHaveCSS('overflow-x', 'auto');
    await page.goto('/posts/2026-06-22-web-push-api');
    const codeBlock = page.locator('.vp-doc div[class*="language-"] pre').first();
    await expect(codeBlock).toHaveCSS('overflow-x', /auto|scroll/);
  });
});
