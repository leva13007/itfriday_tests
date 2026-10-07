# Smoke Checklist

A 10-minute sanity check that the site is up and its main paths work. A failure here means: stop, report, and don't start deeper testing on this build.

| | |
|---|---|
| When | Start of every cycle, after every site deploy, every Friday and Saturday during a cycle |
| Configuration | C1 (Chrome desktop). C2/C3 when the cross-browser checklist calls for it |
| Duration | ~10 min |
| Version | 1.0 (2026-10-07) |

**Automated:** all 15 checks run as [`tests/smoke.spec.ts`](../../tests/smoke.spec.ts) (`npm run test:smoke`). The manual procedure below stays valid, for example on a real device.

**How to run manually:** copy this file to `docs/cycles/<cycle>/runs/YYYY-MM-DD-smoke-<config>.md`, fill in the header, then mark each line ✅ pass, ❌ fail (link the bug) or ⏭ skipped (say why).

## Run header

| Date | Config | Browser version | Deploy under test (`last-modified` of `/`) | Tester |
|---|---|---|---|---|
| | | | | |

Get the deploy timestamp with: `curl -sI https://itfriday.community/ | grep -i last-modified`

## Checks

| # | Check | Expected | REQ | Result | Bug / note |
|---|---|---|---|---|---|
| S-01 | Open `/` | Page loads; hero shows "ІТ П'ятниця" and the stream time line | REQ-001 | | |
| S-02 | Open `/en/` | Page loads; hero shows "IT Friday" | REQ-001 | | |
| S-03 | Look at the header on `/` | Logo, 8 nav items, language switcher and theme toggle are visible | REQ-002 | | |
| S-04 | Click through all 8 nav items on `/` | Each opens its page; no 404 or blank page | REQ-002 | | |
| S-05 | On `/streams/`, switch the language to English | You land on `/en/streams/`, not on the EN home page | REQ-003 | | |
| S-06 | Look at the streams list | The newest stream (highest number) is listed | REQ-016 | | |
| S-07 | Open the newest stream page | Title, date, cover image and YouTube link are shown | REQ-001, REQ-007 | | |
| S-08 | Open `/speakers` and then any speaker | Both pages load; the speaker page shows name and links | REQ-001, REQ-016 | | |
| S-09 | Open `/wiki/mission` | Page loads with a sidebar listing 4 documents | REQ-006 | | |
| S-10 | Click the logo from any inner page | Returns to `/` | REQ-005 | | |
| S-11 | Toggle the theme twice | Switches dark ↔ light and back; the logo variant changes | REQ-009 | | |
| S-12 | Resize to 390px wide (DevTools device mode) | Hamburger menu appears, opens and shows the nav items; no horizontal scroll | REQ-010 | | |
| S-13 | Open `/does-not-exist` | HTTP 404 page with a "home" link | REQ-017 | | |
| S-14 | Check the DevTools console on `/` and the newest stream page | No errors (red messages) | REQ-001 | | |
| S-15 | Hover the hero buttons on `/` | YouTube, LinkedIn, Telegram and Discord buttons point to real URLs | REQ-008 | | |

## Result

| Passed | Failed | Skipped | Verdict |
|---|---|---|---|
| | | | **GO** / **NO-GO** for further testing |

NO-GO if any of S-01 … S-04, S-07 or S-14 fail.
