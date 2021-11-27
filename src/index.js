import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Helmet titleTemplate="%s | Croi Beauty Shop">
        <title>Main Page</title>
      </Helmet>
      <Router>
        <App />
      </Router>
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);
