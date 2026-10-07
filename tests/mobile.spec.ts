import { test, expect } from '@playwright/test';

/**
 * Mobile navigation test cases (docs/test-cases/TC-RSP-*.md), automated.
 * Tagged @mobile, so they run only in the mobile-chrome and mobile-safari projects.
 */

test.describe('Mobile @mobile', () => {
  test('TC-RSP-001 Hamburger menu replaces the header nav on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Main Navigation' })).toBeHidden();

    const hamburger = page.getByRole('button', { name: 'mobile navigation' });
    await hamburger.click();
    const menu = page.locator('.VPNavScreen');
    await expect(menu).toBeVisible();
    await expect(menu.locator('.VPNavScreenMenuLink')).toHaveCount(8);
    await expect(menu.locator('.VPNavScreenTranslations')).toBeVisible();
    await expect(menu.locator('.VPNavScreenAppearance')).toBeVisible();

    await hamburger.click();
    await expect(menu).toBeHidden();
  });

  test('TC-RSP-002 Tapping a mobile menu item navigates and closes the menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'mobile navigation' }).click();
    const menu = page.locator('.VPNavScreen');
    await menu.locator('.VPNavScreenMenuLink', { hasText: 'Стріми' }).click();
    await expect(page).toHaveURL(/\/streams\/$/);
    await expect(menu).toBeHidden();

    await page.getByRole('button', { name: 'mobile navigation' }).click();
    await menu.locator('.VPNavScreenTranslations button').click();
    await menu.locator('.VPNavScreenTranslations').getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/\/en\/streams\/$/);
  });
});
