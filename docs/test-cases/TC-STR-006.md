# TC-STR-006: Every stream page matches the expected stream

| Field | Value |
|---|---|
| Module | STR |
| Requirement | REQ-016 (content completeness); oracle: [`test-data/`](../../test-data/README.md) |
| Priority | Medium |
| Type | Functional (content vs. oracle) |
| Automation | automated ([`tests/oracle.spec.ts`](../../tests/oracle.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available.
- `test-data/streams.json` and `test-data/speakers.json` are reviewed by the site owner (`"reviewed": true`). Until then a pass proves little, because the data was generated from the site.

## Test data

- [`test-data/streams.json`](../../test-data/streams.json), [`test-data/speakers.json`](../../test-data/speakers.json)

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Compare the site with the expected data | For every stream in `test-data/streams.json`, UA and EN: the page heading is `#NNN — <title>`, the page links exactly the expected speakers, and links the expected YouTube video |

## Notes

Uses an independent oracle instead of comparing the site with itself (see strategy §5, "Test oracles"). Fails if a stream page has a wrong title, a missing or extra speaker, or a wrong video, even when the mistake is the same everywhere on the site.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chromium (Playwright 1.63) | Pass (oracle not reviewed yet) · mutation check: a changed speaker in the data was detected | — | automated |
