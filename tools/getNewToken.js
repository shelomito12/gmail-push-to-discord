require('dotenv').config();
const readline = require('readline');
const { google } = require('googleapis');
const fs = require('fs')

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

      fs.writeFile('./token.json', JSON.stringify(token, null, 2), { encoding: 'utf8' }, function (err) {
        if (err) {
          return console.log('Error writing access token to file', err);
        }
        console.log('Token:');
        console.log(JSON.stringify(token, null, 2));
      });
    });
  });
}

getToken();
