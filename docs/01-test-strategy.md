# Test Strategy

*The high-level "how and why" of testing itfriday.community. It changes rarely. The [test plan](02-test-plan.md) covers the concrete "what and when".*

> Status: **draft skeleton**. Fill in each section. The hints in *italics* can be deleted once a section is written.

## 1. Purpose and context

*What the product is, who uses it, and why testing it matters. Keep it to 3–5 sentences.*

## 2. Quality goals

*What "good quality" means for this site. For example: always available, no broken links, works on mobile, accessible, both languages complete.*

## 3. Test levels and types

| Type | In scope? | How |
|---|---|---|
| Smoke | Yes | *checklist, run after every site release* |
| Functional (navigation, i18n) | Yes | *test cases* |
| Link checking | Yes | |
| Visual regression | Yes | |
| Cross-browser / responsive | Yes | |
| Accessibility | Yes | |
| SEO | Yes | |
| Performance | Yes (baseline) | |
| Exploratory | Yes | *time-boxed sessions with charters* |
| Load / stress | **No** | *production only, so we must not load the live site* |
| Security | **No** | *static site, out of scope* |

## 4. Approach: manual → automation

*Explain the flow: requirements → test cases → manual run → bugs → pick stable, repetitive TCs → automate them with Playwright. Also say which TCs stay manual-only and why.*

## 5. Test design techniques

*Which techniques you use and where. For example: equivalence partitioning (page types), checklist-based testing, error guessing, exploratory testing.*

## 6. Environments and tools

| Item | Value |
|---|---|
| Environment | Production, https://itfriday.community |
| Browsers | *TBD in the plan* |
| Test management | Markdown in this repo |
| Bug tracking | GitHub Issues |
| Automation (phase 2) | Playwright + TypeScript |
| Other tools | *DevTools, Lighthouse, axe DevTools, …* |

## 7. Defect management

*Bug lifecycle (New → Confirmed → Fixed → Verified → Closed / Rejected), severity and priority definitions, and who fixes bugs (the site owner).*

## 8. Risks

*What could make testing harder or less useful. For example: production-only environment, content changes weekly, no formal requirements.*
