import { test, expect } from './fixtures';
import { crawlSite } from './support/site-map';

/**
 * TC-PERF-002: page and image weight of EVERY page, measured over HTTP (no browser, ~30 s).
 *
 * Lighthouse runs on a few key pages only (it's slow); this check covers all pages cheaply and
 * targets the root cause Lighthouse found: oversized images. It measures and reports; it does not
 * fail on weight, because REQ-015 has no threshold yet. Images over IMAGE_WARNING_KB get a warning.
 *
 * The report is attached to the test: open it with `npm run report` → this test → Attachments.
 */

const ORIGIN = 'https://itfriday.community';
const IMAGE_WARNING_KB = 500;

const kb = (bytes: number) => Math.round(bytes / 1024);

test('TC-PERF-002 Page and image weight is recorded for every page @sitemap', async ({ playwright }) => {
  test.setTimeout(180_000);
  const request = await playwright.request.newContext({ baseURL: ORIGIN });
  const pages = await crawlSite(request, ORIGIN);

  // HEAD each distinct file once: images repeat across pages (logos), assets are shared by all pages.
  const sizes = new Map<string, number>();
  async function sizeOf(path: string): Promise<number> {
    if (!sizes.has(path)) {
      const response = await request.head(path);
      expect.soft(response.status(), `${path} responds`).toBe(200);
      sizes.set(path, Number(response.headers()['content-length'] ?? 0));
    }
    return sizes.get(path)!;
  }

  // Shared assets (CSS, JS, fonts) are the same on every page and cached after the first one.
  const home = pages.find((p) => p.path === '/')!;
  const assets = [...new Set([...home.html.matchAll(/(?:href|src)="(\/assets\/[^"]+)"/g)].map((m) => m[1]))];
  let sharedBytes = 0;
  for (const asset of assets) sharedBytes += await sizeOf(asset);

  const rows: { path: string; htmlKb: number; images: number; imagesKb: number; largest: string; largestKb: number }[] = [];
  for (const page of pages) {
    const sources = [...new Set([...page.html.matchAll(/<img\s[^>]*src="([^"]+)"/g)].map((m) => new URL(m[1], ORIGIN + page.path).pathname))];
    let imageBytes = 0;
    let largest = { path: '—', bytes: 0 };
    for (const source of sources) {
      const bytes = await sizeOf(source);
      imageBytes += bytes;
      if (bytes > largest.bytes) largest = { path: source, bytes };
    }
    rows.push({
      path: page.path,
      htmlKb: kb(Buffer.byteLength(page.html)),
      images: sources.length,
      imagesKb: kb(imageBytes),
      largest: largest.path,
      largestKb: kb(largest.bytes),
    });
  }

  rows.sort((a, b) => b.imagesKb + b.htmlKb - (a.imagesKb + a.htmlKb));
  const heavyImages = [...sizes].filter(([path, bytes]) => !path.startsWith('/assets/') && kb(bytes) > IMAGE_WARNING_KB);
  for (const [path, bytes] of heavyImages) {
    test.info().annotations.push({ type: 'warning', description: `${path}: ${kb(bytes)} KB (over ${IMAGE_WARNING_KB} KB, see SUG-003)` });
  }

  const table = [
    `Shared CSS/JS/fonts on every page: ${kb(sharedBytes)} KB (${assets.length} files, cached after the first page)`,
    `Images over ${IMAGE_WARNING_KB} KB: ${heavyImages.length} of ${[...sizes.keys()].filter((p) => !p.startsWith('/assets/')).length}`,
    '',
    '| Page | HTML KB | Images | Images KB | Largest image | KB |',
    '|---|---|---|---|---|---|',
    ...rows.map((r) => `| ${r.path} | ${r.htmlKb} | ${r.images} | ${r.imagesKb} | ${r.largest} | ${r.largestKb} |`),
  ].join('\n');
  await test.info().attach('page-weight.md', { body: table, contentType: 'text/markdown' });
  await test.info().attach('page-weight.json', { body: JSON.stringify({ sharedBytes, pages: rows }, null, 2), contentType: 'application/json' });

  expect(rows.length).toBe(pages.length);
});
