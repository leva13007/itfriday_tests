# TC-LNK-001: Every page in the site map returns HTTP 200

| Field | Value |
|---|---|
| Module | LNK |
| Requirement | REQ-001, REQ-007 |
| Priority | High |
| Type | Functional |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Terminal with `curl`; page list as in links checklist L-A01.

## Test data

- 82 pages on 2026-10-07

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Build the page list from the site source | List of paths; record the count |
| 2 | Request each page with a 0.2 s pause between requests | Every page returns 200 |
| 3 | Request `/streams/022` and `/streams/022.html` | Both return 200 |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | curl | Pass · 82/82 → 200 | — | automation (supervised) |
