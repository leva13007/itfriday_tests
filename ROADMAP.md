# Roadmap

Where the project is going and in what order. Each phase ends with a clear **definition of done**. A phase starts only when the previous one is done.

**Current phase: 2, Manual execution** (phase 1 completed 2026-10-07)

| Phase | Goal | Status |
|---|---|---|
| 0. Init | Repo, structure, templates | ✅ done |
| 1. Test documentation | Full QA documentation set, written before any execution | ✅ done |
| 2. Manual execution | Run the TCs and exploratory sessions, file real bugs, write report #1 | 🟡 next |
| 3. Automation basics | Playwright + TypeScript, smoke and navigation TCs automated | ⏳ planned |
| 4. Automation coverage | Links, visual, SEO, a11y, performance, refactor to Page Object Model | ⏳ planned |
| 5. CI and reporting | Scheduled runs, public report | 💭 to decide |
| 6. Polish and publish | Final README, results overview, public repo | ⏳ planned |

---

## Phase 0: Init ✅

- [x] Git repo, `.gitignore`
- [x] `README.md`, `CLAUDE.md`, `ROADMAP.md`
- [x] Docs structure: strategy, plan, requirements, traceability, reports
- [x] Templates: test case, exploratory session, test summary report, bug report
- [x] First test case `TC-NAV-001`

## Phase 1: Test documentation ✅

Goal: a complete, reviewed set of test docs, ready to execute.

- [x] **1.1 Requirements.** Verify `requirements.md` against the live site, resolve the open questions, freeze the REQ list *(v1.0 frozen 2026-10-07)*
- [x] **1.2 Test strategy.** Fill every section of `01-test-strategy.md` *(v1.0, 2026-10-07)*
- [x] **1.3 Test plan.** Fill `02-test-plan.md`: browsers/devices, entry/exit criteria, order of execution, risks *(cycle 1 plan v1.0, 2026-10-07)*
- [x] **1.4 Checklists.** Write `smoke.md`, `cross-browser.md`, `links.md`, `a11y.md`, `seo.md` *(v1.0, 2026-10-07)*
- [x] **1.5 Test cases.** At least one TC for every High and Medium REQ, with the `Automation` field set *(40 TCs covering all 17 REQs, 2026-10-07)*
- [x] **1.6 Traceability.** Matrix is complete, no High REQ left with ❌
- [x] **1.7 Review.** Review all docs for consistency with the requirements, fixes applied *([review](docs/reviews/2026-10-07-phase-1-docs-review.md): 9 findings, 8 fixed)*

**Done when:** every REQ has coverage planned (TC or checklist), and the docs are reviewed.

## Phase 2: Manual execution 🟡

Goal: prove the docs work on the real site and find real bugs.

- [x] Run the smoke checklist *([2026-10-07, C1](docs/checklists/runs/2026-10-07-smoke-C1.md): 15/15, GO)*
- [x] Execute the TCs as the test plan's exit criteria require, and record results in each TC's execution history *([C1, 2026-10-07](docs/reports/cycle-1/2026-10-07-execution-C1.md): 33 pass, 4 fail, 2 blocked, 1 not run)*
- [x] Run the links, SEO and a11y checklists *(2026-10-07, [runs](docs/checklists/runs/))*
- [ ] ⏸ Run the cross-browser / mobile checklist *(on hold, see below)*
- [ ] At least 3 exploratory sessions (from the charter ideas) *(2 of 3 done 2026-10-07; session 3 needs a real iPhone, on hold)*
- [ ] File every bug as a GitHub Issue using the template; link it in the TC and the matrix *(7 bugs + 5 suggestions written in [docs/reports/cycle-1/bugs](docs/reports/cycle-1/bugs/), to be filed when the repo is on GitHub)*
- [ ] Retest fixed bugs (the site owner fixes them in the site repo)
- [ ] Write the first test summary report (`docs/reports/`)

**Done when:** the cycle 1 report is written and exit criteria are evaluated.

### ⏸ On hold: manual-only checks

These checks need a person with real devices or assistive technology, and can't be run by browser automation. They are on hold. Everything else in cycle 1 continues without them, and the summary report lists them as open.

| Check | Why it needs manual execution |
|---|---|
| Cross-browser checklist on C2 (Safari, macOS), C3 (iPhone), C4 (Android) | Real browsers / devices |
| TC-A11Y-003 and a11y checklist section B (keyboard) | Keyboard input isn't reliable in automation |
| a11y checklist section E (VoiceOver) | Screen reader on a real device |
| TC-VIS-001 (visual baseline, C1 + C3) | Full-page screenshots and a real iPhone |
| Exploratory session 3 (real iPhone) | Real device |
| SEO-C07 (Telegram link preview) | Needs a message sent from a personal account |

## Phase 3: Automation basics ⏳

Goal: first green Playwright run.

- [ ] Init Playwright + TypeScript (`package.json`, `playwright.config.ts`)
- [ ] Automate the smoke TCs, flat style (no abstractions yet)
- [ ] Automate the navigation and i18n TCs
- [ ] Each test references its TC ID (in the title or as a tag); set the TC's `Automation` to `automated`
- [ ] Desktop Chrome + mobile emulation projects
- [ ] README section: how to run the tests locally

**Done when:** smoke + navigation run green locally with `npx playwright test`.

## Phase 4: Automation coverage ⏳

- [ ] Refactor to Page Object Model (header, language switcher, page types)
- [ ] Broken link checker (internal + external, crawled from the site map)
- [ ] Visual regression with `toHaveScreenshot` (desktop + mobile, key pages)
- [ ] SEO checks (title, description, `lang`, OG tags)
- [ ] Accessibility with `@axe-core/playwright`
- [ ] Performance in automation: Lighthouse CI (`@lhci/cli`) over the key pages, median of 3 runs, compared against the cycle 1 [baseline](docs/reports/cycle-1/lighthouse/README.md). Budgets once REQ-015 gets a threshold. In phase 5 the same job runs in GitHub Actions
- [ ] Data-driven tests over all stream/speaker pages

**Done when:** every `candidate` TC is `automated` or has a written reason why not.

## Phase 5: CI and reporting 💭

Not decided yet. Tests run manually for now. Options to evaluate:

- GitHub Actions: manual trigger + cron schedule against prod
- Trigger after each site deploy (`repository_dispatch` from the site repo)
- Allure or the Playwright HTML report published to GitHub Pages
- Telegram notification on failure

## Phase 6: Polish and publish ⏳

- [ ] README results overview: what was tested, coverage, bugs found, links to the reports
- [ ] Clean up the repo history and docs, then publish on GitHub
- [ ] Optional: an IT Friday stream or video about the project

---

## Out of scope (for now)

- Load / stress testing (production only)
- Security testing
- Testing the site's source code (unit tests live in the site repo, if ever)
