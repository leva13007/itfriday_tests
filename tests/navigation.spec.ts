import { test, expect } from './fixtures';

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

test('TC-NAV-001 Header "Стріми" link opens the streams list (UA)', async ({ page, header, streamsList }) => {
  await page.goto('/');
  await header.navLink('Стріми').click();
  await expect(page).toHaveURL(/\/streams\/$/);
  await expect(header.navLink('Стріми')).toHaveClass(/active/);
  await expect(streamsList.rows.first()).toBeVisible();
});

test('TC-NAV-002 Every header nav item opens its page (UA and EN)', async ({ page, header }) => {
  await page.goto('/');
  for (const item of navItems) {
    await header.navLink(item.ua).click();
    await expect(page).toHaveURL(urlFor(item.path));
    await expect(page.locator('.vp-doc h1')).toBeVisible();
  }

  await page.goto('/en/');
  for (const item of navItems) {
    await header.navLink(item.en).click();
    await expect(page).toHaveURL(urlFor('/en' + item.path));
    await expect(page.locator('.vp-doc h1')).toBeVisible();
  }
});

test('TC-NAV-003 Logo returns to the home page of the current language', async ({ page, header, streamPage }) => {
  await streamPage.goto('022');
  await header.logo.click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page).not.toHaveURL(/\/en\//);

  await streamPage.goto('022', 'en');
  await header.logo.click();
  await expect(page).toHaveURL(/\/en\/$/);
});

test('TC-NAV-004 Theme toggle switches between light and dark', async ({ page, header }) => {
  await page.goto('/');
  const html = page.locator('html');
  // The site shows /logo-dark.png in the light theme and /logo-light.png in the dark theme.
  await expect(html).not.toHaveClass(/dark/);
  await expect(header.visibleLogoImage).toHaveAttribute('src', '/logo-dark.png');

  await header.themeToggle.click();
  await expect(html).toHaveClass(/dark/);
  await expect(header.visibleLogoImage).toHaveAttribute('src', '/logo-light.png');

  await header.themeToggle.click();
  await expect(html).not.toHaveClass(/dark/);
  await expect(header.visibleLogoImage).toHaveAttribute('src', '/logo-dark.png');
});

test('TC-NAV-005 Theme choice persists after reload and navigation', async ({ page, header }) => {
  await page.goto('/');
  const html = page.locator('html');
  await header.themeToggle.click();
  await expect(html).toHaveClass(/dark/);

  await page.reload();
  await expect(html).toHaveClass(/dark/);

  await header.navLink('Про нас').click();
  await expect(page).toHaveURL(/\/about(\.html)?$/);
  await expect(html).toHaveClass(/dark/);
});
