import { test, expect } from './fixtures';
import type { Page } from '@playwright/test';

/**
 * Visual regression (TC-VIS-001 / TC-VIS-002).
 *
 * The first run with `npm run test:visual:update` captures the baseline (TC-VIS-001);
 * every later run compares against it (TC-VIS-002). Baselines live next to this file in
 * visual.spec.ts-snapshots/ and are committed.
 *
 * Tables that grow every week (streams list, a speaker's streams) are cut to their first 3 rows
 * and masked, so the page height doesn't change when a stream is added. The newest stream page
 * is not used: stream #001 stands in for the stream page type.
 * Baselines depend on the OS and browser build; CI on Linux will need its own set (phase 5).
 */

const pages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'streams-list', path: '/streams/', growingTable: true },
  { name: 'stream-001', path: '/streams/001' },
  { name: 'speaker', path: '/speakers/oleh-levchenko', growingTable: true },
  { name: 'post', path: '/posts/2026-06-22-web-push-api' },
  { name: 'wiki', path: '/wiki/mission' },
  { name: 'speak', path: '/speak' },
  { name: 'not-found', path: '/does-not-exist' },
];

const GROWING_TABLE_CSS = '.vp-doc table tbody tr:nth-child(n+4) { display: none !important; }';

/** Wait until web fonts and every image on the page are loaded, so the screenshot is final. */
async function waitForPageToSettle(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const images = [...document.images];
    images.forEach((img) => (img.loading = 'eager'));
    await Promise.all(images.map((img) => (img.complete ? null : new Promise((resolve) => img.addEventListener('load', resolve, { once: true })))));
  });
}

test.describe('Visual @visual', () => {
  for (const { name, path, growingTable } of pages) {
    test(`TC-VIS-002 ${name} matches the visual baseline`, async ({ page }) => {
      await page.goto(path);
      if (growingTable) await page.addStyleTag({ content: GROWING_TABLE_CSS });
      await waitForPageToSettle(page);
      await expect(page).toHaveScreenshot(`${name}.png`, {
        fullPage: true,
        animations: 'disabled',
        mask: growingTable ? [page.locator('.vp-doc table tbody')] : [],
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});

test.describe('Visual mobile @visual @mobile', () => {
  // One mobile engine is enough for screenshots: WebKit (iPhone) differs most from desktop Chrome.
  test.skip(({ browserName }) => browserName !== 'webkit', 'mobile screenshots run on mobile-safari only');

  for (const { name, path, growingTable } of pages) {
    test(`TC-VIS-002 ${name} (mobile) matches the visual baseline`, async ({ page }) => {
      await page.goto(path);
      if (growingTable) await page.addStyleTag({ content: GROWING_TABLE_CSS });
      await waitForPageToSettle(page);
      await expect(page).toHaveScreenshot(`${name}-mobile.png`, {
        fullPage: true,
        animations: 'disabled',
        mask: growingTable ? [page.locator('.vp-doc table tbody')] : [],
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});
