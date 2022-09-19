import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { sendPasswordToken } from "../actions/userActions";
import { USER_PASSWORD_RESET_RESET } from "../constants/userConstants";

const PasswordResetScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendPasswordToken(email));
  };

  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const { loading, success, error } = userPasswordReset;

  useEffect(() => {
    return () => {
      dispatch({ type: USER_PASSWORD_RESET_RESET });
    };
  }, [dispatch]);

  return (
    <FormContainer>
      <h1>Password Reset</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {success ? (
        <div>
          <p>
            Thank you. A password reset link will be sent to{" "}
            <strong>{email}</strong>.
          </p>
          <Link to="/login">Login here.</Link>
        </div>
      ) : (
        <div>
          <p>
            Forgot your password? Please enter your email below and we'll send
            you a link to create a new password via email.
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
        </div>
      )}
    </FormContainer>
  );
};

export default PasswordResetScreen;
