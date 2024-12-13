const { spawn } = require('child_process');
let appiumProcess = null;

module.exports = {
  startAppium: () => {
    return new Promise((resolve, reject) => {
      appiumProcess = spawn('appium', [
        '-a', process.env.APPIUM_HOST || '127.0.0.1',
        '-p', process.env.APPIUM_PORT || '4723'
      ], { 
        stdio: 'pipe' 
      });

      appiumProcess.stdout.on('data', (data) => {
        const message = data.toString();
        console.log(`Appium Server: ${message}`);
        if (message.includes('Appium REST http interface listener started')) {
          resolve();
        }
      });

      appiumProcess.stderr.on('data', (data) => {
        console.error(`Appium Error: ${data}`);
      });

      appiumProcess.on('error', (error) => {
        console.error('Failed to start Appium:', error);
        reject(error);
      });
    });
  },

  stopAppium: () => {
    return new Promise((resolve) => {
      if (appiumProcess) {
        appiumProcess.kill('SIGINT');
        console.log('Appium server stopped');
        resolve();
      } else {
        resolve();
      }
    });
  }
};