# Lighthouse Baseline: Cycle 1

Performance baseline for [TC-PERF-001](../../../test-cases/TC-PERF-001.md) / REQ-015. Baseline only: there is no pass/fail threshold (decisions log, 2026-10-07). Later cycles compare against these numbers.

| | |
|---|---|
| Date | 2026-10-07, 11:2x UTC |
| Tool | Lighthouse 13.5.0 (CLI, `npx lighthouse@13.5.0`), Chrome 154 headless |
| Presets | Desktop: `--preset=desktop`. Mobile: default (Moto G Power emulation, simulated slow 4G) |
| Deploy under test | Tue, 06 Oct 2026 16:47:40 GMT (site commit `03ab24e`) |
| Runs | 1 per page × device. Single runs vary by a few points; the next cycle should use the median of 3 |

## Scores and metrics

| Page | Device | Perf | A11y | Best pr. | SEO | LCP | CLS | TBT | FCP | Weight | Report |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | desktop | 100 | 94 | 100 | 100 | 0.6 s | 0 | 0 ms | 0.5 s | 210 KiB | [html](2026-10-07-home-desktop.html) |
| `/` | mobile | 100 | 93 | 100 | 100 | 1.7 s | 0 | 0 ms | 1.2 s | 194 KiB | [html](2026-10-07-home-mobile.html) |
| `/streams/` | desktop | 100 | 96 | 100 | 100 | 0.4 s | 0 | 0 ms | 0.3 s | 235 KiB | [html](2026-10-07-streams-desktop.html) |
| `/streams/` | mobile | 99 | 95 | 100 | 100 | 1.7 s | 0.054 | 0 ms | 1.2 s | 211 KiB | [html](2026-10-07-streams-mobile.html) |
| `/streams/022` | desktop | 89 | 96 | 100 | 100 | 2.0 s | 0.09 | 0 ms | 0.3 s | 2134 KiB | [html](2026-10-07-streams-022-desktop.html) |
| `/streams/022` | mobile | **64** | 96 | 100 | 100 | **11.5 s** | **0.216** | 0 ms | 1.2 s | 2117 KiB | [html](2026-10-07-streams-022-mobile.html) |
| `/en/` | desktop | 100 | 94 | 100 | 100 | 0.5 s | 0 | 0 ms | 0.4 s | 207 KiB | [html](2026-10-07-en-home-desktop.html) |
| `/en/` | mobile | 100 | 93 | 100 | 100 | 1.7 s | 0 | 0 ms | 1.2 s | 164 KiB | [html](2026-10-07-en-home-mobile.html) |
| `/en/streams/` | desktop | 100 | 96 | 100 | 100 | 0.4 s | 0 | 0 ms | 0.4 s | 231 KiB | [html](2026-10-07-en-streams-desktop.html) |
| `/en/streams/` | mobile | 99 | 95 | 100 | 100 | 1.7 s | 0.054 | 0 ms | 1.2 s | 180 KiB | [html](2026-10-07-en-streams-mobile.html) |
| `/en/streams/022` | desktop | 89 | 96 | 100 | 100 | 2.0 s | 0.089 | 0 ms | 0.4 s | 2101 KiB | [html](2026-10-07-en-streams-022-desktop.html) |
| `/en/streams/022` | mobile | **65** | 96 | 100 | 100 | **11.2 s** | **0.209** | 0 ms | 1.2 s | 2057 KiB | [html](2026-10-07-en-streams-022-mobile.html) |

Core Web Vitals reference: LCP good ≤ 2.5 s, poor > 4 s · CLS good ≤ 0.1, poor > 0.25.

## Reading the baseline

- **Home and list pages are fast**: 99–100 on both devices, ~200 KiB.
- **Stream pages are ~10× heavier** (~2.1 MB) because of the cover image (`/streams/022.png`, ~1.9 MB PNG). On mobile this gives an LCP of 11+ s and a performance score in the mid-60s.
- **Layout shift on stream pages** (CLS ~0.21): the cover `<img>` has no `width`/`height`, so the content below jumps when it loads.
- Lighthouse estimates 1.8 MB of savings from image delivery (modern format, right size) and 1.9 MB from longer cache lifetimes (GitHub Pages serves with a short cache TTL).
- The accessibility score (93–96) comes from the same issues as BUG-003 (logo link name) and the moderate landmark issues. The SEO score of 100 doesn't contradict BUG-001 / SUG-001: Lighthouse checks that a description *exists*, not that it's unique.

These findings are filed as [SUG-003](../bugs/SUG-003.md): REQ-015 sets no threshold, so they aren't defects.
