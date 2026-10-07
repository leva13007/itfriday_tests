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

## approach

1. **Analyse.** Map the site into testable requirements → [`docs/requirements.md`](docs/requirements.md)
2. **Plan.** Strategy and plan → [`docs/01-test-strategy.md`](docs/01-test-strategy.md), [`docs/02-test-plan.md`](docs/02-test-plan.md)
3. **Design.** Test cases and checklists → [`docs/test-cases/`](docs/test-cases/), [`docs/checklists/`](docs/checklists/)
4. **Execute manually.** Scripted runs plus exploratory sessions → [`docs/exploratory/`](docs/exploratory/)
5. **Report bugs.** GitHub Issues, using the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
6. **Trace.** Requirements ↔ test cases ↔ bugs → [`docs/traceability-matrix.md`](docs/traceability-matrix.md)
7. **Summarise.** Test summary report per cycle → [`docs/reports/`](docs/reports/)
8. **Automate.** Regression subset in Playwright + TypeScript (phases 3–4)

## test scope

- Smoke and navigation (UA/EN, header menu, language switch, sidebar, footer)
- Broken links (internal and external)
- Visual regression (desktop and mobile)
- SEO, accessibility (a11y) and performance

## running the automated tests

Requirements: [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install                                 # install Playwright and TypeScript
npx playwright install chromium webkit      # download the test browsers (once)

npm test                                    # all tests, all projects
npm run test:smoke                          # smoke checklist only (@smoke)
npm run test:desktop                        # desktop Chrome only
npm run test:headed                         # desktop Chrome, with a visible browser window
npm run report                              # open the HTML report of the last run
npm run typecheck                           # TypeScript check without running tests
```

| Project | Device | Runs |
|---|---|---|
| `desktop-chrome` | Chrome, 1440×900 (C1) | everything except `@mobile` |
| `mobile-chrome` | Pixel 7 emulation (close to C4) | `@mobile` only |
| `mobile-safari` | iPhone 13 emulation, WebKit engine (close to C3, not a real device) | `@mobile` only |

Tests run against the **live site**, so they are read-only and use 2 workers to keep the load low. Every test title starts with its check or test case ID (`S-07`, `TC-NAV-003`). A known open bug is marked with `test.fail()` and the bug ID, so the run stays green until the bug is fixed and then flags the test for cleanup.

## structure

```
ROADMAP.md                 # phases, milestones, status
playwright.config.ts       # base URL, projects (desktop / mobile)
tests/                     # automated tests (*.spec.ts)
  pages/                   # page objects
  support/                 # site map crawler
  fixtures.ts              # page objects as fixtures, hydration wait
docs/
  requirements.md          # what the site must do (REQ-xxx)
  01-test-strategy.md      # how we test, and why
  02-test-plan.md          # what/when/who, entry/exit criteria, risks
  test-cases/              # TC-<MODULE>-<NNN>.md
  checklists/              # smoke, cross-browser, a11y, SEO
  exploratory/             # session charters + findings
  traceability-matrix.md
  reports/                 # test summary reports
  reviews/                 # document reviews (static testing)
.github/ISSUE_TEMPLATE/    # bug report template
```

## where I left off

- **Phase 1, test documentation:** done (requirements v1.0, strategy, plan, 5 checklists, 40 test cases, traceability, review).
- **Phase 2, cycle 1 manual execution:** closed with deviations, signed off 2026-10-07. 33/37 executed test cases passed; 7 bugs and 5 suggestions ([summary report](docs/reports/2026-10-07-cycle-1.md)). Manual-only checks carry over to the next cycle.
- **Phase 3, automation basics:** done. Playwright + TypeScript suite.
- **Phase 4, automation coverage (in progress):** Page Object Model; checks over every page (links, anchors, files, SEO, UA/EN parity, language switcher, data consistency). 63 tests (incl. axe accessibility and keyboard checks). 38 of 42 test cases automated.

## next step

Phase 4: visual regression with `toHaveScreenshot`, then Lighthouse CI.

## resources

- Site source (public): https://github.com/leva13007/itfriday.community
- [Playwright docs](https://playwright.dev/docs/intro)
- ISTQB Foundation glossary: https://glossary.istqb.org
