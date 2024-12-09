const devices = require('@playwright/test').devices;

module.exports = {
  use: {
    headless: true,
    baseURL: 'https://www.google.com',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Mobile Chrome',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12'],
      },
    },
  ],
  testDir: './tests/specs',
  timeout: 30000,
  reporter: [
    ['line'],
    ['allure-playwright'],
    ['json', { outputFile: 'test-results/results.json' }], // Custom JSON reporter
  ],
  outputDir: 'test-results/',
  retries: 2,
  globalSetup: require.resolve('./global-setup'), // Global setup script
  globalTeardown: require.resolve('./global-teardown'), // Global teardown script
  workers: 2, // Run tests in parallel with 2 workers
  use: {
    // Use environment variables
    baseURL: process.env.BASE_URL || 'https://www.google.com',
    extraHTTPHeaders: {
      'x-custom-header': process.env.CUSTOM_HEADER || 'default-value',
    },
  },
};
