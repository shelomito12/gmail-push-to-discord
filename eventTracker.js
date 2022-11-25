require("dotenv").config();
const jsonToken = require("./token.json");
const Gmailpush = require("gmailpush");
const express = require("express");
const app = express();

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
    const labels = await gmailpush.getLabels(req.body, token);

    gmailpush
      .getMessages({
        notification: req.body,
        token,
      })
      .then((messages) => {
        if (messages) {
          console.log(messages);
          console.log(" ");
          console.log(labels);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

app.listen(3002, () => {
  console.log("Server listening on port 3002...");
});
