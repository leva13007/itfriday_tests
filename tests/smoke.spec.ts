import { test, expect } from '@playwright/test';

/**
 * Smoke checklist (docs/checklists/smoke.md), automated.
 * Each test title starts with the check ID from the checklist.
 * Run only these with: npm run test:smoke
 */

test.describe('Smoke @smoke', () => {
  test('S-01 Home page (UA) loads', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('.VPHero .name')).toHaveText("ІТ П'ятниця");
    await expect(page.locator('.VPHero .tagline')).toContainText('19:00 London');
  });

  test('S-02 Home page (EN) loads', async ({ page }) => {
    const response = await page.goto('/en/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('.VPHero .name')).toHaveText('IT Friday');
  });

  test('S-03 Header shows logo, 8 nav items, language switcher and theme toggle', async ({ page }) => {
    await page.goto('/');
    // The logo link has no accessible name (BUG-003), so it is located by its class.
    await expect(page.locator('.VPNavBarTitle a')).toBeVisible();
    const nav = page.getByRole('navigation', { name: 'Main Navigation' });
    await expect(nav.getByRole('link')).toHaveCount(8);
    await expect(page.getByRole('button', { name: 'Change language' })).toBeVisible();
    await expect(page.locator('.VPNavBarAppearance').getByRole('switch')).toBeVisible();
  });

  test('S-04 Every header nav item opens its page', async ({ page }) => {
    const items = [
      { name: 'Про нас', url: /\/about(\.html)?$/ },
      { name: 'Стріми', url: /\/streams\/$/ },
      { name: 'Спікери', url: /\/speakers(\.html)?$/ },
      { name: 'Стати спікером', url: /\/speak(\.html)?$/ },
      { name: 'Публікації', url: /\/posts\/$/ },
      { name: 'Вікі', url: /\/wiki\/mission(\.html)?$/ },
      { name: 'Розклад', url: /\/schedule(\.html)?$/ },
      { name: 'Issues', url: /\/issues(\.html)?$/ },
    ];
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main Navigation' });
    for (const item of items) {
      await nav.getByRole('link', { name: item.name, exact: true }).click();
      await expect(page).toHaveURL(item.url);
      await expect(page.locator('.vp-doc h1')).toBeVisible();
    }
  });

  test('S-05 Language switch on the streams list keeps the page', async ({ page }) => {
    await page.goto('/streams/');
    await page.getByRole('button', { name: 'Change language' }).click();
    await page.locator('.VPNavBarTranslations').getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/\/en\/streams\/$/);
  });

  test('S-06 Streams list shows the newest stream first', async ({ page }) => {
    await page.goto('/streams/');
    const numbers = await page.locator('.vp-doc table tbody tr td:first-child').allInnerTexts();
    expect(numbers.length).toBeGreaterThan(0);
    const asInts = numbers.map((n) => parseInt(n, 10));
    expect(asInts[0]).toBe(Math.max(...asInts));
  });

  test('S-07 Newest stream page shows title, date, cover and YouTube link', async ({ page }) => {
    await page.goto('/streams/');
    await page.locator('.vp-doc table tbody tr').first().locator('td:first-child a').click();
    await expect(page.locator('.vp-doc h1')).toContainText('#');
    await expect(page.locator('.vp-doc')).toContainText('Дата:');
    const cover = page.locator('.vp-doc img').first();
    await expect(cover).toBeVisible();
    // toBeVisible() waits for the <img> element, not for the ~2 MB file behind it,
    // so poll until the browser has actually decoded the image.
    await expect
      .poll(() => cover.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), { timeout: 15_000 })
      .toBe(true);
    await expect(page.locator('.vp-doc a[href*="youtube.com"]').first()).toBeVisible();
  });

  test('S-08 Speakers list and a speaker profile load', async ({ page }) => {
    await page.goto('/speakers');
    await expect(page.locator('.vp-doc h1')).toHaveText(/Спікери/);
    await page.locator('.vp-doc a[href^="/speakers/"]').first().click();
    await expect(page).toHaveURL(/\/speakers\/[a-z-]+(\.html)?$/);
    await expect(page.locator('.vp-doc h1')).toBeVisible();
  });

  test('S-09 Wiki page has a sidebar with 4 documents', async ({ page }) => {
    await page.goto('/wiki/mission');
    await expect(page.locator('.VPSidebar').getByRole('link')).toHaveCount(4);
  });

  test('S-10 Logo returns to the home page', async ({ page }) => {
    await page.goto('/wiki/mission');
    await page.locator('.VPNavBarTitle a').click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('S-11 Theme toggle switches light and dark', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const toggle = page.locator('.VPNavBarAppearance').getByRole('switch');
    await expect(html).not.toHaveClass(/dark/);
    await toggle.click();
    await expect(html).toHaveClass(/dark/);
    await toggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test('S-12 Mobile: hamburger menu opens with the nav items @mobile', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'mobile navigation' }).click();
    await expect(page.locator('.VPNavScreen')).toBeVisible();
    await expect(page.locator('.VPNavScreenMenuLink')).toHaveCount(8);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = page.viewportSize()!.width;
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test('S-13 Unknown URL returns a 404 page with a home link', async ({ page }) => {
    const response = await page.goto('/does-not-exist');
    expect(response?.status()).toBe(404);
    // Visible text is "Take me home", but the accessible name (aria-label) is "go to home".
    await page.getByRole('link', { name: 'go to home' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('S-14 No console errors on the home page and the newest stream page', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto('/');
    await page.goto('/streams/');
    await page.locator('.vp-doc table tbody tr').first().locator('td:first-child a').click();
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });

  test('S-15 Hero buttons point to the community channels', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('.VPHero');
    await expect(hero.getByRole('link', { name: 'YouTube Live →' })).toHaveAttribute('href', 'https://youtube.com/@zloyleva');
    await expect(hero.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/company/it-friday/');
    await expect(hero.getByRole('link', { name: 'Telegram' })).toHaveAttribute('href', 'https://t.me/+QRJNFfHaLxMwYzcy');
    await expect(hero.getByRole('link', { name: 'Discord' })).toHaveAttribute('href', 'https://discord.gg/ZpWpDQq2EP');
  });
});
