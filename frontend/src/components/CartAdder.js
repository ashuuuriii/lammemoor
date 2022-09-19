import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CartAdder = ({ productId }) => {
  const [itemType, setItemType] = useState("paper");
  const [qty, setQty] = useState(1);

  const handleRadioSelect = (e) => {
    setItemType(e.target.id);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: replace with add to cart action.
    console.log("added to cart");
    console.log(productId);
  };

  // TODO: add quantity selector, disable choices depending on availibility
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Check
          type="radio"
          label="Paper Pattern"
          name="pattern-choice"
          id="paper"
          onChange={handleRadioSelect}
          defaultChecked
        ></Form.Check>
        <Form.Check
          type="radio"
          label="E-Pattern"
          name="pattern-choice"
          id="pdf"
          onChange={handleRadioSelect}
        ></Form.Check>
      </Form.Group>
      <Button type="submit" variant="primary" className="my-3">
        Add to cart
      </Button>
    </Form>
  );
};

export default CartAdder;
