import { test, expect } from '@playwright/test';

/**
 * Navigation test cases (docs/test-cases/TC-NAV-*.md), automated.
 * Each test title starts with the TC ID.
 */

const navItems = [
  { ua: 'Про нас', en: 'About', path: '/about' },
  { ua: 'Стріми', en: 'Streams', path: '/streams/' },
  { ua: 'Спікери', en: 'Speakers', path: '/speakers' },
  { ua: 'Стати спікером', en: 'Become a Speaker', path: '/speak' },
  { ua: 'Публікації', en: 'Posts', path: '/posts/' },
  { ua: 'Вікі', en: 'Wiki', path: '/wiki/mission' },
  { ua: 'Розклад', en: 'Schedule', path: '/schedule' },
  { ua: 'Issues', en: 'Issues', path: '/issues' },
];

// The site serves pages both as "/about" and "/about.html"; links use the ".html" form.
function urlFor(path: string): RegExp {
  const escaped = path.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  return path.endsWith('/') ? new RegExp(`${escaped}$`) : new RegExp(`${escaped}(\\.html)?$`);
}

test('TC-NAV-001 Header "Стріми" link opens the streams list (UA)', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main Navigation' });
  await nav.getByRole('link', { name: 'Стріми' }).click();
  await expect(page).toHaveURL(/\/streams\/$/);
  await expect(nav.getByRole('link', { name: 'Стріми' })).toHaveClass(/active/);
  await expect(page.locator('.vp-doc table tbody tr').first()).toBeVisible();
});

test('TC-NAV-002 Every header nav item opens its page (UA and EN)', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Main Navigation' });

  await page.goto('/');
  for (const item of navItems) {
    await nav.getByRole('link', { name: item.ua, exact: true }).click();
    await expect(page).toHaveURL(urlFor(item.path));
    await expect(page.locator('.vp-doc h1')).toBeVisible();
  }

  await page.goto('/en/');
  for (const item of navItems) {
    await nav.getByRole('link', { name: item.en, exact: true }).click();
    await expect(page).toHaveURL(urlFor('/en' + item.path));
    await expect(page.locator('.vp-doc h1')).toBeVisible();
  }
});

test('TC-NAV-003 Logo returns to the home page of the current language', async ({ page }) => {
  // The logo link has no accessible name (BUG-003), so it is located by its class.
  const logo = page.locator('.VPNavBarTitle a');

  await page.goto('/streams/022');
  await logo.click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page).not.toHaveURL(/\/en\//);

  await page.goto('/en/streams/022');
  await logo.click();
  await expect(page).toHaveURL(/\/en\/$/);
});

test('TC-NAV-004 Theme toggle switches between light and dark', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const toggle = page.locator('.VPNavBarAppearance').getByRole('switch');
  // The site shows /logo-dark.png in the light theme and /logo-light.png in the dark theme.
  const visibleLogo = page.locator('.VPNavBarTitle img:visible');

  await expect(html).not.toHaveClass(/dark/);
  await expect(visibleLogo).toHaveAttribute('src', '/logo-dark.png');

  await toggle.click();
  await expect(html).toHaveClass(/dark/);
  await expect(visibleLogo).toHaveAttribute('src', '/logo-light.png');

  await toggle.click();
  await expect(html).not.toHaveClass(/dark/);
  await expect(visibleLogo).toHaveAttribute('src', '/logo-dark.png');
});

test('TC-NAV-005 Theme choice persists after reload and navigation', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await page.locator('.VPNavBarAppearance').getByRole('switch').click();
  await expect(html).toHaveClass(/dark/);

  await page.reload();
  await expect(html).toHaveClass(/dark/);

  await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('link', { name: 'Про нас' }).click();
  await expect(page).toHaveURL(/\/about(\.html)?$/);
  await expect(html).toHaveClass(/dark/);
});
