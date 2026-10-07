# TC-RSP-003: Pages have no horizontal scroll at mobile width

| Field | Value |
|---|---|
| Module | RSP |
| Requirement | REQ-010 |
| Priority | High |
| Type | UI |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Mobile viewport 390×844: C3, or C1 with DevTools device mode (iPhone 12/13/14).

## Test data

- Representative pages from test plan §4.1, UA and EN

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open each representative page | Page loads |
| 2 | Try to scroll sideways | The page doesn't move sideways; no content is cut off at the right edge |
| 3 | On `/streams/` look at the streams table | The table scrolls inside its own container, or fits; the page itself doesn't scroll sideways |
| 4 | On `/posts/2026-06-22-web-push-api` look at code blocks | Long code lines scroll inside the code block only |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
