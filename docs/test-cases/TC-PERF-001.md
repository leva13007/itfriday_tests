# TC-PERF-001: Lighthouse baseline is recorded for key pages

| Field | Value |
|---|---|
| Module | PERF |
| Requirement | REQ-015 |
| Priority | Low |
| Type | Performance |
| Automation | automated (Lighthouse CI: `npm run lighthouse`, `npm run lighthouse:desktop`; config in `lighthouserc*.json`) |
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

CLI alternative (same result, scriptable): `npx lighthouse@13.5.0 <url> [--preset=desktop] --output=html --output=json`
| 3 | Record the 4 category scores and LCP, CLS, TBT for each run in the cycle summary report | Table with one row per page × device |
| 4 | Save each report as HTML in `docs/reports/cycle-1/lighthouse/` | Reports stored |

## Postconditions

- None (read-only test).

## Notes

Baseline only: there is no pass/fail threshold (decisions log, 2026-10-07). Later cycles compare against these numbers and report big drops.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Lighthouse 13.5.0 CLI, Chrome 154 headless | Pass · baseline recorded for 6 pages × 2 devices ([baseline](../reports/cycle-1/lighthouse/README.md)). Stream pages on mobile: perf 64, LCP 11.5 s, CLS 0.216 → SUG-003 | SUG-003 | automation (supervised) |
| 2026-10-07 | Lighthouse CI 0.15.1 (Lighthouse 12.6.1), Chrome headless, median of 3 | Pass · automation baseline saved to `lighthouse/baseline-{mobile,desktop}.json`. Mobile stream pages: perf 61–66, LCP ~11.2–11.6 s, CLS 0.19–0.28 (SUG-003) | SUG-003 | automated |
