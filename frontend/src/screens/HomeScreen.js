import React from "react";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import fashion from "../assets/images/f6998.jpg";

const HomeScreen = () => {
  return (
    <Container className="pt-4">
      <Row className="justify-content-center align-items-center">
        <Col className="md-5 text-center text-md-start">
          <h1>
            <div className="display-2">Lammermoor</div>
            <div className="display-5 text-muted">
              Sewing patterns of the Victorian and Edwardian periods.
            </div>
          </h1>
          <p className="lead my-4 text-muted">
            Historical costuming made simple. Your one stop shop for Victorian
            era costuming.
          </p>
          <LinkContainer to="/shop">
            <Button className="btn btn-secondary btn-lg mb-4">Shop Now</Button>
          </LinkContainer>
        </Col>
        <Col className="text-center d-md-block" sm={12} md={12} lg={5}>
          <Image
            src={fashion}
            fluid
            alt="Fashion, Journal de Demoiselles, 1858."
          ></Image>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
