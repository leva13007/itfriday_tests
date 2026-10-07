# TC-WIKI-002: Wiki sidebar links open the right document and highlight it

| Field | Value |
|---|---|
| Module | WIKI |
| Requirement | REQ-006 |
| Priority | Medium |
| Type | Functional |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser, window ≥ 960px wide.

## Test data

- Start page: `/wiki/mission`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/wiki/mission` | "Місія" is highlighted in the sidebar |
| 2 | Click "Цінності" | `/wiki/values` opens; "Цінності" is highlighted, "Місія" is not |
| 3 | Click "Формати стрімів" | `/wiki/formats` opens and is highlighted |
| 4 | Click "Управління" | `/wiki/governance` opens and is highlighted |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
