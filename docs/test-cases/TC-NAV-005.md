# TC-NAV-005: Theme choice persists after reload and navigation

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
- Clean browser profile or private window (no saved theme).

## Test data

- Pages: `/`, `/about`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/` and switch to the dark theme | Page is dark |
| 2 | Reload the page (Cmd+R) | Page loads in the dark theme, with no flash of the light theme |
| 3 | Click "Про нас" in the header | `/about` opens in the dark theme |
| 4 | Switch back to the light theme and reload | Page stays light after reload |

## Postconditions

- Theme is back to light.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) | Pass · No flash observed; not measured frame by frame | — | automation (supervised) |
