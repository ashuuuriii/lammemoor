import React, { useState, useEffect } from "react";
import { useForm } from "@formspree/react";
import { Form, Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const ContactScreen = () => {
  const [state, handleSubmit] = useForm("xdojzgvn");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (state.succeeded) {
    setStatus("Your message has been sent.");
  }

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      if (userInfo.last_name)
        setName(userInfo.first_name + " " + userInfo.last_name);
      else setName(userInfo.first_name);
    }
  }, [userInfo]);

  return (
    <FormContainer>
      <h1>Contact Us</h1>
      {status && <Message variant="success">{status}</Message>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address (required)</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            name="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Message (required)</Form.Label>
          <Form.Control
            name="message"
            required
            as="textarea"
            row="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          className="my-3 d-none d-lg-block"
          disabled={state.submitting}
        >
          Send message
        </Button>
        <Row className="d-lg-none d-block mx-0">
          <Button type="submit" className="my-3" disabled={state.submitting}>
            Send message
          </Button>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default ContactScreen;
