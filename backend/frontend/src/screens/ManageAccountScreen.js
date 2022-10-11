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
  ListGroup,
  Modal,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import AddressForm from "../components/AddressForm";
import { updateUserDetails, getUserAddresses } from "../actions/userActions";
import { USER_UPDATE_DETAILS_RESET } from "../constants/userConstants";

const ManageAccountScreen = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const { loading, success, error } = userUpdateDetails;

  const userShippingAddress = useSelector((state) => state.userShippingAddress);
  const {
    loading: addressLoading,
    userAddresses,
    error: addressError,
  } = userShippingAddress;

  const userAddAddress = useSelector((state) => state.userAddAddress);
  const { success: addAddressSuccess } = userAddAddress;

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
    dispatch(getUserAddresses());
  }, [dispatch, addAddressSuccess]);

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
          <Button
            type="button"
            className="mb-3 btn d-none d-lg-block"
            onClick={handleShow}
          >
            Add Address
          </Button>
          <Row className="d-lg-none d-block mx-0">
            <Button type="button" className="mb-3" onClick={handleShow}>
              Add Address
            </Button>
          </Row>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddressForm variant="new" />
            </Modal.Body>
          </Modal>

          <Row>
            {addressLoading ? (
              <Loader />
            ) : addressError ? (
              <Message variant="danger">{addressError}</Message>
            ) : (
              <ListGroup className="mx-2">
                {userAddresses.map((address) => {
                  return address.in_address_book ? (
                    <LinkContainer
                      to={`/edit_address/${address.id}`}
                      key={address.id}
                    >
                      <ListGroup.Item action>
                        <p>
                          <strong>Name: </strong>
                          {address.first_name} {address.last_name}
                        </p>
                        {address.phone_number ? (
                          <p>
                            <strong>Phone Number: </strong>
                            {address.phone_number}
                          </p>
                        ) : null}
                        <p>
                          <strong>Address:</strong>
                          <br />
                          {address.address}, {address.city}
                          <br />
                          {address.country}
                        </p>

                        {address.postal_code ? (
                          <p>
                            <strong>Postal Code: </strong>
                            {address.postal_code}
                          </p>
                        ) : null}
                      </ListGroup.Item>
                    </LinkContainer>
                  ) : null;
                })}
              </ListGroup>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageAccountScreen;
