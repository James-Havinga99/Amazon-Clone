const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response, request } = require("express");
const { Payment } = require("@material-ui/icons");
const stripe = require("stripe")(
	"sk_test_51In46RJaLsVCuViTUzD9ecU3e3ekm0ObzhVjzHFK1dN4dPbkKkBnPgGlKHaRJiWFkqySlid9ckbwKqCUGKdrk4fh004hwUrZhM"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
	const total = request.query.total;

	console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, // subunits of the currency
		currency: "usd",
	});

	// OK - Created
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

// - Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-66176/us-central1/api
