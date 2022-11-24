require('dotenv').config();
const jsonToken = require('./token.json');
const {google} = require('googleapis');

const auth = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

auth.setCredentials({
  access_token: jsonToken.access_token,
  refresh_token: jsonToken.refresh_token,
  scope: jsonToken.scope,
  token_type: jsonToken.token_type,
  expiry_date: jsonToken.expiry_date
});

const gmail = google.gmail({
  version: 'v1',
  auth,
});

gmail.users
  .watch({
    userId: process.env.EMAIL,
    requestBody: {
      labelIds: [process.env.EMAIL_LABEL],
      topicName: process.env.TOPIC_URL,
    },
  })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
