# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What This Is

QA project for the live site https://itfriday.community (VitePress, UA at `/`, EN at `/en/`, GitHub Pages). The site source lives in a separate repo: https://github.com/leva13007/itfriday.community. Read it to understand pages and config, but never change it from here.

**Purpose: a portfolio project for a junior QA engineer** who comes from manual QA and doesn't code yet. Oleh builds it here first, then she reproduces it in her own repo. Optimise for an honest, defendable portfolio that shows the process.

## Phases

The source of truth is **`ROADMAP.md`**: 0 Init → 1 Test documentation → 2 Manual execution → 3 Automation basics → 4 Automation coverage → 5 CI/reporting (undecided) → 6 Handover.

- **Do not write test code or add package.json/Playwright before phase 3.**
- A phase starts only when the previous phase's "done when" is met.
- When a milestone is finished, tick it in `ROADMAP.md` and update the current-phase line.
- In phase 3, keep it beginner-friendly: flat tests first, Page Object Model only in phase 4.

## Rules

- All QA docs and READMEs are in **English**.
- Help, don't replace: provide scaffolding, templates and examples, and review her work. Don't mass-generate finished test cases unless explicitly asked.
- Target environment is **production only**. Tests must be read-only, with no load or stress testing against the live site.
- Test case IDs follow `TC-<MODULE>-<NNN>`, requirements `REQ-<NNN>`, bugs = GitHub Issue numbers. Module codes are listed in `docs/test-cases/README.md`.
- Every TC links to at least one REQ and has an `Automation` field (`candidate` / `automated` / `manual-only`).
- When a TC, REQ or bug is added, update `docs/traceability-matrix.md` in the same change.
- Bug reports use `.github/ISSUE_TEMPLATE/bug_report.md`.
- Keep `README.md` "where I left off" / "next step" current (one next step only).
- Never read or commit `.env` files.
