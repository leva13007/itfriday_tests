# TC-STR-007: Schedule page shows the next announced stream

| Field | Value |
|---|---|
| Module | STR |
| Requirement | none explicit (consistency oracle, see strategy §7); proposed REQ-022 with BUG-007. Oracle: [`test-data/`](../../test-data/README.md) |
| Priority | High |
| Type | Functional (content vs. oracle) |
| Automation | automated ([`tests/oracle.spec.ts`](../../tests/oracle.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available.
- `test-data/streams.json` contains a stream dated today or later (Kyiv time). If it doesn't, nothing is announced, "will be announced in Telegram" is the right text, and the case is skipped.

## Test data

- The next announced stream: the earliest stream in [`test-data/streams.json`](../../test-data/streams.json) dated today or later. A stream stays "next" for its whole day. On 2026-10-07 that is #022 (2026-10-09).

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/schedule` and read the "Next stream" section | The section links to the page of the next announced stream (`/streams/NNN`) |
| 2 | Repeat on `/en/schedule` | The section links to `/en/streams/NNN` |

## Postconditions

- None (read-only test).

## Notes

Priority High, although there is no linked requirement: the schedule page is where people look in the days before a stream (see BUG-007). The next stream comes from the oracle, not from a hard-coded number, so the case keeps working when a new stream is announced every week.

The check is "links to the stream page", the minimum asked for in BUG-007. Date, topic and guest are on the stream page itself and are checked there by TC-STR-006.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chromium (Playwright 1.63) | Fail (expected, `test.fail()`) · `/schedule` and `/en/schedule` don't link to #022; their only stream link is the archive `/streams/` | BUG-007 | automated |
