import type { Locator, Page } from '@playwright/test';

/** Wiki documents (/wiki/*) and their sidebar. */
export class WikiPage {
  readonly sidebar: Locator;
  readonly groupTitle: Locator;
  readonly items: Locator;
  readonly activeItems: Locator;
  /** Mobile only: the "Menu" button that opens the sidebar. */
  readonly mobileMenuButton: Locator;

  constructor(private readonly page: Page) {
    this.sidebar = page.locator('.VPSidebar');
    this.groupTitle = this.sidebar.locator('h2');
    this.items = this.sidebar.locator('.VPSidebarItem.level-1');
    this.activeItems = this.sidebar.locator('.VPSidebarItem.level-1.is-active');
    this.mobileMenuButton = page.locator('.VPLocalNav .menu');
  }

  async goto(slug: string, language: 'ua' | 'en' = 'ua'): Promise<void> {
    await this.page.goto(`${language === 'en' ? '/en' : ''}/wiki/${slug}`);
  }

  link(name: string): Locator {
    return this.sidebar.getByRole('link', { name, exact: true });
  }

  item(name: string): Locator {
    return this.items.filter({ hasText: name });
  }
}
