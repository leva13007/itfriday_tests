# Exploratory session: language switching

| | |
|---|---|
| Date | 2026-10-07 |
| Tester | Browser automation (Claude in Chrome) + HTML analysis, supervised |
| Duration | 60 min (planned) / ~5 min (actual: scripted sweep) |
| Environment | Chrome 154, macOS; pages rendered in a 1440 px same-origin iframe |
| Deploy | Tue, 06 Oct 2026 16:47:40 GMT (site commit `03ab24e`) |

## Charter

Explore **language switching on every page type** with **a full sweep of the switcher target on all pages, plus untranslated-text detection** to discover **missing counterparts, wrong redirects and translation gaps**.

## Notes

- **Switcher target on all 82 pages** (41 UA → EN, 41 EN → UA): the language switcher points to the exact counterpart on **82/82** pages ✅. The test cases covered 4 page types. This sweep covers every page.
- **404 page.** On `/does-not-exist` the switcher points to `/en/does-not-exist.html`, which is the EN 404 page. Reasonable ✅.
- **Anchors.** Switching from `/streams/022#ресурси` lands on `/en/streams/022.html` at the top of the page. The anchor is lost because EN headings have different IDs (`#resources`). Expected given translated headings, minor UX observation.
- **Untranslated text.** Scanned the content of all 41 EN pages for Cyrillic. One page has some: `/en/streams/001` quotes the community-name options from a vote ("ІТ П'ятниця", "Свої в ІТ"). Intentional, not a defect ✅. No untranslated passages found.
- **Interface texts** in English on UA pages: already reported as BUG-002, not repeated.
- **Data parity UA ↔ EN** (dates, YouTube IDs, speakers on all 22 streams): identical ✅ (see the global UI session).

## Bugs found

None new.

## Questions / observations

- Anchor not preserved on language switch: could be improved by keeping heading IDs language-neutral, but this is a nice-to-have, not filed.

## Follow-up

- The switcher-target sweep is cheap and catches any future page added in one language only. Candidate for automation in phase 4 (extends TC-I18N-001…004 to every page).
