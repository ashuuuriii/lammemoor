import React, { useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PriceCard from "../components/PriceCard";
import CheckoutProgress from "../components/CheckoutProgress";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";

const OrderConfirmScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addressFromStore = JSON.parse(localStorage.getItem("cartAddress"));

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error } = orderCreate;

  const orderPlacementHandler = () => {
    dispatch(
      createOrder({
        order_items: cartItems,
        shipping_address: addressFromStore ? addressFromStore : "",
      })
    );
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart/");
    } else if (
      !addressFromStore &&
      cartItems.some((item) => item.itemType === "paper")
    ) {
      navigate("/order/");
    } else if (!userInfo) {
      navigate("/login?redirect=/cart");
    }
  }, [addressFromStore, cartItems, userInfo, navigate]);

  useEffect(() => {
    if (success) {
      navigate("/order/payment/");
    }
  }, [success, navigate]);

  return (
    <Container className="pt-4">
      <CheckoutProgress step1 step2 step3 />
      <Row>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <Col lg={7}>
          <h1>Review Your Order</h1>
          <Row className="my-3">
            <h2 className="mb-3">Shipping</h2>
            {cartItems.some((item) => item.itemType === "paper") ? (
              addressFromStore ? (
                <>
                  <p>
                    <strong>Name: </strong>
                    {addressFromStore.first_name} {addressFromStore.last_name}
                  </p>
                  {addressFromStore.phone_number ? (
                    <p>
                      <strong>Phone Number: </strong>
                      {addressFromStore.phone_number}
                    </p>
                  ) : null}
                  <p>
                    <strong>Address:</strong>
                    <br />
                    {addressFromStore.address}, {addressFromStore.city}
                    <br />
                    {addressFromStore.country}
                  </p>

                  {addressFromStore.postal_code ? (
                    <p>
                      <strong>Postal Code: </strong>
                      {addressFromStore.postal_code}
                    </p>
                  ) : null}
                </>
              ) : (
                <div>You've not provided a shipping address.</div>
              )
            ) : (
              <div>
                Your e-pattern will be sent to your account email at{" "}
                <strong>{userInfo.email}</strong>.
              </div>
            )}
          </Row>
          <Row className="my-3">
            <h2>Items</h2>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col md={5}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      {item.itemType === "paper"
                        ? "Paper pattern"
                        : "E-pattern"}
                    </Col>
                    <Col md={2}>£{item.price}</Col>
                    <Col md={1}>{item.itemType === "pdf" ? "-" : item.qty}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Row>
        </Col>
        <Col lg={4}>
          <Row>
            <PriceCard />
          </Row>
          <Row>
            <Button
              type="button"
              onClick={() => {
                alert(
                  "This is a demo linked to test mode Stripe account. No actual transactions takes place."
                );
                orderPlacementHandler();
              }}
              className="my-3"
            >
              To payment page
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmScreen;
