# Onboarding

Start here if you are new to the project. This page explains how the project works as a whole: what we test, how the pieces connect, how to run the tests, and how to do the everyday tasks. You don't need to read the rest of the repo first. Each section ends with links to go deeper when you need to.

Plan for about an hour: 20 minutes of reading, 10 minutes of setup, then a first run and a look around.

## 1. What we test

**The site.** [itfriday.community](https://itfriday.community) is the public website of the IT Friday community: weekly live streams, speakers, posts and a small wiki.

| | |
|---|---|
| Built with | [VitePress](https://vitepress.dev): Markdown files turned into a static site, with Vue in the browser |
| Hosted on | GitHub Pages |
| Languages | Ukrainian at `/` (default), English at `/en/`. Almost every page exists in both |
| Environment | **Production only.** There is no staging or test copy of the site |
| Source code | Public: [github.com/leva13007/itfriday.community](https://github.com/leva13007/itfriday.community). We read it to understand the pages, we never change it from here |

**What is special about it.** A new stream page appears every week, so the site keeps growing. That is why many checks discover the pages themselves instead of using a fixed list (see "crawler" in the [glossary](#7-glossary)).

**Why "production only" matters to you.** Every test runs against the real site that real people use. So all tests are **read-only** (they only open pages and read them), the suite runs with only 2 parallel workers, and we never run load or stress tests.

## 2. How the project is organised

The project follows the usual testing process, and each step leaves a document behind:

```
 Analyse            Plan              Design                Execute               Report             Automate
requirements  →  strategy,      →  test cases,      →  test cycle:         →  bug reports    →  Playwright tests
(REQ-001…)       test plan          checklists          runs, exploratory      (BUG-001…)          (tests/*.spec.ts)
                                                         sessions
                        └──────────── traceability matrix connects REQ ↔ TC ↔ BUG ────────────┘
```

The whole project rests on a chain of IDs. Learn it first:

| ID | What it is | Lives in | Example |
|---|---|---|---|
| `REQ-NNN` | A requirement: something the site must do | [`requirements.md`](requirements.md) | REQ-003: switching the language keeps you on the same page |
| `TC-<MODULE>-NNN` | A test case: one check with exact steps and the expected result | [`test-cases/`](test-cases/README.md) | TC-I18N-003: switching UA → EN on a stream page opens the same stream in English |
| Check ID (`S-07`, `L-C12`, …) | One line of a checklist: a short check with no detailed steps | [`checklists/`](checklists/README.md) | S-07 in the smoke checklist |
| `BUG-NNN`, `SUG-NNN` | A defect, or an improvement suggestion (not a defect) | [`defects/`](defects/README.md) | BUG-007: the schedule page doesn't show the next stream |

Every test case links to at least one requirement, and every automated test starts its title with a TC or check ID. So from any failing test you can follow the chain: test → test case → requirement → known bugs. The [traceability matrix](traceability-matrix.md) shows the whole chain in one table.

### Two kinds of documents

| Living documents | History |
|---|---|
| Describe how we test **now**. Updated in place | Record what **happened**. Frozen once closed |
| Requirements, strategy, test cases, checklists, defect register, matrix, templates | Test cycles in [`cycles/`](cycles/README.md), audits, reviews |

A **test cycle** is a planned round of manual and exploratory testing that ends with a summary report. Each cycle has one folder, `cycles/YYYY-MM-cycle-N/`. When the cycle is closed, nobody edits that folder again. New findings go into the next cycle. Defects are the exception: they stay in [`defects/`](defects/README.md) across all cycles until they are closed.

Day-to-day automated runs are **not** written up anywhere. Their result is the test run itself.

→ Deeper: [`docs/README.md`](README.md) (map of all documents), [`test-strategy.md`](test-strategy.md) (why we test this way).

## 3. Set up and run the tests

You need [Node.js](https://nodejs.org) 22.18 or newer and git.

```bash
git clone git@github.com:leva13007/itfriday_tests.git
cd itfriday_tests
npm ci                                       # install the exact versions from package-lock.json
npx playwright install chromium webkit       # download the test browsers (once)

npm run test:smoke                           # a quick first run: the smoke tests only
npm test                                     # the whole suite, about a minute
npm run report                               # open the HTML report of the last run
```

### How to read the result

A healthy run ends with something like `87 passed, 9 skipped`. Two things confuse everyone at first:

- **Red `✘` lines in a "passed" run.** These are **expected failures**: tests for bugs that are known and still open, marked with `test.fail()`. The test fails because the bug is still there, and Playwright counts that as a pass. When someone fixes the bug, the test starts passing, Playwright reports *that* as a failure ("expected to fail, but passed"), and we know it's time to close the bug. More in [§6](#6-everyday-tasks).
- **Skipped tests.** Some tests only make sense in one setup. For example, `@mobile` tests are skipped in the desktop project, and TC-STR-007 is skipped when no upcoming stream is announced.

A **real failure** is shown as `failed` in the summary line. Then open the report (`npm run report`): each failed test has the error, a screenshot and a trace (a step-by-step recording you can replay).

### Test projects

`playwright.config.ts` defines three "projects", which are the same tests run in different browsers:

| Project | What it emulates | Runs |
|---|---|---|
| `desktop-chrome` | Chrome on a 1440×900 desktop | everything except `@mobile` |
| `mobile-chrome` | Pixel 7 (Android) | only tests tagged `@mobile` |
| `mobile-safari` | iPhone 13 (WebKit engine) | only tests tagged `@mobile` |

Emulation is close to a real phone, but it is not a real device. Real-device checks are done by hand in the cycles.

→ Deeper: the [README](../README.md#running-the-automated-tests) lists every command, including Lighthouse (performance).

## 4. How the test code is built

```
tests/
  *.spec.ts            the tests, one file per area (smoke, navigation, content, a11y, …)
  fixtures.ts          what every test receives: page objects + a page that waits for the site to load
  pages/               page objects: one class per page type (StreamPage, Header, …)
  support/
    site-map.ts        the crawler: finds every page of the site
    test-data.ts       loads the expected content from test-data/
    representative-pages.ts   one page of each type, for the slow, deep checks
test-data/             the content oracle: streams.json, speakers.json
```

A typical test looks like this:

```ts
import { test, expect } from './fixtures';           // always from ./fixtures, not from @playwright/test

test('TC-STR-002 Stream page shows its key information', async ({ streamPage }) => {
  await streamPage.goto('022');                       // the page object knows the URL
  await expect(streamPage.heading).toHaveText(/^#022 — /);   // the assertion stays in the test
});
```

Four ideas explain almost everything in `tests/`:

1. **Page objects.** `streamPage` is an object that knows *where things are* on a stream page (its locators). The test only says *what should be true*. When the site's HTML changes, you fix one page object instead of twenty tests.
2. **Wait for hydration.** The server sends ready HTML, then Vue starts in the browser and makes it interactive ("hydration"). A click that happens before that can be lost. The `page` fixture in `fixtures.ts` makes every `page.goto()` wait for Vue. Never remove it.
3. **Find elements the way users do.** Prefer `getByRole('link', { name: 'Стріми' })` over CSS classes, because roles and names are what people and screen readers see. Use a CSS selector only when there is no accessible handle, with a comment explaining why.
4. **Three ways to choose pages.** Cheap checks run on **every page** (the crawler finds them). Slow checks (accessibility scans, screenshots) run on **representative pages**, one of each type. Content checks compare the site with the **oracle** in `test-data/`.

→ Deeper: the test code conventions in [`CLAUDE.md`](../CLAUDE.md#test-code-conventions) (they apply to people too).

## 5. Rules you must not break

| Rule | Why |
|---|---|
| Tests are read-only, 2 workers, no load loops | We test the real production site |
| Never edit `test-data/*.json` to make a test pass | It is the expected truth, owned by the site owner. If it disagrees with the site, decide which one is wrong (or ask the owner) |
| Never update visual baselines without looking at every changed image | A baseline updated blindly hides exactly the bug the test should catch |
| Never commit `.env` files or local paths (`/Users/…`, `~/…`) | Secrets, and paths that mean nothing on another machine |
| Never edit a closed cycle folder | It is history. New findings go into the next cycle |
| All docs and code in English | One language for everyone who reads the repo |
| Before every commit: `npm run typecheck` and `npm test` | A commit should never break the suite |

## 6. Everyday tasks

### You found a bug

1. **Reproduce it** at least twice, and note the exact URL, browser, viewport and language.
2. **Check that it is new**: search the [defect register](defects/README.md).
3. **Bug or suggestion?** If the site does something wrong (it breaks a requirement, or it contradicts itself), it is a bug. If it works but could be better, it is a suggestion (`SUG`).
4. **Write it up** using the [bug report template](../.github/ISSUE_TEMPLATE/bug_report.md): steps, expected vs. actual result, severity and priority, evidence. Add it to the register and file it as a GitHub Issue with the same template.
5. **Link it**: in the test case that found it, and in the [traceability matrix](traceability-matrix.md).

**Severity vs. priority** is a classic interview question, and we use both. *Severity* is how badly the bug hurts users. *Priority* is how soon it must be fixed. They differ: BUG-007 is Minor (a wrong sentence on one page) but High priority (people read that page in the days right before a stream). Definitions are in [strategy §7](test-strategy.md#7-defect-management).

### You want to add a test case

1. Copy [`templates/test-case.md`](templates/test-case.md) to `test-cases/TC-<MODULE>-<NNN>.md`. Module codes and the next free numbers are in the [test case index](test-cases/README.md).
2. One check per test case. If the title needs "and", split it in two.
3. Link at least one `REQ`, and set `Automation` to `candidate`, `automated` or `manual-only`.
4. Add a row to the index and update the counts at the top. Add the TC to the [traceability matrix](traceability-matrix.md) in the same change.

### You want to automate a test case

1. Find the spec file for its area (`tests/<area>.spec.ts`).
2. Start the title with the ID: `test('TC-XXX-NNN <title>', …)`.
3. Put new locators into a page object in `tests/pages/`, and keep the assertions in the test.
4. If the test covers a bug that is still open, mark it as an expected failure:
   ```ts
   test.info().annotations.push({ type: 'issue', description: 'BUG-007' });
   test.fail();
   ```
5. Run it and check that it **fails for the right reason**. A test that fails on a typo in a locator looks the same as a test that fails on the bug. Read the error message, and try the locator on a page where the element does exist.
6. In the TC file, set `Automation` to `automated` with a link to the spec.

### A known bug got fixed

The run reports a test as "expected to fail, but passed". Then:
1. Check the site by hand: is it really fixed?
2. Remove `test.fail()` and the `issue` annotation from the test (and any exclusion added for the bug, e.g. in `tests/a11y.spec.ts`).
3. Record the retest in the bug and in the TC's execution history, then close the bug.

### A new stream was published

Usually nothing breaks: the crawler finds the new page by itself. The oracle tests (TC-STR-005/006) fail until the new stream is in `test-data/streams.json`. The site owner adds it there, ideally before publishing.

### The site's look changed on purpose

The screenshot tests (`@visual`) fail. Run `npm run test:visual:update`, open **every** changed image in `tests/visual.spec.ts-snapshots/`, and commit only the ones you have checked.

## 7. Glossary

| Term | Meaning here |
|---|---|
| **Requirement (REQ)** | Something the site must do, written so that it can be checked |
| **Test case (TC)** | One check with preconditions, exact steps and the expected result |
| **Checklist** | A list of short checks without detailed steps, e.g. the smoke checklist. Faster to run than test cases |
| **Smoke test** | A quick check that the main things work at all. If smoke fails, deeper testing is pointless |
| **Exploratory testing** | Testing without a script: learning the site and designing checks as you go, within a time box and a goal (a "charter") |
| **Test cycle** | A planned round of testing with a plan at the start and a summary report at the end |
| **Oracle** | Whatever tells you what the right result is: a requirement, a standard (WCAG), the expected data in `test-data/`, or another page of the same site |
| **Consistency oracle** | The site compared with itself. If two pages state different facts, one of them is a bug, even when no requirement covers it |
| **Crawler** | `tests/support/site-map.ts`: starts at `/` and `/en/`, follows every internal link, and so finds every page, including new streams |
| **Representative pages** | One page of each type (home, a stream, a speaker, a post, …), used for slow checks |
| **Page object** | A class that knows where things are on one type of page |
| **Fixture** | Something Playwright prepares and hands to each test, e.g. `page` or `streamPage` |
| **Hydration** | Vue taking over the static HTML in the browser and making it interactive |
| **Expected failure** | A test marked with `test.fail()` because a known bug makes it fail. It turns "red" when the bug is fixed |
| **Baseline** | A saved "approved" result to compare against: screenshots for visual tests, scores for Lighthouse |
| **Visual regression** | An unintended change in how a page looks, found by comparing screenshots with the baseline |
| **axe** | A tool that scans a page for accessibility problems (WCAG rules) |
| **Lighthouse** | Google's tool that scores a page for performance, accessibility, best practices and SEO |
| **LCP / CLS** | Largest Contentful Paint: when the main content appears. Cumulative Layout Shift: how much the page jumps while it loads |
| **Traceability** | Being able to go from a requirement to its tests and bugs, and back |

## 8. Your first week

| Day | Read | Do |
|---|---|---|
| 1 | This page; [`requirements.md`](requirements.md) | Set up, run `npm test`, open the report, and find one expected failure. Follow its chain: test → TC → REQ → bug |
| 2 | [`test-strategy.md`](test-strategy.md) | Run the [smoke checklist](checklists/smoke.md) by hand on your phone. Compare what you see with what the automated smoke tests check |
| 3 | The last [cycle report](cycles/README.md) and two or three [bug reports](defects/README.md) | Reproduce one open bug by hand |
| 4 | `tests/fixtures.ts`, one page object, one spec file | Break a test on purpose (change an expected text), read the failure in the report, then revert |
| 5 | [`exploratory/`](exploratory/README.md) charter ideas | Do a 30-minute exploratory session on one area and write down what you found |

## 9. Where to ask

- **What the site *should* do, or which data is correct:** the site owner (also the maintainer of `test-data/`).
- **What is planned next:** [`ROADMAP.md`](../ROADMAP.md) and the "next step" in the [README](../README.md#next-step).
- **Something in this guide is wrong or unclear:** fix it in the same change where you found out. This guide is a living document.
