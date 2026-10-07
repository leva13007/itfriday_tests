# TC-SPK-002: Speaker profile links to the speaker's streams

| Field | Value |
|---|---|
| Module | SPK |
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

- Page: `/speakers/serhii-lytvyn`; expected stream: #022

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/speakers/serhii-lytvyn` | Profile with photo, role, LinkedIn link and a "Виступи на IT Friday" table |
| 2 | Click "#022" in the table | `/streams/022` opens |
| 3 | Go back and click "← Усі спікери" | `/speakers` opens |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
