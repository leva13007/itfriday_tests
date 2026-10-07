# SEO Checklist

Checks the metadata that search engines and link previews (Telegram, LinkedIn, Discord) rely on. Most of it is invisible on the page, so it's checked in the page source or DevTools.

| | |
|---|---|
| When | Once per cycle |
| Configuration | C1 (Chrome desktop) + terminal (`curl`) |
| Duration | ~40 min |
| Version | 1.0 (2026-10-07) |

**Two kinds of checks:**
- **Required:** backed by a requirement (REQ-012, REQ-013). A failure is a **bug**.
- **Advisory:** common good practice with no requirement behind it. A failure is reported as an **improvement suggestion** (GitHub Issue with the `enhancement` label), not a bug. If the site owner accepts it, it becomes a new requirement in the next version.

**How to run:** copy to `docs/cycles/<cycle>/runs/YYYY-MM-DD-seo.md`. Use ✅ / ❌ (bug or suggestion link) / ⏭.

## Run header

| Date | Deploy under test | Tester |
|---|---|---|
| | | |

Quick way to see a page's head tags:

```bash
curl -s https://itfriday.community/streams/022 \
  | grep -oE '<html[^>]*>|<title>[^<]*</title>|<meta (name|property)="[^"]*"[^>]*>|<link rel="(canonical|alternate)"[^>]*>'
```

## A. Per page (required)

For each representative page in both languages. Fill one row per page and language.

| # | Page | `<title>` present and unique | Meta description present | Meta description unique | `<html lang>` correct | `og:type` | `og:image` | Result |
|---|---|---|---|---|---|---|---|---|
| SEO-A01 | `/` | | | | | | | |
| SEO-A02 | `/en/` | | | | | | | |
| SEO-A03 | `/about` | | | | | | | |
| SEO-A04 | `/en/about` | | | | | | | |
| SEO-A05 | `/streams/` | | | | | | | |
| SEO-A06 | `/streams/<newest>` | | | | | | | |
| SEO-A07 | `/en/streams/<newest>` | | | | | | | |
| SEO-A08 | `/speakers/oleh-levchenko` | | | | | | | |
| SEO-A09 | `/posts/2026-06-22-web-push-api` | | | | | | | |
| SEO-A10 | `/wiki/mission` | | | | | | | |
| SEO-A11 | `/speak` | | | | | | | |

Requirement mapping: title, description, uniqueness and `lang` → REQ-012. `og:type`, `og:image` → REQ-013.

Expected values:
- `<title>` describes the page and ends with the site name: `… | ІТ П'ятниця` or `… | IT Friday`
- Meta description describes *this* page. The same site-wide text on every page fails "unique".
- `lang="uk-UA"` on UA pages, `lang="en-US"` on EN pages
- `og:image` is an absolute URL that returns 200

## B. Per page (advisory)

| # | Check | Expected | Result | Suggestion |
|---|---|---|---|---|
| SEO-B01 | `og:title`, `og:description`, `og:url` | Present and match the page | | |
| SEO-B02 | Stream pages use their cover image as `og:image` | Link previews show the stream cover, not the logo | | |
| SEO-B03 | `twitter:card` | `summary_large_image` | | |
| SEO-B04 | `<link rel="canonical">` | Points to the page's own clean URL | | |
| SEO-B05 | `hreflang` alternates | Each page links to its UA and EN counterparts (`<link rel="alternate" hreflang="…">`) | | |
| SEO-B06 | Exactly one `h1` that matches the topic | One `h1`, close to the `<title>` | | |
| SEO-B07 | Title length | ≤ 60 characters, so it isn't cut off in search results | | |
| SEO-B08 | Description length | 70–160 characters | | |

## C. Site-wide

| # | Check | Expected | Kind | Result | Bug / suggestion |
|---|---|---|---|---|---|
| SEO-C01 | `/robots.txt` | Exists (200) and doesn't block the site | Advisory | | |
| SEO-C02 | `/sitemap.xml` | Exists (200), lists every page in both languages | Advisory | | |
| SEO-C03 | Favicon | `/favicon.png` returns 200 and shows in the tab | Required (REQ-001) | | |
| SEO-C04 | `.html` and clean URLs | Both work. Canonical (if present) picks one form | Advisory | | |
| SEO-C05 | 404 status | Unknown URLs return HTTP 404, not 200 ("soft 404") | Required (REQ-017) | | |
| SEO-C06 | HTTPS | `http://` redirects to `https://` | Advisory | | |
| SEO-C07 | Link preview: paste the home page and the newest stream URL into Telegram (Saved Messages) | Preview shows a title, description and image | Advisory | | |

## Result

| Section | Passed | Failed | Suggestions filed |
|---|---|---|---|
| A (required) | | | — |
| B (advisory) | | — | |
| C | | | |
