// // tests/specs/telegram.spec.js
// const { test, expect } = require('@playwright/test');

// test.describe('Telegram App Tests @mobile @android', () => {
//   test('should launch Telegram app and find element', async ({ page }) => {
//     // Launch the Telegram app
//     await page.goto('http://localhost:4723/wd/hub');

//     // Wait for the app to launch and find an element (e.g., the login button)
//     const loginButton = await page.locator('//*[@text="LOG IN"]');
//     await expect(loginButton).toBeVisible();

//     // Perform actions (e.g., click the login button)
//     await loginButton.click();

//     // Add more steps as needed
//   });

//   test('verify app navigation', async ({ page }) => {
//     // Launch the Telegram app
//     await page.goto('http://localhost:4723/wd/hub');

//     // Navigate to a specific screen (e.g., the contacts screen)
//     await page.locator('//*[@text="Contacts"]').click();

//     // Verify the navigation
//     const contactsScreen = await page.locator('//*[@text="Contacts"]');
//     await expect(contactsScreen).toBeVisible();

//     // Add more steps as needed
//   });
// });
