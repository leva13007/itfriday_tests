# Traceability Matrix

Links requirements to test cases and bugs, so you can see at a glance what is covered and what isn't.

Update it whenever a REQ, TC or bug is added.

| REQ | Requirement (short) | Test cases | Checklists | Bugs | Coverage |
|---|---|---|---|---|---|
| REQ-001 | All pages return 200 | | smoke, links (A), seo (C03) | | 🟡 partial |
| REQ-002 | Header nav works | [TC-NAV-001](test-cases/TC-NAV-001.md) | smoke, cross-browser, links (B) | | 🟡 partial |
| REQ-003 | Language switch keeps page | | smoke, cross-browser | | 🟡 partial |
| REQ-004 | UA/EN parity | | links (A03, C08) | | 🟡 partial |
| REQ-005 | Logo → home | | smoke, links (B04) | | 🟡 partial |
| REQ-006 | Wiki sidebar | | smoke, cross-browser, links (B03) | | 🟡 partial |
| REQ-007 | No internal 404s | | links (A–C) | | 🟡 partial |
| REQ-008 | External links reachable | | smoke, links (D) | | 🟡 partial |
| REQ-009 | Theme toggle | | smoke, cross-browser | | 🟡 partial |
| REQ-010 | Mobile layout | | smoke, cross-browser, a11y (D04) | | 🟡 partial |
| REQ-011 | No visual regressions | | | | ❌ none |
| REQ-012 | Title/description/lang | | seo (A), a11y (C01, C06) | | 🟡 partial |
| REQ-013 | OG tags | | seo (A) | | 🟡 partial |
| REQ-014 | a11y | | a11y (A–E) | | 🟡 partial |
| REQ-015 | Performance | | | | ❌ none |
| REQ-016 | Lists link to all detail pages | | smoke, links (C02, C04, C06) | | 🟡 partial |
| REQ-017 | 404 page | | smoke, seo (C05) | | 🟡 partial |

Coverage: ✅ full · 🟡 partial · ❌ none

A requirement is ✅ only when it has both checklist coverage and at least one test case where the strategy calls for one. Until the test cases are written (roadmap 1.5), checklist-only coverage counts as 🟡.
