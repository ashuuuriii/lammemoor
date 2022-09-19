import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

import { register } from "../actions/userActions";

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const validatePassword = (password) => {
    // Password must container at least one digit, one uppercase letter
    // and must have a minimum length of 8 characters
    const testStr = /^(?=.*\d)(?=.*[A-Z])(.{8,50})$/;
    return testStr.test(password);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("The passwords you have entered do not match.");
    } else if (!validatePassword(password)) {
      setMessage(
        "Your password must contain at least one digit, one uppercase letter, and have a minimum length of 8 characters."
      );
    } else {
      dispatch(register(firstName, lastName, email, password));
    }
  };

  const redirect = search ? search.split("=")[1] : "/";

  // Prevent logged in users from accessing page
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // redirect users after registration
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo: userInfoRegistered, error } = userRegister;

  useEffect(() => {
    if (userInfoRegistered) {
      navigate(redirect);
    }
  }, [navigate, userInfoRegistered, redirect]);

  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

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
            placeholder="Confirm password"
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

export default RegistrationScreen;
