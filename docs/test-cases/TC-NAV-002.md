# TC-NAV-002: Every header nav item opens its page

| Field | Value |
|---|---|
| Module | NAV |
| Requirement | REQ-002 |
| Priority | High |
| Type | Functional |
| Automation | automated ([`tests/navigation.spec.ts`](../../tests/navigation.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.

## Test data

- Nav items and expected targets:

| UA item | UA target | EN item | EN target |
|---|---|---|---|
| Про нас | `/about` | About | `/en/about` |
| Стріми | `/streams/` | Streams | `/en/streams/` |
| Спікери | `/speakers` | Speakers | `/en/speakers` |
| Стати спікером | `/speak` | Become a Speaker | `/en/speak` |
| Публікації | `/posts/` | Posts | `/en/posts/` |
| Вікі | `/wiki/mission` | Wiki | `/en/wiki/mission` |
| Розклад | `/schedule` | Schedule | `/en/schedule` |
| Issues | `/issues` | Issues | `/en/issues` |

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/` | Ukrainian home page loads; the header shows all 8 UA nav items in the order from the test data |
| 2 | Click each UA nav item in turn (return to `/` between clicks is not needed) | Each click opens the target from the test data; the page has content and a heading, no 404 or blank page |
| 3 | Open `/en/` | English home page loads; the header shows all 8 EN nav items |
| 4 | Click each EN nav item in turn | Each click opens the EN target from the test data; no item leads into the UA version |

## Postconditions

- None (read-only test).

## Notes

TC-NAV-001 covers the "Стріми" item in more depth (active state, content). This case is the full sweep.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) | Pass | — | automation (supervised) |
