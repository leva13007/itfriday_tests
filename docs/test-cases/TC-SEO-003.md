# TC-SEO-003: Page language attribute matches the content language

| Field | Value |
|---|---|
| Module | SEO |
| Requirement | REQ-012 |
| Priority | Medium |
| Type | SEO |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Terminal with `curl`.

## Test data

- All pages from the site map

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Fetch each UA page and read `<html lang>` | `lang="uk-UA"` |
| 2 | Fetch each EN page and read `<html lang>` | `lang="en-US"` |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
