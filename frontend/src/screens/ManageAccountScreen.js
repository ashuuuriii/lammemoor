import React, { useState } from "react";
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
import { useSelector } from "react-redux";

const ManageAccountScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Container className="pt-4">
      <h1>Your Account</h1>
      <p className="lead">Welcome back, {userInfo.first_name}.</p>
      <Row>
        <Col md={4}>
          <h2>Edit User</h2>
          <Form>
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
