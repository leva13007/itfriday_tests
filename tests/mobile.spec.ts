import { test, expect } from './fixtures';

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
});
