import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import CartAdder from "./CartAdder";
import Rating from "./Rating";

import "../custom_properties.css";

const ProductModal = ({ product }) => {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button onClick={handleOpen} className="btn-to-link">
        Quick View
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h2>{product.name}</h2>
        </Modal.Header>
        <Modal.Body>
          <Rating
            value={product.rating}
            text={`(${product.n_reviews} customer reviews)`}
            color={"#000"}
          />
          {product.pdf_price ? (
            <p>
              <strong>
                ${product.pdf_price} - ${product.price}
              </strong>
            </p>
          ) : (
            <p>${product.price}</p>
          )}
          <p>{product.description}</p>
          <h3>Purchase Options</h3>
          <CartAdder product={product} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductModal;
