# TC-RSP-002: Tapping a mobile menu item navigates and closes the menu

| Field | Value |
|---|---|
| Module | RSP |
| Requirement | REQ-010 |
| Priority | High |
| Type | Functional |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Mobile viewport 390×844: C3, or C1 with DevTools device mode (iPhone 12/13/14).

## Test data

- Page: `/`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/` and tap the hamburger button | The menu opens |
| 2 | Tap "Стріми" | `/streams/` opens and the menu is closed |
| 3 | Open the menu again and switch the language to English | `/en/streams/` opens |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1), 390px iframe | Pass | — | automation (supervised) |
