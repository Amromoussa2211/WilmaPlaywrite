// require('dotenv').config();

// module.exports = async (config) => {
//   // Global teardown tasks
//   console.log('Global teardown started');
  
//   // Optional: Stop Appium server
//   if (process.env.APPIUM_HOST) {
//     const { stopAppium } = require('./appium-server');
//     await stopAppium();
//   }

//   // Clean up test results or perform final actions
//   console.log('Global teardown completed');
// };