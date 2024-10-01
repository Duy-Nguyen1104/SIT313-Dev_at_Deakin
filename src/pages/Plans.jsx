import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Plans() {
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    if (plan === "premium") {
      navigate("/payment");
    }
    if (plan === "free") {
      // Handle free plan selection
      toast.success("You have selected the Free Plan!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>
      <div className="flex space-x-4">
        {/* Free Plan */}
        <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-64">
          <h2 className="text-xl font-semibold mb-2">Free Plan</h2>
          <p className="text-gray-600 mb-4">
            Basic features with limited access.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Access to basic features</li>
            <li>Limited customer support</li>
            <li>Basic analytics</li>
            <li>Community access</li>
          </ul>
          <button
            onClick={() => handleSelectPlan("free")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Select Free Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-64">
          <h2 className="text-xl font-semibold mb-2">
            Premium Plan{" "}
            <span className="text-lg font-bold text-blue-600">($10/month)</span>
          </h2>
          <p className="text-gray-600 mb-4">
            Advanced features including customization, themes, and support.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>All Free Plan features</li>
            <li>Customization options</li>
            <li>Priority customer support</li>
            <li>Advanced analytics</li>
            <li>Access to exclusive content</li>
            <li>Monthly webinars and tutorials</li>
          </ul>
          <button
            onClick={() => handleSelectPlan("premium")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Select Premium Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Plans;
