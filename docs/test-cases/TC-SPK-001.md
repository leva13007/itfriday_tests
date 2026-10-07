# TC-SPK-001: Speakers list links to every speaker profile

| Field | Value |
|---|---|
| Module | SPK |
| Requirement | REQ-016 |
| Priority | Medium |
| Type | Functional |
| Automation | automated ([`tests/content.spec.ts`](../../tests/content.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.

## Test data

- Speaker profiles in the source on 2026-10-07: 5 (ihor-kotov, oleh-levchenko, oleh-talanov, oleksandr-blazheiko, serhii-lytvyn)

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/speakers` | A card per speaker, each with photo, name and role |
| 2 | Count the cards | 5 cards, one per profile in the source; every photo loads |
| 3 | Click each card | Each opens the matching `/speakers/<slug>` page |
| 4 | Repeat on `/en/speakers` | 5 cards; links point to `/en/speakers/<slug>` |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) | Pass · 5 cards, 5/5 photos | — | automation (supervised) |
