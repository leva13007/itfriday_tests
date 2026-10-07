# TC-STR-005: Streams list matches the expected streams

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
| 1 | Compare the site with the expected data | For every stream in `test-data/streams.json`: the row on `/streams/` and `/en/streams/` has the same date, topic (`listTopic`), speakers and YouTube ID; and the list has no streams that aren't in the file |

## Notes

Uses an independent oracle instead of comparing the site with itself (see strategy §5, "Test oracles"). Fails if a stream is missing, extra, or has a wrong date, topic, speaker or YouTube link in the list, even when the mistake is the same everywhere on the site.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chromium (Playwright 1.63) | Pass (oracle not reviewed yet) · mutation check: a changed date and speaker in the data were detected | — | automated |
