import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";

const CartAdder = ({ product }) => {
  const defaultItemType = product.n_stock > 0 ? "paper" : "pdf";
  const [itemType, setItemType] = useState(defaultItemType);
  const [qty, setQty] = useState(1);

  let qtyArr = [];
  for (let i = 1; i <= product.n_stock; i++) {
    qtyArr.push(i);
  }

  const handleRadioSelect = (e) => setItemType(e.target.id);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: replace with add to cart action.
    console.log("added to cart");
    console.log(product.id);
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Check
          type="radio"
          label={`Paper Pattern - $${product.price} (${
            product.n_stock > 0
              ? product.n_stock + " in stock"
              : "None in stock"
          })`}
          name="pattern-choice"
          id="paper"
          onChange={handleRadioSelect}
          disabled={product.n_stock <= 0}
          defaultChecked={product.n_stock > 0}
        ></Form.Check>
        <Form.Check
          type="radio"
          label={`E-Pattern - ${
            product.pdf_price ? "$" + product.pdf_price : "not available"
          }`}
          name="pattern-choice"
          id="pdf"
          onChange={handleRadioSelect}
          disabled={!product.pdf_price}
          defaultChecked={product.n_stock <= 0}
        ></Form.Check>
      </Form.Group>
      <Form.Group>
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          as="select"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          disabled={itemType === "pdf"}
        >
          {qtyArr.map((x) => (
            <option value={x} key={x}>
              {x}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className="my-3 btn d-none d-lg-block"
      >
        Add to cart
      </Button>
      <Row className="d-lg-none d-block mx-0">
        <Button type="submit" variant="primary" className="my-3">
          Add to cart
        </Button>
      </Row>
    </Form>
  );
};

export default CartAdder;
