# Review: Phase 1 Test Documentation

Static review of the complete phase 1 documentation set before the entry gate of cycle 1. The goal is consistency: documents must agree with each other and with requirements v1.0, and every reference must resolve.

| | |
|---|---|
| Date | 2026-10-07 |
| Type | Document review (static testing) |
| Scope | `README.md`, `ROADMAP.md`, `CLAUDE.md`, `docs/**`, `.github/ISSUE_TEMPLATE/**` at commit `60f433c` |
| Baseline | [Requirements v1.0](../requirements.md) |
| Outcome | **Passed with fixes.** 9 findings: 8 fixed, 1 deferred |

## 1. Automated consistency checks

Run with a short script over all Markdown files in the repo.

| # | Check | Result |
|---|---|---|
| A-1 | Every relative link points to an existing file | ✅ 0 broken |
| A-2 | Every `#anchor` link points to an existing heading | ✅ 0 broken |
| A-3 | Every `REQ-NNN` mentioned exists in requirements v1.0 | ✅ (only the template placeholder `REQ-000`) |
| A-4 | Every `TC-…` mentioned exists as a file | ✅ (only the template placeholder `TC-XXX-000`) |
| A-5 | Every TC appears in the traceability matrix, in the row of each requirement it names | ✅ 40/40 |
| A-6 | Every requirement has at least one TC or checklist | ✅ 17/17 |

## 2. Manual review checklist

| # | Question | Result |
|---|---|---|
| M-1 | Do the strategy, plan and roadmap describe the same phases and order? | ✅ after R-03 |
| M-2 | Do the plan's scope, configurations and representative pages match the checklists and TCs? | ✅ after R-01, R-04 |
| M-3 | Are numbers (pages, streams, speakers, posts) the same everywhere and correct for the build under test? | ✅ after R-02 |
| M-4 | Can every expected result be checked objectively (no "works fine", "looks good")? | ✅ |
| M-5 | Does every TC have preconditions, test data and an expected result per step? | ✅ |
| M-6 | Is every process the strategy describes actually supported by the tooling? | ✅ after R-05, R-06 |
| M-7 | Do the docs reflect what was actually done, including dates? | ✅ after R-07 |
| M-8 | Are all mandatory TC fields filled in? | ⚠️ R-08, deferred |

## 3. Findings

Severity: **Major** = would cause a wrong test result or a process that can't be followed · **Minor** = inconsistency that could confuse · **Trivial** = wording.

| ID | Document | Finding | Severity | Resolution | Status |
|---|---|---|---|---|---|
| R-01 | Test plan §7 | Exit criteria require ≥ 90% of Medium TCs "on C1", but TC-VIS-002 can't run in cycle 1 (no baseline yet), and the RSP/WIKI-003 cases need a mobile configuration | Major | Criteria now say "on C1 or the configuration the TC names" and exclude TC-VIS-002 from cycle 1 | ✅ Fixed |
| R-02 | Requirements, live check log | "23 stream files, 3 post files" counted the list pages as content pages, so the numbers didn't match the site map (22 streams, 2 posts) | Minor | Reworded as "22 stream pages + list" etc. | ✅ Fixed |
| R-03 | Roadmap, phase 2 | "Execute all TCs on the primary browser" contradicts the plan's exit criteria and configuration-specific TCs | Minor | Now refers to the plan's exit criteria | ✅ Fixed |
| R-04 | Exploratory README | Charter list didn't say which sessions belong to cycle 1. The plan (§4.2) fixes 3 of them | Minor | README points to plan §4.2; the list is the pool for later cycles | ✅ Fixed |
| R-05 | Strategy §7 | The defect lifecycle has 8 statuses, but GitHub Issues only has open/closed. There was no way to record "Confirmed" or "Verified" | Major | Added a mapping of statuses to labels (`status: …`, `wontfix` / `duplicate` / `invalid`) | ✅ Fixed |
| R-06 | Strategy §7, SEO checklist | `enhancement` issues were required for advisory findings, but there was no template for them | Minor | Added `.github/ISSUE_TEMPLATE/improvement_suggestion.md` and linked it | ✅ Fixed |
| R-07 | Test plan §10 | The schedule showed test design ending 2026-10-17; it was finished on 2026-10-07 | Minor | Added an "Actual" column. Later the dated schedule was replaced by an order of execution (plan §10), see the git history | ✅ Fixed |
| R-08 | All 40 TCs | `Author` field is empty | Trivial | To be filled with the author's name before the entry gate | ⏳ Deferred |
| R-09 | README | Repo structure didn't list `docs/reviews/` | Trivial | Added | ✅ Fixed |

## 4. Observations (not findings)

Spotted while reading the live site during test design. They are **not** reported yet: they will be confirmed or rejected by test execution in cycle 1, through the cases named below.

| Observation | Will be checked by |
|---|---|
| The same meta description seems to be used on every page | TC-SEO-002, SEO-A |
| The "Skip to content" link appears in English on Ukrainian pages | TC-I18N-006, A11Y-B01 |
| No `og:title`, `canonical`, `hreflang`; `/robots.txt` and `/sitemap.xml` return 404 | SEO-B, SEO-C (advisory) |

## 5. Conclusion

The documentation set is internally consistent and traceable to requirements v1.0. Roadmap item 1.7 is complete. One trivial item (R-08) remains open and doesn't block the entry gate.
