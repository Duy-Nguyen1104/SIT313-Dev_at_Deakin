const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/email", (req, res) => {
  const email = req.body.email;
  if (!email) {
    console.error("No email provided");
    return res.status(400).send("Email is required");
  }

  const senderEmail = process.env.SENDER_EMAIL;
  if (!senderEmail) {
    console.error("Sender email is not set in environment variables");
    return res
      .status(500)
      .send("Internal server error: Sender email is not configured");
  }

  const data = {
    from: `Duy <${senderEmail}>`,
    to: email,
    subject: "Subscribe to Deakin Newsletter",
    text: "Thank you for subscribing to our newsletter!",
  };

  console.log("Sending email to:", email);
  mg.messages
    .create(process.env.MAILGUN_DOMAIN, data)
    .then((body) => {
      console.log("Mailgun response:", body);
      res.status(200).send("Subscribed successfully");
    })
    .catch((error) => {
      console.error("Mailgun error:", error);
      res
        .status(error.status || 500)
        .send(
          `Something went wrong: ${
            error.details || error.message || "Unknown error"
          }`
        );
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
