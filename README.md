---
status: active
category: community
stack: Markdown, GitHub Issues, Playwright, TypeScript
---

# itfriday_testing

QA project for [itfriday.community](https://itfriday.community), the public website of the IT Friday community. It covers the whole testing cycle, from planning and test design to manual execution, bug reporting and (later) test automation with Playwright.

It is built as a **portfolio project for a junior QA engineer**: it shows the process, not just test code.

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
.github/ISSUE_TEMPLATE/    # bug report template
```

## where I left off

Project initialised on 2026-10-07: repo, docs skeleton, templates, one example TC, a first draft of the site map in `requirements.md`, and `ROADMAP.md`. Now in phase 1 (test documentation). No test code yet.

## next step

Review `docs/requirements.md` against the live site and finalise the REQ list (ROADMAP 1.1).

## resources

- Site source: https://github.com/leva13007/itfriday.community
- [Playwright docs](https://playwright.dev/docs/intro)
- ISTQB Foundation glossary: https://glossary.istqb.org
