import { test, expect } from './fixtures';
import { expectedSpeakers, expectedStreams, listDate, nextStream, oracleReviewed, streamsOf } from './support/test-data';

/**
 * Site content vs. the test oracle (test-data/*.json), in both directions:
 * everything in the oracle is on the site with the same values, and the site shows
 * nothing that isn't in the oracle. See test-data/README.md.
 */

test.beforeEach(() => {
  if (!oracleReviewed) {
    test.info().annotations.push({
      type: 'warning',
      description: 'test-data is not reviewed yet: it was generated from the site, so a pass proves little',
    });
  }
});

const languages = [
  { code: 'ua' as const, prefix: '' },
  { code: 'en' as const, prefix: '/en' },
];

test('TC-STR-005 Streams list matches the expected streams', async ({ streamsList }) => {
  for (const { code } of languages) {
    await streamsList.goto(code);
    const rows = await streamsList.rows.evaluateAll((trs) =>
      trs.map((tr) => {
        const cells = [...tr.querySelectorAll('td')];
        return {
          number: cells[0].textContent!.trim(),
          date: cells[1].textContent!.trim(),
          topic: cells[2].textContent!.replace(/\s+/g, ' ').trim(),
          speakers: [...cells[3].querySelectorAll('a')].map((a) => a.getAttribute('href')!.match(/speakers\/([a-z-]+)/)![1]),
          youtube: cells[4].querySelector('a')?.getAttribute('href') ?? null,
        };
      }),
    );

    // Both directions: same set of streams.
    expect(rows.map((r) => r.number).sort(), `${code}: streams on the site vs. expected`).toEqual(expectedStreams.map((s) => s.number).sort());

    for (const expected of expectedStreams) {
      const row = rows.find((r) => r.number === expected.number);
      if (!row) continue;
      const where = `${code} #${expected.number}`;
      expect.soft(row.date, `${where} date`).toBe(listDate(expected.date));
      expect.soft(row.topic, `${where} topic`).toBe(expected.listTopic[code]);
      expect.soft(row.speakers, `${where} speakers`).toEqual(expected.speakers);
      if (expected.youtubeId) expect.soft(row.youtube, `${where} YouTube`).toContain(expected.youtubeId);
    }
  }
});

test('TC-STR-006 Every stream page matches the expected stream', async ({ page, streamPage }) => {
  test.setTimeout(120_000);
  for (const { code } of languages) {
    for (const expected of expectedStreams) {
      const where = `${code} #${expected.number}`;
      await streamPage.goto(expected.number, code);
      await expect.soft(streamPage.heading, `${where} heading`).toHaveText(`#${expected.number} — ${expected.title[code]}`);
      const speakers = await streamPage.speakerLinks.evaluateAll((links) => [
        ...new Set(links.map((a) => a.getAttribute('href')!.match(/speakers\/([a-z-]+)/)![1])),
      ]);
      expect.soft(speakers.sort(), `${where} speakers`).toEqual([...expected.speakers].sort());
      if (expected.youtubeId) {
        await expect.soft(page.locator(`.vp-doc a[href*="${expected.youtubeId}"]`).first(), `${where} YouTube link`).toBeAttached();
      }
    }
  }
});

test('TC-SPK-003 Speakers and their profiles match the expected speakers', async ({ page, speakerPage }) => {
  test.info().annotations.push({ type: 'issue', description: 'BUG-006' });
  test.fail();

  for (const { code, prefix } of languages) {
    // Both directions: the speakers page shows exactly the expected speakers.
    await page.goto(`${prefix}/speakers`);
    const onSite = await page.locator(`.vp-doc a[href^="${prefix}/speakers/"]`).evaluateAll((links) => [
      ...new Set(links.map((a) => a.getAttribute('href')!.match(/speakers\/([a-z-]+)/)![1])),
    ]);
    expect.soft(onSite.sort(), `${code}: speakers page vs. expected`).toEqual(expectedSpeakers.map((s) => s.slug).sort());

    for (const expected of expectedSpeakers) {
      const where = `${code} ${expected.slug}`;
      await speakerPage.goto(expected.slug, code);
      await expect.soft(speakerPage.heading, `${where} name`).toHaveText(expected.name[code]);
      if (expected.linkedin) await expect.soft(page.locator(`.vp-doc a[href="${expected.linkedin}"]`), `${where} LinkedIn`).toBeAttached();
      const streams = await speakerPage.streamLinks.evaluateAll((links) => links.map((a) => a.getAttribute('href')!.match(/streams\/(\d{3})/)![1]));
      expect.soft(streams.sort(), `${where} streams on profile`).toEqual(streamsOf(expected.slug).sort());
    }
  }
});

test('TC-STR-007 Schedule page shows the next announced stream', async ({ schedulePage }) => {
  const next = nextStream();
  // Between a stream and the next announcement there is nothing to show, and
  // "will be announced in Telegram" is the right text.
  test.skip(!next, 'no stream dated today or later in test-data/streams.json');
  test.info().annotations.push({ type: 'issue', description: 'BUG-007' });
  test.fail();

  for (const { code } of languages) {
    await schedulePage.goto(code);
    await expect.soft(schedulePage.streamLinks(next!.number).first(), `${code}: link to #${next!.number}`).toBeAttached();
  }
});
