import { test, expect } from './fixtures';

/**
 * Content test cases: lists, stream and speaker pages, wiki, 404, external links.
 * Each test title starts with the TC ID (docs/test-cases/).
 */

test.describe('Lists link to every detail page', () => {
  test('TC-STR-001 Streams list links to every published stream page', async ({ streamsList }) => {
    for (const language of ['ua', 'en'] as const) {
      await streamsList.goto(language);
      const numbers = await streamsList.streamNumbers();
      const newest = Math.max(...numbers);
      // Every number from 1 to the newest appears exactly once, newest first.
      expect(numbers, language).toEqual(Array.from({ length: newest }, (_, i) => newest - i));
      const prefix = language === 'en' ? '/en/streams/' : '/streams/';
      for (const href of await streamsList.rows.locator('td:first-child a').evaluateAll((links) => links.map((a) => a.getAttribute('href')))) {
        expect.soft(href, language).toMatch(new RegExp(`^${prefix}\\d{3}`));
      }
    }
  });

  test('TC-SPK-001 Speakers list links to every speaker profile', async ({ page }) => {
    for (const prefix of ['', '/en']) {
      await page.goto(`${prefix}/speakers`);
      const cards = page.locator(`.vp-doc a[href^="${prefix}/speakers/"]`);
      const hrefs = [...new Set(await cards.evaluateAll((links) => links.map((a) => a.getAttribute('href'))))];
      expect(hrefs.length, prefix || '/').toBeGreaterThan(0);
      const photos = page.locator('.vp-doc img');
      for (const photo of await photos.all()) {
        await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      }
      for (const href of hrefs) {
        const response = await page.request.get(href!);
        expect.soft(response.status(), href!).toBe(200);
      }
    }
  });

  test('TC-PST-001 Posts list links to every post', async ({ page }) => {
    for (const prefix of ['', '/en']) {
      await page.goto(`${prefix}/posts/`);
      const links = page.locator('.vp-doc table tbody tr a');
      const count = await links.count();
      expect(count, prefix || '/').toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const listTitle = (await links.nth(i).innerText()).trim();
        await links.nth(i).click();
        // The list may show a shortened title, so the heading only has to start with it.
        await expect(page.locator('.vp-doc h1')).toContainText(listTitle);
        await page.goBack();
      }
    }
  });
});

test.describe('Stream and speaker pages', () => {
  test('TC-STR-002 Stream page shows its key information', async ({ streamPage }) => {
    await streamPage.goto('022');
    await expect(streamPage.heading).toHaveText(/^#022 — /);
    await expect(streamPage.cover).toBeVisible();
    await expect.poll(() => streamPage.isCoverLoaded(), { timeout: 15_000 }).toBe(true);
    for (const label of ['Дата:', 'Формат:', 'Гість:']) {
      await expect(streamPage.content).toContainText(label);
    }
    await expect(streamPage.youtubeLinks.first()).toHaveAttribute('href', /youtube\.com/);
    await expect(streamPage.speakerLinks.first()).toBeVisible();
  });

  test('TC-STR-003 Speaker link on a stream page opens the right profile', async ({ page, streamPage, speakerPage }) => {
    await streamPage.goto('022');
    await streamPage.speakerLinks.filter({ hasText: 'Сергій Литвин' }).first().click();
    await expect(page).toHaveURL(/\/speakers\/serhii-lytvyn(\.html)?$/);
    await expect(speakerPage.heading).toHaveText(/Сергій Литвин/);
  });

  test('TC-SPK-002 Speaker profile links to the speaker\'s streams', async ({ page, speakerPage }) => {
    await speakerPage.goto('serhii-lytvyn');
    await expect.poll(() => speakerPage.photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(page.locator('.vp-doc a[href*="linkedin.com"]')).toBeVisible();
    await speakerPage.streamLinks.filter({ hasText: '#022' }).click();
    await expect(page).toHaveURL(/\/streams\/022(\.html)?$/);
    await page.goBack();
    await speakerPage.backToSpeakers.click();
    await expect(page).toHaveURL(/\/speakers(\.html)?$/);
  });

  test('TC-STR-004 Stream list, stream pages and speaker profiles agree on who spoke where', async ({ page, streamsList }) => {
    test.info().annotations.push({ type: 'issue', description: 'BUG-006' });
    test.fail();
    test.setTimeout(120_000);

    for (const language of ['ua', 'en'] as const) {
      const prefix = language === 'en' ? '/en' : '';
      // 1. Who spoke at which stream, according to the streams list.
      await streamsList.goto(language);
      const listed = await streamsList.rows.evaluateAll((rows) =>
        rows.map((row) => ({
          number: row.querySelector('td')!.textContent!.trim(),
          speakers: [...row.querySelectorAll('a[href*="/speakers/"]')].map((a) => a.getAttribute('href')!.match(/speakers\/([a-z-]+)/)![1]),
        })),
      );

      // 2. Each stream page links the same speakers.
      const bySpeaker = new Map<string, Set<string>>();
      for (const { number, speakers } of listed) {
        await page.goto(`${prefix}/streams/${number}`);
        const onPage = await page.locator('.vp-doc a[href*="/speakers/"]').evaluateAll((links) =>
          links.map((a) => a.getAttribute('href')!.match(/speakers\/([a-z-]+)/)![1]),
        );
        for (const speaker of speakers) {
          expect.soft(onPage, `${language} #${number}: stream page links ${speaker}`).toContain(speaker);
          if (!bySpeaker.has(speaker)) bySpeaker.set(speaker, new Set());
          bySpeaker.get(speaker)!.add(number);
        }
      }

      // 3. Each speaker profile lists exactly the streams the list says they spoke at.
      for (const [speaker, numbers] of bySpeaker) {
        await page.goto(`${prefix}/speakers/${speaker}`);
        const onProfile = await page.locator('.vp-doc table a[href*="/streams/"]').evaluateAll((links) =>
          links.map((a) => a.getAttribute('href')!.match(/streams\/(\d{3})/)![1]),
        );
        expect.soft(onProfile.sort(), `${language} ${speaker}: streams on profile`).toEqual([...numbers].sort());
      }
    }
  });
});

test.describe('Wiki', () => {
  const documents = {
    ua: ['Місія', 'Цінності', 'Формати стрімів', 'Управління'],
    en: ['Mission', 'Values', 'Stream Formats', 'Governance'],
  };

  test('TC-WIKI-001 Wiki sidebar lists all 4 documents in order', async ({ wikiPage }) => {
    await wikiPage.goto('mission');
    await expect(wikiPage.groupTitle).toHaveText('Документи');
    await expect(wikiPage.items).toHaveText(documents.ua);
    await wikiPage.goto('mission', 'en');
    await expect(wikiPage.groupTitle).toHaveText('Documents');
    await expect(wikiPage.items).toHaveText(documents.en);
  });

  test('TC-WIKI-002 Wiki sidebar links open the right document and highlight it', async ({ page, wikiPage }) => {
    await wikiPage.goto('mission');
    await expect(wikiPage.item('Місія')).toHaveClass(/is-active/);
    for (const [name, slug] of [['Цінності', 'values'], ['Формати стрімів', 'formats'], ['Управління', 'governance']]) {
      await wikiPage.link(name).click();
      await expect(page).toHaveURL(new RegExp(`/wiki/${slug}(\\.html)?$`));
      await expect(wikiPage.item(name)).toHaveClass(/is-active/);
      await expect(wikiPage.activeItems).toHaveCount(1);
    }
  });

  test('TC-WIKI-003 Wiki sidebar is reachable on mobile @mobile', async ({ page, wikiPage }) => {
    await wikiPage.goto('mission');
    await expect(wikiPage.sidebar).not.toHaveClass(/open/);
    await wikiPage.mobileMenuButton.click();
    await expect(wikiPage.sidebar).toHaveClass(/open/);
    await wikiPage.link('Управління').click();
    await expect(page).toHaveURL(/\/wiki\/governance(\.html)?$/);
    await expect(wikiPage.sidebar).not.toHaveClass(/open/);
  });
});

test.describe('Errors and external links', () => {
  test('TC-ERR-001 Unknown URL shows a 404 page with a way back home', async ({ page, notFound }) => {
    for (const [url, home] of [['/does-not-exist', /itfriday\.community\/$/], ['/streams/999', /itfriday\.community\/$/], ['/en/does-not-exist', /\/en\/$/]] as const) {
      const response = await page.goto(url);
      expect(response?.status(), url).toBe(404);
      await expect(page.locator('.VPNav')).toBeVisible();
      await expect(notFound.title).toBeVisible();
      await notFound.homeLink.click();
      await expect(page, url).toHaveURL(home);
    }
  });

  test('TC-ERR-002 Repo files are not published as pages', async ({ request }) => {
    test.info().annotations.push({ type: 'issue', description: 'BUG-008' });
    test.fail();

    // Not linked anywhere, so the crawled site map can't find them: checked by URL.
    for (const url of ['/README', '/README.html', '/CLAUDE', '/CLAUDE.html']) {
      const response = await request.get(url);
      expect.soft(response.status(), url).toBe(404);
    }
  });

  test('TC-LNK-002 Home page hero buttons point to the community channels', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('.VPHero');
    const expected = {
      'YouTube Live →': 'https://youtube.com/@zloyleva',
      LinkedIn: 'https://www.linkedin.com/company/it-friday/',
      Telegram: 'https://t.me/+QRJNFfHaLxMwYzcy',
      Discord: 'https://discord.gg/ZpWpDQq2EP',
    };
    for (const [name, href] of Object.entries(expected)) {
      await expect(hero.getByRole('link', { name })).toHaveAttribute('href', href);
    }
    // Only the invite pages are checked over HTTP; LinkedIn blocks automated requests (see TC-LNK-005).
    const telegram = await page.request.get(expected.Telegram);
    expect(await telegram.text()).toContain('tgme_page');
    const discord = await page.request.get('https://discord.com/api/v10/invites/ZpWpDQq2EP');
    expect(discord.status(), 'Discord invite is valid').toBe(200);
  });

  test('TC-LNK-003 Header social icons point to the community channels', async ({ page }) => {
    const expected = ['https://youtube.com/@zloyleva', 'https://www.linkedin.com/company/it-friday/', 'https://t.me/+QRJNFfHaLxMwYzcy'];
    for (const home of ['/', '/en/']) {
      await page.goto(home);
      const hrefs = await page.locator('.VPNavBarSocialLinks a').evaluateAll((links) => links.map((a) => a.getAttribute('href')));
      expect(hrefs, home).toEqual(expected);
    }
  });

  test('TC-LNK-004 External links open in a new tab', async ({ page }) => {
    for (const path of ['/', '/streams/022', '/speakers/serhii-lytvyn']) {
      await page.goto(path);
      const external = page.locator('.VPContent a[href^="http"]:not([href*="itfriday.community"])');
      expect(await external.count(), path).toBeGreaterThan(0);
      for (const link of await external.all()) {
        await expect.soft(link, `${path}: ${await link.getAttribute('href')}`).toHaveAttribute('target', '_blank');
      }
    }
  });
});
