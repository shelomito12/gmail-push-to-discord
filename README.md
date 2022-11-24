
# Gmail Push notifications to Discord

![gmail_discord_integrations](https://user-images.githubusercontent.com/10729787/203806753-e9c9392e-e72a-4c96-b461-dc67f4bb9b93.png)


Get real-time Gmail push notifications to your Discord channel!


## Acknowledgements

 - [Gmailpush library for handling Gmail API push notification](https://github.com/byeokim/gmailpush)
 - [discord.js for Node.js to interact with the Discord API](https://discord.js.org/)

 
## Features

- No need to periodically poll the Gmail API's history feed for updates
- Just subscribe and whenever a change occurs, the app will instantly notify you
- Once a new email is pushed, it will route as a text message to your Discord webhook URL
- Choose which part of the email (subject, body. from, to, etc) to include in the Discord message


## Prerequisites
- Create a new project on the Google Cloud console
- OAuth2 client ID and client secret
- Access token for user's Gmail data
- Enable the Pub/Sub API and the Gmail API for that project
- Create a Pub/Sub Topic and a Subscription for that Topic (https://cloud.google.com/pubsub/docs/quickstart-console#create_a_topic)
- A local server exposed to the internet via [ngrok](https://ngrok.com/download), or a VPS for setting up the endpoint URL
## Installation

1. Clone this repo and then install it with npm:

```bash
  git clone https://github.com/jzvi12/gmail-push-to-discord.git
  cd gmail-push-to-discord/
  npm i
```
2. Rename the `.env_exmaple` file to `.env` and then add your credentials:

```
EMAIL=test@gmail.com
CLIENT_ID=xxxxxxxxxxxxxx.apps.googleusercontent.com
CLIENT_SECRET=xxxxxxxxxxxxxx
TOPIC_URL=projects/<your-project-id>/topics/MyPush
SUBSCRIPTION_URL=projects/<your-project-id>/subscriptions/MyPush-sub
EMAIL_LABEL=UNREAD
WEBHOOK_URL=https://discord.com/api/webhooks/get/yours
```

3. Generate and download your `credentials.json` file after creating a new project on the Google Cloud console, and then place it in the app root directory.

4. Generate a Gmail access token by running the following command:

```bash
node getNewToken.js
```
Copy the verification URL from the terminal and paste it a browser where the same Gmail account is already logged in.
Just allow access to your new app and copy and code and paste it in the terminal.
If everything went fine, you'll see your `token.json` file.




## License

[MIT](https://choosealicense.com/licenses/mit/)

