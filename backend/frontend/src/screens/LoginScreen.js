import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = search ? search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
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
              required
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-3 btn d-none d-lg-block"
          >
            Sign In
          </Button>
          <Row className="d-lg-none d-block mx-0">
            <Button type="submit" variant="primary" className="my-3">
              Sign In
            </Button>
          </Row>
        </Form>
        <Row className="py-3">
          <Col>
            New customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create an account.
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
