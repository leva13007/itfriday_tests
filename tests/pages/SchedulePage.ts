import type { Locator, Page } from '@playwright/test';

/** /schedule and /en/schedule: when the next stream happens. */
export class SchedulePage {
  readonly content: Locator;

  constructor(private readonly page: Page) {
    this.content = page.locator('.vp-doc');
  }

  async goto(language: 'ua' | 'en' = 'ua'): Promise<void> {
    await this.page.goto(language === 'en' ? '/en/schedule' : '/schedule');
  }

  /**
   * Links in the page content to the page of stream `number` (e.g. "022").
   * Matched by href, not by role and name: the link text is free-form ("#022", the topic, "details").
   */
  streamLinks(number: string): Locator {
    return this.content.locator(`a[href*="/streams/${number}"]`);
  }
}
