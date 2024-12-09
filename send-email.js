const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_SERVER,
  port: process.env.EMAIL_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_SMTP_USER,
  to: process.env.EMAIL_RECIPIENTS,
  subject: 'Test Report',
  text: 'Please find the attached Allure report.',
  attachments: [
    {
      filename: 'allure-report.zip',
      path: path.join(__dirname, 'allure-report.zip'),
    },
  ],
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});
