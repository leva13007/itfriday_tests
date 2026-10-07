# TC-PERF-002: Page and image weight is recorded for every page

| Field | Value |
|---|---|
| Module | PERF |
| Requirement | REQ-015 |
| Priority | Low |
| Type | Performance |
| Automation | automated ([`tests/page-weight.spec.ts`](../../tests/page-weight.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available.

## Test data

- All pages of the site map (crawled)

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | For every page, list its images and request each one's size (HTTP HEAD) | Every image responds |
| 2 | Record per page: HTML size, number of images, total image size, largest image | A table, heaviest pages first, attached to the test run |
| 3 | Record the shared CSS/JS/font weight once | One number for all pages |
| 4 | Flag images over 500 KB | One warning per image (advisory: REQ-015 has no threshold) |

## Notes

Lighthouse is slow (~1 min per page with 3 runs), so the routine run covers 6 key pages. This check covers **every** page in ~30 s and measures the root cause Lighthouse found on stream pages: oversized cover images. The full Lighthouse sweep (`npm run lighthouse:full`) is for occasional deep checks.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | HTTP (Playwright request) | Pass · 82 pages in 22 s; 23 of 29 images over 500 KB; heaviest page `/streams/001` (2.5 MB of images) | SUG-003 | automated |
