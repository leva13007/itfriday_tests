# TC-SPK-003: Speakers and their profiles match the expected speakers

| Field | Value |
|---|---|
| Module | SPK |
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
| 1 | Compare the site with the expected data | `/speakers` and `/en/speakers` show exactly the speakers in `test-data/speakers.json`; each profile has the expected name and LinkedIn link, and lists exactly the streams that `streams.json` names for that speaker |

## Notes

Uses an independent oracle instead of comparing the site with itself (see strategy §5, "Test oracles"). Fails if a speaker is missing or extra, or a profile has a wrong name, LinkedIn or streams list, even when the mistake is the same everywhere on the site.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chromium (Playwright 1.63) | Fail · Олег Левченко's profile misses #012 (expected from streams.json) | BUG-006 | automated |
