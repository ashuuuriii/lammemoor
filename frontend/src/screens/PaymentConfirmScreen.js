import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

import PriceCard from "../components/PriceCard";

const PaymentConfirmScreen = () => {
  const { search } = useLocation();
  const success = search.split("redirect_status=")[1] === "succeeded";

  const { id: orderId } = useParams();

  // TODO: get order details from backend and display
  return (
    <Container className="pt-4">
      <h1>Confirmation</h1>
      <Row>
        {success ? (
          <Row>
            <Row>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="currentColor"
                className="bi bi-check2-circle text-success"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
              </svg>
            </Row>
            <Row>
              <h2 className="text-center text-success my-3">
                Thank you for your order
              </h2>
            </Row>
          </Row>
        ) : (
          <Row>
            <Row>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="currentColor"
                class="bi bi-x-circle text-danger"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </Row>
            <Row>
              <h2 className="text-center text-danger my-3">Payment Failed</h2>
            </Row>
          </Row>
        )}
      </Row>
      <Row>
        <ListGroup variant="flush"></ListGroup>
      </Row>
      <Row>
        <Col md={8}>
          <h3>Shipping to</h3>
        </Col>
        <Col md={4}>
          <PriceCard />
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentConfirmScreen;
