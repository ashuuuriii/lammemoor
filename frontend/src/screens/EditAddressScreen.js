import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import AddressForm from "../components/AddressForm";

const EditAddressScreen = () => {
  return (
    <>
      <Link to="/accounts/manage/">
        <Button className="my-3 d-none d-lg-block">Go back</Button>
      </Link>
      <FormContainer>
        <h1>Edit</h1>
        <AddressForm variant="update" />
        <Button variant="danger" className="my-3">
          Remove from address book
        </Button>
      </FormContainer>
    </>
  );
};

export default EditAddressScreen;
