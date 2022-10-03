import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

const OrderDetailScreen = () => {
  const orderId = useParams().id;

  return (
    <Container className="mt-3">
      <h1>Order Details</h1>
    </Container>
  );
};

export default OrderDetailScreen;
