import type { APIRequestContext } from '@playwright/test';

/**
 * Builds the list of all pages by crawling the live site, starting from both home pages
 * and following internal links. This way new pages (a new stream every week) are picked up
 * automatically, without a hard-coded list that goes stale.
 *
 * Paths are normalised: "/streams/022.html" → "/streams/022", "/streams/index" → "/streams/".
 */

export type SitePage = {
  path: string;
  status: number;
  html: string;
};

const START_PATHS = ['/', '/en/'];
// Files linked from pages that are not pages themselves (slides, PDFs, images).
const ASSET = /\.(pdf|png|jpe?g|gif|svg|webp|ico|css|js|json|xml|txt|zip)$/i;
// HTML slide decks under /materials/ and /streams/NNN-*-slides.html are standalone files, not site pages.
const STANDALONE_HTML = /^\/(materials\/|streams\/\d{3}-.+-slides)/;

let cache: Promise<SitePage[]> | undefined;

export function normalisePath(href: string, from: string, origin: string): string | null {
  let url: URL;
  try {
    url = new URL(href, origin + from);
  } catch {
    return null;
  }
  if (url.origin !== origin) return null;
  let path = decodeURI(url.pathname);
  if (ASSET.test(path) || STANDALONE_HTML.test(path)) return null;
  path = path.replace(/\.html$/, '').replace(/\/index$/, '/');
  return path || '/';
}

export function internalHrefs(html: string): string[] {
  return [...html.matchAll(/<a\s[^>]*href="([^"]+)"/g)].map((match) => match[1].replace(/&amp;/g, '&'));
}

export function crawlSite(request: APIRequestContext, origin: string): Promise<SitePage[]> {
  cache ??= (async () => {
    const queue = [...START_PATHS];
    const seen = new Set(queue);
    const pages: SitePage[] = [];
    while (queue.length) {
      const path = queue.shift()!;
      const response = await request.get(path);
      const html = response.ok() ? await response.text() : '';
      pages.push({ path, status: response.status(), html });
      for (const href of internalHrefs(html)) {
        const next = normalisePath(href, path, origin);
        if (next && !seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
      }
      // Be gentle with the production site.
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return pages.sort((a, b) => a.path.localeCompare(b.path));
  })();
  return cache;
}

export const isEnglish = (path: string) => path === '/en/' || path.startsWith('/en/');

/** "/en/streams/022" → "/streams/022", "/streams/022" → "/en/streams/022". */
export function counterpart(path: string): string {
  if (isEnglish(path)) return path.slice(3) || '/';
  return path === '/' ? '/en/' : '/en' + path;
}
