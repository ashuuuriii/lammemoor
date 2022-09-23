import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import AddressForm from "../components/AddressForm";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_ADDRESS_RESET } from "../constants/userConstants";

const EditAddressScreen = () => {
  const dispatch = useDispatch();

  const userUpdateAddress = useSelector((state) => state.userUpdateAddress);
  const { loading, success, error } = userUpdateAddress;

  useEffect(() => {
    return () => {
      dispatch({ type: USER_UPDATE_ADDRESS_RESET });
    };
  }, [dispatch]);

  return (
    <>
      <Link to="/accounts/manage/">
        <Button className="my-3 d-none d-lg-block">Go back</Button>
      </Link>
      <FormContainer>
        <h1>Edit</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">Your address has been updated.</Message>
        )}
        <AddressForm variant="update" />
        <Button variant="danger" className="my-3">
          Remove from address book
        </Button>
      </FormContainer>
    </>
  );
};

export default EditAddressScreen;
