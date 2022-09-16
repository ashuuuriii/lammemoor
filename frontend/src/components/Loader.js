import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner animation="border" role="status" className="md">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
