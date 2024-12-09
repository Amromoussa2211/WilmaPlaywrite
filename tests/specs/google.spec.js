const { test, expect } = require('@playwright/test');
const GooglePage = require('../page-objects/googlePage');

test.describe('Google Search', () => {
  let googlePage;

  test.beforeEach(async ({ page }) => {
    googlePage = new GooglePage(page);
    await googlePage.navigate();
  });

  test('should search for Playwright and validate results', async () => {
    await googlePage.searchFor('Playwright');
    tag: '@fast';
    const result = await googlePage.verifySearchResult('Playwright');
    expect(result).toBeTruthy();
  });
});
