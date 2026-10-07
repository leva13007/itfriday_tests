// Full Lighthouse run over EVERY page of the site, for occasional deep checks
// (once a cycle, monthly, or overnight). The routine `npm run lighthouse` covers 6 key pages.
//
//   npm run lighthouse:full                         # all pages, mobile, 3 runs each (~40 min)
//   npm run lighthouse:full -- --lang ua            # Ukrainian pages only (half the time)
//   npm run lighthouse:full -- --runs 1 --limit 5   # quick try-out
//   npm run lighthouse:full:desktop                 # the same with the desktop preset
//
// The page list comes from the same crawler the tests use (tests/support/site-map.ts),
// so new pages are picked up without editing anything. Results: lighthouse-results/full-<device>/,
// summarised worst-first at the end. Leave it running unattended; it needs no input.
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { crawlSite, isEnglish } from '../tests/support/site-map.ts';

const ORIGIN = 'https://itfriday.community';
const arg = (name, fallback) => {
  const index = process.argv.indexOf(`--${name}`);
  return index > -1 ? process.argv[index + 1] : fallback;
};
const device = arg('device', 'mobile');
const runs = Number(arg('runs', 3));
const lang = arg('lang', 'all');
const limit = Number(arg('limit', Infinity));

// The crawler expects Playwright's request API; a thin adapter over fetch is enough here.
const request = {
  get: async (path) => {
    const response = await fetch(ORIGIN + path);
    return { ok: () => response.ok, status: () => response.status, text: () => response.text() };
  },
};

const pages = (await crawlSite(request, ORIGIN))
  .filter((page) => page.status === 200)
  .filter((page) => lang === 'all' || (lang === 'en') === isEnglish(page.path))
  .slice(0, limit);

// ~10 s per Lighthouse run on the site's pages (measured: 82 pages × 3 runs took 41 min).
const minutes = Math.ceil((pages.length * runs * 10) / 60);
console.log(`Lighthouse full run: ${pages.length} pages × ${runs} runs, ${device}. Expect about ${minutes} min.`);

const name = `full-${device}`;
const outputDir = `lighthouse-results/${name}`;
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });
const configPath = `${outputDir}/lighthouserc.generated.json`;
writeFileSync(
  configPath,
  JSON.stringify(
    {
      ci: {
        collect: {
          url: pages.map((page) => ORIGIN + page.path),
          numberOfRuns: runs,
          settings: { chromeFlags: '--headless=new', ...(device === 'desktop' ? { preset: 'desktop' } : {}) },
        },
        upload: { target: 'filesystem', outputDir },
      },
    },
    null,
    2,
  ),
);

const started = Date.now();
const lhci = spawnSync('npx', ['lhci', 'collect', `--config=${configPath}`], { stdio: 'inherit' });
if (lhci.status !== 0) process.exit(lhci.status ?? 1);
spawnSync('npx', ['lhci', 'upload', `--config=${configPath}`], { stdio: 'inherit' });
console.log(`Finished in ${Math.round((Date.now() - started) / 60000)} min.`);
spawnSync('node', ['scripts/lighthouse-summary.mjs', name, '--worst-first'], { stdio: 'inherit' });
