const { startAppium, stopAppium } = require('./appium-server');

beforeAll(async () => {
  await startAppium();
  // Additional setup code
});

afterAll(async () => {
  await stopAppium();
  // Additional teardown code
});