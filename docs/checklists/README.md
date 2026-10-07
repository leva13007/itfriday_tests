# Checklists

Checklists are lighter than test cases: one line per check, no detailed steps. Use them for broad, repeatable sweeps where a full TC would be overkill.

## Planned

| File | Purpose | When to run |
|---|---|---|
| `smoke.md` | 5–10 minute sanity check that the site is alive and the main paths work | After every site deploy |
| `cross-browser.md` | Key pages × browsers/devices from the test plan | Once per cycle |
| `links.md` | Internal links on every page, external links (social + newest stream pages) | Once per cycle |
| `a11y.md` | Keyboard navigation, focus, alt text, contrast, axe scan | Once per cycle |
| `seo.md` | Title, meta description, `lang`, OG tags, headings | Once per cycle |

## Format

```markdown
# Smoke checklist

| Date | Browser | Tester |
|---|---|---|
| YYYY-MM-DD | | |

| # | Check | REQ | Result | Bug |
|---|---|---|---|---|
| 1 | Home page (UA) loads | REQ-001 | ✅ / ❌ | |
| 2 | ... | | | |
```
