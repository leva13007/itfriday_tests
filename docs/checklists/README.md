# Checklists

Checklists are lighter than test cases: one line per check, no detailed steps. Use them for broad, repeatable sweeps where a full TC would be overkill.

## Checklists

| File | Purpose | When to run | Duration |
|---|---|---|---|
| [`smoke.md`](smoke.md) | Sanity check that the site is up and the main paths work; GO / NO-GO gate | Every deploy, every Friday/Saturday in a cycle | ~10 min |
| [`cross-browser.md`](cross-browser.md) | Representative pages × configurations C1–C4; rendering and behaviour | Once per cycle | ~30 min per config |
| [`links.md`](links.md) | All pages respond; navigation, content and external links | Once per cycle, plus after deploys that add pages | ~45 min |
| [`a11y.md`](a11y.md) | axe scan, keyboard, structure, contrast, VoiceOver (WCAG 2.2 AA basics) | Once per cycle | ~60 min |
| [`seo.md`](seo.md) | Title, description, `lang`, Open Graph; required vs advisory checks | Once per cycle | ~40 min |

## How to run

The files above are the **masters**. Don't fill them in directly.

1. Copy the master to `runs/YYYY-MM-DD-<checklist>[-<config>].md`, e.g. `runs/2026-10-19-smoke-C1.md`.
2. Fill in the run header, including the deploy under test (`last-modified` of `/`).
3. Mark each check ✅ pass · ❌ fail (link the GitHub Issue) · ⏭ skipped (say why) · ⚠️ unverified (links only).
4. Fill in the result table and commit the run file.

## Runs

| Date | Checklist | Config | Result |
|---|---|---|---|
| 2026-10-07 | [Smoke](runs/2026-10-07-smoke-C1.md) | C1 | 15/15 ✅ GO |

## Check IDs

Each check has a stable ID (`S-07`, `L-C03`, `A11Y-B02`, `SEO-A06` …) that bug reports and the traceability matrix refer to. When a master changes, keep existing IDs and add new ones at the end. Never renumber.
