# Quality Audit: itfriday.community

| | |
|---|---|
| Date | 2026-10-07 |
| Site version | Deploy of Tue, 06 Oct 2026 16:47 GMT (site commit `03ab24e`) |
| Based on | [Cycle 1 test summary](2026-10-07-cycle-1.md), the automated suite (84 Playwright tests + Lighthouse CI), 2 exploratory sessions |
| Audience | Site owner |

## Verdict

**A solid site with a few rough edges.** Everything a visitor relies on works: all 82 pages load, navigation and language switching are correct on every page, and all 83 external links (YouTube, Telegram, Discord, LinkedIn, slides) are alive. Home and list pages are fast. The weak spots are not in how the site works, but in how it is **finished and maintained**:

1. **Accessibility:** the home link in the header has no name for screen readers, on every page.
2. **Localisation:** the Ukrainian site shows the theme's interface texts in English.
3. **Content kept by hand in several places:** two facts already went out of sync (the schedule page, a speaker profile).
4. **Stream pages are slow on phones:** ~2 MB cover images; the main image appears after ~11 s on a mobile connection.

None of these is critical. Most are fixed by a few lines of site configuration.

## Scorecard

| Area | Rating | In one line | Evidence |
|---|---|---|---|
| Functionality and navigation | 🟢 Good | 82/82 pages load; menus, logo, sidebar, language switcher and 404 page all work, on desktop and mobile | [TC execution](cycle-1/2026-10-07-execution-C1.md), `tests/navigation`, `tests/site-map` |
| Links | 🟢 Good | 562 anchors, 29 images, 13 slide files and 83 external links work; one `chrome://` link can't be opened | [Links run](../checklists/runs/2026-10-07-links.md), [BUG-005](cycle-1/bugs/BUG-005.md) |
| Content integrity | 🟡 Fair | Facts that live in several places drift apart: the schedule page and one speaker profile are out of date | [BUG-006](cycle-1/bugs/BUG-006.md), [BUG-007](cycle-1/bugs/BUG-007.md) |
| Localisation (UA / EN) | 🟡 Fair | Content is complete in both languages on every page; interface texts on UA pages are English | [BUG-002](cycle-1/bugs/BUG-002.md), [language session](../exploratory/2026-10-07-language-switching.md) |
| Accessibility | 🟡 Fair | Keyboard, skip link, headings, zoom and reflow are fine; the logo link has no name and code blocks have low contrast | [BUG-003](cycle-1/bugs/BUG-003.md), [BUG-004](cycle-1/bugs/BUG-004.md), [a11y run](../checklists/runs/2026-10-07-a11y.md) |
| SEO and link previews | 🟡 Fair | Titles and languages are correct; every page has the same description, and shared stream links show the logo instead of the cover | [BUG-001](cycle-1/bugs/BUG-001.md), [SUG-001](cycle-1/bugs/SUG-001.md) |
| Performance | 🟡 Fair | Home and lists score 99–100; stream pages score 61–66 on mobile (LCP ~11 s, layout shift ~0.2) | [Lighthouse baseline](cycle-1/lighthouse/README.md), [SUG-003](cycle-1/bugs/SUG-003.md) |
| Hosting basics | 🟡 Fair | HTTPS works but isn't enforced: `http://` pages are served unencrypted | [SUG-002](cycle-1/bugs/SUG-002.md) |

## What works well

- **Reliability.** No broken pages, no console errors, no broken internal links or anchors.
- **Bilingual parity.** Every page exists in both languages, the switcher lands on the right counterpart on all 82 pages, and no content is left untranslated. Dates, speakers and video links agree between UA and EN for all 22 streams.
- **Living links.** Community invites (Telegram, Discord), the question form and all 23 stream videos work.
- **Mobile layout.** No horizontal scrolling at 320–390 px; tables and code scroll inside their own boxes.
- **Speed where it matters most.** The home page and the streams list load in under 2 s on a mobile connection.

## Top risks

| # | Risk | Who is affected | Why it matters |
|---|---|---|---|
| 1 | The schedule page says the next stream is unannounced, while #022 (9 Oct) is announced everywhere else | Anyone checking when the next stream is | It is the page people open right before a stream |
| 2 | The logo link has no accessible name on every page | Screen reader users | The main "home" control is announced as an unlabelled link |
| 3 | Facts are entered by hand on the list, the stream page and the speaker profile | Every visitor, over time | Two facts already drifted; every new stream adds three places to update |
| 4 | Stream pages take ~11 s to show their main image on mobile | Most visitors, who arrive from Telegram or YouTube on a phone | First impression of the stream they wanted to see |
| 5 | English interface texts on the Ukrainian site | Ukrainian-speaking visitors | Looks unfinished |

## Action plan

### Wave 1: before the next stream (9 Oct)

| Action | Fixes | Effort |
|---|---|---|
| Update the schedule page to show #022 | BUG-007 | minutes |

### Wave 2: quick wins (site configuration and small content fixes)

| Action | Fixes | Effort |
|---|---|---|
| Give the logo a text alternative (`logo.alt` in the VitePress config) | BUG-003 | minutes |
| Translate the theme's interface texts in the UA locale config (outline, pager, skip link, 404, menu labels) | BUG-002 | ~1 h |
| Turn on "Enforce HTTPS" in the GitHub Pages settings | SUG-002 | minutes |
| Add #012 to the speaker profile; show `chrome://webrtc-internals` as code instead of a link | BUG-006, BUG-005 | minutes |
| Add a `description` to the frontmatter of each page (start with streams and speakers) | BUG-001 | ~2 h for existing pages, then part of every new page |

### Wave 3: structural improvements

| Action | Fixes | Effort |
|---|---|---|
| Serve covers as WebP at display size, with `width`/`height` | SUG-003 | ~2 h + a step in publishing |
| Per-page Open Graph data (stream cover in link previews), sitemap, canonical, hreflang | SUG-001 | ~half a day |
| **Keep stream and speaker facts in one place** and generate the list, stream headers and profiles from it | Root cause of BUG-006 / BUG-007 | ~1 day |
| `/wiki/` index page; built-in local search | SUG-004, SUG-005 | ~1–2 h each |
| Higher-contrast code highlighting theme | BUG-004 | ~1 h |

## Keeping quality up

- **After every deploy:** `npm test` in the testing repo (84 tests, ~1 min). It covers every page, both languages, desktop and mobile, accessibility, screenshots, and the expected content.
- **When publishing a stream:** add it to `test-data/streams.json`, update the schedule page, and update the speakers' profiles. The tests then confirm the site matches.
- **Next:** run the tests automatically on every site deploy (CI), so problems are reported without anyone having to remember.

## Limits of this audit

- **One point in time:** the site as deployed on 6 Oct 2026, production only.
- **Not covered:** real Safari, iPhone and Android devices (emulation only), and screen reader (VoiceOver) use. Keyboard use was tested with automation.
- **Content verdict is provisional:** the expected-content data (`test-data/`) was generated from the site and is waiting for the site owner's review. Until then, content checks can only find inconsistencies, not facts that are wrong everywhere.
- Wording and translation quality were out of scope.
