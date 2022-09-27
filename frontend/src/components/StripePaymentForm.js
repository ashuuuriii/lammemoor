import React, { useEffect, useState } from "react";
import { Button, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import Message from "./Message";
import { PAYMENT_CONFIRM_URL } from "../constants/appConstants";

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setInfoMessage("");
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: PAYMENT_CONFIRM_URL },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setErrorMessage("");
          setSuccessMessage("Payment succeeded!");
          break;
        case "processing":
          setInfoMessage("Your Payment is processing");
          break;
        case "requires_payment_method":
          setErrorMessage("Your payment was unsuccessful, please try again.");
          break;
        default:
          setSuccessMessage("");
          setErrorMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, dispatch]);

  return (
    <form id="payment-form" onSubmit={submitHandler}>
      {errorMessage && <Message variant="danger">{errorMessage}</Message>}
      {successMessage && <Message variant="success">{successMessage}</Message>}
      {infoMessage && (
        <Message variant="info">
          {infoMessage} <Spinner animation="grow" size="sm" />
        </Message>
      )}
      <PaymentElement id="payment-element" />
      <Row className="mx-0">
        <Button
          type="submit"
          className="my-3"
          disabled={loading || !stripe || !elements}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Pay now"}
        </Button>
      </Row>
    </form>
  );
};

export default StripePaymentForm;
