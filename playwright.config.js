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
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Android',
      use: {
        browserName: 'chromium',
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Pixel 4',
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '12.0',
        'appium:app': process.env.ANDROID_APP_PATH || './apps/android/telegram.apk',
        'appium:appPackage': process.env.ANDROID_APP_PACKAGE || 'org.telegram.messenger',
        'appium:appActivity': process.env.ANDROID_APP_ACTIVITY || '.ui.LaunchActivity',
        'appium:noReset': true,
        'appium:newCommandTimeout': 60,
      },
    },
    {
      name: 'Mobile Web',
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
