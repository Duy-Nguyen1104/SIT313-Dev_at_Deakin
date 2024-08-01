import React from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import './SubscriptionForm.css';

const SubscriptionForm = () => (
  <div className="subscription-form">
    <h3>Sign Up for Our Daily Insider</h3>
    <Form>
      <Form.Field>
        <Input placeholder="Enter your email" />
      </Form.Field>
      <Button primary>Subscribe</Button>
    </Form>
  </div>
);

export default SubscriptionForm;
