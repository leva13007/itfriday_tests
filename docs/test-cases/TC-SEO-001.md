# TC-SEO-001: Every page has a unique, descriptive title

| Field | Value |
|---|---|
| Module | SEO |
| Requirement | REQ-012 |
| Priority | Medium |
| Type | SEO |
| Automation | automated ([`tests/site-map.spec.ts`](../../tests/site-map.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Terminal with `curl`; page list as in links checklist L-A01.

## Test data

- All pages from the site map

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Fetch each page and extract `<title>` | Every page has a non-empty title |
| 2 | Check the format | UA titles end with `| ІТ П'ятниця`; EN titles end with `| IT Friday` (the home pages may be the site name only) |
| 3 | Look for duplicates within each language | No two pages share the same title |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | curl | Pass · 82 unique titles | — | automation (supervised) |
