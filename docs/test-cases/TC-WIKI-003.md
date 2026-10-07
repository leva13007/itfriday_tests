# TC-WIKI-003: Wiki sidebar is reachable on mobile

| Field | Value |
|---|---|
| Module | WIKI |
| Requirement | REQ-006, REQ-010 |
| Priority | Medium |
| Type | Functional |
| Automation | automated ([`tests/content.spec.ts`](../../tests/content.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Mobile viewport 390×844: C3, or C1 with DevTools device mode (iPhone 12/13/14).

## Test data

- Page: `/wiki/mission`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/wiki/mission` | Content fills the width; the sidebar is hidden; a "Menu" button is shown below the header |
| 2 | Tap "Menu" | The sidebar slides in with the 4 documents |
| 3 | Tap "Управління" | `/wiki/governance` opens and the sidebar closes |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1), 390px iframe | Pass | — | automation (supervised) |
