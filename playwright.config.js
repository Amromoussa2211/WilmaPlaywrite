const devices = require('@playwright/test').devices;

module.exports = {
  use: {
    headless: true,
    baseURL: process.env.BASE_URL || 'https://www.google.com',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    extraHTTPHeaders: {
      'x-custom-header': process.env.CUSTOM_HEADER || 'default-value',
    },
    // Increase the default timeout
    timeout: 60000,
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
  ],
  testDir: './tests/specs',
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
};
