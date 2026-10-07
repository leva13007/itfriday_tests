# TC-NAV-004: Theme toggle switches between light and dark

| Field | Value |
|---|---|
| Module | NAV |
| Requirement | REQ-009 |
| Priority | Low |
| Type | UI |
| Automation | automated ([`tests/navigation.spec.ts`](../../tests/navigation.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.
- The OS theme is set to Light (System Settings → Appearance), so the site starts in light mode.

## Test data

- Page: `/`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/` | Page is shown in the light theme; the logo is the dark-on-light variant (`logo-dark.png`) |
| 2 | Click the theme toggle in the header | Page switches to the dark theme: dark background, light text; the logo switches to `logo-light.png` |
| 3 | Click the theme toggle again | Page returns to the light theme and the original logo |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) | Pass · OS theme was Dark, so the run started dark; both directions verified | — | automation (supervised) |
