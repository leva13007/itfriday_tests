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

## structure

```
ROADMAP.md                 # phases, milestones, status
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

Phase 1 (test documentation) completed on 2026-10-07: requirements v1.0, test strategy, cycle 1 test plan, 5 checklists, 40 test cases, a full traceability matrix, and a document review (9 findings, 8 fixed). All 82 live pages returned 200 on the last check. Phase 2 started: entry gate passed for C1 (C2/C3 still to confirm), smoke run on C1 passed 15/15 (GO), 40 test cases executed on C1: 32 pass, 4 fail, 2 blocked, 2 not run. Links, SEO and a11y checklists done. 5 bugs (1 Major, 3 Minor, 1 Trivial) and 3 improvement suggestions. Lighthouse baseline recorded. No test code yet.

## next step

Run the cross-browser checklist on C2 Safari and C3 iPhone, and the manual-only checks (keyboard, VoiceOver, visual baseline).

## resources

- Site source: https://github.com/leva13007/itfriday.community
- [Playwright docs](https://playwright.dev/docs/intro)
- ISTQB Foundation glossary: https://glossary.istqb.org
