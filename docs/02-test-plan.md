# Test Plan: itfriday.community, Cycle 1

The concrete plan for the first full test cycle: what is tested, on which browsers, in what order, and when the cycle counts as done. The structure follows IEEE 829 / ISO/IEC/IEEE 29119-3, simplified for a small static site. The general approach is defined in the [test strategy](01-test-strategy.md) and isn't repeated here.

| | |
|---|---|
| Version | 1.0 |
| Date | 2026-10-07 |
| Cycle | 1 (first full cycle: manual execution) |
| Related | [Requirements v1.0](requirements.md), [Test Strategy v1.0](01-test-strategy.md), [Traceability matrix](traceability-matrix.md), [Roadmap](../ROADMAP.md) |

## 1. Objectives

1. Verify the live site against all 17 requirements of [requirements v1.0](requirements.md).
2. Find and report defects before they are noticed by visitors.
3. Validate the test cases and checklists themselves. Cases that turn out unclear or wrong are fixed before anything is automated.
4. Record baselines for performance (Lighthouse) and for the visual state of key pages. Later cycles compare against these.

## 2. Test items

| Item | Version |
|---|---|
| Site | https://itfriday.community (production) |
| Build under test at cycle start | Site repo commit `03ab24e` ("complete 022"), deployed 2026-10-06 16:47 GMT |
| Generator | VitePress 1.6.x on GitHub Pages |

The site gets a new stream page before every Friday stream, so it **will** change during the cycle. Handling: every test run records the deploy date it ran against (the `last-modified` response header of `/`). After each deploy the smoke checklist is re-run. Test cases already passed are only re-run if the deploy touched their area.

## 3. Scope

### 3.1 In scope

All requirements of v1.0, on both language versions (UA and EN):

| Area | Requirements | Covered by |
|---|---|---|
| Availability | REQ-001, REQ-017 | Smoke checklist, TC-LNK-001, TC-STR-002, TC-ERR-001 |
| Navigation | REQ-002, REQ-005, REQ-006 | TC-NAV, TC-WIKI |
| Internationalisation | REQ-003, REQ-004 | TC-I18N |
| Links | REQ-007, REQ-008 | TC-LNK, link checklist |
| Content lists | REQ-016 | TC-STR, TC-SPK, TC-PST |
| Theme | REQ-009 | TC-NAV |
| Responsive | REQ-010 | TC-RSP, cross-browser checklist |
| Visual | REQ-011 | TC-VIS (baseline only in this cycle) |
| SEO | REQ-012, REQ-013 | SEO checklist, TC-SEO |
| Accessibility | REQ-014 | a11y checklist, TC-A11Y |
| Performance | REQ-015 | Lighthouse runs (baseline only, TC-PERF) |

### 3.2 Out of scope

| Item | Reason |
|---|---|
| Load, stress and security testing | See the strategy: production only, static site |
| Proofreading and translation quality | Content author's responsibility. A *missing* translation is in scope |
| Content of embedded or external pages (YouTube videos, Telegram, LinkedIn) | Third-party. We only check that the link resolves |
| Firefox, Edge, Samsung Internet | Browser scope agreed as Chrome and Safari (decisions log, 2026-10-07) |
| Automated tests | Planned for roadmap phases 3–4. This cycle is manual |
| Visual comparison between builds | No previous baseline exists yet. This cycle *creates* it |

## 4. Test approach for this cycle

All execution is manual, using browser developer tools and `curl` where noted.

| Activity | What exactly | Output |
|---|---|---|
| **Smoke** | Smoke checklist on Chrome desktop, at cycle start and after every deploy | Filled checklist |
| **Functional** | All test cases, executed on the primary configuration (C1) | Execution history in each TC |
| **Cross-browser / responsive** | Cross-browser checklist on the representative pages (below) × all configurations | Filled checklist |
| **Links** | Internal: every page from the site map plus in-content links on the representative pages. External: social links plus links in the newest 3 stream pages | Link checklist, bug reports |
| **SEO** | SEO checklist on the representative pages, both languages | Filled checklist |
| **Accessibility** | a11y checklist (keyboard, focus, alt text, contrast) plus an axe DevTools scan on the representative pages | Filled checklist, axe results |
| **Performance** | Lighthouse (desktop and mobile presets) on the home page, the streams list and the newest stream page, in both languages | Scores recorded in the summary report |
| **Visual baseline** | Full-page screenshots of the representative pages on C1 and C3 | Screenshots stored in the cycle's report folder |
| **Exploratory** | At least 3 sessions, see §4.2 | Session notes |

### 4.1 Representative pages

Pages of the same type share one template (strategy §5, equivalence partitioning). Deep checks run on one representative per type. Cheap checks (HTTP status, language counterpart) run on every page.

| Page type | Representative (UA) | Why this one |
|---|---|---|
| Home | `/` | Entry point |
| Static | `/about` | Typical text page |
| List | `/streams/` | Longest list, changes weekly |
| Stream detail (newest) | `/streams/022` | Newest content is the most likely to be broken |
| Stream detail (oldest) | `/streams/001` | Checks that old content isn't broken by template changes |
| Speaker detail | `/speakers/oleh-levchenko` | Has the most linked streams |
| Post detail | `/posts/2026-06-22-web-push-api` | Longer article with code and media |
| Wiki | `/wiki/mission` | Only page type with a sidebar |
| Form-like / CTA | `/speak` | Main call to action for new speakers |
| Error | an unknown URL, e.g. `/does-not-exist` | 404 page |

Each one is also checked at its EN counterpart (`/en/...`). When stream 023 is published during the cycle, it replaces 022 as "newest".

### 4.2 Exploratory sessions

| # | Charter | Time box |
|---|---|---|
| 1 | Explore the global UI (mobile menu, search, 404 page, footer) to discover behaviour the requirements don't describe | 60 min |
| 2 | Explore language switching on every page type to discover missing counterparts and wrong redirects | 60 min |
| 3 | Explore the site on a real iPhone (Safari) to discover layout, tap target and menu issues | 60 min |

Optional, if time allows: keyboard-only navigation; stream and speaker pages for broken embeds and images.

## 5. Environment and configurations

| ID | Browser | Device / OS | Viewport | Priority | Scope |
|---|---|---|---|---|---|
| **C1** | Chrome (latest stable) | Desktop, macOS | 1440×900 | **High**: primary | Everything |
| **C2** | Safari (latest stable) | Desktop, macOS | 1440×900 | High | Smoke + cross-browser checklist |
| **C3** | Safari (iOS, latest) | iPhone, real device; Xcode iOS Simulator as fallback | 390×844 | High | Smoke + cross-browser + responsive TCs |
| **C4** | Chrome (latest stable) | Android, real device; Chrome DevTools device mode as fallback | 412×915 | Medium | Cross-browser checklist |

- Exact browser and OS versions are recorded in each execution record, not here, because "latest" changes during the cycle.
- Browser state: clean profile or private window, no extensions except axe DevTools. Default theme (system), cache disabled when checking freshness after a deploy.
- Network: normal broadband. Lighthouse uses its own throttling presets.

## 6. Entry criteria

Execution starts when all of these are true:

- [x] Requirements v1.0 frozen (2026-10-07)
- [ ] Test cases exist for every High and Medium requirement, and have been reviewed (roadmap 1.5)
- [ ] Smoke, cross-browser, links, a11y and SEO checklists written (roadmap 1.4)
- [ ] Traceability matrix complete, with no High requirement uncovered (roadmap 1.6)
- [ ] The live site responds (`/` returns 200)
- [ ] Configurations C1–C3 are available

## 7. Exit criteria

The cycle is complete when:

- [ ] 100% of High-priority and ≥ 90% of Medium-priority test cases executed on C1
- [ ] All checklists executed on their configurations
- [ ] At least 3 exploratory sessions completed and written up
- [ ] Every failed test has a linked bug report (or a documented reason, e.g. a test case defect that was fixed)
- [ ] No open **Critical** bugs. Any open **Major** bug is acknowledged by the site owner with a plan
- [ ] Performance and visual baselines recorded
- [ ] Test summary report written and the traceability matrix updated

Leaving with known open bugs is allowed: the summary report lists them with severity and status.

## 8. Suspension and resumption criteria

| Suspend when | Resume when |
|---|---|
| The site is down or returns server errors on the home page | Home page returns 200 again; then re-run smoke |
| A deploy happens mid-run | Deploy has finished (new `last-modified`); re-run smoke, then continue |
| A Critical bug blocks a whole area (e.g. navigation doesn't render) | Fix deployed; blocked TCs are marked `Blocked` until then, other areas continue |
| External links fail en masse (rate limiting / bot protection) | Wait, then retest manually from a normal browser before reporting |

## 9. Deliverables

| Deliverable | Location |
|---|---|
| Test cases with execution history | [`docs/test-cases/`](test-cases/) |
| Filled checklists | [`docs/checklists/`](checklists/) (one copy per run, dated) |
| Exploratory session notes | [`docs/exploratory/`](exploratory/) |
| Bug reports | GitHub Issues, label `bug` |
| Visual baseline screenshots, Lighthouse reports | `docs/reports/cycle-1/` |
| Updated traceability matrix | [`docs/traceability-matrix.md`](traceability-matrix.md) |
| Test summary report | `docs/reports/YYYY-MM-DD-cycle-1.md` |

## 10. Schedule

Planned dates. They move if the previous step finishes late. Effort is in focused working sessions (~2 h each).

| Activity | Roadmap | Planned start | Planned end | Effort |
|---|---|---|---|---|
| Test plan | 1.3 | 2026-10-07 | 2026-10-07 | 1 |
| Checklists | 1.4 | 2026-10-08 | 2026-10-09 | 2 |
| Test cases | 1.5 | 2026-10-09 | 2026-10-16 | 5 |
| Traceability + docs review | 1.6, 1.7 | 2026-10-16 | 2026-10-17 | 1 |
| **Entry gate** | | 2026-10-19 | | |
| Smoke + functional execution (C1) | 2 | 2026-10-19 | 2026-10-23 | 3 |
| Cross-browser, a11y, SEO, performance, visual baseline | 2 | 2026-10-21 | 2026-10-27 | 3 |
| Exploratory sessions | 2 | 2026-10-19 | 2026-10-28 | 2 |
| Bug retests | 2 | as fixes land | 2026-10-29 | 1 |
| Test summary report | 2 | 2026-10-29 | 2026-10-30 | 1 |

Stream days (Fridays) usually bring a deploy, so a smoke run is planned for every Friday and Saturday of the cycle.

## 11. Roles

| Role | Responsibility |
|---|---|
| QA engineer | Writes and executes tests, reports and retests bugs, writes the summary report |
| Site owner | Answers requirement questions, triages and fixes bugs in the site repo, deploys |

## 12. Risks and contingencies

Cycle-specific risks. General project risks are in the [strategy](01-test-strategy.md#8-risks).

| Risk | Likelihood | Impact | Contingency |
|---|---|---|---|
| Weekly deploys change pages under test | High | Medium | Record the deploy per run; smoke after each deploy; representative "newest stream" moves with releases |
| No real iPhone or Android device available | Low | Medium | Simulator / DevTools device mode, with the limitation noted in the report |
| Third-party sites block link checks | Medium | Low | Retest manually; report as "unverified" rather than as a bug |
| Bug fixes depend on the site owner's availability | Medium | Medium | Exit criteria allow open non-critical bugs with acknowledgement |
| Test design takes longer than planned | Medium | Low | Prioritise TCs for High requirements; Medium ones can be finished during execution |

## 13. Approval

| Role | Name | Date |
|---|---|---|
| QA engineer | | |
| Site owner | | |
