# Defect Register

All bugs and improvement suggestions, across cycles. A defect lives here from the moment it is found until it is closed, whatever cycle that happens in; cycle reports link to it instead of keeping their own copies.

Reports are written with the [bug report](../../.github/ISSUE_TEMPLATE/bug_report.md) and [improvement suggestion](../../.github/ISSUE_TEMPLATE/improvement_suggestion.md) templates. Once the repo is on GitHub they move to GitHub Issues: the Issue number is added in the Issue column, and this table stays as the map from BUG/SUG IDs to Issues, so links from test cases and reports keep working.

Statuses follow the defect lifecycle in the [test strategy](../test-strategy.md#7-defect-management). "Found in" names the cycle.

| ID | Title | Severity | Priority | Status | Found in | Issue |
|---|---|---|---|---|---|---|
| [BUG-001](BUG-001.md) | All pages share one meta description | Minor | Medium | New | cycle 1 | — |
| [BUG-002](BUG-002.md) | Interface texts are in English on Ukrainian pages | Minor | Medium | New | cycle 1 | — |
| [BUG-003](BUG-003.md) | Header logo link has no accessible name (logo images have empty `alt`) | Major | Medium | New | cycle 1 | — |
| [BUG-004](BUG-004.md) | Insufficient colour contrast in code blocks and the primary hero button | Minor | Low | New | cycle 1 | — |
| [BUG-005](BUG-005.md) | Stream #007: `chrome://webrtc-internals` link can't be opened | Trivial | Low | New | cycle 1 | — |
| [BUG-006](BUG-006.md) | Speaker profile Олег Левченко: stream #012 is missing | Minor | Medium | New | cycle 1 | — |
| [BUG-007](BUG-007.md) | Schedule page says the next stream is unannounced while #022 is announced | Minor | **High** | New | cycle 1 | — |

## Improvement suggestions

Filed with the [improvement suggestion template](../../.github/ISSUE_TEMPLATE/improvement_suggestion.md) (label `enhancement`). Not defects: no requirement is violated.

| ID | Title | Source | Status | Found in | Issue |
|---|---|---|---|---|---|
| [SUG-001](SUG-001.md) | Add SEO and link-preview metadata (Open Graph, canonical, hreflang, sitemap) | SEO checklist | New | cycle 1 | — |
| [SUG-002](SUG-002.md) | Enforce HTTPS | SEO checklist | New | cycle 1 | — |
| [SUG-003](SUG-003.md) | Optimise stream cover images (mobile LCP 11.5 s, CLS 0.21) | TC-PERF-001 | New | cycle 1 | — |
| [SUG-004](SUG-004.md) | `/wiki` and `/wiki/` end on a 404 page | Exploratory | New | cycle 1 | — |
| [SUG-005](SUG-005.md) | Add site search | Exploratory | New | cycle 1 | — |

## Observations (not reported)

Input for checks that haven't run yet.

| Observation | For |
|---|---|
| Stream cover alt text is "Stream #NNN" in English on UA pages and doesn't describe the topic | a11y review in the next cycle |
