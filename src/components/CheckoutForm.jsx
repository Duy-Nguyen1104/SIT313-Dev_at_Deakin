import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [country, setCountry] = useState("United States");
  const [zip, setZip] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      setError(error.message);
      toast.error(error.message);
    } else {
      setError(null);
      setSuccess(true);

      // Clear form fields after success
      setEmail("");
      setNameOnCard("");
      setCountry("United States");
      setZip("");
      elements.getElement(CardNumberElement).clear();
      elements.getElement(CardExpiryElement).clear();
      elements.getElement(CardCvcElement).clear();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Pay with card
      </h2>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
        />
      </div>

      {/* Card Number Element */}
      <div>
        <label
          htmlFor="card-number-element"
          className="block text-gray-700 font-medium"
        >
          Card Number
        </label>
        <div className="border border-gray-300 p-4 rounded-md">
          <CardNumberElement id="card-number-element" />
        </div>
      </div>

      {/* Expiry Date and CVC Fields */}
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label
            htmlFor="card-expiry-element"
            className="block text-gray-700 font-medium"
          >
            Expiry Date
          </label>
          <div className="border border-gray-300 p-4 rounded-md">
            <CardExpiryElement id="card-expiry-element" />
          </div>
        </div>
        <div className="w-1/2">
          <label
            htmlFor="card-cvc-element"
            className="block text-gray-700 font-medium"
          >
            CVC
          </label>
          <div className="border border-gray-300 p-4 rounded-md">
            <CardCvcElement id="card-cvc-element" />
          </div>
        </div>
      </div>

      {/* Name on Card Field */}
      <div>
        <label
          htmlFor="name-on-card"
          className="block text-gray-700 font-medium"
        >
          Name on card
        </label>
        <input
          type="text"
          id="name-on-card"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name on card"
        />
      </div>

      {/* Country or Region Field */}
      <div>
        <label htmlFor="country" className="block text-gray-700 font-medium">
          Country or region
        </label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>United States</option>
          {/* Add more countries as needed */}
        </select>
      </div>

      {/* ZIP Field */}
      <div>
        <label htmlFor="zip" className="block text-gray-700 font-medium">
          ZIP
        </label>
        <input
          type="text"
          id="zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="ZIP"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Subscribe
      </button>

      {error && <div className="text-red-600 mt-4">{error}</div>}
      {success && (
        <div className="text-green-600 mt-4">Payment successful!</div>
      )}
    </form>
  );
}

export default CheckoutForm;
