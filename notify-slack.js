const axios = require('axios');

const message = process.argv[2] || 'Default message';
const text = process.argv[3] || 'Default text';

axios
  .post(process.env.SLACK_WEBHOOK_URL, {
    text: `${message}: ${text}`,
  })
  .then((response) => {
    console.log('Slack notification sent:', response.data);
  })
  .catch((error) => {
    console.error('Error sending Slack notification:', error);
  });
