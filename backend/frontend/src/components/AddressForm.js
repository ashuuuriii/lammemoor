import React, { useEffect, useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Message from "./Message";
import Loader from "./Loader";
import {
  addNewAddress,
  getUserAddressDetail,
  updateAddress,
} from "../actions/userActions";
import { USER_GET_ADDRESS_DETAIL_RESET } from "../constants/userConstants";

const AddressForm = ({
  variant, // "new" or "update", triggers POST or GET request on submit
  showAddressBookToggle = false, // submits inAddressBook as true without displaying option
  noSave = false, // saves to local storage instead of db
  noButton = false, // hides button for layout customisation.
}) => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const addressFromStore = JSON.parse(localStorage.getItem("cartAddress"));
  const [firstName, setFirstName] = useState(
    addressFromStore ? addressFromStore.first_name : ""
  );
  const [lastName, setLastName] = useState(
    addressFromStore ? addressFromStore.last_name : ""
  );
  const [address, setAddress] = useState(
    addressFromStore ? addressFromStore.address : ""
  );
  const [city, setCity] = useState(
    addressFromStore ? addressFromStore.city : ""
  );
  const [postcode, setPostcode] = useState(
    addressFromStore ? addressFromStore.postal_code : ""
  );
  const [country, setCountry] = useState(
    addressFromStore ? addressFromStore.country : ""
  );
  const [phone, setPhone] = useState(
    addressFromStore ? addressFromStore.useState : ""
  );
  const [inAddressBook, setInAddressBook] = useState(
    addressFromStore ? addressFromStore.first_name : true
  );

  const userShippingAddressDetail = useSelector(
    (state) => state.userShippingAddressDetail
  );
  const { loading, address: addressDetail, error } = userShippingAddressDetail;

  const submitHandler = (e) => {
    e.preventDefault();
    const submitAddress = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      city: city,
      postal_code: postcode,
      country: country,
      phone_number: phone,
      in_address_book: inAddressBook,
    };
    if (!noSave) {
      if (variant === "new") {
        dispatch(addNewAddress(submitAddress));
      } else if (variant === "update") {
        dispatch(updateAddress(id, submitAddress));
      }
    } else {
      localStorage.setItem("cartAddress", JSON.stringify(submitAddress));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserAddressDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (addressDetail) {
      setFirstName(addressDetail.first_name);
      setLastName(addressDetail.last_name);
      setAddress(addressDetail.address);
      setCity(addressDetail.city);
      setCountry(addressDetail.country);
      if (addressDetail.phone_number) {
        setPhone(addressDetail.phone_number);
      }
      if (addressDetail.postal_code) {
        setPostcode(addressDetail.postal_code);
      }
    }
  }, [addressDetail]);

  useEffect(() => {
    return () => {
      dispatch({ type: USER_GET_ADDRESS_DETAIL_RESET });
    };
  }, [dispatch]);

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name*</Form.Label>
          <Form.Control
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name*</Form.Label>
          <Form.Control
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address*</Form.Label>
          <Form.Control
            required
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City*</Form.Label>
          <Form.Control
            required
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postcode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country*</Form.Label>
          <Form.Control
            required
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {showAddressBookToggle ? (
          <Form.Check
            type="checkbox"
            id="inAddressBook"
            label="Save in address book?"
            onChange={(e) => setInAddressBook(e.target.checked)}
            checked={inAddressBook}
            className="py-3"
          ></Form.Check>
        ) : null}

        {noButton ? (
          <Button type="submit" className="d-none hidden-submit-btn"></Button>
        ) : (
          <div>
            <Button
              type="submit"
              variant="primary"
              className="my-3 btn d-none d-lg-block"
            >
              {variant === "update" ? "Update" : "Add"}
            </Button>

            <Row className="d-lg-none d-block mx-0">
              <Button type="submit" className="my-3">
                {variant === "update" ? "Update" : "Add"}
              </Button>
            </Row>
          </div>
        )}
      </Form>
    </>
  );
};

export default AddressForm;
