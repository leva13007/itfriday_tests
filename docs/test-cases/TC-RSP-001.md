# TC-RSP-001: Hamburger menu replaces the header nav on mobile

| Field | Value |
|---|---|
| Module | RSP |
| Requirement | REQ-010 |
| Priority | High |
| Type | Functional |
| Automation | automated ([`tests/mobile.spec.ts`](../../tests/mobile.spec.ts)) |
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
| 1 | Open `/` | The header shows the logo and a hamburger button; the 8 nav items are not shown inline |
| 2 | Tap the hamburger button | A full-screen menu opens with all 8 nav items, the language switcher, the theme toggle and the social icons |
| 3 | Tap the close button | The menu closes |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1), 390px iframe | Pass | — | automation (supervised) |
