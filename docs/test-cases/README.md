# Test Cases

One file per test case: `TC-<MODULE>-<NNN>.md`. Start from the [test case template](../templates/test-case.md). [`TC-NAV-001.md`](TC-NAV-001.md) shows the expected level of detail.

## Module codes

| Code | Module |
|---|---|
| `NAV` | Header navigation, logo, footer |
| `I18N` | Language switch, UA/EN parity |
| `WIKI` | Wiki section and sidebar |
| `STR` | Streams list and stream pages |
| `SPK` | Speakers list and speaker pages |
| `PST` | Posts |
| `LNK` | Broken links |
| `RSP` | Responsive / mobile |
| `VIS` | Visual regression |
| `SEO` | SEO / meta tags |
| `A11Y` | Accessibility |
| `PERF` | Performance |
| `ERR` | Error pages (404) |

## Conventions

- **Title:** a short statement of the expected behaviour, e.g. "Header 'Streams' link opens the streams list".
- **One check per TC.** If a TC needs "and" in its title, split it.
- **Priority:** High / Medium / Low, inherited from the linked REQ unless there's a reason.
- **Automation:** `candidate` (stable, repetitive, worth automating), `automated` (links to the spec file), or `manual-only` (needs human judgement, e.g. "text reads naturally").
- **Automated tests** carry the TC ID at the start of the test title (`test('TC-NAV-001 …')`), so a failing test points straight to its test case.
- When you add a TC, add it to the [traceability matrix](../traceability-matrix.md).

## Index

49 test cases · priority: 15 High, 28 Medium, 6 Low · automation: 48 automated (1 partly), 1 manual-only (TC-LNK-005: LinkedIn blocks automated requests)

Smoke is covered by the [smoke checklist](../checklists/smoke.md), not by test cases.

| ID | Title | REQ | Priority | Automation |
|---|---|---|---|---|
| [TC-NAV-001](TC-NAV-001.md) | Header "Streams" link opens the streams list (UA) | REQ-002 | High | automated |
| [TC-NAV-002](TC-NAV-002.md) | Every header nav item opens its page | REQ-002 | High | automated |
| [TC-NAV-003](TC-NAV-003.md) | Logo returns to the home page of the current language | REQ-005 | Medium | automated |
| [TC-NAV-004](TC-NAV-004.md) | Theme toggle switches between light and dark | REQ-009 | Low | automated |
| [TC-NAV-005](TC-NAV-005.md) | Theme choice persists after reload and navigation | REQ-009 | Low | automated |
| [TC-I18N-001](TC-I18N-001.md) | Language switch UA → EN keeps the user on the same home page | REQ-003 | High | automated |
| [TC-I18N-002](TC-I18N-002.md) | Language switch UA → EN keeps the user on the same streams list | REQ-003 | High | automated |
| [TC-I18N-003](TC-I18N-003.md) | Language switch UA → EN keeps the user on the same stream page | REQ-003 | High | automated |
| [TC-I18N-004](TC-I18N-004.md) | Language switch UA → EN keeps the user on the same wiki page | REQ-003 | High | automated |
| [TC-I18N-005](TC-I18N-005.md) | Every UA page has an EN counterpart and vice versa | REQ-004 | Medium | automated |
| [TC-I18N-006](TC-I18N-006.md) | Interface texts on EN pages are in English | REQ-004 | Medium | automated (partly) |
| [TC-I18N-007](TC-I18N-007.md) | Language switcher points to the counterpart on every page | REQ-003 | High | automated |
| [TC-WIKI-001](TC-WIKI-001.md) | Wiki sidebar lists all 4 documents in order | REQ-006 | Medium | automated |
| [TC-WIKI-002](TC-WIKI-002.md) | Wiki sidebar links open the right document and highlight it | REQ-006 | Medium | automated |
| [TC-WIKI-003](TC-WIKI-003.md) | Wiki sidebar is reachable on mobile | REQ-006, REQ-010 | Medium | automated |
| [TC-STR-001](TC-STR-001.md) | Streams list links to every published stream page | REQ-016 | Medium | automated |
| [TC-STR-002](TC-STR-002.md) | Stream page shows its key information | REQ-001 | High | automated |
| [TC-STR-003](TC-STR-003.md) | Speaker link on a stream page opens the right profile | REQ-007 | High | automated |
| [TC-STR-004](TC-STR-004.md) | Stream list, stream pages and speaker profiles agree on who spoke where | — (consistency) | Medium | automated |
| [TC-STR-005](TC-STR-005.md) | Streams list matches the expected streams | REQ-016 | Medium | automated |
| [TC-STR-006](TC-STR-006.md) | Every stream page matches the expected stream | REQ-016 | Medium | automated |
| [TC-STR-007](TC-STR-007.md) | Schedule page shows the next announced stream | — (consistency) | High | automated |
| [TC-SPK-001](TC-SPK-001.md) | Speakers list links to every speaker profile | REQ-016 | Medium | automated |
| [TC-SPK-002](TC-SPK-002.md) | Speaker profile links to the speaker's streams | REQ-007 | High | automated |
| [TC-SPK-003](TC-SPK-003.md) | Speakers and their profiles match the expected speakers | REQ-016 | Medium | automated |
| [TC-PST-001](TC-PST-001.md) | Posts list links to every post | REQ-016 | Medium | automated |
| [TC-LNK-001](TC-LNK-001.md) | Every page in the site map returns HTTP 200 | REQ-001, REQ-007 | High | automated |
| [TC-LNK-002](TC-LNK-002.md) | Home page hero buttons point to the community channels | REQ-008 | Medium | automated |
| [TC-LNK-003](TC-LNK-003.md) | Header social icons point to the community channels | REQ-008 | Medium | automated |
| [TC-LNK-004](TC-LNK-004.md) | External links open in a new tab | REQ-008 | Medium | automated |
| [TC-LNK-005](TC-LNK-005.md) | External links on the newest stream page resolve | REQ-008 | Medium | manual-only |
| [TC-RSP-001](TC-RSP-001.md) | Hamburger menu replaces the header nav on mobile | REQ-010 | High | automated |
| [TC-RSP-002](TC-RSP-002.md) | Tapping a mobile menu item navigates and closes the menu | REQ-010 | High | automated |
| [TC-RSP-003](TC-RSP-003.md) | Pages have no horizontal scroll at mobile width | REQ-010 | High | automated |
| [TC-VIS-001](TC-VIS-001.md) | Visual baseline of the representative pages is captured | REQ-011 | Medium | automated |
| [TC-VIS-002](TC-VIS-002.md) | Representative pages match the visual baseline | REQ-011 | Medium | automated |
| [TC-SEO-001](TC-SEO-001.md) | Every page has a unique, descriptive title | REQ-012 | Medium | automated |
| [TC-SEO-002](TC-SEO-002.md) | Every page has its own meta description | REQ-012 | Medium | automated |
| [TC-SEO-003](TC-SEO-003.md) | Page language attribute matches the content language | REQ-012 | Medium | automated |
| [TC-SEO-004](TC-SEO-004.md) | Open Graph type and image are present on every page | REQ-013 | Low | automated |
| [TC-A11Y-001](TC-A11Y-001.md) | Representative pages have no critical or serious axe violations | REQ-014 | Medium | automated |
| [TC-A11Y-002](TC-A11Y-002.md) | Skip link moves focus to the main content | REQ-014 | Medium | automated |
| [TC-A11Y-003](TC-A11Y-003.md) | Header is fully operable with the keyboard | REQ-014 | Medium | automated |
| [TC-A11Y-004](TC-A11Y-004.md) | Images have a text alternative | REQ-014 | Medium | automated |
| [TC-A11Y-005](TC-A11Y-005.md) | Text has sufficient colour contrast in code blocks and the hero button | REQ-014 | Medium | automated |
| [TC-PERF-001](TC-PERF-001.md) | Lighthouse baseline is recorded for key pages | REQ-015 | Low | automated |
| [TC-PERF-002](TC-PERF-002.md) | Page and image weight is recorded for every page | REQ-015 | Low | automated |
| [TC-ERR-001](TC-ERR-001.md) | Unknown URL shows a 404 page with a way back home | REQ-017 | Low | automated |
| [TC-ERR-002](TC-ERR-002.md) | Repo files are not published as pages | — (proposed REQ-025) | Medium | automated |
