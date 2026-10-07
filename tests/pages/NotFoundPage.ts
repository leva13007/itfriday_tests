import type { Locator, Page } from '@playwright/test';

/** VitePress 404 page, shown for any unknown URL. */
export class NotFoundPage {
  readonly title: Locator;
  /** Visible text is "Take me home", but the accessible name (aria-label) is "go to home". */
  readonly homeLink: Locator;

  constructor(page: Page) {
    this.title = page.locator('.NotFound .title');
    this.homeLink = page.getByRole('link', { name: 'go to home' });
  }
}
