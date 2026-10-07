# Documentation Map

Two kinds of documents live here. **Living documents** describe how the site is tested and change as the site and the tests change. **History** records what happened. Once a cycle, review or audit is closed, its folder or file is frozen.

## Living documents

| What | Where |
|---|---|
| Requirements (REQ-xxx) | [requirements.md](requirements.md) |
| Test strategy: approach, techniques, test oracles, defect process, risks | [test-strategy.md](test-strategy.md) |
| Test cases (TC-xxx) | [test-cases/](test-cases/README.md) |
| Checklists (masters only) | [checklists/](checklists/README.md) |
| Exploratory charter ideas | [exploratory/](exploratory/README.md) |
| Requirements ↔ test cases ↔ defects | [traceability-matrix.md](traceability-matrix.md) |
| Defect register (BUG-xxx, SUG-xxx), across all cycles | [defects/](defects/README.md) |
| Templates: test case, test plan, exploratory session, test summary report | [templates/](templates/) |
| Expected content (streams, speakers) used as a test oracle | [../test-data/](../test-data/README.md) |

## History

| What | Where |
|---|---|
| Test cycles: plan, execution, checklist runs, exploratory sessions, evidence, summary report | [cycles/](cycles/README.md) |
| Quality audits of the site, for the site owner | [audits/](audits/) |
| Document reviews | [reviews/](reviews/) |

## Rules

- **One folder per cycle**, named `YYYY-MM-cycle-N`. Everything a cycle produces goes into it: plan, runs, sessions, evidence, report. The cycle's `README.md` is its summary report.
- **A closed cycle is frozen.** New findings go into the next cycle, never back into a closed one.
- **Defects don't belong to a cycle.** They live in `defects/` until closed. Cycles link to them.
- **Only human-written documents and short summaries go into git.** Generated output (Playwright reports, traces, Lighthouse HTML) stays out: locally in ignored folders, later as CI artifacts.
- **Day-to-day automated runs are not documented here.** Their results live in the test run itself (and in CI once it exists). A cycle is the periodic, deliberate round of manual and exploratory testing plus a summary.
