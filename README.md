---
status: active
category: community
stack: Markdown, GitHub Issues, Playwright, TypeScript
---

# itfriday_testing

QA project for [itfriday.community](https://itfriday.community), the public website of the IT Friday community. It covers the whole testing cycle, from planning and test design to manual execution, bug reporting and (later) test automation with Playwright.

Every step is documented: what is tested, how, and why. The repo can be read as a complete walkthrough of testing a real website.

## system under test

| | |
|---|---|
| URL | https://itfriday.community |
| Type | Static site (VitePress), hosted on GitHub Pages |
| Languages | Ukrainian (default, `/`) and English (`/en/`) |
| Environment | Production only. No staging. |

## roadmap

Phases, milestones and the current status are in [`ROADMAP.md`](ROADMAP.md).

## results

The [quality audit](docs/audits/2026-10-quality-audit.md) summarises the state of the site: a solid site with a few rough edges, 7 bugs and 5 improvement suggestions, with an action plan.

## approach

1. **Analyse.** Map the site into testable requirements → [`docs/requirements.md`](docs/requirements.md)
2. **Plan.** Strategy and plan → [`docs/01-test-strategy.md`](docs/test-strategy.md), [`docs/02-test-plan.md`](docs/cycles/2026-10-cycle-1/test-plan.md)
3. **Design.** Test cases and checklists → [`docs/test-cases/`](docs/test-cases/), [`docs/checklists/`](docs/checklists/)
4. **Execute manually.** Scripted runs plus exploratory sessions → [`docs/exploratory/`](docs/exploratory/)
5. **Report bugs.** GitHub Issues, using the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
6. **Trace.** Requirements ↔ test cases ↔ bugs → [`docs/traceability-matrix.md`](docs/traceability-matrix.md)
7. **Summarise.** Test summary report per cycle → [`docs/reports/`](docs/cycles/)
8. **Automate.** Regression subset in Playwright + TypeScript (phases 3–4)

## test scope

- Smoke and navigation (UA/EN, header menu, language switch, sidebar, footer)
- Broken links (internal and external)
- Visual regression (desktop and mobile)
- SEO, accessibility (a11y) and performance

## running the automated tests

Requirements: [Node.js](https://nodejs.org) 22.18 or newer (scripts import TypeScript directly).

```bash
npm install                                 # install Playwright and TypeScript
npx playwright install chromium webkit      # download the test browsers (once)

npm test                                    # all tests, all projects
npm run test:smoke                          # smoke checklist only (@smoke)
npm run test:desktop                        # desktop Chrome only
npm run test:headed                         # desktop Chrome, with a visible browser window
npm run report                              # open the HTML report of the last run
npm run test:visual                         # visual regression only (@visual)
npm run test:visual:update                  # re-capture the visual baseline after an intended change
npm run lighthouse                          # Lighthouse CI, mobile: median of 3 runs, compared with the baseline
npm run lighthouse:desktop                  # the same with the desktop preset
npm run lighthouse:open                     # open the median HTML reports of the last run
npm run lighthouse:full                     # Lighthouse on EVERY page (~1 h 15 min, unattended)
npm run typecheck                           # TypeScript check without running tests
```

| Project | Device | Runs |
|---|---|---|
| `desktop-chrome` | Chrome, 1440×900 (C1) | everything except `@mobile` |
| `mobile-chrome` | Pixel 7 emulation (close to C4) | `@mobile` only |
| `mobile-safari` | iPhone 13 emulation, WebKit engine (close to C3, not a real device) | `@mobile` only |

**Lighthouse CI** (`lighthouserc.json`, `lighthouserc.desktop.json`) checks 6 key pages and prints medians against `lighthouse/baseline-*.json`. It only warns, because REQ-015 has no threshold yet. After an intended change, save a new baseline with `node scripts/lighthouse-summary.mjs mobile --save-baseline`. Note: `@lhci/cli` pulls in outdated dependencies (`npm audit` reports issues in dev dependencies only). It runs locally against public pages and isn't part of the site.

### Everyday vs. full runs

| | Everyday (after a deploy) | Full (once a cycle, monthly, or overnight) |
|---|---|---|
| Command | `npm test`, `npm run lighthouse` | `npm run lighthouse:full` (+ `:desktop`) |
| Pages | Playwright: all pages for cheap checks, representative pages for deep ones. Lighthouse: 6 key pages | Lighthouse on every page found by the crawler |
| Time | ~1 min + ~5 min | ~1 h 15 min per device |
| Needs a person | No | No: start it and leave it |

Page weight of every page (`TC-PERF-002`, part of `npm test`) bridges the two: it measures every page's images in ~30 s, so the everyday run still notices a heavy new cover between full runs. In phase 5, CI runs the everyday set on each deploy and the full set on a schedule.

### Lighthouse reports: viewing and showing their value

- **View locally:** after `npm run lighthouse`, run `npm run lighthouse:open` (or `lighthouse:desktop:open`). It opens the HTML report of the median run of each page: scores, metrics, the filmstrip of the page loading, and the list of opportunities with estimated savings.
- **Share one report:** drag its `.json` file from `lighthouse-results/` onto the [Lighthouse Viewer](https://googlechrome.github.io/lighthouse/viewer/). Anyone can then open it in a browser, with nothing installed.
- **Show the value with before / after.** Save a baseline, ship one fix, run again. The summary prints the difference per page, e.g. after optimising the cover images (SUG-003) the stream page row turns from "perf 66, LCP 11 576 ms" into the new numbers with "+N perf". One such pair of numbers explains the work better than any report.
- **Over time (phase 5):** in CI every run keeps its HTML reports as build artifacts; for history charts across runs, a Lighthouse CI server can be added later.

The full HTML reports are not committed: each run produces several MB. `lighthouse/baseline-*.json` (medians) and the summary table are what stays in git.

Tests run against the **live site**, so they are read-only and use 2 workers to keep the load low. Every test title starts with its check or test case ID (`S-07`, `TC-NAV-003`). A known open bug is marked with `test.fail()` and the bug ID, so the run stays green until the bug is fixed and then flags the test for cleanup.

## structure

```
ROADMAP.md                 # phases, milestones, status
playwright.config.ts       # base URL, projects (desktop / mobile)
lighthouserc*.json         # Lighthouse CI config (mobile / desktop)
lighthouse/                # Lighthouse baselines (medians)
scripts/                   # helper scripts (Lighthouse summary)
tests/                     # automated tests (*.spec.ts)
  pages/                   # page objects
  support/                 # site map crawler, test data loader
  fixtures.ts              # page objects as fixtures, hydration wait
test-data/                 # expected streams and speakers: the content oracle
docs/                      # see docs/README.md for the full map
  requirements.md, test-strategy.md, traceability-matrix.md
  test-cases/  checklists/  exploratory/  templates/   # living documents
  defects/                 # bug and suggestion register, across cycles
  cycles/                  # one frozen folder per test cycle
  audits/  reviews/        # quality audits, document reviews
.github/ISSUE_TEMPLATE/    # bug report and improvement suggestion templates
```

## where I left off

- **Phase 1, test documentation:** done (requirements v1.0, strategy, plan, 5 checklists, 40 test cases, traceability, review).
- **Phase 2, cycle 1 manual execution:** closed with deviations, signed off 2026-10-07. 33/37 executed test cases passed; 7 bugs and 5 suggestions ([summary report](docs/cycles/2026-10-cycle-1/README.md)). Manual-only checks carry over to the next cycle.
- **Phase 3, automation basics:** done. Playwright + TypeScript suite.
- **Phase 4, automation coverage:** done. Page Object Model; checks over every page (links, anchors, files, SEO, UA/EN parity, language switcher, data consistency). 81 Playwright tests (incl. axe accessibility, keyboard, visual regression) plus Lighthouse CI. 41 of 42 test cases automated.

## next step

Site owner: review `test-data/` (the content oracle) and mark it reviewed. Then phase 5: CI and reporting.

## resources

- Site source (public): https://github.com/leva13007/itfriday.community
- [Playwright docs](https://playwright.dev/docs/intro)
- ISTQB Foundation glossary: https://glossary.istqb.org
