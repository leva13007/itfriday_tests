# TC-STR-004: Stream list, stream pages and speaker profiles agree on who spoke where

| Field | Value |
|---|---|
| Module | STR |
| Requirement | none explicit (consistency oracle, see strategy §7); proposed with BUG-006 |
| Priority | Medium |
| Type | Functional (data consistency) |
| Automation | automated ([`tests/content.spec.ts`](../../tests/content.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available.

## Test data

- All streams in the streams list (22 on 2026-10-07), both languages

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | From `/streams/`, note the speakers of every stream | A stream → speakers map |
| 2 | Open every stream page | Each one links every speaker named for it in the list |
| 3 | Open every speaker profile | Its streams table lists exactly the streams the list names for that speaker, no more and no less |
| 4 | Repeat for `/en/` | Same results |

## Postconditions

- None (read-only test).

## Notes

Comes from the [global UI exploratory session](../exploratory/2026-10-07-global-ui.md), where this cross-check found BUG-006. Speaker and stream data is maintained by hand in several places, so it drifts. The check takes seconds when automated.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 (exploratory, scripted) | Fail · Олег Левченко's profile misses #012 | BUG-006 | automation (supervised) |
