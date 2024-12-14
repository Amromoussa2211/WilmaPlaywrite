// const { chromium } = require('playwright');
// const wd = require('wd');

// // Web Test with Playwright
// async function testWeb() {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   console.log(await page.title());
//   await browser.close();
// }

// // APK Test with Appium
// async function testApk() {
//   const driver = wd.promiseChainRemote('localhost', 4723);

//   const capabilities = {
//     platformName: 'Android',
//     deviceName: 'YourDeviceName', // Replace with your device name
//     app: '/path/to/your/app.apk', // Path to your APK file
//     automationName: 'UiAutomator2',
//     appPackage: 'com.example.app', // Replace with your app's package name
//     appActivity: 'com.example.app.MainActivity', // Replace with your app's main activity
//   };

//   await driver.init(capabilities);
//   console.log('App launched successfully');

//   // Example: Find an element and interact with it
//   const loginButton = await driver.elementById('com.example.app:id/login_button');
//   await loginButton.click();

//   await driver.quit();
// }

// // Run both tests
// (async () => {
//   await testWeb();
//   await testApk();
// })();