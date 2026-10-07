import type { Locator, Page } from '@playwright/test';
import type { Language } from './Header';

/** The full-screen menu behind the hamburger button on narrow screens. */
export class MobileMenu {
  readonly hamburger: Locator;
  readonly screen: Locator;
  readonly links: Locator;
  readonly languageGroup: Locator;
  readonly appearance: Locator;

  constructor(page: Page) {
    this.hamburger = page.getByRole('button', { name: 'mobile navigation' });
    this.screen = page.locator('.VPNavScreen');
    this.links = this.screen.locator('.VPNavScreenMenuLink');
    this.languageGroup = this.screen.locator('.VPNavScreenTranslations');
    this.appearance = this.screen.locator('.VPNavScreenAppearance');
  }

  async open(): Promise<void> {
    await this.hamburger.click();
  }

  link(name: string): Locator {
    return this.links.filter({ hasText: name });
  }

  async switchLanguage(language: Language): Promise<void> {
    await this.languageGroup.getByRole('button').click();
    await this.languageGroup.getByRole('link', { name: language }).click();
  }
}
