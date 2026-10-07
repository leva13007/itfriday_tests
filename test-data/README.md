# Test data: the source of truth

These files are the **test oracle** for stream and speaker content: what the site *should* show, maintained independently of the site. Tests compare the live site against them in both directions: everything here must be on the site with the same values, and the site must not show streams or speakers that aren't here.

| File | Contents |
|---|---|
| [`streams.json`](streams.json) | Every stream: number, date, title (UA/EN, as on the stream page), topic (UA/EN, as in the streams list), speakers, YouTube ID |
| [`speakers.json`](speakers.json) | Every speaker: slug, name (UA/EN), LinkedIn |

Which streams a speaker took part in is **not** stored in `speakers.json`. It is derived from `streams.json`, so the oracle itself has only one place for that fact.

## Why a separate file

The other checks compare the site with itself (the list vs. the stream pages vs. the profiles). They can't notice a stream or speaker that is missing, or a date that is wrong, *everywhere at once*. This file is a second, independent record, like double-entry bookkeeping: a fact is entered twice on purpose, so a mismatch shows up.

## Status

> **Draft.** Generated from the live site on 2026-10-07 (`"reviewed": false`), so it currently contains whatever the site shows, **including its mistakes**. It becomes the source of truth only after the site owner reviews it and sets `"reviewed": true`, `"reviewedBy"` and `"reviewedOn"` in both files.

## How to maintain

- **Before publishing a new stream**, add it to `streams.json` (and the guest to `speakers.json`, if new). After the deploy, `npm test` confirms the site matches.
- If the site and this file disagree, decide which one is wrong. Fix the site (a bug) or this file (a data error). Never edit this file just to make a test pass.

## Review checklist

Tick each row after checking it against what actually happened. ⚠️ = the stream page title differs from the topic in the streams list; decide which is right (both are stored: `title` and `listTopic`).

### Streams

| # | Date | Title (UA, stream page) | Speakers | YouTube | OK |
|---|---|---|---|---|---|
| 001 | 2026-05-15 | Запускаємо українське IT-ком'юніті з нуля | Олег Левченко | `wht8lf-h9N8` | ☐ |
| 002 | 2026-05-22 | React 19.2: <Activity /> + AI Language Teacher | Олег Левченко, Олександр Блажейко | `R5IXxa1e8K4` | ☐ |
| 003 | 2026-05-29 | uWebSockets.js + React Conf 2025: useEffectEvent | Олег Левченко, Олександр Блажейко | `7wR_NxpsSFw` | ☐ |
| 004 | 2026-06-05 | uWebSockets.js Security + React Performance Tracks | Олег Левченко, Олександр Блажейко | `Pad_b_yQyt8` | ☐ |
| 005 | 2026-06-12 | CTO, метал і Laravel + Inertia.js · Олег Таланов ⚠️ | Олег Левченко, Олег Таланов | `bEW6pQlMDBc` | ☐ |
| 006 | 2026-06-19 | React ViewTransition + PWA у WEB | Олег Левченко, Олександр Блажейко | `RJ9xqAfUl6M` | ☐ |
| 007 | 2026-06-26 | React Fragment + WebRTC | Олег Левченко, Олександр Блажейко | `leT3mUEmIqA` | ☐ |
| 008 | 2026-07-03 | CSP + React+Vite vs Next.js | Олег Левченко, Олександр Блажейко | `txdVcK2Sxno` | ☐ |
| 009 | 2026-07-10 | tmux + AI-агенти | Олег Левченко | `jbw4x3ENiJ0` | ☐ |
| 010 | 2026-07-17 | Огляд атак у вебі | Олександр Блажейко | `YDs0AGzYjoI` | ☐ |
| 011 | 2026-07-24 | OWASP Top 10:2025 | Олександр Блажейко | `pUNYHsXrT6g` | ☐ |
| 012 | 2026-07-31 | InertiaJS: SPA без окремого API? · Олег Таланов ⚠️ | Олег Левченко, Олег Таланов | `Aq1-dGnv4II` | ☐ |
| 013 | 2026-08-07 | STAR-метод: як ставити питання, щоб бачити факти, а не завчені відповіді ⚠️ | Олег Левченко, Ігор Котов | `5HmD8FImE2k` | ☐ |
| 014 | 2026-08-14 | Методи аутентифікації користувача | Олександр Блажейко | `x2MGgT3qkN8` | ☐ |
| 015 | 2026-08-21 | OAuth 2.0 та OpenID Connect | Олександр Блажейко | `ZcHi3dm9tZQ` | ☐ |
| 016 | 2026-08-28 | Специфікація як новий вихідний код | Олександр Блажейко | `dy79Bdktwxo` | ☐ |
| 017 | 2026-09-04 | Створюємо міні-Twitter за 2 години з AI-агентом наживо ⚠️ | Олег Левченко, Олександр Блажейко | `IGudWZHHq_I` | ☐ |
| 018 | 2026-09-11 | LinkedIn, який працює на тебе | Олег Левченко | `v9dLbeQk3YY` | ☐ |
| 019 | 2026-09-18 | Graphify: 70× менше токенів чи маркетинг? | Олег Левченко | `Vn57Gw4Txz4` | ☐ |
| 020 | 2026-09-25 | RAG: модель не мусить пам'ятати, вона мусить знайти | Олександр Блажейко | `ZIyIUK7vGQU` | ☐ |
| 021 | 2026-10-02 | Якщо ШІ вже пише код, навіщо потрібен розробник? | Олександр Блажейко | `ROs1CGNbXdo` | ☐ |
| 022 | 2026-10-09 | AI пише код. Хто отримує підвищення? | Сергій Литвин | `icenkn7tmdY` | ☐ |

Titles that differ between the stream page and the streams list (UA):

| # | Stream page (`title`) | Streams list (`listTopic`) |
|---|---|---|
| 005 | CTO, метал і Laravel + Inertia.js · Олег Таланов | CTO, метал і Laravel + Inertia.js · інтерв'ю з Олегом Талановим |
| 012 | InertiaJS: SPA без окремого API? · Олег Таланов | InertiaJS: SPA без окремого API? |
| 013 | STAR-метод: як ставити питання, щоб бачити факти, а не завчені відповіді | Структуроване інтерв'ю та метод STAR |
| 017 | Створюємо міні-Twitter за 2 години з AI-агентом наживо | Живий кодинг: mini X за 2 години з AI-агентом |

Also check: #012 lists **Олег Левченко** as a speaker, but his profile doesn't list #012 (BUG-006). Which is true?

### Speakers

| Slug | Name (UA) | Name (EN) | LinkedIn | Streams (derived) | OK |
|---|---|---|---|---|---|
| `ihor-kotov` | Ігор Котов | Ihor Kotov | ✅ | 013 | ☐ |
| `oleh-levchenko` | Олег Левченко | Oleh Levchenko | — | 001, 002, 003, 004, 005, 006, 007, 008, 009, 012, 013, 017, 018, 019 | ☐ |
| `oleh-talanov` | Олег Таланов | Oleh Talanov | ✅ | 005, 012 | ☐ |
| `oleksandr-blazheiko` | Олександр Блажейко | Oleksandr Blazheiko | ✅ | 002, 003, 004, 006, 007, 008, 010, 011, 014, 015, 016, 017, 020, 021 | ☐ |
| `serhii-lytvyn` | Сергій Литвин | Serhii Lytvyn | ✅ | 022 | ☐ |
