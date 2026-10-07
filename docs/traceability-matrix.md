# Traceability Matrix

Links requirements to test cases and bugs, so you can see at a glance what is covered and what isn't.

Update it whenever a REQ, TC or bug is added.

| REQ | Requirement (short) | Test cases | Checklists | Bugs | Coverage |
|---|---|---|---|---|---|
| REQ-001 | All pages return 200 | [TC-LNK-001](test-cases/TC-LNK-001.md), [TC-STR-002](test-cases/TC-STR-002.md) | smoke, links (A), seo (C03) |  | ✅ passed |
| REQ-002 | Header nav works | [TC-NAV-001](test-cases/TC-NAV-001.md), [TC-NAV-002](test-cases/TC-NAV-002.md) | smoke, cross-browser, links (B) |  | ✅ passed |
| REQ-003 | Language switch keeps page | [TC-I18N-001](test-cases/TC-I18N-001.md), [TC-I18N-002](test-cases/TC-I18N-002.md), [TC-I18N-003](test-cases/TC-I18N-003.md), [TC-I18N-004](test-cases/TC-I18N-004.md), [TC-I18N-007](test-cases/TC-I18N-007.md) | smoke, cross-browser |  | ✅ passed |
| REQ-004 | UA/EN parity | [TC-I18N-005](test-cases/TC-I18N-005.md), [TC-I18N-006](test-cases/TC-I18N-006.md) | links (A03, C08) | [BUG-002](reports/cycle-1/bugs/BUG-002.md) | ❌ failed |
| REQ-005 | Logo → home | [TC-NAV-003](test-cases/TC-NAV-003.md) | smoke, links (B04) |  | ✅ passed |
| REQ-006 | Wiki sidebar | [TC-WIKI-001](test-cases/TC-WIKI-001.md), [TC-WIKI-002](test-cases/TC-WIKI-002.md), [TC-WIKI-003](test-cases/TC-WIKI-003.md) | smoke, cross-browser, links (B03) |  | ✅ passed |
| REQ-007 | No internal 404s | [TC-LNK-001](test-cases/TC-LNK-001.md), [TC-SPK-002](test-cases/TC-SPK-002.md), [TC-STR-003](test-cases/TC-STR-003.md) | links (A–C) |  | ✅ passed |
| REQ-008 | External links reachable | [TC-LNK-002](test-cases/TC-LNK-002.md), [TC-LNK-003](test-cases/TC-LNK-003.md), [TC-LNK-004](test-cases/TC-LNK-004.md), [TC-LNK-005](test-cases/TC-LNK-005.md) | smoke, links (D) | [BUG-005](reports/cycle-1/bugs/BUG-005.md) | ❌ failed (links checklist) |
| REQ-009 | Theme toggle | [TC-NAV-004](test-cases/TC-NAV-004.md), [TC-NAV-005](test-cases/TC-NAV-005.md) | smoke, cross-browser |  | ✅ passed |
| REQ-010 | Mobile layout | [TC-RSP-001](test-cases/TC-RSP-001.md), [TC-RSP-002](test-cases/TC-RSP-002.md), [TC-RSP-003](test-cases/TC-RSP-003.md), [TC-WIKI-003](test-cases/TC-WIKI-003.md) | smoke, cross-browser, a11y (D04) |  | ✅ passed |
| REQ-011 | No visual regressions | [TC-VIS-001](test-cases/TC-VIS-001.md), [TC-VIS-002](test-cases/TC-VIS-002.md) |  |  | ✅ passed (automated baseline 2026-10-07) |
| REQ-012 | Title/description/lang | [TC-SEO-001](test-cases/TC-SEO-001.md), [TC-SEO-002](test-cases/TC-SEO-002.md), [TC-SEO-003](test-cases/TC-SEO-003.md) | seo (A), a11y (C01, C06) | [BUG-001](reports/cycle-1/bugs/BUG-001.md) | ❌ failed |
| REQ-013 | OG tags | [TC-SEO-004](test-cases/TC-SEO-004.md) | seo (A) |  | ✅ passed |
| REQ-014 | a11y | [TC-A11Y-001](test-cases/TC-A11Y-001.md), [TC-A11Y-002](test-cases/TC-A11Y-002.md), [TC-A11Y-003](test-cases/TC-A11Y-003.md), [TC-A11Y-004](test-cases/TC-A11Y-004.md) | a11y (A–E) | [BUG-003](reports/cycle-1/bugs/BUG-003.md), [BUG-004](reports/cycle-1/bugs/BUG-004.md) | ❌ failed |
| REQ-015 | Performance | [TC-PERF-001](test-cases/TC-PERF-001.md) |  | [SUG-003](reports/cycle-1/bugs/SUG-003.md) (suggestion) | ✅ passed (baseline recorded) |
| REQ-016 | Lists link to all detail pages | [TC-PST-001](test-cases/TC-PST-001.md), [TC-SPK-001](test-cases/TC-SPK-001.md), [TC-STR-001](test-cases/TC-STR-001.md) | smoke, links (C02, C04, C06) |  | ✅ passed |
| REQ-017 | 404 page | [TC-ERR-001](test-cases/TC-ERR-001.md) | smoke, seo (C05) |  | ✅ passed |

## Defects without a requirement

Found by exploratory testing with the consistency oracle (see the strategy §7). Each proposes a new requirement.

| Bug | Found in | Proposed requirement |
|---|---|---|
| [BUG-006](reports/cycle-1/bugs/BUG-006.md) | Exploratory: global UI; now covered by [TC-STR-004](test-cases/TC-STR-004.md) | Speaker profiles list every stream the speaker took part in |
| [BUG-007](reports/cycle-1/bugs/BUG-007.md) | Exploratory: global UI | REQ-022: the schedule page shows the next announced stream |

Coverage after cycle 1, test case execution on C1 (2026-10-07):
✅ passed: all linked TCs passed · ❌ failed: at least one linked TC failed · 🟡 partly executed: some TCs blocked or not run · ⏳ not executed

Checklist runs on 2026-10-07 (links, SEO, a11y) are included: REQ-008 failed in the links checklist (BUG-005). The cross-browser checklist is still to run.
