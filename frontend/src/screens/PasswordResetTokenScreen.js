import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const PasswordResetTokenScreen = () => {
  const { search } = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const token = search ? search.split("=")[1] : null;

  const validatePassword = (password) => {
    // Password must container at least one digit, one uppercase letter
    // and must have a minimum length of 8 characters
    const testStr = /^(?=.*\d)(?=.*[A-Z])(.{8,50})$/;
    return testStr.test(password);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("The passwords you have entered do not match.");
    } else if (!validatePassword(password)) {
      setMessage(
        "Your password must contain at least one digit, one uppercase letter, and have a minimum length of 8 characters."
      );
    } else {
      // TODO: dispatch password change action here
      setMessage("");
    }
  };

  return (
    <FormContainer onSubmit={submitHandler}>
      <h1>Reset your password</h1>
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Please include at least one digit, one uppercase letter, at least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PasswordResetTokenScreen;
