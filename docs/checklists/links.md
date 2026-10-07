# Links Checklist

Checks that internal links never lead to a 404, and that external links resolve. Content sites break links more often than anything else. Every new stream page adds new internal and external links.

| | |
|---|---|
| When | Once per cycle, and after deploys that add or rename pages |
| Configuration | C1 (Chrome desktop) + terminal (`curl`) |
| Duration | ~45 min |
| Version | 1.0 (2026-10-07) |

**How to run:** copy to `docs/cycles/<cycle>/runs/YYYY-MM-DD-links.md`. Use ✅ / ❌ (bug link) / ⚠️ unverified (third-party blocked the check, see the rules below).

## Run header

| Date | Deploy under test | Tester |
|---|---|---|
| | | |

## A. Every page responds

Build the page list from the [public site repo](https://github.com/leva13007/itfriday.community) (one URL per Markdown page, both languages), then request each one:

```bash
# get the site source (once) and go to its root
git clone --depth 1 https://github.com/leva13007/itfriday.community.git /tmp/itfriday-site && cd /tmp/itfriday-site

# list every page path
find . -name "*.md" -not -path "./node_modules/*" -not -path "./.github/*" \
  -not -name README.md -not -name CLAUDE.md \
  | sed 's|^\./||; s|\.md$||; s|index$||' | sort > /tmp/paths.txt

# request each page (throttled), print anything that isn't 200
while read p; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "https://itfriday.community/$p")
  [ "$code" != "200" ] && echo "$code /$p"
  sleep 0.2
done < /tmp/paths.txt
```

| # | Check | Expected | REQ | Result | Note |
|---|---|---|---|---|---|
| L-A01 | Number of pages in the list | Record the count (82 on 2026-10-07) | REQ-001 | | |
| L-A02 | All pages return 200 | No output from the loop | REQ-001, REQ-007 | | |
| L-A03 | Every UA page has an EN page and vice versa | Path lists match after removing `en/` | REQ-004 | | |

## B. Site-wide navigation links

| # | Check | Expected | REQ | Result | Bug / note |
|---|---|---|---|---|---|
| L-B01 | 8 header nav items (UA) | Correct target page each | REQ-002, REQ-007 | | |
| L-B02 | 8 header nav items (EN) | Correct target page each, under `/en/` | REQ-002, REQ-007 | | |
| L-B03 | Wiki sidebar, 4 items (UA + EN) | Correct target page each | REQ-006, REQ-007 | | |
| L-B04 | Logo link (UA + EN) | Home page of the current language | REQ-005 | | |
| L-B05 | Previous / next page links at the bottom of wiki pages, if present | Correct neighbouring page | REQ-007 | | |

## C. Internal links in content

On every representative page ([test plan §4.1](../cycles/2026-10-cycle-1/test-plan.md#41-representative-pages)), UA and EN: click or inspect every link inside the page content.

| # | Check | Expected | REQ | Result | Bug / note |
|---|---|---|---|---|---|
| L-C01 | Home page: "Стати спікером →" / EN equivalent | Opens `/speak` (or `/en/speak`) | REQ-007 | | |
| L-C02 | Streams list → every stream entry | Each opens its stream page; none missing (compare with the source count) | REQ-007, REQ-016 | | |
| L-C03 | Stream page → speaker profile links | Open the right speaker | REQ-007 | | |
| L-C04 | Speakers list → every speaker | Each opens its profile | REQ-007, REQ-016 | | |
| L-C05 | Speaker page → links to their streams | Open the right stream pages | REQ-007 | | |
| L-C06 | Posts list → every post | Each opens its post | REQ-007, REQ-016 | | |
| L-C07 | `/speak` → link to Wiki → Formats | Opens `/wiki/formats` | REQ-007 | | |
| L-C08 | EN pages link to EN pages | No EN page links into the UA version by mistake (and vice versa) | REQ-004, REQ-007 | | |
| L-C09 | Heading anchors (`#...`) on a long page | Clicking a heading's `#` link scrolls to it; the URL with the anchor opens at the right place | REQ-007 | | |
| L-C10 | Images: stream cover on the newest 3 streams and on 001 | Images load (no broken image icon; 200 in the Network tab) | REQ-007 | | |

## D. External links

| # | Link | Where | Expected | REQ | Result | Note |
|---|---|---|---|---|---|---|
| L-D01 | YouTube channel | Hero button, social icon | Opens the @zloyleva channel | REQ-008 | | |
| L-D02 | LinkedIn company page | Hero button, social icon | Opens the IT Friday company page | REQ-008 | | |
| L-D03 | Telegram invite | Hero button, social icon, `/speak` | Opens the invite (not "link expired") | REQ-008 | | |
| L-D04 | Discord invite | Hero button, `/speak` | Opens the invite (not "invalid invite") | REQ-008 | | |
| L-D05 | Google Form (anonymous questions) | Home page info block | Form opens and accepts responses | REQ-008 | | |
| L-D06 | YouTube links on the newest 3 stream pages | Stream pages | Video or live page opens | REQ-008 | | |
| L-D07 | Guest LinkedIn links on the newest 3 stream pages | Stream pages | Profile opens | REQ-008 | | |
| L-D08 | Links in the 2 posts | Post pages | Each resolves | REQ-008 | | |
| L-D09 | External links open in a new tab | Any of the above | Opens in a new tab and doesn't replace the site | REQ-008 | | |

**Rules for external links:**
- LinkedIn and some other sites answer automated requests with 999 / 403 / 429. Always check in a normal browser before reporting.
- If it still can't be verified, mark it ⚠️ unverified with the reason. Don't report a bug.
- An expired invite (Telegram, Discord) or a deleted video **is** a bug: the link is wrong even though the server responded.

## Result

| Section | Passed | Failed | Unverified |
|---|---|---|---|
| A | | | |
| B | | | |
| C | | | |
| D | | | |
