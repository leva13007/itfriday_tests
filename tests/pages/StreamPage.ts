import type { Locator, Page } from '@playwright/test';

/** A single stream page, e.g. /streams/022. */
export class StreamPage {
  readonly heading: Locator;
  readonly content: Locator;
  readonly cover: Locator;
  readonly youtubeLinks: Locator;
  readonly speakerLinks: Locator;

  constructor(private readonly page: Page) {
    this.content = page.locator('.vp-doc');
    this.heading = this.content.locator('h1');
    this.cover = this.content.locator('img').first();
    this.youtubeLinks = this.content.locator('a[href*="youtube.com"]');
    this.speakerLinks = this.content.locator('a[href*="/speakers/"]');
  }

  async goto(number: string, language: 'ua' | 'en' = 'ua'): Promise<void> {
    await this.page.goto(`${language === 'en' ? '/en' : ''}/streams/${number}`);
  }

  /** True once the browser has downloaded and decoded the cover image. */
  async isCoverLoaded(): Promise<boolean> {
    return this.cover.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
  }
}
