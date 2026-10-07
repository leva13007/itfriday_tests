import { test as base } from '@playwright/test';
import { Header } from './pages/Header';
import { MobileMenu } from './pages/MobileMenu';
import { NotFoundPage } from './pages/NotFoundPage';
import { SpeakerPage } from './pages/SpeakerPage';
import { StreamPage } from './pages/StreamPage';
import { StreamsListPage } from './pages/StreamsListPage';

type PageObjects = {
  header: Header;
  mobileMenu: MobileMenu;
  streamsList: StreamsListPage;
  streamPage: StreamPage;
  speakerPage: SpeakerPage;
  notFound: NotFoundPage;
};

/**
 * `test` with page objects as fixtures: a test asks for `header`, `streamPage`, …
 * by name and gets an instance bound to its own `page`.
 */
export const test = base.extend<PageObjects>({
  header: async ({ page }, use) => use(new Header(page)),
  mobileMenu: async ({ page }, use) => use(new MobileMenu(page)),
  streamsList: async ({ page }, use) => use(new StreamsListPage(page)),
  streamPage: async ({ page }, use) => use(new StreamPage(page)),
  speakerPage: async ({ page }, use) => use(new SpeakerPage(page)),
  notFound: async ({ page }, use) => use(new NotFoundPage(page)),
});

export { expect } from '@playwright/test';
