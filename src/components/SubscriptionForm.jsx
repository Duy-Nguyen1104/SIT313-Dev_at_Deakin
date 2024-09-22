import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Subscribed successfully!");
        setEmail(""); // Clear the input field
      } else {
        // Extract and display just the error message from the response
        const errorText = await response.text();
        toast.error(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="subscription-form">
      <h3>Sign Up for Our Daily Insider</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Button primary type="submit">
          Subscribe
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default SubscriptionForm;
