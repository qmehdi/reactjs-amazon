const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HPwD1LVy8I7ci0nUC2qEXSIpPWBjfg9Ztn8h2T2YlJJXYiQ76EutycoFuAag49ZlTumDrY0kcy2uXZSXVqieP4z008rL4zZT0"
);

//  API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API Routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  // Since payment.js const response has total as a query parameter in the URL
  const total = request.query.total; // This is amount in subunits

  console.log("Payment Request Received BOOM!!! for amount of >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // In subunits
    currency: "usd",
  });

  // OK - Created Response Code
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// firebase emulators:start

// Example endpoint
// http://localhost:5001/clone-2241f/us-central1/api
