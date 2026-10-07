# TC-SEO-002: Every page has its own meta description

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
| 1 | Fetch each page and extract `<meta name="description">` | Every page has a non-empty description |
| 2 | Look for duplicates within each language | Each page describes its own content; no two pages share the same description |

## Postconditions

- None (read-only test).

## Notes

A site-wide description repeated on every page fails this case.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
