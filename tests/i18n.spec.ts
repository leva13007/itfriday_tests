import { test, expect, type Page } from '@playwright/test';

/**
 * Internationalisation test cases (docs/test-cases/TC-I18N-*.md), automated.
 * Each test title starts with the TC ID.
 *
 * TC-I18N-005 (UA/EN parity of every page) needs the full page list and is
 * automated in phase 4 together with the other data-driven checks.
 */

async function switchLanguage(page: Page, language: 'English' | 'Українська') {
  await page.getByRole('button', { name: 'Change language' }).click();
  await page.locator('.VPNavBarTranslations').getByRole('link', { name: language }).click();
}

const pageTypes = [
  { id: 'TC-I18N-001', label: 'home page', ua: '/', en: '/en/', uaUrl: /itfriday\.community\/$/, enUrl: /\/en\/$/ },
  { id: 'TC-I18N-002', label: 'streams list', ua: '/streams/', en: '/en/streams/', uaUrl: /\/streams\/$/, enUrl: /\/en\/streams\/$/ },
  { id: 'TC-I18N-003', label: 'stream page', ua: '/streams/022', en: '/en/streams/022', uaUrl: /\/streams\/022(\.html)?$/, enUrl: /\/en\/streams\/022(\.html)?$/ },
  { id: 'TC-I18N-004', label: 'wiki page', ua: '/wiki/values', en: '/en/wiki/values', uaUrl: /\/wiki\/values(\.html)?$/, enUrl: /\/en\/wiki\/values(\.html)?$/ },
];

for (const type of pageTypes) {
  test(`${type.id} Language switch UA → EN keeps the user on the same ${type.label}`, async ({ page }) => {
    await page.goto(type.ua);
    await switchLanguage(page, 'English');
    await expect(page).toHaveURL(type.enUrl);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');

    await switchLanguage(page, 'Українська');
    await expect(page).toHaveURL(type.uaUrl);
    await expect(page.locator('html')).toHaveAttribute('lang', 'uk-UA');
  });
}

test('TC-I18N-006 Interface texts on UA pages are in Ukrainian', async ({ page }) => {
  // Known bug: the UA locale has no translations for the theme's interface texts.
  // test.fail() keeps the run green while the bug is open, and turns red as soon as
  // the bug is fixed, as a reminder to remove this line.
  test.info().annotations.push({ type: 'issue', description: 'BUG-002' });
  test.fail();

  await page.goto('/wiki/values');
  const englishTexts = ['Skip to content', 'On this page', 'Previous page', 'Next page'];
  for (const text of englishTexts) {
    await expect(page.getByText(text, { exact: true })).toHaveCount(0);
  }
  await expect(page.getByRole('button', { name: 'Change language' })).toHaveCount(0);
});
