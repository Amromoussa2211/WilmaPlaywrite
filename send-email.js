const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_SERVER,
      port: process.env.EMAIL_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS,
      },
    });

    const filePath = path.join(__dirname, 'allure-report.zip');
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const mailOptions = {
      from: process.env.EMAIL_SMTP_USER,
      to: process.env.EMAIL_RECIPIENTS,
      subject: 'Test Report',
      text: 'Please find the attached Allure report.',
      attachments: [
        {
          filename: 'allure-report.zip',
          path: filePath,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
    process.exit(1); // Exit with failure for CI
  }
})();
