# TC-PERF-001: Lighthouse baseline is recorded for key pages

| Field | Value |
|---|---|
| Module | PERF |
| Requirement | REQ-015 |
| Priority | Low |
| Type | Performance |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- C1, Chrome incognito window (no extensions), stable broadband connection.

## Test data

- Pages: `/`, `/streams/`, `/streams/<newest>` and their EN versions

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open DevTools → Lighthouse, select all categories, device "Desktop", and run on each page | Report generated |
| 2 | Repeat with device "Mobile" | Report generated |
| 3 | Record the 4 category scores and LCP, CLS, TBT for each run in the cycle summary report | Table with one row per page × device |
| 4 | Save each report as HTML in `docs/reports/cycle-1/lighthouse/` | Reports stored |

## Postconditions

- None (read-only test).

## Notes

Baseline only: there is no pass/fail threshold (decisions log, 2026-10-07). Later cycles compare against these numbers and report big drops.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
