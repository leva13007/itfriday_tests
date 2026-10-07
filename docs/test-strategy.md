# Test Strategy

The high-level "how and why" of testing itfriday.community. It changes rarely. The concrete "what, when and on which browsers" for a single cycle lives in the [test plan](cycles/2026-10-cycle-1/test-plan.md).

| | |
|---|---|
| Version | 1.0 |
| Date | 2026-10-07 |
| Related | [Requirements v1.0](requirements.md), [Test Plan](cycles/2026-10-cycle-1/test-plan.md), [Roadmap](../ROADMAP.md) |

## 1. Purpose and context

[itfriday.community](https://itfriday.community) is the public website of IT Friday, an online community for IT professionals that runs a weekly live stream. The site is the community's "front door". People use it to find out what the community is, browse past streams and speakers, check the schedule and apply to speak. It is published in two languages: Ukrainian (default) and English.

Technically it is a static site built with VitePress and deployed to GitHub Pages by GitHub Actions on every push to the site's `main` branch. There is no backend, database, login or user input on the site itself.

Testing matters because:

- **Content changes every week.** A new stream page is added before each Friday stream, so links, lists and translations break easily.
- **There is no staging.** Every change goes straight to production, so production is where defects are found.
- **First impressions.** Speakers and new members judge the community by this site. A broken link or an untranslated page hurts credibility more than it would on an internal tool.

## 2. Quality goals

Ordered by importance:

1. **Available.** Every published page loads (REQ-001, REQ-017).
2. **Navigable.** Menus, logo, sidebar and in-content links take the user where they expect (REQ-002, REQ-005, REQ-006, REQ-007, REQ-016).
3. **Bilingual.** Both language versions are complete, and switching language keeps the user on the same page (REQ-003, REQ-004).
4. **Works on mobile.** Many visitors come from a phone, via Telegram or YouTube links (REQ-010).
5. **Visually stable.** Releases don't break the layout by accident (REQ-009, REQ-011).
6. **Findable and accessible.** Correct metadata for search engines and link previews, and usable with a keyboard and a screen reader (REQ-012, REQ-013, REQ-014).
7. **Reasonably fast.** Tracked as a baseline, not enforced (REQ-015).

## 3. Test levels and types

The site has no application code of its own (VitePress renders Markdown), so unit and integration testing belong to VitePress itself. This project tests at the **system level**, as a black box, through the browser and HTTP, the way a visitor uses the site.

| Type | In scope? | How | Why |
|---|---|---|---|
| Smoke | Yes | Checklist, run after every site deploy | Fast signal that the site is alive after weekly changes |
| Functional (navigation, i18n) | Yes | Test cases | Core user journeys; highest impact if broken |
| Link checking | Yes | Checklist manually, automated crawler later | Links are the most frequently broken thing on content sites |
| Visual regression | Yes | Manual comparison first, Playwright screenshots later | Layout breaks aren't caught by functional checks |
| Cross-browser / responsive | Yes | Checklist on Chrome and Safari, desktop and mobile | Safari (WebKit) renders differently from Chrome; mobile is a large share of traffic |
| Accessibility | Yes | Checklist + axe DevTools, automated axe later | Legal and ethical baseline; the site should be usable by everyone |
| SEO | Yes | Checklist (view source / DevTools) | Affects discoverability and link previews in Telegram and LinkedIn |
| Performance | Yes (baseline) | Lighthouse on 6 key pages routinely, on every page in occasional full runs; page and image weight of every page in each test run | Static site, so it is expected to be fast. We watch for regressions without a hard target |
| Exploratory | Yes | Time-boxed sessions with charters | Finds what scripted tests don't anticipate |
| Load / stress | **No** | — | Production only: we must not put load on the live site, and GitHub Pages capacity isn't ours to test |
| Security | **No** | — | Static site, no user input or auth. The attack surface belongs to GitHub Pages |
| Content proofreading | **No** | — | Wording and translation quality are the content author's responsibility. Missing translations *are* in scope (REQ-004) |

## 4. Approach: manual → automation

Testing follows a deliberate order. Each step feeds the next:

1. **Analyse.** Derive testable requirements from the site and its source, because no formal spec exists → [requirements.md](requirements.md).
2. **Design.** Write test cases for precise, repeatable checks and checklists for broad sweeps. Every case links to a requirement.
3. **Execute manually.** Run scripted cases and checklists, plus exploratory sessions. This proves the test design is correct before anything is automated. Automating an unverified test only produces wrong answers faster.
4. **Report.** Every defect becomes a GitHub Issue, linked back to the test case and requirement.
5. **Automate.** Pick test cases marked `Automation: candidate` and implement them in Playwright + TypeScript.
6. **Maintain.** After each site change, run the smoke checks, re-run what changed, and keep the traceability matrix current.

**What gets automated.** These checks are stable, repetitive and objective: page availability, navigation, language switching, links, screenshots, meta tags, axe scans, and data-driven checks over all stream and speaker pages.

**What stays manual (`manual-only`).** These need human judgement: whether a layout "looks right" on a new device, whether a translation is missing as opposed to just worded differently, exploratory testing, and anything checked once and unlikely to change.

## 5. Test design techniques

| Technique | Where it is used |
|---|---|
| **Equivalence partitioning** | Pages are grouped by type (home, list, detail, wiki, static). We test one representative per type in depth instead of every page. Detail pages of the same type share one template. |
| **Data-driven testing / full enumeration** | For cheap checks (HTTP 200, title present, language counterpart exists), we cover *every* page in the site map, not just representatives. |
| **Checklist-based testing** | Smoke, cross-browser, a11y and SEO sweeps. |
| **State transition** | Language switch (UA ↔ EN) and theme toggle (light ↔ dark): verify every state and that switching back returns to the original state. |
| **Error guessing** | Likely weak spots from experience: the newest stream page, UA/EN mismatches, trailing slashes and `.html` variants, unknown URLs, external links to YouTube and Telegram. |
| **Exploratory testing** | Session-based, with written charters and notes (see [exploratory/](exploratory/)). |

### Test oracles

An oracle is the source of truth a test compares the site against. Which one a check uses decides what it can and can't find.

| Oracle | Used by | Finds | Can't find |
|---|---|---|---|
| **Requirements** ([requirements.md](requirements.md)) | Most test cases and checklists | Behaviour that differs from what was agreed | Content errors |
| **Expected content** ([`test-data/`](../test-data/README.md): streams, speakers), maintained by the site owner | TC-STR-005, TC-STR-006, TC-SPK-003 | Missing, extra or wrong streams and speakers, **even when the mistake is the same everywhere on the site** | Content that isn't in the files (e.g. stream descriptions) |
| **Consistency** (the site compared with itself) | TC-STR-001, TC-STR-004, TC-I18N-005, TC-I18N-007, exploratory testing | Facts that differ between two places on the site | A mistake repeated everywhere |
| **Standards** (WCAG, Core Web Vitals, SEO practice) | a11y and SEO checks, Lighthouse | Accessibility, performance, metadata issues | Anything about content |
| **Visual baseline** (approved screenshots) | TC-VIS-002 | Unintended layout changes | Whether the approved look was right in the first place |

The site's own source files (Markdown) are **not** used as an oracle for content: the site is built from them, so comparing the two would be comparing the site with itself.

## 6. Environments and tools

| Item | Value |
|---|---|
| Environment | Production only: https://itfriday.community. No staging exists. |
| Browsers | Chrome and Safari, desktop and mobile (details in the [test plan](cycles/2026-10-cycle-1/test-plan.md)) |
| Test management | Markdown in this repo: test cases, checklists, sessions, reports |
| Bug tracking | GitHub Issues in this repo, using the [bug report template](../.github/ISSUE_TEMPLATE/bug_report.md) |
| Manual tools | Chrome DevTools (device mode, network, console), Safari Web Inspector, Lighthouse, axe DevTools extension, `curl` for HTTP checks |
| Automation (phases 3–4) | Playwright + TypeScript, `@axe-core/playwright` |
| CI | Not yet: tests are run manually (see roadmap phase 5) |

**Production-only rules.** Tests are read-only (the site has no write paths anyway). Automated crawls are throttled. Nothing is run in a tight loop against the live site.

## 7. Defect management

**Where:** GitHub Issues in this repo, label `bug`. Advisory findings with no requirement behind them (e.g. a missing `sitemap.xml`) are filed with the label `enhancement`, using the [improvement suggestion template](../.github/ISSUE_TEMPLATE/improvement_suggestion.md): improvement suggestions, not defects. Fixes are made by the site owner in the site's own repository. The Issue links to the fixing commit or PR.

**Lifecycle:**

```
New → Confirmed → In progress → Fixed → Verified → Closed
  ↘ Rejected (not a bug / duplicate / won't fix)
                                   Fixed → Reopened (retest failed) → In progress
```

| Status | Meaning | Who |
|---|---|---|
| New | Reported, not yet reviewed | Tester |
| Confirmed | Reproduced and accepted as a defect | Site owner |
| In progress | Being fixed | Site owner |
| Fixed | Fix deployed to production | Site owner |
| Verified | Retested on production and passing | Tester |
| Closed | Done | Tester |
| Rejected | Not a defect, duplicate, or won't fix (with a reason) | Site owner |
| Reopened | Retest failed | Tester |

**Defects without a written requirement.** Exploratory testing can find a defect that no requirement covers. If the product contradicts itself (e.g. two pages state different facts) or clearly fails its own purpose, it is a **bug** even without a requirement: the *consistency oracle*. The report names the oracle and proposes a requirement. Findings that are only "could be better" stay suggestions (`enhancement`).

**Tracking statuses in GitHub.** GitHub Issues only have *open* and *closed*, so the statuses above are labels: `status: confirmed`, `status: in progress`, `status: fixed`, `status: verified`, `status: reopened`. An open issue without a status label is *New*. *Closed* is the closed issue. *Rejected* is closed with the label `wontfix`, `duplicate` or `invalid` and a comment explaining why.

**Severity** (impact on the user):

| Severity | Definition | Example on this site |
|---|---|---|
| Critical | Site or a whole section unusable, no workaround | Home page returns 500; the nav menu doesn't render |
| Major | Important function broken, workaround exists | Language switch sends you to the home page instead of the same page |
| Minor | Small functional or content defect | One speaker page has a broken avatar image |
| Trivial | Cosmetic | Misaligned icon in the footer |

**Priority** (how soon to fix): **High** = before the next stream, **Medium** = within the cycle, **Low** = when convenient. Severity and priority are set independently. A Trivial typo on the home page may still be High priority.

## 8. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| No staging, so defects reach users before testing | Bugs are live until found | Smoke checklist after every deploy; scheduled runs later (phase 5) |
| Content changes weekly | Tests and expected data go stale | Derive page lists from the site map instead of hard-coding them; mark data-dependent cases |
| No formal requirements | Disagreement on what "correct" is | Requirements derived and frozen with a version and a decisions log |
| External links depend on third parties (YouTube, Telegram, LinkedIn) | False failures from bot protection or rate limits | Report external link failures separately and retest manually before filing |
| Visual tests are sensitive to fonts and rendering | Flaky screenshot diffs | Fixed viewports and browsers, masking of dynamic areas, comparison thresholds |
| Single tester, limited time | Slower progress, gaps in coverage | Phased roadmap with a definition of done per phase; prioritise by requirement priority |
