import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import PriceCard from "../components/PriceCard";
import AddressForm from "../components/AddressForm";
import CheckoutProgress from "../components/CheckoutProgress";
import { getUserAddresses } from "../actions/userActions";

import "./OrderScreen.css";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userShippingAddress = useSelector((state) => state.userShippingAddress);
  const { loading, userAddresses, error } = userShippingAddress;

  // toggle address book or form
  const [showAddressBook, setShowAddressBook] = useState(false);
  const displayAddressBook = () => setShowAddressBook(true);
  const hideAddressBook = () => setShowAddressBook(false);

  // input address by radio select from address book.
  const addressFromStore = JSON.parse(localStorage.getItem("cartAddress"));
  const [selectedAddress, setSelectedAddress] = useState(
    addressFromStore ? addressFromStore.id : ""
  );
  const addressSelectHandler = (id) => {
    const submitAddress = userAddresses.find((x) => x.id === id);
    localStorage.setItem("cartAddress", JSON.stringify(submitAddress));
    setSelectedAddress(id);
  };

  // handle submit, data is stored temporarily in localStorage before order is made.
  const continueButtonHandler = () => {
    // AddressForm component is not loaded when only e-patterns are in the cart.
    // or navigate when an address has been selected from the address book.
    // click submit button in AddressForm component, triggers form submit.
    if (
      !cartItems.some((item) => item.itemType === "paper") ||
      (showAddressBook && localStorage.getItem("cartAddress"))
    ) {
      navigate("/order/confirm");
    } else {
      const hiddenSubmitButton = document.querySelector(".hidden-submit-btn");
      hiddenSubmitButton.click();
      if (document.querySelector("form").checkValidity()) {
        navigate("/order/confirm");
      }
    }
  };

  // useEffect.
  // Redirect anonymous users to login.
  // Get user addresses to display address book.
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/cart");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

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
            {showAddressBook ? (
              <div>
                <Button
                  type="button"
                  className="address-btn"
                  onClick={hideAddressBook}
                >
                  Enter a different address
                </Button>
                <Form>
                  {userAddresses.map((address) => (
                    <Form.Check
                      key={address.id}
                      type="radio"
                      id={`choice-${address.id}`}
                      name="address-choice"
                      onChange={() => addressSelectHandler(address.id)}
                      checked={address.id === selectedAddress}
                      label={`${address.first_name} ${address.last_name}, ${
                        address.address
                      }, ${address.city}, ${address.country}${
                        address.postal_code ? " ," + address.postal_code : ""
                      }`}
                    />
                  ))}
                </Form>
              </div>
            ) : (
              <div>
                <Button
                  type="button"
                  className="address-btn"
                  onClick={displayAddressBook}
                >
                  Choose from address book
                </Button>
                <AddressForm
                  variant="new"
                  showAddressBookToggle
                  noSave
                  noButton
                />{" "}
              </div>
            )}
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
