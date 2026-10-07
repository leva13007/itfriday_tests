# TC-SEO-004: Open Graph type and image are present on every page

| Field | Value |
|---|---|
| Module | SEO |
| Requirement | REQ-013 |
| Priority | Low |
| Type | SEO |
| Automation | automated ([`tests/site-map.spec.ts`](../../tests/site-map.spec.ts)) |
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
| 1 | Fetch each page and extract `og:type` and `og:image` | Both are present |
| 2 | Request the `og:image` URL | It is absolute and returns 200 with an image content type |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | curl | Pass | — | automation (supervised) |
