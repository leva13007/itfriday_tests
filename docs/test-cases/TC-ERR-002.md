# TC-ERR-002: Repo files are not published as pages

| Field | Value |
|---|---|
| Module | ERR |
| Requirement | none explicit; proposed REQ-025 with BUG-008 |
| Priority | Medium |
| Type | Functional (configuration) |
| Automation | automated ([`tests/content.spec.ts`](../../tests/content.spec.ts)) |
| Author | |
| Created | 2026-10-08 |

## Why

VitePress publishes every `.md` file in its source folder, and the source folder of the [site repo](https://github.com/leva13007/itfriday.community) is the repo root. Any file meant for developers that lands there (README, assistant instructions) becomes a public page unless the config excludes it. These pages aren't linked anywhere, so the crawled site map and TC-LNK-001 never see them: they need a check of their own, by URL.

## Preconditions

- The site is available (`/` returns 200).

## Test data

- URLs: `/README`, `/README.html`, `/CLAUDE`, `/CLAUDE.html` (the repo-root `.md` files that aren't site content; extend the list if the site repo gets new ones)

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Request each URL with `curl -I` | HTTP status 404 for every URL |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-08 | curl | Fail · all four URLs return 200 | [BUG-008](../defects/BUG-008.md) | manual |
