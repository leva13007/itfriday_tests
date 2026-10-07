# Requirements

The site has no formal specification, so these requirements are **derived** from the live site, its source config and common web standards. Each requirement is testable and has a stable ID.

> Status: **frozen v1.0** (2026-10-07). Derived from the [site source](https://github.com/leva13007/itfriday.community) and verified against the live site (see the live check log). Any change after this point bumps the version and must be reflected in the traceability matrix.

## Site map (as of 2026-10-07)

| Section | UA path | EN path | Notes |
|---|---|---|---|
| Home | `/` | `/en/` | |
| About | `/about` | `/en/about` | |
| Streams list | `/streams/` | `/en/streams/` | |
| Stream pages | `/streams/001` … `/streams/022` | `/en/streams/001` … `/en/streams/022` | A new page is added before each Friday stream (022 = 2026-10-09) |
| Speakers list | `/speakers` | `/en/speakers` | |
| Speaker pages | `/speakers/<slug>` (5) | `/en/speakers/<slug>` (5) | |
| Become a speaker | `/speak` | `/en/speak` | |
| Posts list | `/posts/` | `/en/posts/` | |
| Post pages | `/posts/<date-slug>` (2) | `/en/posts/<date-slug>` (2) | |
| 404 page | any unknown URL | | Returns HTTP 404 with title `404 \| ІТ П'ятниця` |
| Wiki | `/wiki/mission`, `values`, `formats`, `governance` | `/en/wiki/...` | Has a sidebar |
| Schedule | `/schedule` | `/en/schedule` | |
| Issues | `/issues` | `/en/issues` | |

URLs work both with and without `.html` (`/streams/022` and `/streams/022.html` both return 200).

Global elements: header with logo (light/dark variants), 8 nav items, language switcher, theme (dark/light) toggle, social links (YouTube, LinkedIn, Telegram), footer.

## Requirements

Priority: **High** = the site is unusable or embarrassing without it · **Medium** = noticeable defect · **Low** = cosmetic.

| ID | Area | Requirement | Priority |
|---|---|---|---|
| REQ-001 | Availability | Every page in the site map returns HTTP 200 and renders its content | High |
| REQ-002 | Navigation | Each header nav item opens the correct page, in both languages | High |
| REQ-003 | i18n | The language switcher moves between the UA and EN version of the *same* page | High |
| REQ-004 | i18n | Every UA page has an EN counterpart and vice versa | Medium |
| REQ-005 | Navigation | Clicking the logo returns to the home page of the current language | Medium |
| REQ-006 | Navigation | The wiki sidebar lists all 4 documents and highlights the current one | Medium |
| REQ-007 | Links | Internal links don't lead to 404 | High |
| REQ-008 | Links | External links (YouTube, LinkedIn, Telegram, others in content) are reachable | Medium |
| REQ-009 | Theme | The dark/light toggle works and the logo switches variants | Low |
| REQ-010 | Responsive | Layout is usable at mobile width, including the hamburger menu and no horizontal scroll | High |
| REQ-011 | Visual | Pages show no unexpected visual changes between releases | Medium |
| REQ-012 | SEO | Every page has a unique `<title>`, a meta description and a correct `lang` attribute | Medium |
| REQ-013 | SEO | Open Graph tags are present (`og:type`, `og:image`) | Low |
| REQ-014 | a11y | Pages have no critical/serious axe violations; images have alt text; navigation works by keyboard | Medium |
| REQ-015 | Performance | Lighthouse scores (performance, accessibility, best practices, SEO) are recorded as a baseline for key pages; no pass/fail target yet | Low |
| REQ-016 | Content | Stream and speaker list pages link to every existing detail page | Medium |
| REQ-017 | Errors | A non-existent URL shows a 404 page with a way back home | Low |

## Live check log

| Date | Check | Result |
|---|---|---|
| 2026-10-07 | HTTP status of all 82 pages from the site source (41 UA + 41 EN) | ✅ 82/82 → 200 |
| 2026-10-07 | Unknown URL | ✅ 404 with a 404 page |
| 2026-10-07 | UA/EN page parity in the source | ✅ identical per language: 22 stream pages + list, 5 speaker pages + list, 2 posts + list, 4 wiki pages |

## Decisions

| Date | Question | Decision |
|---|---|---|
| 2026-10-07 | Performance target? | Record a baseline only, no pass/fail threshold (REQ-015) |
| 2026-10-07 | Which browsers? | Chrome and Safari, desktop and mobile (see the test plan) |

## Open questions

- ~~Not yet checked on the live site: mobile menu, search, 404 home link.~~ Resolved 2026-10-07: mobile menu works (smoke, RSP-001); **there is no site search** (exploratory session "global UI", SUG-005); the 404 page links home (TC-ERR-001).
