# Cycle 1: Test Case Execution on C1

Execution of all 40 test cases on the primary configuration (test plan §10, step 3). Detailed results are in each test case's execution history. This page is the overview.

| | |
|---|---|
| Date | 2026-10-07 |
| Configuration | C1: Chrome 154, macOS, viewport 1512×806 |
| Deploy under test | Tue, 06 Oct 2026 16:47:41 GMT (site commit `03ab24e`) |
| Executed by | Browser automation (Claude in Chrome), supervised; `curl` for HTTP-level cases |
| Preceded by | [Smoke run 2026-10-07](runs/2026-10-07-smoke-C1.md): 15/15, GO |

## How it was executed

- **User-facing interactions** were done with real clicks: language switcher, logo, theme toggle, skip link with the keyboard, 404 home button.
- **Repetitive sweeps** (8 nav items × 2 languages, every list entry, every speaker card) were clicked through with DevTools console scripts, which use the site's own links and router.
- **HTTP-level cases** (LNK-001, I18N-005, SEO-001…004) were run with `curl` over all 82 pages.
- **Mobile cases** (WIKI-003, RSP-001…003) used a 390×844 same-origin iframe, because Chrome windows can't be narrower than ~600px and DevTools device mode isn't available to automation. They are repeated on a real iPhone (C3) in the cross-browser run.
- **Accessibility scans** used axe-core 4.10.2 (the engine of the axe DevTools extension), injected from cdnjs.

## Results

| Result | Count | Test cases |
|---|---|---|
| ✅ Pass | 33 | NAV-001…005, I18N-001…005, WIKI-001…003, STR-001…003, SPK-001…002, PST-001, LNK-001…005, RSP-001…003, SEO-001, SEO-003, SEO-004, A11Y-002, ERR-001, PERF-001 (run later the same day, see below) |
| ❌ Fail | 4 | I18N-006, SEO-002, A11Y-001, A11Y-004 |
| ⛔ Blocked | 2 | VIS-001 (no full-page capture in automation, C3 not available), A11Y-003 (keyboard input unreliable in automation) |
| ⏭ Not run | 1 | VIS-002 (excluded in cycle 1) |
| **Total** | **40** | |

**By priority:**

| Priority | Total | Executed | Passed | Failed |
|---|---|---|---|---|
| High | 13 | 13 (100%) | 13 | 0 |
| Medium | 22 | 19 of 21 eligible (90%) | 15 | 4 |
| Low | 5 | 5 | 5 | 0 |

The High and Medium exit criteria (test plan §7) are met for this step. VIS-002 is excluded from the Medium count as the plan defines.

## Defects found

| ID | Title | Severity | Priority | Found by |
|---|---|---|---|---|
| [BUG-001](../../defects/BUG-001.md) | All pages share one meta description | Minor | Medium | TC-SEO-002 |
| [BUG-002](../../defects/BUG-002.md) | Interface texts are in English on Ukrainian pages | Minor | Medium | TC-I18N-006 |
| [BUG-003](../../defects/BUG-003.md) | Header logo link has no accessible name | Major | Medium | TC-A11Y-001, TC-A11Y-004 |
| [BUG-004](../../defects/BUG-004.md) | Insufficient colour contrast in code blocks and the hero button | Minor | Low | TC-A11Y-001 |

No Critical bugs. All High-priority functionality (navigation, language switching, content lists, links, mobile layout) works.

## Accessibility scan

axe-core 4.10.2, violations by impact (C = critical, S = serious, M = moderate). Node counts.

| Page | Dark | Light | Serious violations |
|---|---|---|---|
| `/` | C0 S1 M2 | C0 S2 M2 | `link-name` (logo); light: `color-contrast` (hero button, 4.48:1) |
| `/en/` | C0 S1 M2 | C0 S2 M2 | same as `/` |
| `/streams/` | C0 S1 M2 | C0 S1 M2 | `link-name` |
| `/streams/022` | C0 S1 M2 | C0 S1 M2 | `link-name` |
| `/speakers/oleh-levchenko` | C0 S1 M2 | C0 S1 M2 | `link-name` |
| `/posts/2026-06-22-web-push-api` | C0 S19 M2 | C0 S64 M2 | `link-name`; `color-contrast` in code blocks (18 dark, 63 light) |
| `/wiki/mission` | C0 S1 M0 | C0 S1 M0 | `link-name` |
| `/speak` | C0 S1 M2 | C0 S1 M2 | `link-name` |

Moderate issues (not failing TC-A11Y-001, recorded for the a11y checklist): `landmark-one-main` and `region` on home pages; `landmark-no-duplicate-contentinfo` and `landmark-unique` on doc pages.

## Test case defects

| TC | Problem | Fix |
|---|---|---|
| TC-PST-001 | Expected the list title to equal the page heading. The posts list legitimately shows a shortened title ("Повний гайд по Web Push API" vs. the full heading) | Expected result changed to "heading matches the list title; the list may show a shortened form" |

## Corrections to earlier observations

- *Telegram icon has no accessible name* (noted during I18N-006): **withdrawn**. The SVG contains `<title>Telegram</title>`, which provides the name. axe confirms it.

## Still to do in cycle 1

- TC-VIS-001, TC-A11Y-003: manual execution

## Update: TC-PERF-001

Run later on 2026-10-07 with the Lighthouse CLI (`npx lighthouse@13.5.0`, Chrome 154 headless): baseline recorded for 6 pages × desktop/mobile, see the [Lighthouse baseline](lighthouse.md). Result: Pass (baseline only). Stream pages on mobile score 64 (LCP 11.5 s, CLS 0.216), filed as [SUG-003](../../defects/SUG-003.md).
- Checklists: links, SEO, a11y, cross-browser (C2, C3, C4)
- Exploratory sessions 1–3
