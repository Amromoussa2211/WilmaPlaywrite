const { devices } = require('@playwright/test');
require('dotenv').config();

module.exports = {
  use: {
    headless: process.env.HEADLESS === 'false', // Ensure this is correctly set
    baseURL: process.env.BASE_URL || 'https://www.google.com',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'off',
    trace: 'off',
    extraHTTPHeaders: {
      'x-custom-header': process.env.CUSTOM_HEADER || 'default-value',
    },
    timeout: 60000,
  },
  projects: [
    {
      name: 'Desktop Chrome', // For desktop web testing
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'Mobile Chrome', // For mobile web testing
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
      },
    },
    {
      name: 'Android Web', // For Android web testing
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
      },
    },
    {
      name: 'Web', // For general web testing
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  testDir: './tests/specs', // Directory containing your test files
  reporter: [
    ['line'],
    ['allure-playwright'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  outputDir: 'test-results/', // Directory to store test results
  retries: 1, // Number of retries for failed tests
 // globalSetup: require.resolve('./global-setup'), // Global setup script
// globalTeardown: require.resolve('./global-teardown'), // Global teardown script
  workers: process.env.CI ? 1 : 1, // Number of workers (1 for local, adjust for CI)
};