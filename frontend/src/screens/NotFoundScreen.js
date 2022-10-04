import React from "react";
import { Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const NotFoundScreen = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center">404</h1>
      <p className="lead text-center">Not found</p>
      <div className="text-center">
        <LinkContainer to="">
          <Button>Go home</Button>
        </LinkContainer>
      </div>
    </Container>
  );
};

export default NotFoundScreen;
