# TC-VIS-002: Representative pages match the visual baseline

| Field | Value |
|---|---|
| Module | VIS |
| Requirement | REQ-011 |
| Priority | Medium |
| Type | Visual |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- A baseline from TC-VIS-001 exists. Same configurations, theme and viewport as the baseline.

## Test data

- Baseline: `docs/reports/cycle-1/visual-baseline/`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Capture new screenshots exactly as in TC-VIS-001 | New set of screenshots |
| 2 | Compare each one with its baseline (side by side or overlay) | No differences, except expected content changes (e.g. a new stream row) |
| 3 | For every unexpected difference | Report a bug with both screenshots |
| 4 | For every expected change | Replace the baseline screenshot and note why |

## Postconditions

- None (read-only test).

## Notes

Not executed in cycle 1 (no baseline yet). Automated in phase 4 with Playwright `toHaveScreenshot`.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | — | Not run · Excluded in cycle 1 (needs baseline) | — | automation (supervised) |
