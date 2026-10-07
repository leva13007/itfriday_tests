# TC-PST-001: Posts list links to every post

| Field | Value |
|---|---|
| Module | PST |
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

- Posts in the source on 2026-10-07: 2

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/posts/` | A table of posts, newest first |
| 2 | Count the rows | 2 rows, one per post page in the source |
| 3 | Click each post title | Each opens its post page with the same title as the heading |
| 4 | Repeat on `/en/posts/` | 2 rows; links point to `/en/posts/...` |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
