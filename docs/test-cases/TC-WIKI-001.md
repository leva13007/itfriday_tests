# TC-WIKI-001: Wiki sidebar lists all 4 documents in order

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
- Desktop browser, window ≥ 960px wide, so the sidebar is shown next to the content.

## Test data

- UA: Місія, Цінності, Формати стрімів, Управління
- EN: Mission, Values, Stream Formats, Governance

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/wiki/mission` | Page loads with a sidebar on the left |
| 2 | Read the sidebar | Group "Документи" with 4 items in this order: Місія, Цінності, Формати стрімів, Управління |
| 3 | Open `/en/wiki/mission` | Sidebar group "Documents" with Mission, Values, Stream Formats, Governance |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) | Pass | — | automation (supervised) |
