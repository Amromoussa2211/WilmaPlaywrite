import { devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default {
  use: {
    headless: process.env.HEADLESS === 'true',
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
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
      },
    },
    {
      name: 'Android Web',
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
      },
    },
    {
      name: 'Web',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
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
  workers: process.env.CI ? 1 : 1,
  //globalSetup: require.resolve('./tests/setup.js'),

};