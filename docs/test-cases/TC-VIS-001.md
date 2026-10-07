# TC-VIS-001: Visual baseline of the representative pages is captured

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
- Configurations C1 (1440×900) and C3 (390×844). Light theme. Fonts and images fully loaded.

## Test data

- Representative pages from test plan §4.1, UA and EN

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open each representative page and wait until images have loaded | Page fully rendered |
| 2 | Take a full-page screenshot (DevTools → Cmd+Shift+P → "Capture full size screenshot") | Screenshot saved |
| 3 | Name it `<config>-<lang>-<page>.png` and store it in `docs/reports/cycle-1/visual-baseline/` | One file per page × language × config |
| 4 | Review every screenshot | No visible layout defects. Any defect found is reported as a bug before the screenshot is accepted as baseline |

## Postconditions

- Baseline screenshots committed. Record the deploy they were taken on.

## Notes

Cycle 1 creates the baseline. TC-VIS-002 compares against it from cycle 2 on.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
