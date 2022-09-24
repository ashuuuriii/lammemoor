import React, { useEffect } from "react";
import { Row, Col, Card, Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PriceCard from "../components/PriceCard";
import AddressForm from "../components/AddressForm";
import CheckoutProgress from "../components/CheckoutProgress";

import "./OrderScreen.css";

const OrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const continueButtonHandler = () => {
    // click submit button in AddressForm component, triggers form submit.
    // AddressForm component is not loaded when only e-patterns are in the cart.
    if (cartItems.some((item) => item.itemType === "paper")) {
      const hiddenSubmitButton = document.querySelector(".hidden-submit-btn");
      hiddenSubmitButton.click();
      if (document.querySelector("form").checkValidity()) {
        navigate("/order/confirm");
      }
    } else {
      navigate("/order/confirm");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/cart");
    }
  }, [userInfo, navigate]);

  return (
    <Row className="pt-4">
      <CheckoutProgress step1 step2 />
      <Col lg={7}>
        <h1>Shipping Details</h1>
        {cartItems.some((item) => item.itemType === "pdf") ? (
          <p>
            Your e-patterns will be sent to your account email after payment has
            been confirmed.
          </p>
        ) : null}
        {cartItems.some((item) => item.itemType === "paper") ? (
          <div>
            <Button type="button" className="address-btn">
              Choose from address book
            </Button>
            <AddressForm variant="new" showAddressBookToggle noSave noButton />
          </div>
        ) : null}
      </Col>
      <Col lg={4}>
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
                    <tr key={item.product}>
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
        <Row>
          <Button
            type="submit"
            className="my-3"
            onClick={continueButtonHandler}
          >
            Continue
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default OrderScreen;
