import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';
import { representativePages } from './support/representative-pages';

/**
 * Accessibility test cases (docs/test-cases/TC-A11Y-*.md), automated.
 * Each test title starts with the TC ID.
 */

/**
 * Known open accessibility bugs, excluded from the axe scan so the scan still catches
 * NEW serious issues while these are being fixed. Remove an entry when its bug is fixed.
 * The bugs themselves are still tested: BUG-003 by TC-A11Y-004, BUG-004 by TC-A11Y-005 below.
 */
const KNOWN_ISSUES = {
  // BUG-003: the logo link has no accessible name.
  logoLink: '.VPNavBarTitle a',
  // BUG-004: low contrast of syntax highlighting and language labels in code blocks.
  codeBlocks: 'div[class*="language-"]',
  // BUG-004: "YouTube Live →" button text is 4.48:1 in the light theme.
  heroBrandButton: '.VPHero .VPButton.brand',
};

for (const theme of ['light', 'dark'] as const) {
  test(`TC-A11Y-001 Representative pages have no critical or serious axe violations (${theme} theme)`, async ({ page }) => {
    test.info().annotations.push({ type: 'known issues excluded', description: 'BUG-003, BUG-004' });
    test.setTimeout(120_000);
    await page.emulateMedia({ colorScheme: theme });

    for (const { name, path } of representativePages) {
      await page.goto(path);
      const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']);
      // One exclude() call per selector: an array would be read as a single shadow-DOM path.
      for (const selector of Object.values(KNOWN_ISSUES)) axe.exclude(selector);
      const results = await axe.analyze();
      const blocking = results.violations
        .filter((v) => v.impact === 'critical' || v.impact === 'serious')
        .map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
      expect.soft(blocking, `${name} ${path}`).toEqual([]);
    }
  });
}

test('TC-A11Y-002 Skip link moves focus to the main content', async ({ page }) => {
  await page.goto('/streams/022');
  await page.keyboard.press('Tab');
  const skipLink = page.locator('.VPSkipLink');
  await expect(skipLink).toBeFocused();
  // The link is visually hidden until it gets focus.
  const box = await skipLink.boundingBox();
  expect(box && box.width > 1 && box.height > 1).toBe(true);

  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  const focusedInContent = await page.evaluate(() => !!document.activeElement?.closest('#VPContent'));
  const focusedInHeader = await page.evaluate(() => !!document.activeElement?.closest('.VPNav'));
  expect(focusedInContent).toBe(true);
  expect(focusedInHeader).toBe(false);
});

test('TC-A11Y-003 Header is fully operable with the keyboard', async ({ page, header }) => {
  await page.goto('/');

  // Tab through the header and record what gets focus, in order.
  const focusOrder: string[] = [];
  for (let i = 0; i < 16; i++) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const style = getComputedStyle(el);
      return {
        name: el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent?.trim() || el.className,
        inHeader: !!el.closest('.VPNav'),
        visibleFocus: style.outlineStyle !== 'none' || style.boxShadow !== 'none',
      };
    });
    if (focused.inHeader) {
      focusOrder.push(focused.name);
      expect.soft(focused.visibleFocus, `focus indicator on "${focused.name}"`).toBe(true);
    }
  }
  test.info().attach('header-focus-order.json', { body: JSON.stringify(focusOrder, null, 2), contentType: 'application/json' });
  const expectedOrder = ['Про нас', 'Стріми', 'Спікери', 'Стати спікером', 'Публікації', 'Вікі', 'Розклад', 'Issues', 'Change language'];
  const navIndices = expectedOrder.map((name) => focusOrder.indexOf(name));
  expect(navIndices.every((index) => index >= 0), `all of ${expectedOrder.join(', ')} reachable`).toBe(true);
  expect(navIndices, 'visual order').toEqual([...navIndices].sort((a, b) => a - b));

  // Language switcher: open with Enter, move to "English", activate it.
  await header.languageButton.focus();
  await page.keyboard.press('Enter');
  const english = page.locator('.VPNavBarTranslations').getByRole('link', { name: 'English' });
  await expect(english).toBeVisible();
  await english.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/en\/$/);

  // Theme toggle: Space switches the theme.
  await header.themeToggle.focus();
  await page.keyboard.press('Space');
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('TC-A11Y-004 Images have a text alternative', async ({ page }) => {
  test.info().annotations.push({ type: 'issue', description: 'BUG-003' });
  test.fail();
  const problems: string[] = [];
  for (const path of ['/', '/speakers', '/speakers/serhii-lytvyn', '/streams/022']) {
    await page.goto(path);
    const found = await page.locator('img').evaluateAll((imgs) =>
      imgs.flatMap((img) => {
        const src = img.getAttribute('src');
        if (!img.hasAttribute('alt')) return [`${src}: no alt`];
        // An image that is the only content of a link names that link, so its alt must not be empty.
        const link = img.closest('a');
        const linkHasOtherName = !!link && (link.getAttribute('aria-label') || link.textContent?.trim());
        if (link && !linkHasOtherName && !img.getAttribute('alt')) return [`${src}: empty alt inside a link without a name`];
        return [];
      }),
    );
    problems.push(...[...new Set(found)].map((problem) => `${path}: ${problem}`));
  }
  expect(problems).toEqual([]);
});

test('TC-A11Y-005 Text has sufficient colour contrast in code blocks and the hero button', async ({ page }) => {
  test.info().annotations.push({ type: 'issue', description: 'BUG-004' });
  test.fail();
  // The pages and themes where BUG-004 was found. No exclusions: this test is about exactly those elements.
  const scans = [
    { path: '/', theme: 'light' },
    { path: '/posts/2026-06-22-web-push-api', theme: 'light' },
    { path: '/posts/2026-06-22-web-push-api', theme: 'dark' },
  ] as const;

  for (const { path, theme } of scans) {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
    const lowContrast = results.violations.flatMap((v) => v.nodes.map((n) => n.target.join(' ')));
    expect.soft(lowContrast, `${path} (${theme} theme)`).toEqual([]);
  }
});
