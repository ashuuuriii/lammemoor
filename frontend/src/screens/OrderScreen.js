import React, { useEffect } from "react";
import { Row, Col, Card, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PriceCard from "../components/PriceCard";

const OrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/cart");
    }
  }, [userInfo, navigate]);

  return (
    <Row className="pt-4">
      <Col md={8}>
        <h1>Shipping Details</h1>
        {cartItems.some((item) => item.itemType === "pdf") ? (
          <p>
            Your e-patterns will be sent to your account email after payment has
            been confirmed.
          </p>
        ) : null}
        {cartItems.some((item) => item.itemType === "paper") ? (
          <Form></Form>
        ) : null}
      </Col>
      <Col md={4}>
        <Row>
          <Card>
            <Card.Header>
              <h3>Your Order</h3>
            </Card.Header>
            <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr>
                      <td>
                        {item.name} -{" "}
                        {item.itemType === "paper" ? "paper" : "e-pattern"}
                      </td>
                      <td>{item.itemType === "paper" ? item.qty : "-"}</td>
                      <td>£{item.price * item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Row>
        <Row className="pt-4">
          <PriceCard />
        </Row>
      </Col>
    </Row>
  );
};

export default OrderScreen;
