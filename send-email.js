import { createWriteStream, existsSync, promises } from 'fs';
import { join } from 'path';
import archiver from 'archiver';
import { createTransport } from 'nodemailer';
import { launch } from 'puppeteer'; // Ensure Puppeteer is correctly imported

// Function to capture screenshot of the Allure report in browser
async function captureScreenshot() {
  const browser = await launch();
  const page = await browser.newPage();
  const reportUrl = 'http://localhost:50053/index.html';

  try {
    await page.goto(reportUrl, { waitUntil: 'networkidle2' });

    // Wait for 10 seconds to ensure the report is fully loaded
    await new Promise(resolve => setTimeout(resolve, 10000));

    const screenshotPath = join(__dirname, 'screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });

    await browser.close();
    console.log(`Screenshot captured and saved to ${screenshotPath}`);
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    await browser.close();
    throw error;
  }
}

// Function to zip the report directory and the screenshot
function zipReport() {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(join(__dirname, 'allure-report.zip'));
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log('Allure report has been finalized and the output file descriptor has closed.');
      resolve(join(__dirname, 'allure-report.zip'));
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    console.log('Zipping directory:', join(__dirname, 'allure-report'));
    archive.directory('allure-report/', false);
    archive.finalize();
  });
}

// Function to send email with zip and screenshot attachments
async function sendEmail(zipPath) {
  const transporter = createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: '81be2c001@smtp-brevo.com',
      pass: 'C1BMkI0x5GFvVDbS',
    },
  });

  const screenshotPath = join(__dirname, 'screenshot.png');

  if (!existsSync(zipPath)) {
    throw new Error(`Zip file not found: ${zipPath}`);
  }

  if (!existsSync(screenshotPath)) {
    throw new Error(`Screenshot not found: ${screenshotPath}.`);
  }

  const mailOptions = {
    from: 'samsomy <amro.kaza6@gmail.com>',
    to: 'amro_kaza@hotmail.com',
    subject: 'Test Report',
    text: 'Please find the attached Allure report.',
    attachments: [
      { filename: 'allure-report.zip', path: zipPath },
      { filename: 'screenshot.png', path: screenshotPath },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// Function to delete the zip file and screenshot
function cleanUp(zipPath, screenshotPath) {
  return promises.unlink(zipPath)
    .then(() => promises.unlink(screenshotPath))
    .then(() => {
      console.log(`Deleted zip file: ${zipPath} and screenshot: ${screenshotPath}`);
    })
    .catch((err) => {
      console.error(`Error deleting files: ${zipPath} and ${screenshotPath}`, err);
      throw err;
    });
}

// Main function to orchestrate the flow
async function main() {
  try {
    // Capture screenshot of the report
    await captureScreenshot();

    // Zip the report and screenshot
    const zipPath = await zipReport();

    // Send email with zip and screenshot
    await sendEmail(zipPath);

    // Clean up zip file and screenshot
    const screenshotPath = join(__dirname, 'screenshot.png');
    await cleanUp(zipPath, screenshotPath);

    console.log('All steps completed successfully.');
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

main();
