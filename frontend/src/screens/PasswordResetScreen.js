import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import FormContainer from "../components/FormContainer";

const PasswordResetScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch password reset action here
  };

  return (
    <FormContainer>
      <h1>Password Reset</h1>
      <p>
        Forgot your password? Please enter your email below and we'll send you a
        link to create a new password via email.
      </p>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="my-3">
          Reset Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PasswordResetScreen;
