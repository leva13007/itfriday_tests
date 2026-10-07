# TC-STR-001: Streams list links to every published stream page

| Field | Value |
|---|---|
| Module | STR |
| Requirement | REQ-016 |
| Priority | Medium |
| Type | Functional |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.

## Test data

- Stream pages in the site source on 2026-10-07: 001–022 (22 pages)

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/streams/` | A table of streams is shown, newest first |
| 2 | Count the rows and compare the numbers with the stream pages in the source | One row per stream page; no number missing, no duplicates |
| 3 | Click the number of the newest and of the oldest stream | They open `/streams/022` and `/streams/001` |
| 4 | Repeat steps 1–2 on `/en/streams/` | Same count; links point to `/en/streams/...` |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
