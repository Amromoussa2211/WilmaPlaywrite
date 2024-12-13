// const wd = require('wd'); // Import Appium WebDriver
// const { test } = require('@playwright/test');
// const path = require('path');
// require('dotenv').config();

// test.describe('Telegram Native Android App Tests with Appium', () => {
//   let driver;

//   const desiredCapabilities = {
//     platformName: 'Android',
//     deviceName: process.env.ANDROID_DEVICE_NAME, // From .env file
//     udid: process.env.ANDROID_DEVICE_SERIAL,     // From .env file
//     app: path.resolve(process.env.ANDROID_APP_PATH), // Resolve APK path
//     automationName: 'UiAutomator2',
//     platformVersion: process.env.ANDROID_PLATFORM_VERSION, // From .env file
//     autoGrantPermissions: true,
//   };

//   test.beforeAll(async () => {
//     driver = wd.promiseChainRemote(process.env.APPIUM_HOST, process.env.APPIUM_PORT);

//     try {
//       console.log('Initializing Appium session...');
//       await driver.init(desiredCapabilities); // Use desired capabilities here
//       console.log('Appium session started successfully.');
//     } catch (error) {
//       console.error('Failed to start Appium session:', error);
//       throw error;
//     }
//   });

//   test('App launches successfully', async () => {
//     try {
//       // Wait for the app to launch
//       await driver.waitForElementByAndroidUIAutomator(
//         'new UiSelector().packageName("org.telegram.messenger")',
//         30000 // Timeout after 30 seconds
//       );
//       console.log('App launched successfully.');
//     } catch (error) {
//       console.error('Failed to verify app launch:', error);
//       throw error;
//     }
//   });

//   test.afterAll(async () => {
//     if (driver) {
//       try {
//         await driver.quit();
//         console.log('Appium session ended.');
//       } catch (error) {
//         console.error('Error during Appium session teardown:', error);
//       }
//     }
//   });
// });
