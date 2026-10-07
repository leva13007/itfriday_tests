// Prints the median Lighthouse results of the last `npm run lighthouse[:desktop]` run and
// compares them with the saved baseline (lighthouse/baseline-<device>.json).
//
//   node scripts/lighthouse-summary.mjs mobile                   # compare with the baseline
//   node scripts/lighthouse-summary.mjs mobile --save-baseline   # make this run the new baseline
//   node scripts/lighthouse-summary.mjs mobile --open            # open the median HTML reports in the browser
//
// REQ-015 sets no threshold, so this only reports. Drops of 10+ points are flagged.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';

const device = process.argv[2] ?? 'mobile';
const saveBaseline = process.argv.includes('--save-baseline');
const openReports = process.argv.includes('--open');
const manifestPath = `lighthouse-results/${device}/manifest.json`;
const baselinePath = `lighthouse/baseline-${device}.json`;

if (!existsSync(manifestPath)) {
  console.error(`No results at ${manifestPath}. Run "npm run lighthouse${device === 'desktop' ? ':desktop' : ''}" first.`);
  process.exit(1);
}

// The manifest lists every run; the "representative" run per URL is the median one.
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const current = {};
const htmlReports = [];
for (const run of manifest.filter((r) => r.isRepresentativeRun)) {
  htmlReports.push(run.htmlPath);
  const report = JSON.parse(readFileSync(run.jsonPath, 'utf8'));
  const path = new URL(run.url).pathname;
  current[path] = {
    performance: Math.round(run.summary.performance * 100),
    accessibility: Math.round(run.summary.accessibility * 100),
    bestPractices: Math.round(run.summary['best-practices'] * 100),
    seo: Math.round(run.summary.seo * 100),
    lcpMs: Math.round(report.audits['largest-contentful-paint'].numericValue),
    cls: Number(report.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
    lighthouseVersion: report.lighthouseVersion,
  };
}

const baseline = existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, 'utf8')) : null;
console.log(`\nLighthouse (${device}, median of ${manifest.length / Object.keys(current).length} runs)` + (baseline ? `, compared with the baseline of ${baseline.date}` : ', no baseline yet'));
console.log('page                   perf  a11y  bp   seo  LCP ms   CLS    vs baseline');
for (const [path, r] of Object.entries(current)) {
  const b = baseline?.pages[path];
  const delta = b ? r.performance - b.performance : null;
  const note = delta === null ? '—' : `${delta >= 0 ? '+' : ''}${delta} perf${delta <= -10 ? '  ⚠ drop' : ''}`;
  console.log(`${path.padEnd(22)} ${String(r.performance).padStart(4)}  ${String(r.accessibility).padStart(4)}  ${String(r.bestPractices).padStart(3)}  ${String(r.seo).padStart(3)}  ${String(r.lcpMs).padStart(6)}  ${String(r.cls).padStart(5)}  ${note}`);
}

if (saveBaseline) {
  writeFileSync(baselinePath, JSON.stringify({ date: new Date().toISOString().slice(0, 10), device, pages: current }, null, 2) + '\n');
  console.log(`\nSaved as the new baseline: ${baselinePath}`);
}

if (openReports) {
  // The median ("representative") run of each page is the one summarised above.
  const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'explorer' : 'xdg-open';
  for (const file of htmlReports) spawn(opener, [file], { stdio: 'ignore', detached: true }).unref();
  console.log(`\nOpened ${htmlReports.length} reports.`);
} else {
  console.log(`\nFull reports: lighthouse-results/${device}/ (run with --open to view the median ones)`);
}
