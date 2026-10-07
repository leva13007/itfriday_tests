# Test Cycles

One folder per cycle. A cycle's `README.md` is its test summary report; the folder also holds its test plan, execution log, checklist runs, exploratory sessions and evidence. Closed cycles are frozen.

| Cycle | Period | Status | Result |
|---|---|---|---|
| [2026-10-cycle-1](2026-10-cycle-1/README.md) | 2026-10-07 | Closed with deviations (signed off 2026-10-07) | 33/37 executed TCs passed · 7 bugs, 5 suggestions · manual-only checks carried over |

## Starting a new cycle

1. Create `docs/cycles/YYYY-MM-cycle-N/` with `runs/`, `exploratory/`, `evidence/`.
2. Write `test-plan.md` from the [test plan template](../templates/test-plan.md): usually the changes since the last cycle and the checks carried over.
3. Run, record, report into that folder only. The report goes into the folder's `README.md`, from the [summary template](../templates/test-summary-report.md).
4. Add the cycle to the table above.
