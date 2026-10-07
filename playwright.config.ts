import { defineConfig, devices } from '@playwright/test';

/**
 * Tests run against the live production site (there is no staging).
 * Keep the load low: few workers, no tight loops. See docs/01-test-strategy.md §6.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  // One retry absorbs rare hosting hiccups (seen once in cycle 1); a test that fails twice is real.
  retries: 1,
  timeout: 30_000,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'https://itfriday.community',
    // Start every test in the light theme, as TC-NAV-004 expects.
    colorScheme: 'light',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      // C1 in the test plan: Chrome desktop. Runs everything except mobile-only tests.
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
      grepInvert: /@mobile/,
    },
    {
      // Emulates C4 (Chrome on Android). Runs mobile-only tests.
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
      grep: /@mobile/,
    },
    {
      // WebKit engine with iPhone emulation. Close to C3, but not a real device.
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
      grep: /@mobile/,
    },
  ],
});
