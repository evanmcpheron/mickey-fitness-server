"use strict";

const express = require("express");

const app = express();

const cors = require("cors");

const path = require("path");

const bodyParser = require("body-parser");

const connectDB = require("./v1/Config/db");

const stripe = require("stripe")(process.env.STRIPE_SK);

const PORT = process.env.PORT || 8080;
const application = {
  app
};
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors()); // app.get("/v1/secret", async (req, res) => {
//   const intent = await stripe.paymentIntents.create({
//     amount: 0,
//     currency: "usd",
//     // Verify your integration in this guide by including this parameter
//     metadata: { integration_check: "accept_a_payment" },
//   });
//   res.json({ client_secret: intent.client_secret }); // ... Fetch or create the PaymentIntent
// });

app.use("/v1", require("./v1/Routes/index")(application)); // SERVE REACT APP IN PRODUCTION

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;