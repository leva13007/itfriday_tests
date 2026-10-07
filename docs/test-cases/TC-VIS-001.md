# TC-VIS-001: Visual baseline of the representative pages is captured

| Field | Value |
|---|---|
| Module | VIS |
| Requirement | REQ-011 |
| Priority | Medium |
| Type | Visual |
| Automation | automated ([`tests/visual.spec.ts`](../../tests/visual.spec.ts)) |
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
| 2026-10-07 | Chrome 154 / macOS (C1) | Blocked · No full-page screenshot capability in automation; C3 not available. Run manually | — | automation (supervised) |
| 2026-10-07 | Chromium 1440×900 + WebKit iPhone 13 emulation (Playwright 1.63) | Pass · baseline of 9 pages × 2 devices captured with `npm run test:visual:update` and reviewed; growing tables cut to 3 rows and masked. Emulation, not a real iPhone (C3 stays on hold) | — | automated |
