# TC-LNK-003: Header social icons point to the community channels

| Field | Value |
|---|---|
| Module | LNK |
| Requirement | REQ-008 |
| Priority | Medium |
| Type | Functional |
| Automation | automated ([`tests/content.spec.ts`](../../tests/content.spec.ts)) |
| Author | |
| Created | 2026-10-07 |

## Preconditions

- The site is available (`/` returns 200).
- Desktop browser (C1), window ≥ 1280px wide, so the full header menu is visible.

## Test data

- YouTube → `https://youtube.com/@zloyleva`; LinkedIn → `https://www.linkedin.com/company/it-friday/`; Telegram → `https://t.me/+QRJNFfHaLxMwYzcy`

## Steps

| # | Action | Expected result |
|---|---|---|
| 1 | Open `/` | Header shows YouTube, LinkedIn and Telegram icons |
| 2 | Hover each icon | Each URL matches the test data |
| 3 | Repeat on `/en/` | Same 3 icons with the same targets |

## Postconditions

- None (read-only test).

## Execution history

| Date | Browser / device | Result | Bug | Tester |
|---|---|---|---|---|
| 2026-10-07 | Chrome 154 / macOS (C1) | Pass | — | automation (supervised) |
