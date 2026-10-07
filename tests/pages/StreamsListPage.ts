import type { Locator, Page } from '@playwright/test';

/** /streams/ and /en/streams/: the table of all streams, newest first. */
export class StreamsListPage {
  readonly rows: Locator;

  constructor(private readonly page: Page) {
    this.rows = page.locator('.vp-doc table tbody tr');
  }

  async goto(language: 'ua' | 'en' = 'ua'): Promise<void> {
    await this.page.goto(language === 'en' ? '/en/streams/' : '/streams/');
  }

  /** Stream numbers in table order, e.g. [22, 21, …, 1]. */
  async streamNumbers(): Promise<number[]> {
    const cells = await this.rows.locator('td:first-child').allInnerTexts();
    return cells.map((text) => parseInt(text, 10));
  }

  async openNewest(): Promise<void> {
    await this.rows.first().locator('td:first-child a').click();
  }
}
