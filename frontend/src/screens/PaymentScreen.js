import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "../constants/orderContants";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const PaymentScreen = () => {
  return <div className="pt-4">PaymentScreen</div>;
};

export default PaymentScreen;
