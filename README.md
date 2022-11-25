
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
- Choose which part of the email (subject, body, from, to) you want to include them in the message to Discord


## Prerequisites
- [Create a new project on the Google Cloud console](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project)
- Generate the `credentials.json` file by [creating an OAuth2 client ID and client secret](https://console.cloud.google.com/apis/credentials) for your new project
- [Enable the Gmail API](https://console.cloud.google.com/apis/library/gmail.googleapis.com) for your new project
- [Enable the Pub/Sub API](https://console.cloud.google.com/cloudpubsub/) for your new project
- [Create a Pub/Sub Topic](https://cloud.google.com/pubsub/docs/quickstart-console#create_a_topic) and a Subscription for that Topic
![image](https://user-images.githubusercontent.com/10729787/203846918-90ea597a-809f-4062-ad3a-801042d5aaa7.png)
- Grant Gmail privileges to Cloud Pub/Sub to allow publishing notifications to your topic. To do this, you need to grant publish privileges to gmail-api-push@system.gserviceaccount.com
![pubsub_permissions](https://user-images.githubusercontent.com/10729787/203849161-083bbf8f-c128-4a3a-aa6f-06152c9d573a.png)
- Make sure to select PUSH as the _Delivery Type_, and then enter your endpoint URL. You should get a VPS on the cloud with a public domain (HTTPS) for setting up the endpoint URL for google to send you updates. Deploy the Node.js server however you like. For testing purposes, I recommend using [ngrok](https://ngrok.com/download)
![image](https://user-images.githubusercontent.com/10729787/203836457-7d281635-e75c-48da-9213-fbebc2fa4902.png)
- Create a [Discord Webhook](https://discordjs.guide/popular-topics/webhooks.html#creating-webhooks-through-server-settings), then copy and paste the URL in the `.env` file
## Installation

Clone this repo and then install required libraries with npm:

```
  git clone https://github.com/jzvi12/gmail-push-to-discord.git
  cd gmail-push-to-discord/
  npm i
```
Rename the `.env_exmaple` file to `.env` and then add your credentials:

```
EMAIL=test@gmail.com
CLIENT_ID=xxxxxxxxxxxxxx.apps.googleusercontent.com
CLIENT_SECRET=xxxxxxxxxxxxxx
TOPIC_URL=projects/<your-project-id>/topics/MyPush
SUBSCRIPTION_URL=projects/<your-project-id>/subscriptions/MyPush-sub
EMAIL_LABEL=UNREAD
WEBHOOK_URL=https://discord.com/api/webhooks/get/yours
```

From the [prerequisites](#prerequisites),  download and place your `credentials.json` file in the app root directory.

Generate a Gmail access token by running the following:

```bash
node getNewToken.js
```
Copy the verification URL from the terminal and paste it a browser where the same Gmail account is already logged in.
Just allow access to your new app and copy and code and paste it in the terminal.
If everything goes well, you'll see your `token.json` file.

If you have created a user label and want to monitor this label, then you may want to run the following to get the label ID for the corresponding label name:

```
node eventTracker.js
```
Just perform any action on your Gmail web client like deleting an email, creating a draft, or receiving a new email, then you will get some JSON data. Just look for the label list. You will then need to set this label ID in the `.env` file (`EMAIL_LABEL`).

Send a "Watch Request" so that Google starts watching our Gmail account for push notifications on the given user mailbox:

```
node watchRequest.js
```
You should see a JSON response. Make sure you see `status: 200` which means the request was accepted.

At this point you should be able to execute the main application:

```
node index.js
```

It's recommended to have an advanced process manager for your production Node.js applications such as [`pm2`](https://pm2.keymetrics.io/):

```
sudo npm install pm2@latest -g
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

