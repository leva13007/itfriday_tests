# TC-LNK-002: Home page hero buttons point to the community channels

| Field | Value |
|---|---|
| Module | LNK |
| Requirement | REQ-008 |
| Priority | Medium |
| Type | Functional |
| Automation | candidate |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.

## Test data

| Button | Expected target |
|---|---|
| YouTube Live → | `https://youtube.com/@zloyleva` |
| LinkedIn | `https://www.linkedin.com/company/it-friday/` |
| Telegram | `https://t.me/+QRJNFfHaLxMwYzcy` |
| Discord | `https://discord.gg/ZpWpDQq2EP` |

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/` | Hero shows 4 buttons |
| 2 | Hover each button and read the URL in the status bar | Each URL matches the test data |
| 3 | Click each button | The target site opens: the channel, the company page, the Telegram invite and the Discord invite are valid (not expired or deleted) |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) + curl | Pass · Telegram invite valid (124 members), Discord invite valid, no expiry | — | automation (supervised) |
