import { test, expect } from '@playwright/test';
import Orange from '../page-objects/orangehrf'; // Import your Orange class

test.describe('OrangeHRM Login Tests', () => {
  let orange;

  test.beforeEach(async ({ page }) => {
    // Instantiate the Orange class before each test
    orange = new Orange(page);
    await orange.navigateToLoginPage();
  });

  test('Login with valid credentials', async ({ page }) => {
    // Use the Orange class methods
    await orange.fillUsername('Admin'); // Replace with valid username
    await orange.fillPassword('admin123'); // Replace with valid password
    await orange.clickLoginButton();

    // Add assertions to verify login success
    await expect(page).toHaveURL(/dashboard/); // Verify URL contains 'dashboard'
    const welcomeText = await page.textContent(
      '.oxd-topbar-header-breadcrumb h6'
    );
    expect(welcomeText).toBe('Dashboard');
  });

  test('Login with invalid credentials', async ({ page }) => {
    // Use the Orange class methods
    await orange.fillUsername('InvalidUser');
    await orange.fillPassword('wrongpassword');
    await orange.clickLoginButton();

    // Add assertions to verify error message
    const errorMessage = await page.textContent('.oxd-alert-content-text'); // Replace with actual selector
    expect(errorMessage).toBe('Invalid credentials');
  });
});
