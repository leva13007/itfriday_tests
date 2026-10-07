# TC-NAV-001: Header "Streams" link opens the streams list (UA)

*Example test case showing the expected level of detail.*

| Field | Value |
|---|---|
| Module | NAV |
| Requirement | REQ-002 |
| Priority | High |
| Type | Functional |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site https://itfriday.community is available.
- Desktop browser, viewport ≥ 1280px wide (so the full header menu is visible, not the hamburger).

## Test data

- Start URL: `https://itfriday.community/`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open the start URL | The Ukrainian home page loads. The header shows the nav menu. |
| 2 | Click **Стріми** in the header menu | The URL changes to `/streams/`. The streams list page is shown. |
| 3 | Look at the header menu | The **Стріми** item is shown as active. |
| 4 | Look at the page content | A list of stream entries is shown, with no error or empty state. |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| | | | | |
