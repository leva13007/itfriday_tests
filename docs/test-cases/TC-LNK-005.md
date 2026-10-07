# TC-LNK-005: External links on the newest stream page resolve

| Field | Value |
|---|---|
| Module | LNK |
| Requirement | REQ-008 |
| Priority | Medium |
| Type | Functional |
| Automation | manual-only |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.

## Test data

- Page: `/streams/022` (replace with the newest stream when a newer one is published)

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open the newest stream page | Page loads |
| 2 | Open every external link in the content (YouTube, guest LinkedIn, resources) | Each opens a real page: no 404, no "video unavailable", no "profile not found" |
| 3 | Repeat on the EN version | Same results |

## Postconditions

- None (read-only test).

## Notes

Kept manual: third-party sites (LinkedIn especially) block automated requests, so an automated check would give false failures.

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) + curl | Pass · YouTube 022: scheduled live; LinkedIn checked in a browser | — | automation (supervised) |
