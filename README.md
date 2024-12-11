# **Overview
This is a simple Playwright project designed to: 

Automate a browser test that navigates to Google, searches for a term, and asserts the results.
Include an API test to demonstrate basic API testing capabilities.
Features
Automated browser testing using Playwright.
Simple API testing example.
Prettier for code formatting.
Allure reports for detailed test results.
Setup Instructions
1. Prerequisites
Ensure you have the following installed:

Node.js (v14 or higher)
A package manager like npm (comes with Node.js)
2. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/structure-playwright.git
cd structure-playwright
3. Install Dependencies.
bash
Copy code
npm install
Usage
1. Run Tests
To execute the tests:
bash
Copy code
npm test
To debug tests:
bash
Copy code
npm run test:debug
2. Generate Reports
Run the following command to generate and open Allure reports:
bash
Copy code
npm run test:report
3. Code Formatting
To format the code using Prettier:
bash
Copy code
npm run format
Project Structure
Here’s an overview of the project’s structure:

bash
Copy code
.
├── tests/                      # Test cases (Google test & API test)
├── allure-results/             # Allure report results
├── node_modules/               # Project dependencies
├── package.json                # Project scripts and dependencies
├── playwright.config.js        # Playwright configuration
├── README.md                   # Project documentation
└── .prettierrc                 # Prettier configuration
Scripts
Script	Description
npm test	Run all Playwright tests.
npm run test:ui	Open Playwright test report.
npm run test:debug	Run tests in debug mode.
npm run test:record	Record tests using Playwright Codegen.
npm run test:report	Generate and open Allure reports.
npm run format	Format code using Prettier.
Example Tests
1. Google Search Test
The test navigates to Google, searches for a term, and asserts that the results are correct.

javascript
Copy code
// Sample Test
test('Google Search Test', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.fill('input[name="q"]', 'Playwright');
  await page.press('input[name="q"]', 'Enter');
  await expect(page).toHaveTitle(/Playwright/);
});
2. API Test
A basic API test to demonstrate Playwright's API testing features.

javascript
Copy code
// Sample API Test
test('Sample API Test', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.id).toBe(1);
});
Contributing
Contributions are welcome! If you have ideas or find issues, feel free to submit a pull request or create an issue.

License
This project is licensed under the ISC License. See the LICENSE file for details.

Contact
If you have any questions or need further assistance, feel free to reach out at amro_kaza@hotmail.com
**