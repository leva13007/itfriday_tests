import { test, expect } from './fixtures';

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

  test('S-03 Header shows logo, 8 nav items, language switcher and theme toggle', async ({ page, header }) => {
    await page.goto('/');
    await expect(header.logo).toBeVisible();
    await expect(header.nav.getByRole('link')).toHaveCount(8);
    await expect(header.languageButton).toBeVisible();
    await expect(header.themeToggle).toBeVisible();
  });

  test('S-04 Every header nav item opens its page', async ({ page, header }) => {
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
    for (const item of items) {
      await header.navLink(item.name).click();
      await expect(page).toHaveURL(item.url);
      await expect(page.locator('.vp-doc h1')).toBeVisible();
    }
  });

  test('S-05 Language switch on the streams list keeps the page', async ({ page, header, streamsList }) => {
    await streamsList.goto();
    await header.switchLanguage('English');
    await expect(page).toHaveURL(/\/en\/streams\/$/);
  });

  test('S-06 Streams list shows the newest stream first', async ({ streamsList }) => {
    await streamsList.goto();
    const numbers = await streamsList.streamNumbers();
    expect(numbers.length).toBeGreaterThan(0);
    expect(numbers[0]).toBe(Math.max(...numbers));
  });

  test('S-07 Newest stream page shows title, date, cover and YouTube link', async ({ streamsList, streamPage }) => {
    await streamsList.goto();
    await streamsList.openNewest();
    await expect(streamPage.heading).toContainText('#');
    await expect(streamPage.content).toContainText('Дата:');
    await expect(streamPage.cover).toBeVisible();
    // toBeVisible() waits for the <img> element, not for the ~2 MB file behind it,
    // so poll until the browser has actually decoded the image.
    await expect.poll(() => streamPage.isCoverLoaded(), { timeout: 15_000 }).toBe(true);
    await expect(streamPage.youtubeLinks.first()).toBeVisible();
  });

  test('S-08 Speakers list and a speaker profile load', async ({ page, speakerPage }) => {
    await page.goto('/speakers');
    await expect(page.locator('.vp-doc h1')).toHaveText(/Спікери/);
    await page.locator('.vp-doc a[href^="/speakers/"]').first().click();
    await expect(page).toHaveURL(/\/speakers\/[a-z-]+(\.html)?$/);
    await expect(speakerPage.heading).toBeVisible();
  });

  test('S-09 Wiki page has a sidebar with 4 documents', async ({ page }) => {
    await page.goto('/wiki/mission');
    await expect(page.locator('.VPSidebar').getByRole('link')).toHaveCount(4);
  });

  test('S-10 Logo returns to the home page', async ({ page, header }) => {
    await page.goto('/wiki/mission');
    await header.logo.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('S-11 Theme toggle switches light and dark', async ({ page, header }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);
    await header.themeToggle.click();
    await expect(html).toHaveClass(/dark/);
    await header.themeToggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test('S-12 Mobile: hamburger menu opens with the nav items @mobile', async ({ page, mobileMenu }) => {
    await page.goto('/');
    await mobileMenu.open();
    await expect(mobileMenu.screen).toBeVisible();
    await expect(mobileMenu.links).toHaveCount(8);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(page.viewportSize()!.width);
  });

  test('S-13 Unknown URL returns a 404 page with a home link', async ({ page, notFound }) => {
    const response = await page.goto('/does-not-exist');
    expect(response?.status()).toBe(404);
    await notFound.homeLink.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('S-14 No console errors on the home page and the newest stream page', async ({ page, streamsList }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto('/');
    await streamsList.goto();
    await streamsList.openNewest();
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
