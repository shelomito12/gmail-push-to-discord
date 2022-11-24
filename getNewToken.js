require('dotenv').config();
const readline = require('readline');
const {google} = require('googleapis');

function getToken() {
  const auth = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'urn:ietf:wg:oauth:2.0:oob'
  );

  const authUrl = auth.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly'],
  });

  console.log('Authorize this app by visiting this url:');
  console.log(authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (authCode) => {
    rl.close();
    auth.getToken(authCode, (err, token) => {
      if (err) {
        return console.log('Error retrieving access token', err);
      }

      console.log('Token:');
      console.log(token);
    });
  });
}

getToken();
