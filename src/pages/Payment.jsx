import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Load your publishable key from the Stripe dashboard
const stripePromise = loadStripe(
  "pk_test_51Q4vdrGw7PUQwb0xE4p9ShahhLx8IB4ESMOS7g3GOCuINSp6StqlSCgbl10308oYAAkWFR065EO73yxlVeRQJ2rp00B0UUEe5O"
);

function Payment() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}

export default Payment;
