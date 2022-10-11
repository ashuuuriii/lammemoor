import React, { useState, useEffect } from "react";
import { Form, Button, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { resetPassword } from "../actions/userActions";
import { USER_PASSWORD_TOKEN_RESET } from "../constants/userConstants";

const PasswordResetTokenScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const token = search ? search.split("=")[1] : null;

  const validatePassword = (password) => {
    // Password must contain at least one digit, one uppercase letter
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
      dispatch(resetPassword(token, password));
      setMessage("");
    }
  };

  const userPasswordToken = useSelector((state) => state.userPasswordToken);
  const { loading, success, error } = userPasswordToken;

  useEffect(() => {
    if (success) {
      setTimeout(function () {
        navigate("/login");
      }, 3000);
    }
  }, [success, navigate]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_PASSWORD_TOKEN_RESET });
    };
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Reset your password</title>
      </Helmet>
      <FormContainer onSubmit={submitHandler}>
        <h1>Reset your password</h1>
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">
            Your password has been reset. <Link to="/login">Click here</Link> if
            you're not redirected to the sign in page in a few seconds.
          </Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>
                  Please include at least one digit, one uppercase letter, at
                  least 8 characters
                </Tooltip>
              }
            >
              <Form.Control
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </OverlayTrigger>
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
          <Button
            type="submit"
            variant="primary"
            className="my-3 btn d-none d-lg-block"
          >
            Reset Password
          </Button>
          <Row className="d-lg-none d-block mx-0">
            <Button type="submit" variant="primary" className="my-3">
              Reset Password
            </Button>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default PasswordResetTokenScreen;
