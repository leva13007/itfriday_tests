# TC-NAV-003: Logo returns to the home page of the current language

| Field | Value |
|---|---|
| Module | NAV |
| Requirement | REQ-005 |
| Priority | Medium |
| Type | Functional |
| Automation | automated ([`tests/navigation.spec.ts`](../../tests/navigation.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.

## Test data

- UA start page: `/streams/022`
- EN start page: `/en/streams/022`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/streams/022` | Stream page loads |
| 2 | Click the logo in the top-left corner | `/` opens (Ukrainian home page) |
| 3 | Open `/en/streams/022` | English stream page loads |
| 4 | Click the logo | `/en/` opens (English home page), not the Ukrainian one |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) | Pass | — | automation (supervised) |
