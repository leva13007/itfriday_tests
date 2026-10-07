# TC-STR-002: Stream page shows its key information

| Field | Value |
|---|---|
| Module | STR |
| Requirement | REQ-001 |
| Priority | High |
| Type | Functional |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.

## Test data

- Page: `/streams/022`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/streams/022` | Heading "#022 — AI пише код. Хто отримує підвищення?" |
| 2 | Look below the heading | Cover image is shown (not broken); date "9 жовтня 2026", time, format and guest are listed |
| 3 | Look for the YouTube link | A YouTube link is present and points to `youtube.com` |
| 4 | Look at the participants section | Guest name links to the speaker profile |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) | Pass | — | automation (supervised) |
