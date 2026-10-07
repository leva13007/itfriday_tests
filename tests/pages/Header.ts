import type { Locator, Page } from '@playwright/test';

export type Language = 'Українська' | 'English';

/** Desktop header: logo, main navigation, language switcher, theme toggle. */
export class Header {
  readonly nav: Locator;
  /** The logo link has no accessible name (BUG-003), so it is located by its class. */
  readonly logo: Locator;
  readonly languageButton: Locator;
  readonly themeToggle: Locator;
  /** Only one of the two logo images is shown, depending on the theme. */
  readonly visibleLogoImage: Locator;

  constructor(private readonly page: Page) {
    this.nav = page.getByRole('navigation', { name: 'Main Navigation' });
    this.logo = page.locator('.VPNavBarTitle a');
    this.languageButton = page.getByRole('button', { name: 'Change language' });
    this.themeToggle = page.locator('.VPNavBarAppearance').getByRole('switch');
    this.visibleLogoImage = page.locator('.VPNavBarTitle img:visible');
  }

  navLink(name: string): Locator {
    return this.nav.getByRole('link', { name, exact: true });
  }

  async switchLanguage(language: Language): Promise<void> {
    await this.languageButton.click();
    await this.page.locator('.VPNavBarTranslations').getByRole('link', { name: language }).click();
  }
}
