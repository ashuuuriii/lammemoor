import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
  Accordion,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { updateUserDetails } from "../actions/userActions";
import { USER_UPDATE_DETAILS_RESET } from "../constants/userConstants";

const ManageAccountScreen = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const { loading, success, error } = userUpdateDetails;

  const validatePassword = (password) => {
    // Password must contain at least one digit, one uppercase letter
    // and must have a minimum length of 8 characters
    const testStr = /^(?=.*\d)(?=.*[A-Z])(.{8,50})$/;
    return testStr.test(password);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage("The passwords you have entered do not match.");
    } else if (password && !validatePassword(password)) {
      setMessage(
        "Your password must contain at least one digit, one uppercase letter, and have a minimum length of 8 characters."
      );
    } else {
      dispatch(
        updateUserDetails({
          id: userInfo.id,
          first_name: firstName,
          last_name: lastName,
          username: email,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  useEffect(() => {
    setFirstName(userInfo.first_name);
    setLastName(userInfo.last_name);
    setEmail(userInfo.email);
  }, [userInfo]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_UPDATE_DETAILS_RESET });
    };
  }, [dispatch]);

  return (
    <Container className="pt-4">
      <h1>Your Account</h1>
      <p className="lead">Welcome back, {userInfo.first_name}.</p>
      <Row>
        <Col md={4}>
          <h2>Edit User</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">
              Your user details have been updated.
            </Message>
          )}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Update Name</Accordion.Header>
                <Accordion.Body>
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Update Email</Accordion.Header>
                <Accordion.Body>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Update Password</Accordion.Header>
                <Accordion.Body>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip>
                          Please include at least one digit, one uppercase
                          letter, at least 8 characters
                        </Tooltip>
                      }
                    >
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                    </OverlayTrigger>
                  </Form.Group>

                  <Form.Group controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Button
              type="submit"
              variant="primary"
              className="my-3 btn d-none d-lg-block"
            >
              Update
            </Button>
            <Row className="d-lg-none d-block mx-0">
              <Button type="submit" variant="primary" className="my-3">
                Update
              </Button>
            </Row>
          </Form>
        </Col>
        <Col md={8}>
          <h2>Address Book</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageAccountScreen;
