import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = search ? search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch login action here
  };

  return (
    <FormContainer>
      <h2>Sign In</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Row className="justify-content-space-between">
            <Col>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col className="text-end">
              <Link to="/accounts/password_reset">Forgot password?</Link>
            </Col>
          </Row>

          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Create an account.
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
