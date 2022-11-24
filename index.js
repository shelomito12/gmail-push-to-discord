require("dotenv").config();
const jsonToken = require("./token.json");
const Gmailpush = require("gmailpush");
const express = require("express");
const app = express();
const { WebhookClient } = require("discord.js");
const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });

// Initialize with OAuth2 config and Pub/Sub topic
const gmailpush = new Gmailpush({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  pubsubTopic: process.env.TOPIC_URL,
});

const users = [
  {
    email: process.env.EMAIL,
    token: {
      access_token: jsonToken.access_token,
      refresh_token: jsonToken.refresh_token,
      scope: jsonToken.scope,
      token_type: jsonToken.token_type,
      expiry_date: jsonToken.expiry_date,
    },
  },
];

app.post(
  // Use URL set as Pub/Sub Subscription endpoint
  "/pubsub",
  express.json(),
  async (req, res) => {
    res.sendStatus(200);
    const email = gmailpush.getEmailAddress(req.body);
    const token = users.find((user) => user.email === email).token;

    const { subject } = await gmailpush
      .getNewMessage({
        notification: req.body,
        token,
      })
      .then((message) => {
        if (message === null) {
          return {};
        }
        if (!message.labelIds.includes(process.env.EMAIL_LABEL)) {
          return {};
        }
        return message;
      });
    if (subject) {
      webhook
        .send({ content: subject })
        .then((message) => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
    } else {
      console.log(
        "Not sending message: Email Subject does not match label ID."
      );
    }
  }
);

app.listen(3002, () => {
  console.log("Server listening on port 3002...");
});
