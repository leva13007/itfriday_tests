# Cross-browser and Responsive Checklist

Checks that the representative pages render and behave the same on every configuration from the [test plan](../cycles/2026-10-cycle-1/test-plan.md#5-environment-and-configurations). Safari (WebKit) and mobile viewports are where layouts usually differ from desktop Chrome.

| | |
|---|---|
| When | Once per cycle, after the smoke checklist passes |
| Configurations | C1 Chrome desktop · C2 Safari macOS · C3 Safari iPhone · C4 Chrome Android |
| Duration | ~30 min per configuration |
| Version | 1.0 (2026-10-07) |

**How to run:** copy to `docs/cycles/<cycle>/runs/YYYY-MM-DD-cross-browser.md`. Fill one column per configuration. Use ✅ / ❌ (bug link) / ⏭ (why skipped).

## Run header

| Config | Browser + version | Device / OS | Deploy under test | Tester | Date |
|---|---|---|---|---|---|
| C1 | | | | | |
| C2 | | | | | |
| C3 | | | | | |
| C4 | | | | | |

## A. Page rendering

For each page: loads fully, layout isn't broken (no overlapping, cut-off or overflowing elements), images and icons visible, fonts render, no horizontal scroll. Representative pages come from [test plan §4.1](../cycles/2026-10-cycle-1/test-plan.md#41-representative-pages).

| # | Page | C1 | C2 | C3 | C4 |
|---|---|---|---|---|---|
| CB-A01 | `/` | | | | |
| CB-A02 | `/en/` | | | | |
| CB-A03 | `/about` | | | | |
| CB-A04 | `/streams/` | | | | |
| CB-A05 | `/streams/<newest>` | | | | |
| CB-A06 | `/streams/001` | | | | |
| CB-A07 | `/speakers/oleh-levchenko` | | | | |
| CB-A08 | `/posts/2026-06-22-web-push-api` | | | | |
| CB-A09 | `/wiki/mission` | | | | |
| CB-A10 | `/speak` | | | | |
| CB-A11 | `/does-not-exist` (404) | | | | |
| CB-A12 | `/en/streams/<newest>` | | | | |

## B. Behaviour

| # | Check | Expected | REQ | C1 | C2 | C3 | C4 |
|---|---|---|---|---|---|---|---|
| CB-B01 | Header navigation | All 8 items reachable and working (desktop: inline; mobile: via hamburger) | REQ-002, REQ-010 | | | | |
| CB-B02 | Mobile menu | Opens and closes; tapping an item navigates and closes the menu | REQ-010 | | | | |
| CB-B03 | Language switcher | Switches to the same page in the other language | REQ-003 | | | | |
| CB-B04 | Theme toggle | Works; persists after reload | REQ-009 | | | | |
| CB-B05 | Wiki sidebar | Desktop: visible; mobile: reachable via the sidebar/menu button | REQ-006 | | | | |
| CB-B06 | Hero buttons and social icons | Tappable and open the right site | REQ-008 | | | | |
| CB-B07 | Stream cover images | Load and scale to the viewport width | REQ-010 | | | | |
| CB-B08 | Code blocks in posts | Readable; wide code scrolls inside the block, not the page | REQ-010 | | | | |
| CB-B09 | Tables in content | Fit or scroll inside their container | REQ-010 | | | | |
| CB-B10 | Back / forward buttons | Return to the previous page and its scroll position | REQ-002 | | | | |
| CB-B11 | Orientation change (C3, C4 only) | Rotating the device re-flows the layout without breaking it | REQ-010 | — | — | | |
| CB-B12 | Tap targets (C3, C4 only) | Nav items and buttons can be tapped without hitting neighbours | REQ-010, REQ-014 | — | — | | |

## Result

| Config | Passed | Failed | Skipped |
|---|---|---|---|
| C1 | | | |
| C2 | | | |
| C3 | | | |
| C4 | | | |
