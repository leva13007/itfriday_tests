# TC-STR-003: Speaker link on a stream page opens the right profile

| Field | Value |
|---|---|
| Module | STR |
| Requirement | REQ-007 |
| Priority | High |
| Type | Functional |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.

## Test data

- Page: `/streams/022`; guest: Сергій Литвин → `/speakers/serhii-lytvyn`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/streams/022` | Stream page loads |
| 2 | Click "Сергій Литвин" in the participants section | `/speakers/serhii-lytvyn` opens with the name "Сергій Литвин" as heading |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) | Pass | — | automation (supervised) |
