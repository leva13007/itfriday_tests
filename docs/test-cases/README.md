# Test Cases

One file per test case: `TC-<MODULE>-<NNN>.md`. Start from [`_template.md`](_template.md). [`TC-NAV-001.md`](TC-NAV-001.md) is a worked example.

## Module codes

| Code | Module |
|---|---|
| `SMK` | Smoke |
| `NAV` | Header navigation, logo, footer |
| `I18N` | Language switch, UA/EN parity |
| `WIKI` | Wiki section and sidebar |
| `STR` | Streams list and stream pages |
| `SPK` | Speakers list and speaker pages |
| `PST` | Posts |
| `LNK` | Broken links |
| `RSP` | Responsive / mobile |
| `VIS` | Visual regression |
| `SEO` | SEO / meta tags |
| `A11Y` | Accessibility |
| `PERF` | Performance |

## Conventions

- **Title:** a short statement of the expected behaviour, e.g. "Header 'Streams' link opens the streams list".
- **One check per TC.** If a TC needs "and" in its title, split it.
- **Priority:** High / Medium / Low, inherited from the linked REQ unless there's a reason.
- **Automation:** `candidate` (stable, repetitive, worth automating), `automated`, or `manual-only` (needs human judgement, e.g. "text reads naturally").
- When you add a TC, add it to the [traceability matrix](../traceability-matrix.md).

## Index

| ID | Title | REQ | Priority | Automation |
|---|---|---|---|---|
| [TC-NAV-001](TC-NAV-001.md) | Header "Streams" link opens the streams list (UA) | REQ-002 | High | candidate |
