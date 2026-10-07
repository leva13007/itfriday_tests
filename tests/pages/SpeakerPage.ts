import type { Locator, Page } from '@playwright/test';

/** A speaker profile, e.g. /speakers/serhii-lytvyn. */
export class SpeakerPage {
  readonly heading: Locator;
  readonly photo: Locator;
  readonly streamLinks: Locator;
  readonly backToSpeakers: Locator;

  constructor(private readonly page: Page) {
    const content = page.locator('.vp-doc');
    this.heading = content.locator('h1');
    this.photo = content.locator('img').first();
    this.streamLinks = content.locator('table a[href*="/streams/"]');
    this.backToSpeakers = content.getByRole('link', { name: /Усі спікери|All speakers/ });
  }

  async goto(slug: string, language: 'ua' | 'en' = 'ua'): Promise<void> {
    await this.page.goto(`${language === 'en' ? '/en' : ''}/speakers/${slug}`);
  }
}
