import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Loader from "../components/Loader";
import Message from "../components/Message";
import PriceCard from "../components/PriceCard";
import CheckoutProgress from "../components/CheckoutProgress";
import StripePaymentForm from "../components/StripePaymentForm";
import { STRIPE_PUBLISHABLE_KEY } from "../constants/orderContants";
import { fetchPaymentIntent } from "../actions/orderActions";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const PaymentScreen = () => {
  const dispatch = useDispatch();

  const appearance = { theme: "stripe" };

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order } = orderCreate;

  const orderPaymentIntent = useSelector((state) => state.orderPaymentIntent);
  const { loading, clientSecret, error } = orderPaymentIntent;

  useEffect(() => {
    if (order) {
      dispatch(fetchPaymentIntent(order.id));
    }
  }, [dispatch, order]);

  return (
    <Container className="pt-4">
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {clientSecret && (
        <Row>
          <CheckoutProgress step1 step2 step3 step4 />
          <Col lg={7}>
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance }}
            >
              <h1>Payment</h1>
              <StripePaymentForm />
            </Elements>
          </Col>
          <Col lg={4}>
            <PriceCard />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PaymentScreen;
