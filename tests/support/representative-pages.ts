/**
 * Representative pages: one per page type (docs/cycles/2026-10-cycle-1/test-plan.md §4.1).
 * Deep checks (accessibility, layout, screenshots) run on these instead of all 82 pages.
 * "newest" is the newest stream; update it when a new stream is published,
 * or the visual baseline for it will change anyway.
 */
export const representativePages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'streams-list', path: '/streams/' },
  { name: 'stream-newest', path: '/streams/022' },
  { name: 'stream-oldest', path: '/streams/001' },
  { name: 'speaker', path: '/speakers/oleh-levchenko' },
  { name: 'post', path: '/posts/2026-06-22-web-push-api' },
  { name: 'wiki', path: '/wiki/mission' },
  { name: 'speak', path: '/speak' },
] as const;

/** The same pages in English. */
export const representativePagesEn = representativePages.map((p) => ({
  name: `en-${p.name}`,
  path: p.path === '/' ? '/en/' : `/en${p.path}`,
}));
