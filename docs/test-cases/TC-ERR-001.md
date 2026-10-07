# TC-ERR-001: Unknown URL shows a 404 page with a way back home

| Field | Value |
|---|---|
| Module | ERR |
| Requirement | REQ-017 |
| Priority | Low |
| Type | Functional |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.

## Test data

- URLs: `/does-not-exist`, `/en/does-not-exist`, `/streams/999`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Request `/does-not-exist` with `curl -I` | HTTP status 404 (not 200) |
| 2 | Open `/does-not-exist` in the browser | A "page not found" page is shown inside the normal site layout (header, footer) |
| 3 | Click the link back to the home page | `/` opens |
| 4 | Repeat with `/streams/999` and `/en/does-not-exist` | Same behaviour; on the EN URL the home link leads to `/en/` |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
