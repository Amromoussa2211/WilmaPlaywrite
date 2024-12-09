// const { test, expect } = require('@playwright/test');
// const GooglePage = require('../page-objects/googlePage');

// test.describe('Google Search (Responsive Tests)', () => {
//   let googlePage;

//   test.beforeEach(async ({ page }) => {
//     googlePage = new GooglePage(page);
//     await googlePage.navigate();
//   });

//   test('should render Google homepage correctly on mobile', async ({ page }) => {
//     const isMobile = page.viewportSize().width <= 768;
//     if (isMobile) {
//       const logoVisible = await page.isVisible('img[alt="Google"]');
//       expect(logoVisible).toBeTruthy();
//     } else {
//       console.log('Skipping mobile-specific test on desktop');
//     }
//   });

//   test('should validate search input on mobile devices', async ({ page }) => {
//     const isMobile = page.viewportSize().width <= 768;
//     if (isMobile) {
//       const searchBoxVisible = await page.isVisible('[name="q"]');
//       expect(searchBoxVisible).toBeTruthy();
//     }
//   });
// });
