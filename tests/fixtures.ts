import { test as base } from '@playwright/test';
import { Header } from './pages/Header';
import { MobileMenu } from './pages/MobileMenu';
import { NotFoundPage } from './pages/NotFoundPage';
import { SchedulePage } from './pages/SchedulePage';
import { SpeakerPage } from './pages/SpeakerPage';
import { StreamPage } from './pages/StreamPage';
import { StreamsListPage } from './pages/StreamsListPage';
import { WikiPage } from './pages/WikiPage';

type PageObjects = {
  header: Header;
  mobileMenu: MobileMenu;
  streamsList: StreamsListPage;
  streamPage: StreamPage;
  speakerPage: SpeakerPage;
  notFound: NotFoundPage;
  schedulePage: SchedulePage;
  wikiPage: WikiPage;
};

/**
 * `test` with page objects as fixtures: a test asks for `header`, `streamPage`, …
 * by name and gets an instance bound to its own `page`.
 */
export const test = base.extend<PageObjects>({
  /**
   * The site is a VitePress SPA: the server sends static HTML, then Vue "hydrates" it.
   * A click that lands before hydration can be lost (seen as a flaky TC-PST-001), so every
   * full page load waits until the Vue app is mounted on #app.
   */
  page: async ({ page }, use) => {
    const waitForHydration = () =>
      page.waitForFunction(() => !!(document.querySelector('#app') as { __vue_app__?: unknown } | null)?.__vue_app__);
    const goto = page.goto.bind(page);
    const reload = page.reload.bind(page);
    page.goto = async (url, options) => {
      const response = await goto(url, options);
      await waitForHydration();
      return response;
    };
    page.reload = async (options) => {
      const response = await reload(options);
      await waitForHydration();
      return response;
    };
    await use(page);
  },
  header: async ({ page }, use) => use(new Header(page)),
  mobileMenu: async ({ page }, use) => use(new MobileMenu(page)),
  streamsList: async ({ page }, use) => use(new StreamsListPage(page)),
  streamPage: async ({ page }, use) => use(new StreamPage(page)),
  speakerPage: async ({ page }, use) => use(new SpeakerPage(page)),
  notFound: async ({ page }, use) => use(new NotFoundPage(page)),
  schedulePage: async ({ page }, use) => use(new SchedulePage(page)),
  wikiPage: async ({ page }, use) => use(new WikiPage(page)),
});

export { expect } from '@playwright/test';
