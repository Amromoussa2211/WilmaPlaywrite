const { devices } = require('@playwright/test');
require('dotenv').config();

module.exports = {
  use: {
    headless: process.env.HEADLESS === 'true', // Ensure this is correctly set
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
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
    // Web Mobile Tests
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
      },
    },
    // Native Android App Tests
    // {
    //   name: 'Android Native',
    //   use: {
    //     browserName: 'chromium',
    //     android: {
    //       android: true, // Enable Android testing

    //       deviceId: process.env.ANDROID_DEVICE_SERIAL,
    //     },
    //   },
    // },
    // Android Web Tests
    {
      name: 'Android Web',
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
      },
    },
  ],
  testDir: './tests/specs',
  reporter: [
    ['line'],
    ['allure-playwright'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  outputDir: 'test-results/',
  retries: 1,
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
  workers: process.env.CI ? 1 : 1,
};
