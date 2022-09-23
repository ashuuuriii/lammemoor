import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";

const AddressForm = ({
  variant,
  target = null,
  showAddressBookToggle = false,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [inAddressBook, setInAddressBook] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name*</Form.Label>
        <Form.Control
          required
          type="text"
          value={firstName ? firstName : ""}
          onChange={(e) => setFirstName(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Last Name*</Form.Label>
        <Form.Control
          required
          type="text"
          value={lastName ? lastName : ""}
          onChange={(e) => setLastName(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Address*</Form.Label>
        <Form.Control
          required
          type="text"
          value={address ? address : ""}
          onChange={(e) => setAddress(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label>City*</Form.Label>
        <Form.Control
          required
          type="text"
          value={city ? city : ""}
          onChange={(e) => setCity(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="postcode">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          value={postcode ? postcode : ""}
          onChange={(e) => setPostcode(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="country">
        <Form.Label>Country*</Form.Label>
        <Form.Control
          required
          type="text"
          value={country ? country : ""}
          onChange={(e) => setCountry(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="phone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          value={phone ? phone : ""}
          onChange={(e) => setPhone(e.target.value)}
        ></Form.Control>
      </Form.Group>

      {showAddressBookToggle ? (
        <Form.Check
          type="checkbox"
          id="inAddressBook"
          label="Save in address book?"
          onChange={(e) => setInAddressBook(e.target.checked)}
        ></Form.Check>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        className="my-3 btn d-none d-lg-block"
      >
        Add
      </Button>

      <Row className="d-lg-none d-block mx-0">
        <Button type="button" className="my-3">
          Add
        </Button>
      </Row>
    </Form>
  );
};

export default AddressForm;
