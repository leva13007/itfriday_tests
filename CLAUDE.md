# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What This Is

QA project for the live site https://itfriday.community (VitePress, UA at `/`, EN at `/en/`, GitHub Pages). The site source is a separate public repo: https://github.com/leva13007/itfriday.community. Read it (clone or browse on GitHub) to understand pages and config, but never change it from here.

**Never reference local machine paths** (home directories, absolute paths, temp folders) in this repo. Everyone reading it has access to the public repos and the live site only.

**Purpose:** a complete, end-to-end QA project for a real website. It should read as a full walkthrough of the testing process: analysis → planning → design → manual execution → bug reporting → automation.

## Phases

The source of truth is **`ROADMAP.md`**: 0 Init → 1 Test documentation → 2 Manual execution → 3 Automation basics → 4 Automation coverage → 5 CI/reporting (undecided) → 6 Polish and publish.

- **Do not write test code or add package.json/Playwright before phase 3.**
- A phase starts only when the previous phase's "done when" is met.
- When a milestone is finished, tick it in `ROADMAP.md` and update the current-phase line.
- In phase 3, keep code simple and readable: flat tests first, Page Object Model only in phase 4.

## Rules

- All QA docs and READMEs are in **English**.
- Write every doc and (later) all code complete and finished, not as placeholders or homework.
- Keep everything explainable: no unexplained magic, and every doc says *why*, not just *what*.
- **No meta-commentary in the repo.** Docs and code must read as a normal professional QA project. Don't mention who the project is for, learning goals, portfolios or onboarding.
- Target environment is **production only**. Tests must be read-only, with no load or stress testing against the live site.
- Test case IDs follow `TC-<MODULE>-<NNN>`, requirements `REQ-<NNN>`, bugs = GitHub Issue numbers. Module codes are listed in `docs/test-cases/README.md`.
- Every TC links to at least one REQ and has an `Automation` field (`candidate` / `automated` / `manual-only`).
- When a TC, REQ or bug is added, update `docs/traceability-matrix.md` in the same change.
- Bug reports use `.github/ISSUE_TEMPLATE/bug_report.md`.
- Keep `README.md` "where I left off" / "next step" current (one next step only).
- Never read or commit `.env` files.
- Never commit local paths (`~/…`, `/Users/…`, temp folders). Refer to the public site repo by its GitHub URL.
