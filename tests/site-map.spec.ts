import { test, expect } from './fixtures';
import { counterpart, crawlSite, internalHrefs, isEnglish, normalisePath, type SitePage } from './support/site-map';

/**
 * Checks that run over EVERY page of the site, found by crawling (see support/site-map.ts).
 * Cheap HTTP-level checks cover all pages instead of a sample: the cycle 1 report showed
 * that two of seven bugs were only found this way.
 *
 * Soft assertions (expect.soft) let one test report every failing page, not just the first.
 */

const ORIGIN = 'https://itfriday.community';

test.describe('Site map @sitemap', () => {
  let pages: SitePage[];

  test.beforeAll(async ({ playwright }) => {
    test.setTimeout(120_000);
    const request = await playwright.request.newContext({ baseURL: ORIGIN });
    pages = await crawlSite(request, ORIGIN);
  });

  const meta = (html: string, attribute: string, name: string) =>
    html.match(new RegExp(`<meta ${attribute}="${name}" content="([^"]*)"`))?.[1];

  test('Crawl finds pages in both languages', async () => {
    test.info().attach('site-map.json', { body: JSON.stringify(pages.map((p) => p.path), null, 2), contentType: 'application/json' });
    expect(pages.filter((p) => isEnglish(p.path)).length).toBeGreaterThan(10);
    expect(pages.filter((p) => !isEnglish(p.path)).length).toBeGreaterThan(10);
  });

  test('TC-LNK-001 Every page in the site map returns HTTP 200', async () => {
    for (const page of pages) {
      expect.soft(page.status, page.path).toBe(200);
    }
  });

  test('TC-I18N-005 Every UA page has an EN counterpart and vice versa', async () => {
    const paths = new Set(pages.map((p) => p.path));
    for (const page of pages) {
      expect.soft(paths.has(counterpart(page.path)), `${page.path} → ${counterpart(page.path)}`).toBe(true);
    }
  });

  test('TC-SEO-001 Every page has a unique, descriptive title', async () => {
    for (const language of ['ua', 'en'] as const) {
      const group = pages.filter((p) => isEnglish(p.path) === (language === 'en'));
      const suffix = language === 'en' ? ' | IT Friday' : " | ІТ П'ятниця";
      const titles = group.map((p) => ({ path: p.path, title: p.html.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&#39;/g, "'") ?? '' }));
      for (const { path, title } of titles) {
        expect.soft(title, `${path}: title present`).not.toBe('');
        if (path !== '/' && path !== '/en/') expect.soft(title.endsWith(suffix), `${path}: "${title}" ends with "${suffix}"`).toBe(true);
      }
      const duplicates = titles.filter((t, i) => titles.findIndex((u) => u.title === t.title) !== i);
      expect.soft(duplicates, `${language}: duplicate titles`).toEqual([]);
    }
  });

  test('TC-SEO-002 Every page has its own meta description', async () => {
    test.info().annotations.push({ type: 'issue', description: 'BUG-001' });
    test.fail();
    for (const language of ['ua', 'en'] as const) {
      const group = pages.filter((p) => isEnglish(p.path) === (language === 'en'));
      const descriptions = new Set(group.map((p) => meta(p.html, 'name', 'description')));
      expect(descriptions.size, `${language}: distinct descriptions across ${group.length} pages`).toBe(group.length);
    }
  });

  test('TC-SEO-003 Page language attribute matches the content language', async () => {
    for (const page of pages) {
      const lang = page.html.match(/<html lang="([^"]+)"/)?.[1];
      expect.soft(lang, page.path).toBe(isEnglish(page.path) ? 'en-US' : 'uk-UA');
    }
  });

  test('TC-SEO-004 Open Graph type and image are present on every page', async ({ request }) => {
    const images = new Set<string>();
    for (const page of pages) {
      expect.soft(meta(page.html, 'property', 'og:type'), `${page.path}: og:type`).toBeTruthy();
      const image = meta(page.html, 'property', 'og:image');
      expect.soft(image, `${page.path}: og:image`).toMatch(/^https:\/\//);
      if (image) images.add(image);
    }
    for (const image of images) {
      const response = await request.get(image);
      expect.soft(response.status(), image).toBe(200);
      expect.soft(response.headers()['content-type'], image).toMatch(/^image\//);
    }
  });

  test('L-C09 Every #anchor link points to an existing heading', async () => {
    const byPath = new Map(pages.map((p) => [p.path, p.html]));
    for (const page of pages) {
      for (const href of internalHrefs(page.html)) {
        const hash = href.indexOf('#');
        if (hash < 0 || href.startsWith('http')) continue;
        const fragment = decodeURIComponent(href.slice(hash + 1));
        if (!fragment) continue;
        const target = hash === 0 ? page.path : normalisePath(href.slice(0, hash), page.path, ORIGIN);
        const html = target && byPath.get(target);
        if (!html) continue;
        expect.soft(html.includes(`id="${fragment}"`), `${page.path} → ${href}`).toBe(true);
      }
    }
  });

  test('L-C10 Every linked image, slide and PDF file responds', async ({ request }) => {
    const files = new Set<string>();
    for (const page of pages) {
      const sources = [...page.html.matchAll(/<img\s[^>]*src="([^"]+)"/g)].map((m) => m[1]);
      for (const href of [...internalHrefs(page.html), ...sources]) {
        const url = new URL(href, ORIGIN + page.path);
        if (url.origin === ORIGIN && normalisePath(href, page.path, ORIGIN) === null) files.add(url.pathname);
      }
    }
    expect(files.size).toBeGreaterThan(0);
    for (const file of files) {
      const response = await request.head(file);
      expect.soft(response.status(), file).toBe(200);
    }
  });

  test('L-C12 No links use a scheme that browsers block (e.g. chrome://)', async () => {
    test.info().annotations.push({ type: 'issue', description: 'BUG-005' });
    test.fail();
    const blocked = pages.flatMap((page) =>
      internalHrefs(page.html)
        .filter((href) => /^[a-z][a-z0-9+.-]*:/i.test(href) && !/^(https?|mailto|tel):/i.test(href))
        .map((href) => `${page.path} → ${href}`),
    );
    expect(blocked).toEqual([]);
  });

  test('TC-I18N-007 Language switcher points to the counterpart on every page', async ({ page }) => {
    test.setTimeout(180_000);
    for (const { path } of pages) {
      await page.goto(path);
      // The switcher's links are rendered in the browser (not in the static HTML), hidden until opened.
      const href = await page.locator('.VPNavBarTranslations a').first().getAttribute('href');
      const target = href ? normalisePath(href, path, ORIGIN) : null;
      expect.soft(target, path).toBe(counterpart(path));
    }
  });
});
