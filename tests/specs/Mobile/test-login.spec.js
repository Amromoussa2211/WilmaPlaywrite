import { config as dotenvConfig } from 'dotenv';
import { remote } from 'webdriverio';
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import axios from 'axios';

// Load environment variables
dotenvConfig();

// Enhanced logging utility
function logAndThrow(message) {
    console.error(`[CRITICAL ERROR] ${message}`);
    throw new Error(message);
}

// Diagnostic function for system environment
function getSystemDiagnostics() {
    try {
        console.log('System Diagnostics:');
        console.log('Node Version:', process.version);
        console.log('ANDROID_HOME:', process.env.ANDROID_HOME);

        // ADB devices check
        const adbDevicesOutput = execSync('adb devices').toString();
        console.log('Connected ADB Devices:\n', adbDevicesOutput);

        // Appium driver list
        const appiumDriversOutput = execSync('appium driver list').toString();
        console.log('Installed Appium Drivers:\n', appiumDriversOutput);
    } catch (error) {
        console.error('Diagnostic check failed:', error);
    }
}

// Comprehensive capabilities preparation
function prepareAppiumCapabilities() {
    // Validate required environment variables
    const requiredVars = [
        'ANDROID_DEVICE_SERIAL',
        'ANDROID_APP_PATH',
        'ANDROID_APP_PACKAGE',
        'ANDROID_APP_ACTIVITY'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
        logAndThrow(`Missing environment variables: ${missingVars.join(', ')}`);
    }

    // Resolve full path to APK
    const appPath = path.resolve(process.env.ANDROID_APP_PATH);
    if (!fs.existsSync(appPath)) {
        logAndThrow(`APK not found at: ${appPath}`);
    }

    return {
        platformName: 'Android',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Device',
        'appium:udid': process.env.ANDROID_DEVICE_SERIAL,
        'appium:app': appPath,
        'appium:appPackage': process.env.ANDROID_APP_PACKAGE,
        'appium:appActivity': process.env.ANDROID_APP_ACTIVITY,
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 600, // 10 minutes timeout
        'appium:connectHardwareKeyboard': true
    };
}

// Robust Appium session starter
async function startAppiumSession() {
    // Perform system diagnostics
    getSystemDiagnostics();

    // Appium server configuration
    const appiumServer = {
        hostname: '127.0.0.1',
        port: 4723,
        path: '/wd/hub',
        connectionRetryCount: 3,
        connectionRetryTimeout: 30000
    };

    try {
        console.log('Preparing Appium Capabilities...');
        const capabilities = prepareAppiumCapabilities();

        console.log('Connecting to Appium server...');
        const driver = await remote({
            logLevel: 'debug',
            ...appiumServer,
            capabilities: capabilities
        });

        console.log('Appium session successfully established');
        return driver;
    } catch (error) {
        console.error('Appium Session Initialization Failed');
        console.error('Error Details:', error.message);
        console.error('Possible Causes:');
        console.error('1. Appium server not running');
        console.error('2. Device not connected');
        console.error('3. Incorrect capabilities');
        console.error('4. APK path issues');

        throw error;
    }
}

// Device and app prerequisite checks
async function validateAppSession(driver) {
    try {
        // Check device contexts
        const contexts = await driver.getContexts();
        console.log('Available Contexts:', contexts);

        // Verify current app package
        const currentPackage = await driver.getCurrentPackage();
        console.log('Current App Package:', currentPackage);

        // Additional validation can be added here
    } catch (error) {
        console.error('Session validation failed:', error);
        throw error;
    }
}

// Function to make a REST API call
async function makeRestApiCall() {
    try {
        const response = await axios.get(`${process.env.REST_API_BASE_URL}${process.env.REST_API_ENDPOINT}`, {
            headers: {
                'Authorization': `Bearer ${process.env.REST_API_AUTH_TOKEN}`
            }
        });
        console.log('REST API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('REST API call failed:', error.message);
        throw error;
    }
}

// Test Suite
test.describe('Mobile App Testing', () => {
    let driver;

    // Setup Appium session before tests
    test.beforeAll(async () => {
        try {
            driver = await startAppiumSession();
            await validateAppSession(driver);
        } catch (error) {
            console.error('Test Setup Failed:', error);
            throw error;
        }
    }, 60000); // Increased timeout to 60 seconds

    // Cleanup after tests
    test.afterAll(async () => {
        if (driver) {
            try {
                await driver.deleteSession();
                console.log('Appium session terminated successfully');
            } catch (error) {
                console.error('Session cleanup error:', error);
            }
        }
    });

    // Capture screenshots on test failure
    test.afterEach(async ({}, testInfo) => {
        if (testInfo.status !== 'passed') {
            try {
                const screenshotPath = path.join(
                    './screenshots',
                    `${testInfo.title.replace(/\s+/g, '_')}_${Date.now()}.png`
                );

                // Ensure screenshots directory exists
                const screenshotDir = path.dirname(screenshotPath);
                fs.mkdirSync(screenshotDir, { recursive: true });

                await driver.saveScreenshot(screenshotPath);
                console.log(`Failure screenshot saved: ${screenshotPath}`);
            } catch (error) {
                console.error('Screenshot capture failed:', error);
            }
        }
    });

    // App launch validation test
    test('Validate App Launch', async () => {
        // Wait for app elements to load
        const elements = await driver.$$('*');
        expect(elements.length).toBeGreaterThan(0);

        console.log('App launched successfully');
    });

    // Example test case using REST API
    test('Validate REST API Response', async () => {
        const apiResponse = await makeRestApiCall();
        expect(apiResponse).toBeDefined();
        console.log('REST API validation passed');
    });

    // Add more specific test cases for your app
});
